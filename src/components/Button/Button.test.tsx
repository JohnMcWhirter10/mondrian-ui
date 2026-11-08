import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Button } from './Button';

describe('Button Component', () => {
  const renderButton = (props = {}) => {
    render(<Button {...props} />);
  };

  test('handles button click', async () => {
    const handleClick = jest.fn();
    renderButton({ children: 'Clickable Button', onClick: handleClick });

    const button = screen.getByRole('button', { name: /clickable button/i });
    userEvent.click(button);

    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  test('keeps aria-pressed and real disabled', () => {
    render(
      <>
        <Button aria-pressed="true">On</Button>
        <Button disabled>Off</Button>
      </>
    );
    expect(screen.getByRole('button', { name: 'On' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Off' })).toBeDisabled();
  });

  test('size classes', () => {
    render(
      <>
        <Button size="sm">S</Button>
        <Button size="lg">L</Button>
      </>
    );
    expect(screen.getByText('S')).toHaveClass('mondrian-button-sm');
    expect(screen.getByText('L')).toHaveClass('mondrian-button-lg');
  });
  itForwardsRef<HTMLButtonElement>({
    render: (ref) => <Button ref={ref}>Ref</Button>,
    tagName: 'BUTTON',
  });

  itPassesThroughAttributes({
    render: (props) => <Button {...props}>Label</Button>,
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    defaultTheme: 'blue',
    render: (theme) => <Button theme={theme}>Themed</Button>,
    classFor: (theme) => `mondrian-button-${theme}`,
  });
});
