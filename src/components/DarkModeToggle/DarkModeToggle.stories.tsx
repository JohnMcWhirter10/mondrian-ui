import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DarkModeToggle } from './DarkModeToggle';

const meta: Meta<typeof DarkModeToggle> = {
  title: 'Forms/DarkModeToggle',
  component: DarkModeToggle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A switch bound to \`useTheme().setDarkMode\`. Its visible text is its children, and the switch sits inside its own label, so no \`id\` is needed. The choice is saved in localStorage and restored by ThemeProvider.

The yellow plane marks the on state. Grid lines and text switch with the theme, and primary colors stay the same in both modes. Use the Mode toolbar to preview both.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'green', 'yellow'],
      description: 'Plane color of the on state',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
  args: { theme: 'yellow', size: 'default', children: 'Dark mode' },
};

export default meta;
type Story = StoryObj<typeof DarkModeToggle>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DarkModeToggle {...args} size="sm">
        Small
      </DarkModeToggle>
      <DarkModeToggle {...args} size="default">
        Default
      </DarkModeToggle>
      <DarkModeToggle {...args} size="lg">
        Large
      </DarkModeToggle>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
