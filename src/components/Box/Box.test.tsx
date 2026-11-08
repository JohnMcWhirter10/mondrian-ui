import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Box } from './Box';

describe('Box', () => {
  it('renders with default props', () => {
    render(<Box data-testid="test-box">Content</Box>);
    const box = screen.getByTestId('test-box');

    expect(box).toBeInTheDocument();
    expect(box).toHaveClass('mondrian-box');
    expect(box).toHaveClass('neutral');
    expect(box).toHaveClass('mondrian-box-theme-neutral');
    expect(box.tagName).toBe('DIV');
  });

  it('renders with custom variant', () => {
    render(
      <Box data-testid="test-box" variant="yellow">
        Content
      </Box>
    );
    const box = screen.getByTestId('test-box');

    expect(box).toHaveClass('mondrian-box');
    expect(box).toHaveClass('yellow');
  });

  it('renders with custom size', () => {
    render(
      <Box data-testid="test-box" size="lg">
        Content
      </Box>
    );
    const box = screen.getByTestId('test-box');

    expect(box).toHaveClass('mondrian-box-lg');
  });

  it('renders with fullWidth modifier', () => {
    render(
      <Box data-testid="test-box" fullWidth>
        Content
      </Box>
    );
    const box = screen.getByTestId('test-box');

    expect(box).toHaveClass('mondrian-box-full-width');
  });

  it('renders with flex modifier', () => {
    render(
      <Box data-testid="test-box" flex>
        Content
      </Box>
    );
    const box = screen.getByTestId('test-box');

    expect(box).toHaveClass('mondrian-box-flex');
  });

  it('renders with noBorder modifier', () => {
    render(
      <Box data-testid="test-box" noBorder>
        Content
      </Box>
    );
    const box = screen.getByTestId('test-box');

    expect(box).toHaveClass('mondrian-box-no-border');
  });

  it('renders with asChild to compose with other components', () => {
    render(
      <Box data-testid="test-box" asChild>
        <article>Content</article>
      </Box>
    );

    const box = screen.getByTestId('test-box');

    expect(box).toHaveClass('mondrian-box');
    expect(box.tagName).toBe('ARTICLE');
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => <Box ref={ref}>Content</Box>,
    tagName: 'DIV',
    className: 'mondrian-box',
  });

  itPassesThroughAttributes({
    render: (props) => <Box {...props}>Content</Box>,
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    defaultTheme: 'neutral',
    render: (theme) => <Box theme={theme}>Content</Box>,
    classFor: (theme) => `mondrian-box-theme-${theme}`,
  });
});
