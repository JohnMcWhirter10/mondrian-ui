import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './Kbd';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A small rectangular keyboard-key label on the native \`kbd\` element.

Black grid on white, with a black offset shadow so it reads as a physical key. Keys in a group sit side by side with a gap from the spacing variables.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'The key label' },
  },
  args: {
    children: 'K',
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {};

export const Shortcut: Story = {
  render: () => (
    <div style={{ padding: '4px 8px 8px 0' }}>
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>P</Kbd>
    </div>
  ),
};
