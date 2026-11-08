import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
Native table primitives composed like a Mondrian canvas. There is no outer box: heavy horizontal rules carry the structure, one thin vertical rule follows the first column and runs past the table, the first header cell is a small color plane, and the footer is the dominant plane. Rows are not striped. The table scrolls horizontally on narrow screens through ScrollArea.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'yellow'],
      description: 'Color of the header plane and footer plane',
      table: { defaultValue: { summary: 'blue' } },
    },
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
  render: (args) => (
    <div data-theme="dark">
      <Example {...args} />
    </div>
  ),
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['blue', 'neutral', 'red', 'yellow'] as const).map((theme) => (
        <Example key={theme} theme={theme} />
      ))}
    </div>
  ),
};
