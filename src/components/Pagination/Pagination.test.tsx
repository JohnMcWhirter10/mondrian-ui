import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { itForwardsRef, itPassesThroughAttributes } from '../../test-utils';
import { Pagination, getPageItems } from './Pagination';

describe('getPageItems', () => {
  it('lists every page when the range is short', () => {
    expect(getPageItems(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPageItems(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('collapses the end when near the start', () => {
    expect(getPageItems(1, 20)).toEqual([1, 2, 3, 4, 5, 'end-ellipsis', 20]);
  });

  it('collapses the start when near the end', () => {
    expect(getPageItems(20, 20)).toEqual([
      1,
      'start-ellipsis',
      16,
      17,
      18,
      19,
      20,
    ]);
  });

  it('collapses both sides in the middle', () => {
    expect(getPageItems(10, 20)).toEqual([
      1,
      'start-ellipsis',
      9,
      10,
      11,
      'end-ellipsis',
      20,
    ]);
  });

  it('returns nothing for zero pages', () => {
    expect(getPageItems(1, 0)).toEqual([]);
  });
});

describe('Pagination', () => {
  it('renders a labelled navigation landmark', () => {
    render(<Pagination page={1} pageCount={3} onPageChange={() => {}} />);
    expect(
      screen.getByRole('navigation', { name: 'Pagination' })
    ).toBeInTheDocument();
  });

  it('allows a custom label', () => {
    render(
      <Pagination
        aria-label="Results"
        page={1}
        pageCount={3}
        onPageChange={() => {}}
      />
    );
    expect(
      screen.getByRole('navigation', { name: 'Results' })
    ).toBeInTheDocument();
  });

  it('marks the current page with aria-current', () => {
    render(<Pagination page={2} pageCount={3} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('button', { name: 'Page 1' })).not.toHaveAttribute(
      'aria-current'
    );
  });

  it('disables Previous on the first page', () => {
    render(<Pagination page={1} pageCount={3} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  it('disables Next on the last page', () => {
    render(<Pagination page={3} pageCount={3} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled();
  });

  it('calls onPageChange for previous, next and numbered buttons', async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(<Pagination page={2} pageCount={5} onPageChange={onPageChange} />);
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onPageChange).toHaveBeenLastCalledWith(1);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);
    await user.click(screen.getByRole('button', { name: 'Page 5' }));
    expect(onPageChange).toHaveBeenLastCalledWith(5);
  });

  it('collapses long ranges with a hidden ellipsis', () => {
    const { container } = render(
      <Pagination page={10} pageCount={20} onPageChange={() => {}} />
    );
    expect(
      container.querySelectorAll('.mondrian-pagination-ellipsis')
    ).toHaveLength(2);
    expect(screen.queryByRole('button', { name: 'Page 5' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Page 20' })).toBeInTheDocument();
  });

  it('keeps the current page within range', () => {
    render(<Pagination page={99} pageCount={3} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('colours only the current page', () => {
    render(
      <Pagination page={2} pageCount={3} theme="blue" onPageChange={() => {}} />
    );
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveClass(
      'mondrian-button-blue'
    );
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveClass(
      'mondrian-button-neutral'
    );
  });

  it('passes size to the buttons and the nav', () => {
    const { container } = render(
      <Pagination page={1} pageCount={3} size="sm" onPageChange={() => {}} />
    );
    expect(container.firstElementChild).toHaveClass('mondrian-pagination-sm');
    screen
      .getAllByRole('button')
      .forEach((b) => expect(b).toHaveClass('mondrian-button-sm'));
  });

  it('keeps words for Previous and Next at sm', () => {
    render(
      <Pagination page={2} pageCount={3} size="sm" onPageChange={() => {}} />
    );
    expect(screen.getByRole('button', { name: 'Previous' })).toHaveTextContent(
      'Previous'
    );
  });

  it('handles an empty page count without crashing', () => {
    render(<Pagination page={1} pageCount={0} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('has no size class by default', () => {
    const { container } = render(
      <Pagination page={1} pageCount={3} onPageChange={() => {}} />
    );
    expect(container.firstElementChild?.className).toBe('mondrian-pagination');
  });

  describe('compact variant', () => {
    it('shows the position instead of page buttons', () => {
      render(
        <Pagination
          variant="compact"
          page={3}
          pageCount={12}
          onPageChange={() => {}}
        />
      );
      expect(screen.getByRole('navigation')).toHaveTextContent('Page 3 of 12');
      expect(screen.queryByRole('button', { name: 'Page 3' })).toBeNull();
    });

    it('still pages with previous and next and disables at the ends', async () => {
      const user = userEvent.setup();
      const onPageChange = jest.fn();
      const { rerender } = render(
        <Pagination
          variant="compact"
          page={1}
          pageCount={3}
          onPageChange={onPageChange}
        />
      );
      expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
      await user.click(screen.getByRole('button', { name: 'Next' }));
      expect(onPageChange).toHaveBeenCalledWith(2);
      rerender(
        <Pagination
          variant="compact"
          page={3}
          pageCount={3}
          onPageChange={onPageChange}
        />
      );
      expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });
  });

  itForwardsRef<HTMLElement>({
    render: (ref) => (
      <Pagination ref={ref} page={1} pageCount={2} onPageChange={() => {}} />
    ),
    tagName: 'NAV',
    className: 'mondrian-pagination',
  });

  itPassesThroughAttributes({
    render: (attributes) => (
      <Pagination
        page={1}
        pageCount={2}
        onPageChange={() => {}}
        {...attributes}
      />
    ),
  });
});
