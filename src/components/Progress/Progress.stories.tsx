import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A progress bar built on Radix Progress.

A black frame of one weight holds a blue plane that grows left to right by transform. Omit \`value\` for the indeterminate state, where a block slides by transform only. \`aria-valuenow\` comes from Radix; give the bar an accessible name with \`aria-label\` or \`aria-labelledby\`.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'yellow'],
      description: 'Plane color',
      table: { defaultValue: { summary: 'blue' } },
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current value. Omit for indeterminate',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
      table: { defaultValue: { summary: '100' } },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Size from the library scale',
      table: { defaultValue: { summary: 'default' } },
    },
  },
  args: {
    value: 60,
    max: 100,
    size: 'default',
    'aria-label': 'Upload progress',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {};

export const Indeterminate: Story = {
  args: { value: undefined, 'aria-label': 'Loading' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Progress size="sm" value={25} aria-label="Small" />
      <Progress value={50} aria-label="Default" />
      <Progress size="lg" value={75} aria-label="Large" />
    </div>
  ),
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['blue', 'neutral', 'red', 'yellow'] as const).map((theme) => (
        <Progress
          key={theme}
          theme={theme}
          value={60}
          aria-label={`${theme} progress`}
        />
      ))}
    </div>
  ),
};
