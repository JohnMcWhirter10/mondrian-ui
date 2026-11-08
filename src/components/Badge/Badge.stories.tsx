import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A static status label drawn as one rectangular plane.

The grid line is black and the same weight on every side, in light and dark. The word sits in the upper left of the plane, so a short label still occupies a proportion from the size scale. Red, blue, and yellow are the primary planes. Neutral is black text on a white plane. Text stays on the readable side of its plane: white on red and blue, black on yellow and white.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'yellow'],
      description: 'The single color plane behind the label',
      table: {
        defaultValue: { summary: 'blue' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Plane proportion from the library scale',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      control: 'text',
      description: 'The status text',
    },
  },
  args: {
    children: 'Draft',
    theme: 'blue',
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Planes: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        justifyContent: 'start',
        alignItems: 'start',
        columnGap: '36px',
        rowGap: '14px',
        padding: '4px 72px 48px 0',
      }}
    >
      <Badge theme="red" size="lg">
        Error
      </Badge>
      <Badge theme="yellow" size="sm">
        Warning
      </Badge>
      <Badge theme="neutral">Draft</Badge>
      <Badge theme="blue" size="sm">
        Info
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Badge theme="blue" size="sm">
        Small
      </Badge>
      <div style={{ height: '10px' }} />
      <Badge theme="blue">Default</Badge>
      <div style={{ height: '26px' }} />
      <Badge theme="blue" size="lg">
        Large
      </Badge>
    </div>
  ),
};

export const BesideATitle: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        padding: '2px 64px 28px 0',
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      <span style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1 }}>
        Composition
      </span>
      <Badge theme="yellow" size="sm">
        New
      </Badge>
    </div>
  ),
};
