import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A rectangular placeholder plane for content that is loading.

Black grid on white, one weight on every side. A black band sweeps across by transform only, and the sweep stops under \`prefers-reduced-motion\`. The plane is \`aria-hidden\`, so screen readers skip it.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: 'Plane width. Numbers are pixels.',
      table: { defaultValue: { summary: '100%' } },
    },
    height: {
      control: 'text',
      description: 'Plane height. Numbers are pixels.',
      table: { defaultValue: { summary: '16' } },
    },
  },
  args: {
    width: 240,
    height: 16,
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const CardPlaceholder: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '280px',
      }}
    >
      <Skeleton height={120} />
      <Skeleton width="60%" height={18} />
      <Skeleton height={12} />
      <Skeleton width="80%" height={12} />
    </div>
  ),
};
