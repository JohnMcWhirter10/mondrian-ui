import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Kbd } from './index';

describe('Kbd', () => {
  test('renders a native kbd element', () => {
    render(<Kbd>Ctrl</Kbd>);
    const key = screen.getByText('Ctrl');
    expect(key.tagName).toBe('KBD');
    expect(key).toHaveClass('mondrian-kbd');
  });

  test('renders keys side by side', () => {
    render(
      <>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </>
    );
    expect(document.querySelectorAll('kbd')).toHaveLength(2);
  });

  test('forwards a ref to the kbd', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Kbd ref={ref}>Esc</Kbd>);
    expect(ref.current?.tagName).toBe('KBD');
  });

  test('passes through id and aria attributes', () => {
    render(
      <Kbd id="k" aria-label="Escape key">
        Esc
      </Kbd>
    );
    const key = screen.getByLabelText('Escape key');
    expect(key).toHaveAttribute('id', 'k');
  });
});
