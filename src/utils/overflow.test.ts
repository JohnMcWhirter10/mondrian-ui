import * as fs from 'fs';
import * as path from 'path';

/**
 * Nothing is drawn outside a component's box. In Mondrian's grid paintings
 * the lines run to the edge of the canvas and stop; they do not hang past it.
 * Decoration that overshot the box was clipped by overflow containers
 * (ScrollArea, Dialog body, menus) and created page-level horizontal scroll.
 *
 * Card, Alert and Box keep a bar past their edge, but they reserve that room
 * with a margin and size themselves to the remaining width, so they stay
 * inside the parent. Every other component must stay flush.
 */
const componentsDir = path.resolve(__dirname, '../components');
const RESERVES_ROOM = ['Card', 'Alert', 'Box'];

const cssFiles = fs
  .readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) =>
    fs
      .readdirSync(path.join(componentsDir, d.name))
      .filter((f) => f.endsWith('.css'))
      .map((f) => ({ name: d.name, file: path.join(componentsDir, d.name, f) }))
  );

// A negative offset is allowed only when it is exactly one border wide, which
// places a rule on the border instead of beyond it.
const ON_BORDER = /^calc\(var\(--mondrian-grid-width(-heavy)?\) \* -1\)$/;

describe('component edges', () => {
  test.each(cssFiles)('$name: no horizontal overshoot', ({ name, file }) => {
    if (RESERVES_ROOM.includes(name)) return;
    const css = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    const offenders = [
      ...css.matchAll(/(?<![-\w])(left|right)\s*:\s*([^;]+);/g),
    ]
      .map((m) => m[2].trim().replace(/\s+/g, ' '))
      .filter((value) => /(^-|\* -1)/.test(value) && !ON_BORDER.test(value));
    expect(offenders).toEqual([]);
  });

  test.each(cssFiles)('$name: no !important positioning', ({ file }) => {
    const css = fs.readFileSync(file, 'utf8');
    expect(css).not.toMatch(/(left|right|top|bottom)\s*:[^;]*!important/);
  });
});
