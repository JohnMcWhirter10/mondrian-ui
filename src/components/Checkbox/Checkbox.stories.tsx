import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { Label } from '../Label/Label';
import { Box } from '../Box/Box';

// Define the component metadata for Storybook
const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          The Checkbox component follows Mondrian's neoplasticism principles with rectangular shapes and primary colors.
          This version uses a dash symbol as the indicator when checked, maintaining the geometric consistency of the design.
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
    checked: {
      control: 'boolean',
      description: 'The controlled checked state of the checkbox',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'The default checked state of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    id: {
      control: 'text',
      description: 'ID for the checkbox, useful for label association',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Default Checkbox
export const Default: Story = {
  args: {
    id: 'default-checkbox',
  },
};

// Checked Checkbox
export const Checked: Story = {
  args: {
    id: 'checked-checkbox',
    defaultChecked: true,
  },
};

// Checkbox with Label
export const WithLabel: Story = {
  render: (args) => (
    <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Checkbox {...args} id="checkbox-with-label" />
      <Label htmlFor="checkbox-with-label" theme={args.theme}>
        Checkbox with Dash
      </Label>
    </Box>
  ),
  args: {
    theme: 'blue',
    defaultChecked: true,
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox id="checkbox-sm" size="sm" defaultChecked />
        <Label htmlFor="checkbox-sm">Small Checkbox</Label>
      </Box>
      <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox id="checkbox-default" defaultChecked />
        <Label htmlFor="checkbox-default">Default Checkbox</Label>
      </Box>
      <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox id="checkbox-lg" size="lg" defaultChecked />
        <Label htmlFor="checkbox-lg">Large Checkbox</Label>
      </Box>
    </Box>
  ),
};

// Disabled state
export const Disabled: Story = {
  args: {
    id: 'disabled-checkbox',
    disabled: true,
  },
};

const allThemes = ['blue', 'neutral', 'red', 'yellow', 'green'] as const;

export const Themes: StoryObj<typeof Checkbox> = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {allThemes.map((theme) => (
        <div key={theme} style={{ display: 'flex', gap: '12px' }}>
          <Checkbox theme={theme} aria-label={`${theme} unchecked`} />
          <Checkbox
            theme={theme}
            defaultChecked
            aria-label={`${theme} checked`}
          />
        </div>
      ))}
    </div>
  ),
};
