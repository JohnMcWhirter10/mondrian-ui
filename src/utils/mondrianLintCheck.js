/**
 * Mondrian UI Style Linter
 *
 * This utility script helps check CSS files for compliance with Mondrian guidelines.
 * It can be run manually or integrated into a CI/CD pipeline.
 */

const fs = require('fs');
const path = require('path');

// Minimal ANSI colors, so the linter needs no dependency.
const paint = (code) => (text) => `\x1b[${code}m${text}\x1b[0m`;
const chalk = {
  blue: paint(34),
  yellow: paint(33),
  red: paint(31),
  green: paint(32),
  gray: paint(90),
};

// Mondrian style guidelines
const GUIDELINES = {
  // Only allowed colors
  ALLOWED_COLORS: [
    '#D42029', // Red
    '#0D47A1', // Blue
    '#FFDE03', // Yellow
    '#000000', // Black
    '#FFFFFF', // White
    '#3CB371', // Success green
  ],

  // CSS Variable naming pattern
  CSS_VAR_PREFIX: '--mondrian-',

  // Class naming pattern
  CLASS_NAME_PREFIX: 'mondrian-',

  // No border-radius
  NO_BORDER_RADIUS: true,

  // No opacity or blur effects
  NO_OPACITY_EFFECTS: true,

  // Must use rectangular shapes
  RECTANGULAR_SHAPES: true,
};

// Patterns to check
const PATTERNS = {
  HARDCODED_COLORS: /#[0-9A-Fa-f]{3,6}|rgb\(|rgba\(/g,
  CSS_VARS_WITHOUT_PREFIX: /var\(--(?!mondrian-)[a-zA-Z-]+\)/g,
  // A class selector that does not start with mondrian-. Modifier classes
  // chained onto a mondrian- class (.mondrian-card.blue) are fine.
  CLASS_WITHOUT_PREFIX:
    /(?<![\w\]\)-])\.(?!mondrian-)[a-zA-Z_][\w-]*(?=[^{};]*\{)/g,
  BORDER_RADIUS: /border-radius:\s*(?!0(?![\d.]))[^\s;]/g,
  OPACITY_BLUR: /(?<![\w-])opacity\s*:|blur\(/g,
};

/**
 * Main function to check CSS files for Mondrian compliance
 */
function checkCSSCompliance(directory) {
  console.log(chalk.blue('\n🔍 Checking CSS files for Mondrian compliance...'));

  const cssFiles = findCSSFiles(directory);

  if (cssFiles.length === 0) {
    console.log(chalk.yellow('No CSS files found to check'));
    return 0;
  }

  console.log(chalk.blue(`Found ${cssFiles.length} CSS files to check`));

  let totalIssues = 0;

  cssFiles.forEach((file) => {
    // Comments may mention forbidden things ("no opacity fade"); skip them.
    const content = fs
      .readFileSync(file, 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '');
    const issues = [];

    // Check for hardcoded colors
    const hardcodedColors = content.match(PATTERNS.HARDCODED_COLORS) || [];
    if (hardcodedColors.length > 0) {
      // Filter out allowed colors
      const disallowedColors = hardcodedColors.filter(
        (color) =>
          !GUIDELINES.ALLOWED_COLORS.some((allowed) =>
            color.toLowerCase().includes(allowed.toLowerCase())
          )
      );

      if (disallowedColors.length > 0) {
        issues.push({
          type: 'Hardcoded colors',
          details: disallowedColors.slice(0, 3),
          count: disallowedColors.length,
        });
      }
    }

    // Check for CSS variables without Mondrian prefix
    // Custom properties a file declares for itself (--plane, --pad) and
    // Radix runtime variables (--radix-*) are not theme variables.
    const localVars = new Set(
      [...content.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1])
    );
    const nonMondrianVars = (
      content.match(PATTERNS.CSS_VARS_WITHOUT_PREFIX) || []
    ).filter((v) => {
      const name = v.slice(4, -1);
      return !name.startsWith('--radix-') && !localVars.has(name);
    });
    if (nonMondrianVars.length > 0) {
      issues.push({
        type: 'CSS variables without --mondrian- prefix',
        details: nonMondrianVars.slice(0, 3),
        count: nonMondrianVars.length,
      });
    }

    // Check for classes without Mondrian prefix
    const nonMondrianClasses =
      content.match(PATTERNS.CLASS_WITHOUT_PREFIX) || [];
    if (nonMondrianClasses.length > 0) {
      issues.push({
        type: 'Classes without mondrian- prefix',
        details: nonMondrianClasses.slice(0, 3),
        count: nonMondrianClasses.length,
      });
    }

    // Check for border-radius
    const borderRadius = content.match(PATTERNS.BORDER_RADIUS) || [];
    if (borderRadius.length > 0) {
      issues.push({
        type: 'Border radius (not allowed in Mondrian)',
        details: borderRadius.slice(0, 3),
        count: borderRadius.length,
      });
    }

    // Check for opacity or blur effects
    const opacityBlur = content.match(PATTERNS.OPACITY_BLUR) || [];
    if (opacityBlur.length > 0) {
      issues.push({
        type: 'Opacity or blur effects (not recommended for Mondrian)',
        details: opacityBlur.slice(0, 3),
        count: opacityBlur.length,
      });
    }

    // Report results for this file
    if (issues.length > 0) {
      console.log(chalk.yellow(`\n📄 ${path.relative(directory, file)}`));

      issues.forEach((issue) => {
        console.log(chalk.red(`  ❌ ${issue.type} (${issue.count}):`));
        issue.details.forEach((detail) => {
          console.log(chalk.gray(`     - ${detail.trim()}`));
        });
        if (issue.count > issue.details.length) {
          console.log(
            chalk.gray(
              `     ... and ${issue.count - issue.details.length} more`
            )
          );
        }
      });

      totalIssues += issues.length;
    } else {
      console.log(
        chalk.green(`✅ ${path.relative(directory, file)} - No issues found`)
      );
    }
  });

  // Summary
  console.log(
    chalk.blue(
      `\n📊 Summary: ${totalIssues > 0 ? chalk.red(`${totalIssues} issues found`) : chalk.green('All files comply with Mondrian guidelines!')}`
    )
  );

  return totalIssues;
}

/**
 * Find all CSS files in a directory (recursive)
 */
function findCSSFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);

    if (stat && stat.isDirectory() && !file.includes('node_modules')) {
      results = results.concat(findCSSFiles(file));
    } else if (file.endsWith('.css')) {
      results.push(file);
    }
  });

  return results;
}

// If this script is run directly
if (require.main === module) {
  const directory =
    process.argv.slice(2).find((arg) => !arg.startsWith('--')) || './src';
  const exitWithError = process.argv.includes('--exit-with-error');

  const issues = checkCSSCompliance(directory);

  // Exit with error code if issues were found and the flag is set
  if (exitWithError && issues > 0) {
    process.exit(1);
  }
}

module.exports = {
  checkCSSCompliance,
};
