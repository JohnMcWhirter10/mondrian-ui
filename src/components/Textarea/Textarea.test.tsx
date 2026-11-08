import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Textarea } from './index';

describe('Textarea', () => {
  test('renders a textarea on the default noncolor plane', () => {
    render(<Textarea placeholder="Your message" />);

    const textarea = screen.getByPlaceholderText('Your message');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveClass('mondrian-textarea');
    expect(textarea).toHaveClass('mondrian-textarea-blue');
    expect(textarea).not.toHaveClass('mondrian-textarea-sm');
    expect(textarea).not.toHaveClass('mondrian-textarea-lg');
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    defaultTheme: 'blue',
    render: (theme) => <Textarea theme={theme} aria-label="Message" />,
    classFor: (theme) => `mondrian-textarea-${theme}`,
  });

  test('applies the library size scale', () => {
    const { rerender } = render(<Textarea size="sm" aria-label="Message" />);
    expect(screen.getByLabelText('Message')).toHaveClass(
      'mondrian-textarea-sm'
    );

    rerender(<Textarea size="default" aria-label="Message" />);
    const field = screen.getByLabelText('Message');
    expect(field).toHaveClass('mondrian-textarea');
    expect(field).not.toHaveClass('mondrian-textarea-sm');
    expect(field).not.toHaveClass('mondrian-textarea-lg');

    rerender(<Textarea size="lg" aria-label="Message" />);
    expect(screen.getByLabelText('Message')).toHaveClass(
      'mondrian-textarea-lg'
    );
  });

  test('passes rows through to the native element', () => {
    render(<Textarea rows={6} aria-label="Message" />);

    expect(screen.getByLabelText('Message')).toHaveAttribute('rows', '6');
  });

  itForwardsRef<HTMLTextAreaElement>({
    render: (ref) => <Textarea ref={ref} aria-label="Message" />,
    tagName: 'TEXTAREA',
    className: 'mondrian-textarea',
  });

  itPassesThroughAttributes({
    render: (props) => <Textarea {...props} />,
    attributes: {
      id: 'contract-id',
      'aria-label': 'contract label',
      'aria-invalid': 'true',
    },
  });

  test('passes through id, name, and disabled', () => {
    render(
      <Textarea id="message" name="message" disabled aria-label="Message" />
    );

    const textarea = screen.getByLabelText('Message');
    expect(textarea).toHaveAttribute('id', 'message');
    expect(textarea).toHaveAttribute('name', 'message');
    expect(textarea).toBeDisabled();
  });

  test('accepts typed text', async () => {
    render(<Textarea aria-label="Message" />);

    const textarea = screen.getByLabelText('Message');
    await userEvent.type(textarea, 'A paragraph');

    expect(textarea).toHaveValue('A paragraph');
  });

  test('does not expose className', () => {
    render(
      <Textarea
        aria-label="Message"
        {...({ className: 'x' } as Record<string, string>)}
      />
    );

    expect(screen.getByLabelText('Message')).not.toHaveClass('x');
  });
});
