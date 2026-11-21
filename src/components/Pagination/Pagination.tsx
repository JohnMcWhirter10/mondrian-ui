import * as React from 'react';
import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
import { MondrianLeftArrow, MondrianRightArrow } from '../icons';
import { PaginationProps } from './Pagination.types';
import './Pagination.css';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

const MAX_SHOWN = 7; // first, last, current, one neighbour each side, two ellipses
const EDGE_RUN = 5; // pages shown next to the near edge before its ellipsis
const EDGE_GAP = 3; // an ellipsis must hide at least two pages, so stay this close to the edge

/** First and last page always show; the current page keeps one neighbour each side. */
function getPageItems(page: number, pageCount: number): PageItem[] {
  if (pageCount <= MAX_SHOWN) return range(1, pageCount);

  const left = Math.max(page - 1, 1);
  const right = Math.min(page + 1, pageCount);
  const nearStart = left <= EDGE_GAP;
  const nearEnd = right > pageCount - EDGE_GAP;

  if (nearStart) return [...range(1, EDGE_RUN), 'end-ellipsis', pageCount];
  if (nearEnd) {
    return [1, 'start-ellipsis', ...range(pageCount - EDGE_RUN + 1, pageCount)];
  }
  return [
    1,
    'start-ellipsis',
    ...range(left, right),
    'end-ellipsis',
    pageCount,
  ];
}

export { getPageItems };

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
    const iconSize = size === 'sm' ? 14 : 20;
    const total = Math.max(Math.floor(pageCount), 1);
    const current = Math.min(Math.max(page, 1), total);

    const previous = (
      <Button
        theme="neutral"
        size={size}
        aria-label={isCompact ? 'Previous' : undefined}
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
      >
        {isCompact ? <MondrianLeftArrow size={iconSize} /> : 'Previous'}
      </Button>
    );
    const next = (
      <Button
        theme="neutral"
        size={size}
        aria-label={isCompact ? 'Next' : undefined}
        disabled={current >= total}
        onClick={() => onPageChange(current + 1)}
      >
        {isCompact ? <MondrianRightArrow size={iconSize} /> : 'Next'}
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
            <li className="mondrian-pagination-status">
              <VisuallyHidden>Page </VisuallyHidden>
              {current} of {total}
            </li>
          ) : (
            getPageItems(current, total).map((item) =>
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
