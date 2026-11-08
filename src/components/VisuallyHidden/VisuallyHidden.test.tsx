import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from './VisuallyHidden';
import { Button } from '../Button/Button';

describe('VisuallyHidden', () => {
  test('keeps its text in the accessibility tree', () => {
    render(
      <Button>
        <VisuallyHidden>Close</VisuallyHidden>
      </Button>
    );
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  test('is clipped to a one pixel box', () => {
    render(<VisuallyHidden>Hidden</VisuallyHidden>);
    const el = screen.getByText('Hidden');
    expect(el).toHaveStyle({
      position: 'absolute',
      width: '1px',
      height: '1px',
    });
  });

  test('forwards its ref', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<VisuallyHidden ref={ref}>Text</VisuallyHidden>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
