import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A loading indicator made of rectangular blocks of unequal width.

A red plane moves across the blocks by transform only, with no fades. The frame is a black grid line of one weight. The loader has \`role="status"\` and an accessible name, and holds still when \`prefers-reduced-motion\` is set.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Accessible name announced by assistive technology',
      table: { defaultValue: { summary: 'Loading' } },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Size from the library scale',
      table: { defaultValue: { summary: 'default' } },
    },
  },
  args: {
    label: 'Loading',
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
      }}
    >
      <Loader size="sm" label="Loading small" />
      <Loader label="Loading default" />
      <Loader size="lg" label="Loading large" />
    </div>
  ),
};
