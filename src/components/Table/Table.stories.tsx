import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Native table primitives. Every cell is bounded by a black grid line of one weight, the header row is a filled yellow plane, and rows are not striped. The table scrolls horizontally on narrow screens through ScrollArea.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    scrollTheme: {
      control: 'select',
      options: ['blue', 'red', 'yellow'],
      description: 'Theme of the horizontal scrollbar thumb',
      table: { defaultValue: { summary: 'blue' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const Example = (args: React.ComponentProps<typeof Table>) => (
  <Table {...args}>
    <TableCaption>Monthly totals</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Month</TableHead>
        <TableHead>Plane</TableHead>
        <TableHead>Count</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>January</TableCell>
        <TableCell>Red</TableCell>
        <TableCell>12</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>February</TableCell>
        <TableCell>Blue</TableCell>
        <TableCell>8</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={2}>Total</TableCell>
        <TableCell>20</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
);

export const Default: Story = {
  render: (args) => <Example {...args} />,
};

export const Dark: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: (args) => (
    <div data-theme="dark">
      <Example {...args} />
    </div>
  ),
};
