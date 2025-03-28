import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { ThemeProvider } from '../../themes';

// Define the component metadata for Storybook
const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          The Label component follows Mondrian's neoplasticism principles with rectangular shapes and primary colors.
          It can be used independently or in conjunction with form components.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'green', 'yellow'],
      description: 'The theme color for the label',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the label',
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom', 'floating'],
      description: 'The position styling for the label',
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

type Story = StoryObj<typeof Label>;

export const Blue: Story = {
  args: {
    children: 'Blue Label',
    theme: 'blue',
  },
};

export const Neutral: Story = {
  args: {
    children: 'Neutral Label',
    theme: 'neutral',
  },
};

export const Red: Story = {
  args: {
    children: 'Red Label',
    theme: 'red',
  },
};

export const Green: Story = {
  args: {
    children: 'Green Label',
    theme: 'green',
  },
};

export const Yellow: Story = {
  args: {
    children: 'Yellow Label',
    theme: 'yellow',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Label',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Label',
    size: 'lg',
  },
};

export const PositionLeft: Story = {
  args: {
    children: 'Left Position Label',
    position: 'left',
  },
};

export const PositionRight: Story = {
  args: {
    children: 'Right Position Label',
    position: 'right',
  },
};

export const PositionTop: Story = {
  args: {
    children: 'Top Position Label',
    position: 'top',
  },
};

export const PositionBottom: Story = {
  args: {
    children: 'Bottom Position Label',
    position: 'bottom',
  },
};

export const FloatingLabel: Story = {
  args: {
    children: 'Floating Label',
    position: 'floating',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          border: '2px solid var(--mondrian-border)',
          padding: '24px 16px 16px 16px',
          position: 'relative',
          width: '200px',
        }}
      >
        <Story />
        <div style={{ height: '36px' }}></div>
      </div>
    ),
  ],
};

// Example of using Label with form components
export const WithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label htmlFor="example-input" theme="blue">
        Username
      </Label>
      <input
        id="example-input"
        type="text"
        style={{
          border: '2px solid var(--mondrian-blue)',
          padding: '8px',
          outline: 'none',
        }}
      />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        id="example-checkbox"
        type="checkbox"
        style={{ width: '20px', height: '20px' }}
      />
      <Label htmlFor="example-checkbox" theme="blue">
        Accept terms and conditions
      </Label>
    </div>
  ),
};
