import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { InputGroup, InputGroupInput, InputGroupSlot } from './index';

function Group({
  theme,
  size,
  disabled,
  invalid,
}: {
  theme?: 'blue' | 'neutral' | 'red' | 'green' | 'yellow';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  invalid?: boolean;
}) {
  return (
    <InputGroup theme={theme} size={size}>
      <InputGroupSlot side="start">https://</InputGroupSlot>
      <InputGroupInput
        id="site"
        aria-label="Site"
        disabled={disabled}
        aria-invalid={invalid || undefined}
      />
      <InputGroupSlot side="end">
        <Button type="button">Go</Button>
      </InputGroupSlot>
    </InputGroup>
  );
}

describe('InputGroup', () => {
  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    defaultTheme: 'neutral',
    render: (theme) => <Group theme={theme} />,
    classFor: (theme) => `mondrian-input-group-${theme}`,
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => (
      <InputGroup ref={ref}>
        <InputGroupInput id="site" aria-label="Site" />
      </InputGroup>
    ),
    tagName: 'DIV',
    className: 'mondrian-input-group',
  });

  itPassesThroughAttributes({
    render: (props) => (
      <InputGroup {...props}>
        <InputGroupInput id="site" aria-label="Site" />
      </InputGroup>
    ),
  });

  test('puts the field and both slots in one rectangle', () => {
    render(<Group />);

    const field = screen.getByLabelText('Site');
    expect(field).toHaveAttribute('id', 'site');
    expect(field).toHaveClass('mondrian-input-group-input');
    expect(field.parentElement).toHaveClass('mondrian-input-group');
    expect(field.parentElement).toHaveClass('mondrian-input-group-neutral');
    expect(screen.getByText('https://')).toHaveClass(
      'mondrian-input-group-slot-start'
    );
    expect(
      screen.getByRole('button', { name: 'Go' }).parentElement
    ).toHaveClass('mondrian-input-group-slot-end');
  });

  test('marks each slot by side, independent of source order', () => {
    render(
      <InputGroup>
        <InputGroupSlot side="end">End</InputGroupSlot>
        <InputGroupInput id="q" aria-label="Query" />
        <InputGroupSlot side="start">Start</InputGroupSlot>
      </InputGroup>
    );

    expect(screen.getByText('Start')).toHaveClass(
      'mondrian-input-group-slot-start'
    );
    expect(screen.getByText('End')).toHaveClass(
      'mondrian-input-group-slot-end'
    );
  });

  test('types into the field', async () => {
    const user = userEvent.setup();
    render(<Group />);

    const field = screen.getByLabelText('Site');
    await user.type(field, 'mondrian');
    expect(field).toHaveValue('mondrian');
  });

  test('applies the library size scale', () => {
    const { rerender } = render(<Group size="sm" />);
    expect(screen.getByLabelText('Site').parentElement).toHaveClass(
      'mondrian-input-group-sm'
    );

    rerender(<Group />);
    const group = screen.getByLabelText('Site').parentElement as HTMLElement;
    expect(group).not.toHaveClass('mondrian-input-group-sm');
    expect(group).not.toHaveClass('mondrian-input-group-lg');

    rerender(<Group size="lg" />);
    expect(screen.getByLabelText('Site').parentElement).toHaveClass(
      'mondrian-input-group-lg'
    );
  });

  test('forwards a ref to the field', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(
      <InputGroup>
        <InputGroupInput ref={ref} id="site" aria-label="Site" />
      </InputGroup>
    );

    expect(ref.current?.tagName).toBe('INPUT');
    expect(ref.current).toHaveClass('mondrian-input-group-input');
  });

  test('exposes aria-invalid and a real disabled field', () => {
    render(<Group invalid disabled />);

    const field = screen.getByLabelText('Site');
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toBeDisabled();
  });

  test('keeps a nested Input inside the same rectangle', () => {
    render(
      <InputGroup>
        <InputGroupSlot side="start">To</InputGroupSlot>
        <Input id="to" aria-label="To" />
      </InputGroup>
    );

    const field = screen.getByLabelText('To');
    expect(field).toHaveClass('mondrian-input');
    expect(field.parentElement).toHaveClass('mondrian-input-group');
  });

  test('does not expose className on the group or a slot', () => {
    render(
      <InputGroup {...({ className: 'leaked' } as Record<string, string>)}>
        <InputGroupSlot
          {...({ className: 'slot-leak' } as Record<string, string>)}
        >
          To
        </InputGroupSlot>
        <InputGroupInput
          id="to"
          aria-label="To"
          {...({ className: 'field-leak' } as Record<string, string>)}
        />
      </InputGroup>
    );

    const field = screen.getByLabelText('To');
    expect(field.parentElement).toHaveClass('mondrian-input-group');
    expect(field.parentElement).not.toHaveClass('leaked');
    expect(field).toHaveClass('mondrian-input-group-input');
    expect(field).not.toHaveClass('field-leak');
    expect(screen.getByText('To')).toHaveClass('mondrian-input-group-slot');
    expect(screen.getByText('To')).not.toHaveClass('slot-leak');
  });
});
