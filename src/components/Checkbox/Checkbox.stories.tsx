import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { Label } from '../Label/Label';
import { ThemeProvider } from '../../themes';

// Define the component metadata for Storybook
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          The Checkbox component follows Mondrian's neoplasticism principles with rectangular shapes and primary colors.
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
      description: 'The theme color for the checkbox',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the checkbox',
    },
    id: {
      control: 'text',
      description:
        'The ID for the checkbox, used for accessibility with labels',
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
type Story = StoryObj<typeof Checkbox>;

// Standalone Checkbox
export const Blue: Story = {
  args: {
    id: 'blue-checkbox',
    theme: 'blue',
  },
};

// Checkbox with Label example (render function needed to compose components)
export const WithLabel: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Checkbox {...args} id="checkbox-with-label" />
      <Label htmlFor="checkbox-with-label" theme={args.theme}>
        Checkbox Label
      </Label>
    </div>
  ),
  args: {
    theme: 'blue',
  },
};

export const LabelBeforeCheckbox: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Label htmlFor="checkbox-with-label-before" theme={args.theme}>
        Label Before Checkbox
      </Label>
      <Checkbox {...args} id="checkbox-with-label-before" />
    </div>
  ),
  args: {
    theme: 'blue',
  },
};

export const Neutral: Story = {
  args: {
    id: 'neutral-checkbox',
    theme: 'neutral',
  },
};

export const Red: Story = {
  args: {
    id: 'red-checkbox',
    theme: 'red',
  },
};

export const Green: Story = {
  args: {
    id: 'green-checkbox',
    theme: 'green',
  },
};

export const Yellow: Story = {
  args: {
    id: 'yellow-checkbox',
    theme: 'yellow',
  },
};
