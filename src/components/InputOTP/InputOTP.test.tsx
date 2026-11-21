import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { itForwardsRef } from '../../test-utils';
import { InputOTP } from './index';

// React 18 flushes the keystroke update after user-event's own act scope.
async function settle(run: () => Promise<unknown>) {
  await act(async () => {
    await run();
  });
}

function cells() {
  return screen.getAllByRole('textbox');
}

describe('InputOTP', () => {
  itForwardsRef<HTMLInputElement>({
    render: (ref) => <InputOTP ref={ref} id="code" />,
    tagName: 'INPUT',
    className: 'mondrian-input-otp-cell',
  });

  test('renders a row of cells and names each one', () => {
    render(<InputOTP id="code" aria-label="Verification code" />);

    const inputs = cells();
    expect(inputs).toHaveLength(6);
    expect(inputs[0]).toHaveAttribute('id', 'code');
    expect(inputs[1]).toHaveAttribute('id', 'code-1');
    expect(inputs[0]).toHaveAttribute('autocomplete', 'one-time-code');
    expect(inputs[1]).toHaveAttribute('autocomplete', 'off');
    expect(inputs[0]).toHaveAttribute('aria-label', 'Character 1 of 6');
    expect(inputs[5]).toHaveAttribute('aria-label', 'Character 6 of 6');
    expect(
      screen.getByRole('group', { name: 'Verification code' })
    ).toHaveClass('mondrian-input-otp');
    inputs.forEach((input) => {
      expect(input).toHaveClass('mondrian-input-otp-cell');
    });
  });

  test('uses the length prop and never renders an empty row', () => {
    const { rerender } = render(<InputOTP id="code" length={4} />);
    expect(cells()).toHaveLength(4);

    rerender(<InputOTP id="code" length={0} />);
    expect(cells()).toHaveLength(1);
  });

  test('typing advances focus and reports the code', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<InputOTP id="code" onChange={onChange} />);

    await user.click(cells()[0]);
    await settle(() => user.keyboard('1'));
    expect(cells()[0]).toHaveValue('1');
    expect(cells()[1]).toHaveFocus();
    expect(onChange).toHaveBeenLastCalledWith('1');

    await settle(() => user.keyboard('2'));
    expect(cells()[1]).toHaveValue('2');
    expect(cells()[2]).toHaveFocus();
    expect(onChange).toHaveBeenLastCalledWith('12');
  });

  test('accepts numbers and letters on the first try', async () => {
    const user = userEvent.setup();
    render(<InputOTP id="code" />);

    await user.click(cells()[0]);
    await settle(() => user.keyboard('12ab'));
    expect(cells().map((cell) => (cell as HTMLInputElement).value)).toEqual([
      '1',
      '2',
      'a',
      'b',
      '',
      '',
    ]);
    expect(cells()[4]).toHaveFocus();
  });

  test('typing in a filled cell replaces its character and moves on', async () => {
    const user = userEvent.setup();
    render(<InputOTP id="code" defaultValue="123" />);

    await user.click(cells()[0]);
    await settle(() => user.keyboard('9'));
    expect(cells()[0]).toHaveValue('9');
    expect(cells()[1]).toHaveValue('2');
    expect(cells()[1]).toHaveFocus();
  });

  test('backspace after typing clears the last character and focuses that cell', async () => {
    const user = userEvent.setup();
    render(<InputOTP id="code" />);

    await user.click(cells()[0]);
    await settle(() => user.keyboard('123'));
    expect(cells()[3]).toHaveFocus();

    await settle(() => user.keyboard('{Backspace}'));
    expect(cells()[2]).toHaveValue('');
    expect(cells()[1]).toHaveValue('2');
    expect(cells()[2]).toHaveFocus();

    await settle(() => user.keyboard('{Backspace}'));
    expect(cells()[1]).toHaveValue('');
    expect(cells()[1]).toHaveFocus();
  });

  test('backspace clears a filled cell, then retreats through empty ones', async () => {
    const user = userEvent.setup();
    render(<InputOTP id="code" defaultValue="12" />);

    await user.click(cells()[1]);
    await settle(() => user.keyboard('{Backspace}'));
    expect(cells()[1]).toHaveValue('');
    expect(cells()[0]).toHaveValue('1');
    expect(cells()[1]).toHaveFocus();

    await settle(() => user.keyboard('{Backspace}'));
    expect(cells()[0]).toHaveValue('');
    expect(cells()[0]).toHaveFocus();
  });

  test('backspace and delete on an empty first cell leave the code alone', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<InputOTP id="code" onChange={onChange} />);

    await user.click(cells()[0]);
    await settle(() => user.keyboard('{Backspace}{Delete}'));
    expect(onChange).not.toHaveBeenCalled();
    expect(cells()[0]).toHaveFocus();
  });

  test('delete clears the focused cell without moving', async () => {
    const user = userEvent.setup();
    render(<InputOTP id="code" defaultValue="12" />);

    await user.click(cells()[0]);
    await settle(() => user.keyboard('{Delete}'));
    expect(cells()[0]).toHaveValue('2');
    expect(cells()[0]).toHaveFocus();
  });

  test('arrow keys, Home, and End move across the row', async () => {
    const user = userEvent.setup();
    render(<InputOTP id="code" length={4} />);

    await user.click(cells()[0]);
    await settle(() => user.keyboard('{ArrowRight}{ArrowRight}'));
    expect(cells()[2]).toHaveFocus();
    await settle(() => user.keyboard('{ArrowLeft}'));
    expect(cells()[1]).toHaveFocus();
    await settle(() => user.keyboard('{End}{ArrowRight}'));
    expect(cells()[3]).toHaveFocus();
    await settle(() => user.keyboard('{Home}'));
    expect(cells()[0]).toHaveFocus();
    await settle(() => user.keyboard('{ArrowLeft}'));
    expect(cells()[0]).toHaveFocus();
  });

  test('ignores a paste that is only whitespace', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<InputOTP id="code" onChange={onChange} />);

    await user.click(cells()[0]);
    await settle(() => user.paste('   '));
    expect(onChange).not.toHaveBeenCalled();
    cells().forEach((cell) => expect(cell).toHaveValue(''));
  });

  test('accepts a function ref on the first cell', () => {
    const ref = jest.fn();
    render(<InputOTP ref={ref} id="code" />);

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    expect(ref.mock.calls[0][0]).toHaveAttribute('id', 'code');
  });

  test('pasting a code fills every cell', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<InputOTP id="code" onChange={onChange} />);

    await user.click(cells()[0]);
    await settle(() => user.paste('123 456'));
    cells().forEach((cell, index) => {
      expect(cell).toHaveValue(String(index + 1));
    });
    expect(onChange).toHaveBeenLastCalledWith('123456');
    expect(cells()[5]).toHaveFocus();
  });

  test('pasting past the end keeps only the remaining cells', async () => {
    const user = userEvent.setup();
    render(<InputOTP id="code" length={4} defaultValue="1" />);

    await user.click(cells()[1]);
    await settle(() => user.paste('234567'));
    expect(cells().map((cell) => (cell as HTMLInputElement).value)).toEqual([
      '1',
      '2',
      '3',
      '4',
    ]);
  });

  test('follows a controlled value', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { rerender } = render(
      <InputOTP id="code" value="99" onChange={onChange} />
    );

    expect(cells()[0]).toHaveValue('9');
    expect(cells()[1]).toHaveValue('9');
    await user.click(cells()[2]);
    await settle(() => user.keyboard('1'));
    expect(onChange).toHaveBeenCalledWith('991');
    expect(cells()[2]).toHaveValue('');

    rerender(<InputOTP id="code" value="991" onChange={onChange} />);
    expect(cells()[2]).toHaveValue('1');
  });

  test('submits the whole code through one named field', () => {
    render(<InputOTP id="code" name="otp" defaultValue="123456" />);

    const hidden = document.querySelector('input[type="hidden"]');
    expect(hidden).toHaveAttribute('name', 'otp');
    expect(hidden).toHaveAttribute('value', '123456');
    expect(cells()).toHaveLength(6);
  });

  test('applies the library size scale', () => {
    const { container, rerender } = render(<InputOTP id="code" size="sm" />);
    expect(container.firstElementChild).toHaveClass('mondrian-input-otp-sm');

    rerender(<InputOTP id="code" size="default" />);
    expect(container.firstElementChild).not.toHaveClass(
      'mondrian-input-otp-sm'
    );
    expect(container.firstElementChild).not.toHaveClass(
      'mondrian-input-otp-lg'
    );

    rerender(<InputOTP id="code" size="lg" />);
    expect(container.firstElementChild).toHaveClass('mondrian-input-otp-lg');
  });

  test('marks the row and every cell invalid and disabled', () => {
    render(
      <InputOTP
        id="code"
        aria-label="Verification code"
        aria-invalid
        disabled
      />
    );

    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(group).toHaveAttribute('aria-disabled', 'true');
    cells().forEach((cell) => {
      expect(cell).toBeDisabled();
      expect(cell).toHaveAttribute('aria-invalid', 'true');
    });
  });

  test('does not expose className', () => {
    const { container } = render(
      <InputOTP
        id="code"
        {...({ className: 'leaked' } as Record<string, string>)}
      />
    );

    expect(container.firstElementChild).toHaveClass('mondrian-input-otp');
    expect(container.firstElementChild).not.toHaveClass('leaked');
  });
});
