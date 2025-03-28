import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Label } from '../Label/Label';
import { ThemeProvider } from '../../themes';

// Define the component metadata for Storybook
const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          The Input component follows Mondrian's neoplasticism principles with rectangular shapes and primary colors.
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
      description: 'The theme color for the input',
    },
    id: {
      control: 'text',
      description: 'The ID for the input, used for accessibility with labels',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
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
type Story = StoryObj<typeof Input>;

// Standalone Input
export const Blue: Story = {
  args: {
    placeholder: 'Blue Input',
    theme: 'blue',
    id: 'blue-input',
  },
};

// Input with Label example (render function needed to compose components)
export const WithLabel: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label htmlFor="input-with-label" theme={args.theme} position="top">
        Input Label
      </Label>
      <Input {...args} id="input-with-label" />
    </div>
  ),
  args: {
    placeholder: 'Input with external label',
    theme: 'blue',
  },
};

export const Neutral: Story = {
  args: {
    placeholder: 'Neutral Input',
    theme: 'neutral',
    id: 'neutral-input',
  },
};

export const Red: Story = {
  args: {
    placeholder: 'Red Input',
    theme: 'red',
    id: 'red-input',
  },
};

export const Green: Story = {
  args: {
    placeholder: 'Green Input',
    theme: 'green',
    id: 'green-input',
  },
};

export const Yellow: Story = {
  args: {
    placeholder: 'Yellow Input',
    theme: 'yellow',
    id: 'yellow-input',
  },
};
