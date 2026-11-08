import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../themes';
import { ToggleButton } from './ToggleButton';

const meta: Meta<typeof ToggleButton> = {
  title: 'Actions/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A two-state pressed button built on `@radix-ui/react-toggle`. Pressed fills it with the theme plane and sets `aria-pressed`. Not to be confused with `Toggle`, the switch.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'red', 'yellow', 'green', 'neutral'],
    },
    size: { control: 'select', options: ['default', 'sm', 'lg'] },
  },
  args: { children: 'Bold', theme: 'blue', size: 'default' },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {};

export const Pressed: Story = { args: { defaultPressed: true } };

export const Disabled: Story = { args: { disabled: true } };

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {(['blue', 'red', 'yellow', 'green', 'neutral'] as const).map((theme) => (
        <ToggleButton key={theme} theme={theme} defaultPressed>
          {theme}
        </ToggleButton>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <ToggleButton key={size} size={size}>
          {size}
        </ToggleButton>
      ))}
    </div>
  ),
};
