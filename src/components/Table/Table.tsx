import * as React from 'react';
import { ScrollArea } from '../ScrollArea';
import {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
} from './Table.types';
import './Table.css';

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ scrollTheme = 'blue', theme = 'blue', ...props }, ref) => (
    <ScrollArea theme={scrollTheme}>
      <table
        ref={ref}
        className={`mondrian-table mondrian-table-${theme}`}
        {...props}
      />
    </ScrollArea>
  )
);

Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  (props, ref) => (
    <thead ref={ref} className="mondrian-table-header" {...props} />
  )
);

TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => <tbody ref={ref} className="mondrian-table-body" {...props} />
);

TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  (props, ref) => (
    <tfoot ref={ref} className="mondrian-table-footer" {...props} />
  )
);

TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (props, ref) => <tr ref={ref} className="mondrian-table-row" {...props} />
);

TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (props, ref) => <th ref={ref} className="mondrian-table-head" {...props} />
);

TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (props, ref) => <td ref={ref} className="mondrian-table-cell" {...props} />
);

TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>((props, ref) => (
  <caption ref={ref} className="mondrian-table-caption" {...props} />
));

TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
