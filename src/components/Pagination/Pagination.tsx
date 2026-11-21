import * as React from 'react';
import { Button } from '../Button';
import { PaginationProps } from './Pagination.types';
import './Pagination.css';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

/** First and last page always show; the current page keeps its neighbours. */
export function getPageItems(
  page: number,
  pageCount: number,
  siblingCount: number
): PageItem[] {
  const total = Math.max(0, Math.floor(pageCount));
  const siblings = Math.max(0, Math.floor(siblingCount));
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
      siblingCount = 1,
      theme = 'red',
      'aria-label': ariaLabel = 'Pagination',
      ...props
    },
    ref
  ) => {
    const current = Math.min(Math.max(page, 1), Math.max(pageCount, 1));

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className="mondrian-pagination"
        {...props}
      >
        <ul className="mondrian-pagination-list">
          <li>
            <Button
              theme="neutral"
              disabled={current <= 1}
              onClick={() => onPageChange(current - 1)}
            >
              Previous
            </Button>
          </li>
          {getPageItems(current, pageCount, siblingCount).map((item) =>
            typeof item === 'number' ? (
              <li key={item}>
                <Button
                  theme={item === current ? theme : 'neutral'}
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
          )}
          <li>
            <Button
              theme="neutral"
              disabled={current >= pageCount}
              onClick={() => onPageChange(current + 1)}
            >
              Next
            </Button>
          </li>
        </ul>
      </nav>
    );
  }
);
Pagination.displayName = 'Pagination';

export { Pagination };
