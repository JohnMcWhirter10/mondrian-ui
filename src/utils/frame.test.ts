import * as fs from 'fs';
import * as path from 'path';

/**
 * Bars and panels share one frame: a thin line on all four sides with a heavy
 * bottom rule. Open compositions (Accordion, Collapsible, Empty, Table) are
 * deliberate and not listed here.
 */
const componentsDir = path.resolve(__dirname, '../components');

const framed: Array<[string, string]> = [
  ['Tabs', '.mondrian-tabs-list'],
  ['Toolbar', '.mondrian-toolbar'],
  ['Menubar', '.mondrian-menubar'],
  ['NavigationMenu', '.mondrian-navigation-menu-list'],
];

const ruleBody = (css: string, selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return match ? match[1] : '';
};

describe('shared frame', () => {
  test.each(framed)('%s is framed on all four sides', (name, selector) => {
    const css = fs.readFileSync(
      path.join(componentsDir, name, `${name}.css`),
      'utf8'
    );
    const body = ruleBody(css, selector);
    expect(body).toMatch(
      /border:\s*var\(--mondrian-grid-width\)\s+solid\s+var\(--mondrian-border\)/
    );
    expect(body).toMatch(
      /border-bottom(-width)?:\s*var\(--mondrian-grid-width-heavy\)/
    );
  });
});
