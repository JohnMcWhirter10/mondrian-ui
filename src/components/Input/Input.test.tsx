/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Input } from './Input';
import { InputProps } from './Input.types';

describe('Input Component', () => {
  const renderInput = (props: Partial<InputProps>) => {
    render(
      <React.Fragment>
        <label htmlFor={props.id || 'test-input'}>Default Label</label>
        <Input id={props.id || 'test-input'} {...props} />
      </React.Fragment>
    );
  };

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    render: (theme) => <Input theme={theme} aria-label="x" />,
    classFor: (theme) => `mondrian-input-${theme}`,
  });

  itPassesThroughAttributes({
    render: (props) => <Input {...props} />,
  });

  test('handles input change', async () => {
    renderInput({ id: 'change-input' });

    const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
    await userEvent.type(input, 'Hello');

    expect(input.value).toBe('Hello');
  });

  test('exposes aria-invalid and keeps the real input semantics', () => {
    renderInput({ id: 'bad-input', 'aria-invalid': true });

    const input = screen.getByLabelText(/default label/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.tagName).toBe('INPUT');
  });

  test('uses a real disabled attribute', () => {
    renderInput({ id: 'off-input', disabled: true });

    expect(screen.getByLabelText(/default label/i)).toBeDisabled();
  });

  itForwardsRef<HTMLInputElement>({
    render: (ref) => <Input ref={ref} aria-label="x" />,
    tagName: 'INPUT',
  });

  test('does not expose className', () => {
    render(
      <Input
        aria-label="x"
        {...({ className: 'x' } as Record<string, string>)}
      />
    );
    expect(screen.getByLabelText('x')).toHaveClass('mondrian-input');
    expect(screen.getByLabelText('x')).not.toHaveClass('x');
  });
});
