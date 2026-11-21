import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../themes';
import { Pagination } from './Pagination';

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
