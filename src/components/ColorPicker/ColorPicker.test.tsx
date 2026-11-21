import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { itForwardsRef, itPassesThroughAttributes } from '../../test-utils';
import {
  MONDRIAN_BLACK,
  MONDRIAN_BLUE,
  MONDRIAN_RED,
  MONDRIAN_WHITE,
  MONDRIAN_YELLOW,
} from '../../utils/colorUtils';
import { ColorPicker } from './index';

describe('ColorPicker', () => {
  test('renders one named radio per plane, primary first', () => {
    render(<ColorPicker aria-label="Plane" />);

    expect(
      screen.getAllByRole('radio').map((r) => r.getAttribute('aria-label'))
    ).toEqual(['Red', 'Blue', 'Yellow', 'Black', 'White']);
    expect(screen.getByRole('radiogroup')).toHaveAccessibleName('Plane');
  });

  test('only the primary colour gets the large cell', () => {
    render(<ColorPicker primary="blue" />);

    const large = document.querySelectorAll(
      '.mondrian-color-picker-item-primary'
    );
    expect(large).toHaveLength(1);
    expect(large[0]).toHaveAttribute('aria-label', 'Blue');
    expect(screen.getAllByRole('radio')[0]).toBe(large[0]);
  });

  test('selects a colour and reports its name', () => {
    const onValueChange = jest.fn();
    render(<ColorPicker onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole('radio', { name: 'Yellow' }));
    expect(onValueChange).toHaveBeenCalledWith('yellow');
    expect(screen.getByRole('radio', { name: 'Yellow' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Red' })).not.toBeChecked();
  });

  test('shows a glyph on the selected swatch only', () => {
    render(<ColorPicker defaultValue="black" />);

    const selected = screen.getByRole('radio', { name: 'Black' });
    expect(selected.querySelector('svg')).not.toBeNull();
    expect(
      screen.getByRole('radio', { name: 'Red' }).querySelector('svg')
    ).toBeNull();
  });

  test('arrow keys move focus to the next swatch', async () => {
    const user = userEvent.setup();
    render(<ColorPicker defaultValue="red" />);

    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Blue' })).toHaveFocus();
  });

  test('disabled blocks selection', () => {
    const onValueChange = jest.fn();
    render(<ColorPicker disabled onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole('radio', { name: 'Red' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  test('palette constants match the issue', () => {
    expect([
      MONDRIAN_RED,
      MONDRIAN_BLUE,
      MONDRIAN_YELLOW,
      MONDRIAN_BLACK,
      MONDRIAN_WHITE,
    ]).toEqual(['#D42029', '#0D47A1', '#FFDE03', '#000000', '#FFFFFF']);
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => <ColorPicker ref={ref} />,
    tagName: 'DIV',
    className: 'mondrian-color-picker',
  });

  itPassesThroughAttributes({
    render: (props) => <ColorPicker {...props} />,
  });
});
