import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioItem } from './Radio';
import React from 'react';

// Define metadata for the Radio stories
const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/Radio',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// Basic RadioGroup story
export const Basic: Story = {
  args: {
    defaultValue: 'option1',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="option1" />
        <span>Option 1</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="option2" />
        <span>Option 2</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="option3" />
        <span>Option 3</span>
      </div>
    </RadioGroup>
  ),
};

// RadioGroup with different themes
export const Themes: Story = {
  args: {
    defaultValue: 'blue',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="blue" theme="blue" />
        <span>Blue Theme</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="red" theme="red" />
        <span>Red Theme</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="yellow" theme="yellow" />
        <span>Yellow Theme</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="green" theme="green" />
        <span>Green Theme</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="neutral" theme="neutral" />
        <span>Neutral Theme</span>
      </div>
    </RadioGroup>
  ),
};

// RadioGroup with different sizes
export const Sizes: Story = {
  args: {
    defaultValue: 'default',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="sm" size="sm" />
        <span>Small</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="default" />
        <span>Default</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="lg" size="lg" />
        <span>Large</span>
      </div>
    </RadioGroup>
  ),
};

// RadioGroup with horizontal orientation
export const Horizontal: Story = {
  args: {
    defaultValue: 'option1',
    orientation: 'horizontal',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="option1" />
        <span>Option 1</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="option2" />
        <span>Option 2</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="option3" />
        <span>Option 3</span>
      </div>
    </RadioGroup>
  ),
};

// RadioGroup with disabled items
export const Disabled: Story = {
  args: {
    defaultValue: 'option1',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="option1" />
        <span>Enabled</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RadioItem value="option2" disabled />
        <span>Disabled</span>
      </div>
    </RadioGroup>
  ),
};
