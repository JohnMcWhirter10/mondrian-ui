import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';
import { Input } from '../Input/Input';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Label component following Mondrian neoplasticism design principles.',
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'green', 'yellow'],
      description: 'The theme color for the label',
      defaultValue: 'blue',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the label',
      defaultValue: 'default',
    },
    asChild: {
      control: 'boolean',
      description:
        'When true, the component renders its children directly with props forwarded',
      defaultValue: false,
    },
    children: {
      control: 'text',
      description: 'The content to display in the label',
    },
  },
  args: {
    children: 'Label Text',
    htmlFor: 'sample-input',
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {},
};

export const WithInput: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Label {...args} htmlFor="storybook-input">
        Email Address
      </Label>
      <Input id="storybook-input" placeholder="Enter your email" />
    </div>
  ),
  args: {
    theme: 'blue',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Label size="sm" htmlFor="small-input">
        Small Label
      </Label>
      <Label htmlFor="default-input">Default Label</Label>
      <Label size="lg" htmlFor="large-input">
        Large Label
      </Label>
    </div>
  ),
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Label theme="blue" htmlFor="blue-input">
        Blue Theme
      </Label>
      <Label theme="neutral" htmlFor="neutral-input">
        Neutral Theme
      </Label>
      <Label theme="red" htmlFor="red-input">
        Red Theme
      </Label>
      <Label theme="green" htmlFor="green-input">
        Green Theme
      </Label>
      <Label theme="yellow" htmlFor="yellow-input">
        Yellow Theme
      </Label>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Label asChild>
      <button
        type="button"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        Custom Element with Label Styling
      </button>
    </Label>
  ),
};

export const Dark: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '24px',
      }}
    >
      {(['blue', 'neutral', 'red', 'yellow', 'green'] as const).map((theme) => (
        <Label key={theme} theme={theme} htmlFor={`${theme}-dark`}>
          {theme} label
        </Label>
      ))}
    </div>
  ),
};
