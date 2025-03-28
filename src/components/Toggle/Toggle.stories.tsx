import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { Label } from '../Label/Label';
import { ThemeProvider } from '../../themes';

// Define the component metadata for Storybook
const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          The Toggle component is a switch that allows users to toggle between two states.
          It follows Mondrian's neoplasticism principles with rectangular shapes and primary colors.
          Note: To maintain single responsibility, Labels should be added separately using the Label component.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'green', 'yellow'],
      description: 'The theme color for the toggle',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the toggle',
    },
    id: {
      control: 'text',
      description: 'The ID for the toggle, used for accessibility with labels',
    },
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
type Story = StoryObj<typeof Toggle>;

// Standalone Toggle
export const Default: Story = {
  args: {
    id: 'default-toggle',
  },
};

// Toggle with Label example (render function needed to compose components)
export const WithLabelRight: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Toggle {...args} id="toggle-with-label-right" />
      <Label htmlFor="toggle-with-label-right" theme={args.theme}>
        Toggle Label (Right)
      </Label>
    </div>
  ),
  args: {
    theme: 'blue',
  },
};

export const WithLabelLeft: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Label htmlFor="toggle-with-label-left" theme={args.theme}>
        Toggle Label (Left)
      </Label>
      <Toggle {...args} id="toggle-with-label-left" />
    </div>
  ),
  args: {
    theme: 'blue',
  },
};

export const WithLabelTop: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'flex-start',
      }}
    >
      <Label htmlFor="toggle-with-label-top" theme={args.theme}>
        Toggle Label (Top)
      </Label>
      <Toggle {...args} id="toggle-with-label-top" />
    </div>
  ),
  args: {
    theme: 'blue',
  },
};

// Different themes
export const Blue: Story = {
  args: {
    theme: 'blue',
    id: 'blue-toggle',
  },
};

export const Neutral: Story = {
  args: {
    theme: 'neutral',
    id: 'neutral-toggle',
  },
};

export const Red: Story = {
  args: {
    theme: 'red',
    id: 'red-toggle',
  },
};

export const Green: Story = {
  args: {
    theme: 'green',
    id: 'green-toggle',
  },
};

export const Yellow: Story = {
  args: {
    theme: 'yellow',
    id: 'yellow-toggle',
  },
};

// Different sizes
export const Small: Story = {
  args: {
    size: 'sm',
    id: 'small-toggle',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    id: 'large-toggle',
  },
};

// Disabled toggle
export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'disabled-toggle',
  },
};
