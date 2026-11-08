import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
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

  itForwardsRef<HTMLDivElement>({
    render: (ref) => <AspectRatio ref={ref}>x</AspectRatio>,
    tagName: 'DIV',
  });

  itPassesThroughAttributes({
    render: (props) => <AspectRatio {...props}>x</AspectRatio>,
    target: () => screen.getByLabelText('contract label'),
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    defaultTheme: 'neutral',
    render: (theme) => <AspectRatio theme={theme}>x</AspectRatio>,
    classFor: (theme) => `mondrian-aspect-ratio-${theme}`,
  });
});
