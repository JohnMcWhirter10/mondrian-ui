import { render, screen, fireEvent } from '@testing-library/react';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Slider } from './index';

describe('Slider', () => {
  test('renders one slider thumb with value and bounds', () => {
    render(<Slider defaultValue={[30]} aria-label="Volume" />);

    const thumb = screen.getByRole('slider');
    expect(thumb).toHaveAttribute('aria-valuenow', '30');
    expect(thumb).toHaveAttribute('aria-valuemin', '0');
    expect(thumb).toHaveAttribute('aria-valuemax', '100');
    expect(thumb).toHaveClass('mondrian-slider-thumb');
  });

  test('a single thumb takes the accessible name', () => {
    render(<Slider defaultValue={[30]} aria-label="Volume" />);
    expect(screen.getByRole('slider', { name: 'Volume' })).toBeInTheDocument();
  });

  test('renders two thumbs for a range', () => {
    render(<Slider defaultValue={[20, 60]} />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  test('arrow keys change the value by step and report it', () => {
    const onValueChange = jest.fn();
    render(
      <Slider defaultValue={[10]} step={5} onValueChange={onValueChange} />
    );

    const thumb = screen.getByRole('slider');
    thumb.focus();
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    expect(onValueChange).toHaveBeenCalledWith([15]);
    expect(thumb).toHaveAttribute('aria-valuenow', '15');
  });

  test('Home and End jump to the bounds', () => {
    render(<Slider defaultValue={[50]} min={10} max={90} />);

    const thumb = screen.getByRole('slider');
    thumb.focus();
    fireEvent.keyDown(thumb, { key: 'End' });
    expect(thumb).toHaveAttribute('aria-valuenow', '90');
    fireEvent.keyDown(thumb, { key: 'Home' });
    expect(thumb).toHaveAttribute('aria-valuenow', '10');
  });

  test('supports vertical orientation', () => {
    render(<Slider defaultValue={[50]} orientation="vertical" />);

    expect(screen.getByRole('slider')).toHaveAttribute(
      'aria-orientation',
      'vertical'
    );
  });

  test('disabled marks the root and ignores keys', () => {
    const { container } = render(<Slider defaultValue={[50]} disabled />);

    expect(container.firstChild).toHaveAttribute('data-disabled');
    const thumb = screen.getByRole('slider');
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    expect(thumb).toHaveAttribute('aria-valuenow', '50');
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    render: (theme) => <Slider theme={theme} defaultValue={[10]} />,
    classFor: (theme) => `mondrian-slider-${theme}`,
    defaultTheme: 'red',
  });

  itForwardsRef<HTMLSpanElement>({
    render: (ref) => <Slider ref={ref} defaultValue={[10]} />,
    tagName: 'SPAN',
    className: 'mondrian-slider',
  });

  itPassesThroughAttributes({
    render: (props) => <Slider defaultValue={[10]} {...props} />,
  });
});
