import * as fs from 'fs';
import * as path from 'path';

/**
 * Motion is one vocabulary, defined as tokens in ThemeProvider:
 *   --mondrian-motion-state   hover/press feedback
 *   --mondrian-motion-reveal  expand and collapse
 *   --mondrian-motion-loop    loading loops (Loader, Progress, Skeleton)
 * Components must use those tokens instead of their own durations or easing,
 * so every animation in the library steps the same way.
 */
const componentsDir = path.resolve(__dirname, '../components');

const cssFiles = fs
  .readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) =>
    fs
      .readdirSync(path.join(componentsDir, d.name))
      .filter((f) => f.endsWith('.css'))
      .map((f) => path.join(componentsDir, d.name, f))
  );

const declarations = (css: string, property: 'animation' | 'transition') =>
  [...css.matchAll(new RegExp(`(?<![-\\w])${property}\\s*:\\s*([^;]+);`, 'g'))]
    .map((m) => m[1].trim())
    // `none` is the reduced-motion reset and is always allowed
    .filter((value) => value !== 'none');

describe('motion tokens', () => {
  test('there are component stylesheets to check', () => {
    expect(cssFiles.length).toBeGreaterThan(20);
  });

  test.each(cssFiles.map((f) => [path.relative(componentsDir, f), f]))(
    '%s uses motion tokens for every animation and transition',
    (_name, file) => {
      const css = fs.readFileSync(file as string, 'utf8');
      const all = [
        ...declarations(css, 'animation'),
        ...declarations(css, 'transition'),
      ];
      all.forEach((value) => {
        expect(value).toMatch(/var\(--mondrian-motion-(state|reveal|loop)\)/);
        // No hard-coded timing or easing alongside the token
        expect(value).not.toMatch(/\d+(\.\d+)?m?s\b|ease|linear|cubic-bezier/);
      });
    }
  );

  test('no animation fades opacity', () => {
    cssFiles.forEach((file) => {
      const css = fs.readFileSync(file, 'utf8');
      const keyframes = [
        ...css.matchAll(/@keyframes[^{]+\{([\s\S]*?\}\s*)\}/g),
      ];
      keyframes.forEach((k) => expect(k[1]).not.toMatch(/opacity/));
      declarations(css, 'transition').forEach((value) =>
        expect(value).not.toMatch(/opacity|\ball\b/)
      );
    });
  });

  test('loading loops all share one direction and timing token', () => {
    const loops = ['Loader', 'Progress', 'Skeleton'].map((name) =>
      fs.readFileSync(path.join(componentsDir, name, `${name}.css`), 'utf8')
    );
    loops.forEach((css) => {
      expect(css).toMatch(
        /animation:\s*[\w-]+\s+var\(--mondrian-motion-loop\)/
      );
      expect(css).not.toMatch(/alternate|reverse/);
    });
  });
});
