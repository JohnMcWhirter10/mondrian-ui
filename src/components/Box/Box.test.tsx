import { render, screen } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  it('renders with default props', () => {
    render(<Box data-testid="test-box">Content</Box>);
    const box = screen.getByTestId('test-box');

    expect(box).toBeInTheDocument();
    expect(box).toHaveClass('mondrian-box');
    expect(box).toHaveClass('blue');
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

  it('passes additional props to the element', () => {
    render(
      <Box data-testid="test-box" aria-label="Box Label">
        Content
      </Box>
    );
    const box = screen.getByTestId('test-box');

    expect(box).toHaveAttribute('aria-label', 'Box Label');
  });
});
