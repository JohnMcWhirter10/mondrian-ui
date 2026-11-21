import * as React from 'react';
import { Button } from '../Button';
import { MondrianLeftArrow, MondrianRightArrow } from '../icons';
import { PaginationProps } from './Pagination.types';
import './Pagination.css';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

/** First and last page always show; the current page keeps one neighbour each side. */
export function getPageItems(page: number, pageCount: number): PageItem[] {
  const total = Math.max(0, Math.floor(pageCount));
  const siblings = 1;
  // first, last, current, two ellipses, and the siblings on both sides
  const slots = siblings * 2 + 5;
  if (total <= slots) return range(1, total);

  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, total);
  const showStart = left > 3;
  const showEnd = right < total - 2;
  const edge = siblings * 2 + 3;

  if (!showStart) return [...range(1, edge), 'end-ellipsis', total];
  if (!showEnd) return [1, 'start-ellipsis', ...range(total - edge + 1, total)];
  return [1, 'start-ellipsis', ...range(left, right), 'end-ellipsis', total];
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      pageCount,
      onPageChange,
      variant = 'pages',
      theme = 'red',
      size = 'default',
      'aria-label': ariaLabel = 'Pagination',
      ...props
    },
    ref
  ) => {
    const isCompact = variant === 'compact';
    // Arrow icons instead of words wherever space is tight.
    const iconOnly = size === 'sm' || isCompact;
    const iconSize = size === 'sm' ? 14 : 20;
    const total = Math.max(pageCount, 1);
    const current = Math.min(Math.max(page, 1), total);

    const previous = (
      <Button
        theme="neutral"
        size={size}
        aria-label="Previous"
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
      >
        {iconOnly ? <MondrianLeftArrow size={iconSize} /> : 'Previous'}
      </Button>
    );
    const next = (
      <Button
        theme="neutral"
        size={size}
        aria-label="Next"
        disabled={current >= total}
        onClick={() => onPageChange(current + 1)}
      >
        {iconOnly ? <MondrianRightArrow size={iconSize} /> : 'Next'}
      </Button>
    );

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={[
          'mondrian-pagination',
          size === 'sm' ? 'mondrian-pagination-sm' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        <ul className="mondrian-pagination-list">
          <li>{previous}</li>
          {isCompact ? (
            <li className="mondrian-pagination-status" aria-current="page">
              {current} of {total}
            </li>
          ) : (
            getPageItems(current, pageCount).map((item) =>
              typeof item === 'number' ? (
                <li key={item}>
                  <Button
                    theme={item === current ? theme : 'neutral'}
                    size={size}
                    aria-current={item === current ? 'page' : undefined}
                    aria-label={`Page ${item}`}
                    onClick={() => onPageChange(item)}
                  >
                    {item}
                  </Button>
                </li>
              ) : (
                <li key={item} className="mondrian-pagination-ellipsis">
                  <span aria-hidden="true">&hellip;</span>
                </li>
              )
            )
          )}
          <li>{next}</li>
        </ul>
      </nav>
    );
  }
);
Pagination.displayName = 'Pagination';

export { Pagination };
