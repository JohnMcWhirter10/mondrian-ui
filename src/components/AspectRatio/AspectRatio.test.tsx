import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AspectRatio } from './index';

describe('AspectRatio', () => {
  test('renders children inside a framed wrapper', () => {
    const { container } = render(
      <AspectRatio>
        <span>Content</span>
      </AspectRatio>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass('mondrian-aspect-ratio');
  });

  test('defaults to a square ratio', () => {
    const { container } = render(<AspectRatio>x</AspectRatio>);
    const wrapper = container.querySelector(
      '[data-radix-aspect-ratio-wrapper]'
    ) as HTMLElement;

    expect(wrapper).toHaveStyle({ paddingBottom: '100%' });
  });

  test('applies a custom ratio', () => {
    const { container } = render(<AspectRatio ratio={2}>x</AspectRatio>);
    const wrapper = container.querySelector(
      '[data-radix-aspect-ratio-wrapper]'
    ) as HTMLElement;

    expect(wrapper).toHaveStyle({ paddingBottom: '50%' });
  });

  test('forwards a ref to the content element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AspectRatio ref={ref}>x</AspectRatio>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });

  test('passes through id and aria attributes', () => {
    render(
      <AspectRatio id="frame" aria-label="Image frame">
        x
      </AspectRatio>
    );

    const el = screen.getByLabelText('Image frame');
    expect(el).toHaveAttribute('id', 'frame');
  });
});
