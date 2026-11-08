import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Grid, GridItem } from './index';

describe('Grid', () => {
  test('renders a grid with 12 equal columns and no gap by default', () => {
    render(<Grid data-testid="grid">content</Grid>);

    const grid = screen.getByTestId('grid');
    expect(grid.tagName).toBe('DIV');
    expect(grid).toHaveClass('mondrian-grid');
    expect(grid).toHaveClass('mondrian-grid-gap-none');
    expect(grid.style.gridTemplateColumns).toBe('repeat(12, minmax(0, 1fr))');
  });

  test('applies numeric and string columns', () => {
    const { rerender } = render(<Grid data-testid="grid" columns={3} />);
    expect(screen.getByTestId('grid').style.gridTemplateColumns).toBe(
      'repeat(3, minmax(0, 1fr))'
    );

    rerender(<Grid data-testid="grid" columns="2fr 1fr" />);
    expect(screen.getByTestId('grid').style.gridTemplateColumns).toBe(
      '2fr 1fr'
    );
  });

  test('applies gap classes', () => {
    const { rerender } = render(<Grid data-testid="grid" gap="small" />);
    expect(screen.getByTestId('grid')).toHaveClass('mondrian-grid-gap-small');

    rerender(<Grid data-testid="grid" gap="large" />);
    expect(screen.getByTestId('grid')).toHaveClass('mondrian-grid-gap-large');
  });

  test('GridItem spans columns and rows', () => {
    render(
      <GridItem data-testid="item" span={3} rowSpan={2}>
        x
      </GridItem>
    );

    const item = screen.getByTestId('item');
    expect(item).toHaveClass('mondrian-grid-item');
    expect(item.style.gridColumn).toBe('span 3 / span 3');
    expect(item.style.gridRow).toBe('span 2 / span 2');
  });

  test('GridItem has no span styles by default', () => {
    render(<GridItem data-testid="item">x</GridItem>);
    expect(screen.getByTestId('item').style.gridColumn).toBe('');
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => <Grid ref={ref} />,
    tagName: 'DIV',
    className: 'mondrian-grid',
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => <GridItem ref={ref}>x</GridItem>,
    tagName: 'DIV',
    className: 'mondrian-grid-item',
  });

  itPassesThroughAttributes({
    render: (props) => <Grid {...props} />,
  });

  test('lines are off by default and theme defaults to neutral', () => {
    render(<Grid data-testid="grid" />);
    const grid = screen.getByTestId('grid');
    expect(grid).not.toHaveClass('mondrian-grid-lines');
    expect(grid).toHaveClass('mondrian-grid-neutral');
  });

  test('lines prop adds the lines class', () => {
    render(<Grid data-testid="grid" lines />);
    expect(screen.getByTestId('grid')).toHaveClass('mondrian-grid-lines');
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    defaultTheme: 'neutral',
    render: (theme) => <Grid theme={theme} />,
    classFor: (theme) => `mondrian-grid-${theme}`,
  });
});
