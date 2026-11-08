import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Label } from './Label';

describe('Label Component', () => {
  test('renders correctly with default props', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const label = screen.getByText('Test Label');

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('mondrian-label');
    expect(label).toHaveClass('mondrian-label-blue');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  test('renders with correct size classes', () => {
    const { rerender } = render(
      <Label htmlFor="test-input" size="sm">
        Small Label
      </Label>
    );

    let label = screen.getByText('Small Label');
    expect(label).toHaveClass('mondrian-label-sm');

    rerender(
      <Label htmlFor="test-input" size="lg">
        Large Label
      </Label>
    );

    label = screen.getByText('Large Label');
    expect(label).toHaveClass('mondrian-label-lg');
  });

  itForwardsRef<HTMLLabelElement>({
    render: (ref) => (
      <Label ref={ref} htmlFor="test-input">
        Ref Test
      </Label>
    ),
    tagName: 'LABEL',
    className: 'mondrian-label',
  });

  itPassesThroughAttributes({
    render: (props) => (
      <Label htmlFor="test-input" {...props}>
        Props Test
      </Label>
    ),
  });

  test('renders as a slot when asChild is true', () => {
    render(
      <Label asChild>
        <div data-testid="custom-element">Custom Element</div>
      </Label>
    );

    const element = screen.getByTestId('custom-element');
    expect(element).toHaveClass('mondrian-label');
    expect(element).toHaveClass('mondrian-label-blue');
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    defaultTheme: 'blue',
    render: (theme) => <Label theme={theme}>Themed</Label>,
    classFor: (theme) => `mondrian-label-${theme}`,
  });

  test('associates with a form control', () => {
    render(
      <>
        <Label htmlFor="field">Name</Label>
        <input id="field" />
      </>
    );
    expect(screen.getByLabelText('Name')).toBe(
      document.getElementById('field')
    );
  });
});
