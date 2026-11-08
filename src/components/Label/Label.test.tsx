import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

  test('renders with correct theme classes', () => {
    const themes = ['blue', 'neutral', 'red', 'green', 'yellow'] as const;

    themes.forEach((theme) => {
      const { rerender } = render(
        <Label htmlFor="test-input" theme={theme}>
          {`${theme} Label`}
        </Label>
      );

      const label = screen.getByText(`${theme} Label`);
      expect(label).toHaveClass(`mondrian-label-${theme}`);

      rerender(<></>);
    });
  });

  test('forwards ref to the underlying label element', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(
      <Label ref={ref} htmlFor="test-input">
        Ref Test
      </Label>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('LABEL');
  });

  test('passes other props to the underlying element', () => {
    render(
      <Label htmlFor="test-input" data-testid="test-label">
        Props Test
      </Label>
    );

    const label = screen.getByTestId('test-label');
    expect(label).toBeInTheDocument();
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

  test('defaults to blue and applies every theme class', () => {
    const themes = ['blue', 'neutral', 'red', 'yellow', 'green'] as const;
    themes.forEach((theme) => {
      const { unmount } = render(<Label theme={theme}>{theme}</Label>);
      expect(screen.getByText(theme)).toHaveClass(`mondrian-label-${theme}`);
      unmount();
    });
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
