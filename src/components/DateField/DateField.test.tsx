import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { DateField } from './index';

describe('DateField', () => {
  test('renders a native date input on the default plane', () => {
    render(<DateField aria-label="Date" />);

    const field = screen.getByLabelText('Date');
    expect(field.tagName).toBe('INPUT');
    expect(field).toHaveAttribute('type', 'date');
    expect(field).toHaveClass('mondrian-date-field');
    expect(field).not.toHaveClass('mondrian-date-field-sm');
    expect(field).not.toHaveClass('mondrian-date-field-lg');
  });

  test('applies the library size scale', () => {
    const { rerender } = render(<DateField size="sm" aria-label="Date" />);
    expect(screen.getByLabelText('Date')).toHaveClass('mondrian-date-field-sm');

    rerender(<DateField size="default" aria-label="Date" />);
    const field = screen.getByLabelText('Date');
    expect(field).toHaveClass('mondrian-date-field');
    expect(field).not.toHaveClass('mondrian-date-field-sm');
    expect(field).not.toHaveClass('mondrian-date-field-lg');

    rerender(<DateField size="lg" aria-label="Date" />);
    expect(screen.getByLabelText('Date')).toHaveClass('mondrian-date-field-lg');
  });

  test('keeps the value as a YYYY-MM-DD string', () => {
    render(<DateField aria-label="Date" defaultValue="2026-11-07" />);

    expect(screen.getByLabelText('Date')).toHaveValue('2026-11-07');
  });

  test('reports the native date string when the value changes', () => {
    const handleChange = jest.fn();
    render(<DateField aria-label="Date" onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText('Date'), {
      target: { value: '2026-01-15' },
    });

    expect(screen.getByLabelText('Date')).toHaveValue('2026-01-15');
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe('2026-01-15');
  });

  itForwardsRef<HTMLInputElement>({
    render: (ref) => <DateField ref={ref} aria-label="Date" />,
    tagName: 'INPUT',
    className: 'mondrian-date-field',
  });

  test('forwarded ref is a date input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<DateField ref={ref} aria-label="Date" />);
    expect(ref.current).toHaveAttribute('type', 'date');
  });

  itPassesThroughAttributes({
    render: (props) => <DateField {...props} />,
  });

  test('passes through id, name, min, max, and disabled', () => {
    render(
      <DateField
        id="start"
        name="start"
        min="2026-01-01"
        max="2026-12-31"
        disabled
        aria-label="Date"
      />
    );

    const field = screen.getByLabelText('Date');
    expect(field).toHaveAttribute('id', 'start');
    expect(field).toHaveAttribute('name', 'start');
    expect(field).toHaveAttribute('min', '2026-01-01');
    expect(field).toHaveAttribute('max', '2026-12-31');
    expect(field).toBeDisabled();
    expect(field).toHaveAttribute('type', 'date');
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    defaultTheme: 'blue',
    render: (theme) => <DateField theme={theme} aria-label="Field" />,
    classFor: (theme) => `mondrian-date-field-${theme}`,
  });

  test('exposes aria-invalid', () => {
    render(<DateField aria-label="Field" aria-invalid="true" />);

    expect(screen.getByLabelText('Field')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });
});
