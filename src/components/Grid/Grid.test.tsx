import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

  test('forwards refs', () => {
    const gridRef = React.createRef<HTMLDivElement>();
    const itemRef = React.createRef<HTMLDivElement>();
    render(
      <Grid ref={gridRef}>
        <GridItem ref={itemRef}>x</GridItem>
      </Grid>
    );

    expect(gridRef.current).toHaveClass('mondrian-grid');
    expect(itemRef.current).toHaveClass('mondrian-grid-item');
  });

  test('passes through id and aria attributes', () => {
    render(<Grid id="g" aria-label="Layout" />);
    expect(screen.getByLabelText('Layout')).toHaveAttribute('id', 'g');
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

  test.each(['blue', 'neutral', 'red', 'yellow'] as const)(
    'applies the %s theme class',
    (theme) => {
      render(<Grid data-testid="grid" theme={theme} />);
      expect(screen.getByTestId('grid')).toHaveClass(`mondrian-grid-${theme}`);
    }
  );
});
