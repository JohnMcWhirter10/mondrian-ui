import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../themes';
import { Pagination } from './Pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../Table';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Previous, next and numbered page buttons built on `Button`. The current page carries `aria-current="page"` and is the one coloured plane. Previous and Next disable at the ends, and long ranges collapse with an ellipsis cell.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['red', 'blue', 'yellow', 'green', 'neutral'],
    },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    page: { control: { type: 'number', min: 1 } },
    pageCount: { control: { type: 'number', min: 1 } },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const Controlled = (args: React.ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(args.page);
  return <Pagination {...args} page={page} onPageChange={setPage} />;
};

export const Default: Story = {
  args: { page: 1, pageCount: 5, onPageChange: () => {} },
  render: (args) => <Controlled {...args} />,
};

export const LongRange: Story = {
  args: { page: 10, pageCount: 20, onPageChange: () => {} },
  render: (args) => <Controlled {...args} />,
};

export const Sizes: Story = {
  args: { page: 10, pageCount: 20, onPageChange: () => {} },
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Controlled {...args} size="sm" />
      <Controlled {...args} size="default" />
      <Controlled {...args} size="lg" />
    </div>
  ),
};

export const Blue: Story = {
  args: { page: 3, pageCount: 8, theme: 'blue', onPageChange: () => {} },
  render: (args) => <Controlled {...args} />,
};

export const LastPage: Story = {
  args: { page: 5, pageCount: 5, onPageChange: () => {} },
  render: (args) => <Controlled {...args} />,
};

export const Dark: Story = {
  args: { page: 10, pageCount: 20, onPageChange: () => {} },
  render: (args) => (
    <ThemeProvider mode="dark">
      <Controlled {...args} />
    </ThemeProvider>
  ),
};

const PLANES = ['Red', 'Blue', 'Yellow', 'Black', 'White'];
const ROWS = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: `Composition ${i + 1}`,
  plane: PLANES[i % PLANES.length],
}));

const PAGE_SIZE = 8;

/**
 * Pagination does not slice data. Keep `page` in state, slice the rows for
 * that page, and derive `pageCount` from the total.
 */
const WithTableExample = () => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(ROWS.length / PAGE_SIZE);
  const rows = ROWS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ display: 'grid', gap: 16, width: 480 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Plane</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.plane}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        size="sm"
        aria-label="Compositions"
        page={page}
        pageCount={pageCount}
        onPageChange={setPage}
      />
    </div>
  );
};

export const WithTable: Story = {
  render: () => <WithTableExample />,
  parameters: {
    docs: {
      description: {
        story:
          'Small size suits the denser table. Pagination is controlled and knows nothing about data. Slice the rows for the current page yourself and pass `pageCount` from the total. If a filter shrinks the list, reset `page` to 1.',
      },
    },
  },
};
