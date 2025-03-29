import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './Collapsible';
import { ComponentTheme } from '../../themes';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  argTypes: {
    theme: {
      control: 'select',
      options: [
        'blue',
        'red',
        'green',
        'yellow',
        'neutral',
      ] as ComponentTheme[],
      defaultValue: 'blue',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      defaultValue: 'default',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Click to toggle</CollapsibleTrigger>
      <CollapsibleContent>
        This is the collapsible content that can be toggled open and closed.
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    theme: 'blue',
    size: 'default',
    disabled: false,
  },
};

export const Red: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Click to toggle</CollapsibleTrigger>
      <CollapsibleContent>
        This is the collapsible content that can be toggled open and closed.
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    theme: 'red',
    size: 'default',
    disabled: false,
  },
};

export const Green: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Click to toggle</CollapsibleTrigger>
      <CollapsibleContent>
        This is the collapsible content that can be toggled open and closed.
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    theme: 'green',
    size: 'default',
    disabled: false,
  },
};

export const Yellow: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Click to toggle</CollapsibleTrigger>
      <CollapsibleContent>
        This is the collapsible content that can be toggled open and closed.
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    theme: 'yellow',
    size: 'default',
    disabled: false,
  },
};

export const Small: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Click to toggle</CollapsibleTrigger>
      <CollapsibleContent>
        This is the collapsible content that can be toggled open and closed.
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    theme: 'blue',
    size: 'sm',
    disabled: false,
  },
};

export const Large: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Click to toggle</CollapsibleTrigger>
      <CollapsibleContent>
        This is the collapsible content that can be toggled open and closed.
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    theme: 'blue',
    size: 'lg',
    disabled: false,
  },
};

export const OpenByDefault: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Click to toggle</CollapsibleTrigger>
      <CollapsibleContent>
        This is the collapsible content that can be toggled open and closed.
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    theme: 'blue',
    size: 'default',
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger disabled>
        Click to toggle (disabled)
      </CollapsibleTrigger>
      <CollapsibleContent>
        This content cannot be toggled because the trigger is disabled.
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    theme: 'blue',
    size: 'default',
    disabled: true,
  },
};
