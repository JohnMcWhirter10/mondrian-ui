import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ThemeProvider } from '../../themes';

// Define the component metadata for Storybook
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          The Button component follows Mondrian's neoplasticism principles with rectangular shapes and primary colors.
          
          ## Theme Names
          We use semantically meaningful names for our themes:
          - 'blue' - Primary color for primary actions
          - 'neutral' - Uses background and text colors for secondary actions
          - 'red' - Error/warning theme for destructive actions
          - 'green' - Success theme for confirmations
          - 'yellow' - Accent color for highlights and attention
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'green', 'yellow'],
      description: 'The theme color for the button.',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the button',
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
type Story = StoryObj<typeof Button>;

export const Blue: Story = {
  args: {
    children: 'Blue Button',
    theme: 'blue',
  },
};

export const Neutral: Story = {
  args: {
    children: 'Neutral Button',
    theme: 'neutral',
  },
};

export const Red: Story = {
  args: {
    children: 'Red Button',
    theme: 'red',
  },
};

export const Green: Story = {
  args: {
    children: 'Green Button',
    theme: 'green',
  },
};

export const Yellow: Story = {
  args: {
    children: 'Yellow Button',
    theme: 'yellow',
  },
};
