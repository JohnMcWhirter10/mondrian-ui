import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { PasswordInput } from './index';

describe('PasswordInput', () => {
  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    defaultTheme: 'neutral',
    render: (theme) => (
      <PasswordInput id="pw" theme={theme} aria-label="Password" />
    ),
    classFor: (theme) => `mondrian-password-input-${theme}`,
  });

  itForwardsRef<HTMLInputElement>({
    render: (ref) => <PasswordInput ref={ref} id="pw" aria-label="Password" />,
    tagName: 'INPUT',
    className: 'mondrian-password-input-field',
  });

  itPassesThroughAttributes({
    render: (props) => <PasswordInput id="pw" {...props} />,
    target: ({ getByLabelText }) => getByLabelText('contract label'),
    attributes: { 'aria-label': 'contract label', name: 'password' },
  });

  test('hides the value until the button reveals it', async () => {
    const user = userEvent.setup();
    const onVisibleChange = jest.fn();
    render(
      <PasswordInput
        id="pw"
        aria-label="Password"
        onVisibleChange={onVisibleChange}
      />
    );

    const field = screen.getByLabelText('Password');
    const button = screen.getByRole('button', { name: 'Show password' });
    expect(field).toHaveAttribute('type', 'password');
    expect(field).toHaveAttribute('id', 'pw');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAttribute('aria-controls', 'pw');

    await user.type(field, 'secret');
    expect(field).toHaveValue('secret');

    await act(async () => {
      await user.click(button);
    });
    expect(field).toHaveAttribute('type', 'text');
    expect(field).toHaveFocus();
    expect(
      screen.getByRole('button', { name: 'Hide password' })
    ).toHaveAttribute('aria-pressed', 'true');
    expect(onVisibleChange).toHaveBeenCalledWith(true);

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Hide password' }));
    });
    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password'
    );
    expect(onVisibleChange).toHaveBeenLastCalledWith(false);
  });

  test('follows a controlled visible prop', async () => {
    const user = userEvent.setup();
    const onVisibleChange = jest.fn();
    const { rerender } = render(
      <PasswordInput
        id="pw"
        aria-label="Password"
        visible={false}
        onVisibleChange={onVisibleChange}
      />
    );

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Show password' }));
    });
    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password'
    );
    expect(onVisibleChange).toHaveBeenCalledWith(true);

    rerender(
      <PasswordInput
        id="pw"
        aria-label="Password"
        visible
        onVisibleChange={onVisibleChange}
      />
    );
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
    expect(
      screen.getByRole('button', { name: 'Hide password' })
    ).toBeInTheDocument();
  });

  test('starts revealed when defaultVisible is set', () => {
    render(<PasswordInput id="pw" aria-label="Password" defaultVisible />);

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
    expect(
      screen.getByRole('button', { name: 'Hide password' })
    ).toHaveAttribute('aria-pressed', 'true');
  });

  test('applies the library size scale on the shared rectangle', () => {
    const { container, rerender } = render(
      <PasswordInput id="pw" size="sm" aria-label="Password" />
    );
    expect(container.firstElementChild).toHaveClass(
      'mondrian-password-input-sm'
    );

    rerender(<PasswordInput id="pw" size="default" aria-label="Password" />);
    expect(container.firstElementChild).not.toHaveClass(
      'mondrian-password-input-sm'
    );
    expect(container.firstElementChild).not.toHaveClass(
      'mondrian-password-input-lg'
    );

    rerender(<PasswordInput id="pw" size="lg" aria-label="Password" />);
    expect(container.firstElementChild).toHaveClass(
      'mondrian-password-input-lg'
    );
  });

  test('exposes aria-invalid on the field', () => {
    render(<PasswordInput id="pw" aria-label="Password" aria-invalid />);

    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  test('disables the field and the button together', () => {
    render(<PasswordInput id="pw" aria-label="Password" disabled />);

    expect(screen.getByLabelText('Password')).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Show password' })
    ).toBeDisabled();
  });

  test('does not expose className', () => {
    render(
      <PasswordInput
        id="pw"
        aria-label="Password"
        {...({ className: 'leaked' } as Record<string, string>)}
      />
    );

    const field = screen.getByLabelText('Password');
    expect(field).toHaveClass('mondrian-password-input-field');
    expect(field).not.toHaveClass('leaked');
    expect(field.parentElement).not.toHaveClass('leaked');
  });
});
