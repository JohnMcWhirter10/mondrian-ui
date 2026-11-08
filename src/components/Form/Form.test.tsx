import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';
import { Input } from '../Input/Input';
import { Label } from '../Label/Label';
import { Button } from '../Button/Button';

describe('Form', () => {
  test('renders a native form with the Mondrian class', () => {
    render(<Form aria-label="Contact" />);
    const form = screen.getByRole('form', { name: 'Contact' });
    expect(form.tagName).toBe('FORM');
    expect(form).toHaveClass('mondrian-form');
  });

  test('a submit button submits it', () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    render(
      <Form onSubmit={onSubmit}>
        <Label htmlFor="email">Email</Label>
        <Input id="email" />
        <Button type="submit">Send</Button>
      </Form>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('a button outside the form submits it through the form attribute', () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    render(
      <>
        <Form id="outer" onSubmit={onSubmit} />
        <Button type="submit" form="outer">
          Send
        </Button>
      </>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('does not accept className in its public type', () => {
    // @ts-expect-error className is not part of FormProps
    render(<Form className="x" aria-label="No class" />);
    expect(screen.getByRole('form')).toHaveClass('mondrian-form');
  });

  test('forwards its ref', () => {
    const ref = { current: null as HTMLFormElement | null };
    render(<Form ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLFormElement);
  });
});
