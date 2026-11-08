import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Content/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A square frame with a black grid line, cropped to the rectangle.

The fallback is initials on a single flat yellow plane. It appears while the image loads or if it fails. The grid line is black and one weight in light and dark.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Frame size from the library scale',
      table: { defaultValue: { summary: 'default' } },
    },
  },
  args: { size: 'default' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="" alt="Piet Mondrian" />
      <AvatarFallback>PM</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Themes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '0 24px 24px',
      }}
    >
      {(['blue', 'neutral', 'red', 'yellow'] as const).map((theme) => (
        <div key={theme}>
          <Avatar theme={theme}>
            <AvatarFallback>PM</AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  ),
};
