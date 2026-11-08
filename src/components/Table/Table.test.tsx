import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './index';

beforeAll(() => {
  if (!('ResizeObserver' in globalThis)) {
    (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver =
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      };
  }
});

const renderTable = () =>
  render(
    <Table aria-label="Totals">
      <TableCaption>Caption</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Row</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Foot</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );

describe('Table', () => {
  test('renders native table elements with mondrian classes', () => {
    renderTable();

    const table = screen.getByRole('table', { name: 'Totals' });
    expect(table.tagName).toBe('TABLE');
    expect(table).toHaveClass('mondrian-table');
    expect(screen.getByText('Caption').tagName).toBe('CAPTION');
    expect(screen.getByText('Caption')).toHaveClass('mondrian-table-caption');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(
      'mondrian-table-head'
    );
    expect(screen.getByRole('cell', { name: 'Row' })).toHaveClass(
      'mondrian-table-cell'
    );
    expect(table.querySelector('thead')).toHaveClass('mondrian-table-header');
    expect(table.querySelector('tbody')).toHaveClass('mondrian-table-body');
    expect(table.querySelector('tfoot')).toHaveClass('mondrian-table-footer');
    expect(table.querySelector('tr')).toHaveClass('mondrian-table-row');
  });

  test('wraps the table in a ScrollArea for horizontal scroll', () => {
    renderTable();

    const table = screen.getByRole('table');
    expect(table.closest('.mondrian-scroll-area')).not.toBeNull();
  });

  test('forwards refs', () => {
    const ref = React.createRef<HTMLTableElement>();
    const cellRef = React.createRef<HTMLTableCellElement>();
    render(
      <Table ref={ref}>
        <TableBody>
          <TableRow>
            <TableCell ref={cellRef}>x</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(ref.current?.tagName).toBe('TABLE');
    expect(cellRef.current?.tagName).toBe('TD');
  });

  test('passes through cell attributes', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} id="c">
              x
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const cell = screen.getByRole('cell');
    expect(cell).toHaveAttribute('colspan', '2');
    expect(cell).toHaveAttribute('id', 'c');
  });

  test.each(['blue', 'neutral', 'red', 'yellow'] as const)(
    'applies the %s theme class',
    (theme) => {
      render(
        <Table theme={theme} aria-label="T">
          <TableBody>
            <TableRow>
              <TableCell>x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByRole('table')).toHaveClass(`mondrian-table-${theme}`);
    }
  );

  test('defaults to blue and keeps th scope and caption', () => {
    render(
      <Table>
        <TableCaption>Cap</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
    expect(screen.getByRole('table')).toHaveClass('mondrian-table-blue');
    expect(screen.getByRole('columnheader')).toHaveAttribute('scope', 'col');
    expect(screen.getByText('Cap').tagName).toBe('CAPTION');
  });
});
