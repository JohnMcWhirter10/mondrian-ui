import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { ScrollArea } from './ScrollArea';

describe('ScrollArea Component', () => {
  it('renders correctly with children', () => {
    const testContent = 'Test content for scroll area';
    render(<ScrollArea data-testid="scroll-area">{testContent}</ScrollArea>);

    const scrollArea = screen.getByTestId('scroll-area');
    expect(scrollArea).toBeInTheDocument();
    expect(scrollArea).toHaveClass('mondrian-scroll-area');
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('applies height and width correctly', () => {
    const { container } = render(<ScrollArea height={200} width={300} />);

    const scrollArea = container.querySelector('.mondrian-scroll-area');
    expect(scrollArea).toHaveStyle({
      height: '200px',
      width: '300px',
    });
  });

  it('uses theme for scrollbar thumb', () => {
    const { container } = render(
      <ScrollArea theme="red">Test content</ScrollArea>
    );

    const thumbElements = container.querySelectorAll(
      '.mondrian-scrollbar-thumb'
    );
    thumbElements.forEach((thumb) => {
      expect(thumb).toHaveClass('red');
    });
  });

  it('renders both vertical and horizontal scrollbars', () => {
    const { container } = render(
      <ScrollArea type="always">Test content</ScrollArea>
    );

    const verticalScrollbar = container.querySelector(
      '.mondrian-scrollbar-vertical'
    );
    const horizontalScrollbar = container.querySelector(
      '.mondrian-scrollbar-horizontal'
    );

    expect(verticalScrollbar).toBeInTheDocument();
    expect(horizontalScrollbar).toBeInTheDocument();
  });

  it('defaults to blue theme when no theme is specified', () => {
    const { container } = render(<ScrollArea>Test content</ScrollArea>);

    const thumbElements = container.querySelectorAll(
      '.mondrian-scrollbar-thumb'
    );
    thumbElements.forEach((thumb) => {
      expect(thumb).toHaveClass('blue');
    });
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    render: (theme) => <ScrollArea theme={theme}>Content</ScrollArea>,
    classFor: (theme) => `mondrian-scroll-area-${theme}`,
    target: ({ container }) =>
      container.querySelector('.mondrian-scroll-area') as HTMLElement,
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => <ScrollArea ref={ref}>Content</ScrollArea>,
    tagName: 'DIV',
    className: 'mondrian-scroll-area',
  });

  itPassesThroughAttributes({
    render: (props) => <ScrollArea {...props}>Content</ScrollArea>,
  });

  describe('keyboard access', () => {
    const original = {
      scrollHeight: Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'scrollHeight'
      ),
      clientHeight: Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'clientHeight'
      ),
    };

    afterEach(() => {
      Object.entries(original).forEach(([key, descriptor]) => {
        if (descriptor) {
          Object.defineProperty(HTMLElement.prototype, key, descriptor);
        } else {
          delete (HTMLElement.prototype as unknown as Record<string, unknown>)[
            key
          ];
        }
      });
    });

    it('does not focus the viewport when nothing overflows', () => {
      const { container } = render(<ScrollArea>Short</ScrollArea>);
      expect(
        container.querySelector('.mondrian-scroll-area-viewport')
      ).not.toHaveAttribute('tabindex');
    });

    it('makes an overflowing viewport focusable and labelled', () => {
      Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
        configurable: true,
        get: () => 500,
      });
      Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
        configurable: true,
        get: () => 100,
      });

      const { container } = render(
        <ScrollArea label="Release notes">Long content</ScrollArea>
      );
      const viewport = container.querySelector(
        '.mondrian-scroll-area-viewport'
      );
      expect(viewport).toHaveAttribute('tabindex', '0');
      expect(viewport).toHaveAttribute('role', 'region');
      expect(viewport).toHaveAttribute('aria-label', 'Release notes');
    });
  });
});
