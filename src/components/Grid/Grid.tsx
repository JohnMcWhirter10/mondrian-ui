import * as React from 'react';
import { GridItemProps, GridProps } from './Grid.types';
import './Grid.css';

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      columns = 12,
      gap = 'none',
      lines = false,
      theme = 'neutral',
      style,
      ...props
    },
    ref
  ) => {
    const gridClassName = [
      'mondrian-grid',
      `mondrian-grid-gap-${gap}`,
      `mondrian-grid-${theme}`,
      lines ? 'mondrian-grid-lines' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const gridStyle: React.CSSProperties = {
      gridTemplateColumns:
        typeof columns === 'number'
          ? `repeat(${columns}, minmax(0, 1fr))`
          : columns,
      ...style,
    };

    return (
      <div ref={ref} className={gridClassName} style={gridStyle} {...props}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ children, span, rowSpan, style, ...props }, ref) => {
    const itemStyle: React.CSSProperties = {
      ...(span ? { gridColumn: `span ${span} / span ${span}` } : {}),
      ...(rowSpan ? { gridRow: `span ${rowSpan} / span ${rowSpan}` } : {}),
      ...style,
    };

    return (
      <div
        ref={ref}
        className="mondrian-grid-item"
        style={itemStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';

export { Grid, GridItem };
