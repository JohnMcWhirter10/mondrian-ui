import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'neutral', 'yellow', 'green', 'red'],
      description: 'The visual style variant of the box',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'md', 'lg', 'xl'],
      description: 'Controls the padding of the box',
    },
    fullWidth: {
      control: 'boolean',
      description: 'When true, the box takes up 100% of the container width',
    },
    flex: {
      control: 'boolean',
      description: 'When true, the box is displayed as a flex container',
    },
    noBorder: {
      control: 'boolean',
      description: 'When true, the box does not have a border',
    },
    asChild: {
      control: 'boolean',
      description:
        'When true, renders the children with props forwarded through Radix Slot',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children:
      'This is a box component following Mondrian neoplasticism principles',
    variant: 'blue',
    size: 'default',
    style: { width: '300px', height: '200px' },
  },
};

export const Yellow: Story = {
  args: {
    children: 'Yellow accent box',
    variant: 'yellow',
    size: 'default',
    style: { width: '300px', height: '200px' },
  },
};

export const Green: Story = {
  args: {
    children: 'Green box',
    variant: 'green',
    size: 'default',
    style: { width: '300px', height: '200px' },
  },
};

export const Red: Story = {
  args: {
    children: 'Red box',
    variant: 'red',
    size: 'default',
    style: { width: '300px', height: '200px' },
  },
};

export const Small: Story = {
  args: {
    children: 'Small box',
    size: 'sm',
    style: { width: '250px', height: '150px' },
  },
};

export const Large: Story = {
  args: {
    children: 'Large box',
    size: 'lg',
    style: { width: '350px', height: '250px' },
  },
};

export const NoBorder: Story = {
  args: {
    children: 'Box without border',
    noBorder: true,
    style: { width: '300px', height: '200px' },
  },
};

export const FlexContainer: Story = {
  args: {
    children: (
      <>
        <div style={{ padding: '10px', backgroundColor: '#D42029' }}>
          Item 1
        </div>
        <div style={{ padding: '10px', backgroundColor: '#0D47A1' }}>
          Item 2
        </div>
        <div style={{ padding: '10px', backgroundColor: '#FFDE03' }}>
          Item 3
        </div>
      </>
    ),
    flex: true,
    style: { width: '500px', height: '100px', gap: '10px' },
  },
};

export const FullWidth: Story = {
  args: {
    children: 'This box takes up the full width of its container',
    fullWidth: true,
  },
};
