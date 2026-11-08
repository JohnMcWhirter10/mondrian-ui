import * as React from 'react';
import { render, type RenderResult } from '@testing-library/react';

/**
 * Contract tests. Every component promises the same few things: it forwards
 * its ref, passes standard attributes through, and maps each `theme` value to
 * a class. These helpers register those tests once, so a component's test file
 * only describes how to render it, and keeps its own file for what is unique.
 *
 * Call them inside a `describe` block.
 */

const firstElement = ({ container }: RenderResult) =>
  container.firstElementChild as HTMLElement;

interface RefContract<T extends Element> {
  /** Render the component with the given ref attached. */
  render: (ref: React.RefObject<T>) => React.ReactElement;
  /** Tag the ref must point at, e.g. 'SPAN'. */
  tagName: string;
  /** A class the ref'd element must carry, to prove it is the right node. */
  className?: string;
}

export function itForwardsRef<T extends Element>({
  render: renderWithRef,
  tagName,
  className,
}: RefContract<T>) {
  test(`forwards a ref to the ${tagName.toLowerCase()}`, () => {
    const ref = React.createRef<T>();
    render(renderWithRef(ref));
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe(tagName);
    if (className) expect(ref.current).toHaveClass(className);
  });
}

interface AttributeContract {
  /** Render the component with these props spread onto it. */
  render: (props: Record<string, string>) => React.ReactElement;
  /** Element that should receive them. Defaults to the first rendered node. */
  target?: (utils: RenderResult) => HTMLElement;
  /** Attributes to pass. Defaults to an id and an aria-label. */
  attributes?: Record<string, string>;
}

export function itPassesThroughAttributes({
  render: renderWithProps,
  target = firstElement,
  attributes = { id: 'contract-id', 'aria-label': 'contract label' },
}: AttributeContract) {
  test('passes through id and aria attributes', () => {
    const el = target(render(renderWithProps(attributes)));
    Object.entries(attributes).forEach(([name, value]) =>
      expect(el).toHaveAttribute(name, value)
    );
  });
}

interface ThemeContract<Theme extends string> {
  /** Every theme the component supports. */
  themes: readonly Theme[];
  /** Render with this theme, or with none to exercise the default. */
  render: (theme: Theme | undefined) => React.ReactElement;
  /** The class a theme should produce. */
  classFor: (theme: Theme) => string;
  /** Theme used when none is passed. Omit if there is no default. */
  defaultTheme?: Theme;
  /** Element that carries the class. Defaults to the first rendered node. */
  target?: (utils: RenderResult) => HTMLElement;
}

export function itAppliesThemeClasses<Theme extends string>({
  themes,
  render: renderWithTheme,
  classFor,
  defaultTheme,
  target = firstElement,
}: ThemeContract<Theme>) {
  test.each(themes)('applies the %s theme class and no other', (theme) => {
    const el = target(render(renderWithTheme(theme)));
    expect(el).toHaveClass(classFor(theme));
    themes
      .filter((other) => other !== theme)
      .forEach((other) => expect(el).not.toHaveClass(classFor(other)));
  });

  if (defaultTheme) {
    test(`defaults to the ${defaultTheme} theme`, () => {
      const el = target(render(renderWithTheme(undefined)));
      expect(el).toHaveClass(classFor(defaultTheme));
    });
  }
}
