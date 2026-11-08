import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RadioGroup, RadioItem } from './Radio';

describe('Radio Component', () => {
  test('renders RadioGroup and RadioItem with default props', () => {
    render(
      <RadioGroup>
        <RadioItem value="option1" />
        <RadioItem value="option2" />
      </RadioGroup>
    );

    const radioItems = screen.getAllByRole('radio');
    expect(radioItems).toHaveLength(2);
  });

  test('applies correct theme class to RadioItem', () => {
    render(
      <RadioGroup>
        <RadioItem value="option1" data-testid="radio-blue" theme="blue" />
        <RadioItem value="option2" data-testid="radio-red" theme="red" />
      </RadioGroup>
    );

    const blueRadio = screen.getByTestId('radio-blue');
    const redRadio = screen.getByTestId('radio-red');

    expect(blueRadio).toHaveClass('mondrian-radio-item-blue');
    expect(redRadio).toHaveClass('mondrian-radio-item-red');
  });

  test('applies correct size class to RadioItem', () => {
    render(
      <RadioGroup>
        <RadioItem value="option1" data-testid="radio-default" />
        <RadioItem value="option2" data-testid="radio-sm" size="sm" />
        <RadioItem value="option3" data-testid="radio-lg" size="lg" />
      </RadioGroup>
    );

    const defaultRadio = screen.getByTestId('radio-default');
    const smallRadio = screen.getByTestId('radio-sm');
    const largeRadio = screen.getByTestId('radio-lg');

    expect(defaultRadio).not.toHaveClass('mondrian-radio-item-sm');
    expect(defaultRadio).not.toHaveClass('mondrian-radio-item-lg');
    expect(smallRadio).toHaveClass('mondrian-radio-item-sm');
    expect(largeRadio).toHaveClass('mondrian-radio-item-lg');
  });

  test('RadioGroup handles selection correctly', () => {
    const handleChange = jest.fn();

    render(
      <RadioGroup defaultValue="option1" onValueChange={handleChange}>
        <RadioItem value="option1" data-testid="radio-1" />
        <RadioItem value="option2" data-testid="radio-2" />
      </RadioGroup>
    );

    // Click on the second radio button
    fireEvent.click(screen.getByTestId('radio-2'));
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  test('RadioGroup orientation applies correct class', () => {
    render(
      <RadioGroup orientation="horizontal" data-testid="radio-group">
        <RadioItem value="option1" />
        <RadioItem value="option2" />
      </RadioGroup>
    );

    const radioGroup = screen.getByTestId('radio-group');
    expect(radioGroup).toHaveClass('mondrian-radio-group-horizontal');
  });

  test('RadioItem has proper disabled state', () => {
    render(
      <RadioGroup>
        <RadioItem value="option1" data-testid="radio-enabled" />
        <RadioItem value="option2" data-testid="radio-disabled" disabled />
      </RadioGroup>
    );

    const enabledRadio = screen.getByTestId('radio-enabled');
    const disabledRadio = screen.getByTestId('radio-disabled');

    expect(enabledRadio).not.toBeDisabled();
    expect(disabledRadio).toBeDisabled();
  });

  test.each(['blue', 'neutral', 'red', 'yellow', 'green'] as const)(
    'applies the %s theme class to the group and item',
    (theme) => {
      render(
        <RadioGroup theme={theme} data-testid="g">
          <RadioItem value="a" theme={theme} data-testid="i" />
        </RadioGroup>
      );
      expect(screen.getByTestId('g')).toHaveClass(
        `mondrian-radio-group-${theme}`
      );
      expect(screen.getByTestId('i')).toHaveClass(
        `mondrian-radio-item-${theme}`
      );
    }
  );

  test('group defaults to blue and items inherit it', () => {
    render(
      <RadioGroup data-testid="g">
        <RadioItem value="a" data-testid="i" />
      </RadioGroup>
    );
    expect(screen.getByTestId('g')).toHaveClass('mondrian-radio-group-blue');
    expect(screen.getByTestId('i').className).not.toMatch(
      /mondrian-radio-item-(blue|red|yellow|green|neutral)/
    );
  });

  test('exposes radiogroup/radio roles and aria-checked', () => {
    render(
      <RadioGroup defaultValue="a" aria-label="Choices">
        <RadioItem value="a" aria-label="A" />
        <RadioItem value="b" aria-label="B" />
      </RadioGroup>
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByLabelText('A')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByLabelText('B')).toHaveAttribute('aria-checked', 'false');
    // The selected item also shows a glyph, not just a plane color.
    expect(screen.getByLabelText('A').querySelector('svg')).not.toBeNull();
    expect(screen.getByLabelText('B').querySelector('svg')).toBeNull();
  });

  test('forwards refs', () => {
    const gRef = React.createRef<HTMLDivElement>();
    const iRef = React.createRef<HTMLButtonElement>();
    render(
      <RadioGroup ref={gRef}>
        <RadioItem ref={iRef} value="a" />
      </RadioGroup>
    );
    expect(gRef.current?.tagName).toBe('DIV');
    expect(iRef.current?.tagName).toBe('BUTTON');
  });
});
