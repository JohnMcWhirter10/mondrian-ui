import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimeField } from './index';

describe('TimeField', () => {
  test('renders a native time input on the default plane', () => {
    render(<TimeField aria-label="Time" />);

    const field = screen.getByLabelText('Time');
    expect(field.tagName).toBe('INPUT');
    expect(field).toHaveAttribute('type', 'time');
    expect(field).toHaveClass('mondrian-time-field');
    expect(field).not.toHaveClass('mondrian-time-field-sm');
    expect(field).not.toHaveClass('mondrian-time-field-lg');
    expect(TimeField.displayName).toBe('TimeField');
  });

  test('keeps type time and the mondrian classes when other attributes are forced', () => {
    render(
      <TimeField
        aria-label="Time"
        {...({
          type: 'text',
          className: 'not-mondrian',
        } as Record<string, string>)}
      />
    );

    const field = screen.getByLabelText('Time');
    expect(field).toHaveAttribute('type', 'time');
    expect(field).toHaveClass('mondrian-time-field');
    expect(field).not.toHaveClass('not-mondrian');
  });

  test('applies the library size scale', () => {
    const { rerender } = render(<TimeField size="sm" aria-label="Time" />);
    const small = screen.getByLabelText('Time');
    expect(small).toHaveClass('mondrian-time-field');
    expect(small).toHaveClass('mondrian-time-field-sm');
    expect(small).not.toHaveClass('mondrian-time-field-lg');

    rerender(<TimeField size="default" aria-label="Time" />);
    const field = screen.getByLabelText('Time');
    expect(field).toHaveClass('mondrian-time-field');
    expect(field).not.toHaveClass('mondrian-time-field-sm');
    expect(field).not.toHaveClass('mondrian-time-field-lg');

    rerender(<TimeField size="lg" aria-label="Time" />);
    const large = screen.getByLabelText('Time');
    expect(large).toHaveClass('mondrian-time-field');
    expect(large).toHaveClass('mondrian-time-field-lg');
    expect(large).not.toHaveClass('mondrian-time-field-sm');
  });

  test('keeps a valid time string and accepts it', () => {
    render(<TimeField aria-label="Time" defaultValue="09:30" />);

    const field = screen.getByLabelText<HTMLInputElement>('Time');
    expect(field).toHaveValue('09:30');
    expect(field.validity.valid).toBe(true);
    expect(field.checkValidity()).toBe(true);
  });

  test('rejects a value that is not a time', () => {
    render(<TimeField aria-label="Time" />);

    const field = screen.getByLabelText<HTMLInputElement>('Time');
    fireEvent.change(field, { target: { value: '99:99' } });
    expect(field).toHaveValue('');
    expect(field.validity.valid).toBe(true);

    fireEvent.change(field, { target: { value: 'not-a-time' } });
    expect(field).toHaveValue('');
  });

  test('passes step through so seconds are a valid time', () => {
    const { rerender } = render(<TimeField aria-label="Time" />);
    const field = screen.getByLabelText<HTMLInputElement>('Time');

    fireEvent.change(field, { target: { value: '18:05:09' } });
    expect(field).toHaveValue('18:05:09');
    expect(field.validity.stepMismatch).toBe(true);
    expect(field.checkValidity()).toBe(false);

    rerender(<TimeField aria-label="Time" step={1} />);
    expect(field).toHaveAttribute('step', '1');
    expect(field).toHaveValue('18:05:09');
    expect(field.validity.stepMismatch).toBe(false);
    expect(field.validity.valid).toBe(true);
    expect(field.checkValidity()).toBe(true);
  });

  test('reports the native time string when the value changes', () => {
    const handleChange = jest.fn();
    render(<TimeField aria-label="Time" step={1} onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText('Time'), {
      target: { value: '18:05:09' },
    });

    const field = screen.getByLabelText<HTMLInputElement>('Time');
    expect(field).toHaveValue('18:05:09');
    expect(field.validity.valid).toBe(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe('18:05:09');
  });

  test('follows min and max', () => {
    render(<TimeField aria-label="Time" min="09:00" max="17:00" />);

    const field = screen.getByLabelText<HTMLInputElement>('Time');

    fireEvent.change(field, { target: { value: '08:00' } });
    expect(field).toHaveValue('08:00');
    expect(field.validity.rangeUnderflow).toBe(true);
    expect(field.checkValidity()).toBe(false);

    fireEvent.change(field, { target: { value: '18:00' } });
    expect(field).toHaveValue('18:00');
    expect(field.validity.rangeOverflow).toBe(true);
    expect(field.checkValidity()).toBe(false);

    fireEvent.change(field, { target: { value: '12:30' } });
    expect(field).toHaveValue('12:30');
    expect(field.validity.valid).toBe(true);
    expect(field.checkValidity()).toBe(true);
  });

  test('an empty required field is missing its value', () => {
    render(<TimeField aria-label="Time" required />);

    const field = screen.getByLabelText<HTMLInputElement>('Time');
    expect(field).toBeRequired();
    expect(field.validity.valueMissing).toBe(true);
    expect(field.checkValidity()).toBe(false);

    fireEvent.change(field, { target: { value: '09:30' } });
    expect(field.validity.valueMissing).toBe(false);
    expect(field.checkValidity()).toBe(true);
  });

  test('shows the controlled value until the parent changes it', () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <TimeField aria-label="Time" value="09:30" onChange={handleChange} />
    );

    const field = screen.getByLabelText<HTMLInputElement>('Time');
    expect(field).toHaveValue('09:30');
    expect(field.validity.valid).toBe(true);

    fireEvent.change(field, { target: { value: '10:15' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(field).toHaveValue('09:30');

    rerender(
      <TimeField aria-label="Time" value="10:15" onChange={handleChange} />
    );
    expect(field).toHaveValue('10:15');
    expect(field.validity.valid).toBe(true);
  });

  test('forwards a ref to the input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<TimeField ref={ref} aria-label="Time" defaultValue="09:30" />);

    expect(ref.current).toBe(screen.getByLabelText('Time'));
    expect(ref.current?.tagName).toBe('INPUT');
    expect(ref.current).toHaveAttribute('type', 'time');
    expect(ref.current).toHaveClass('mondrian-time-field');
    expect(ref.current).toHaveValue('09:30');
  });

  test('passes through id, name, min, max, and disabled', () => {
    render(
      <TimeField
        id="start"
        name="start"
        min="09:00"
        max="17:00"
        disabled
        aria-label="Time"
      />
    );

    const field = screen.getByLabelText('Time');
    expect(field).toHaveAttribute('id', 'start');
    expect(field).toHaveAttribute('name', 'start');
    expect(field).toHaveAttribute('min', '09:00');
    expect(field).toHaveAttribute('max', '17:00');
    expect(field).toBeDisabled();
    expect(field).toHaveAttribute('type', 'time');
  });
});
