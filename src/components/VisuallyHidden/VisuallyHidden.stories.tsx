import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisuallyHidden } from './VisuallyHidden';
import { Button } from '../Button/Button';
import { Plus } from '../icons';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Foundations/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Text for screen readers that is not painted. Use it to name icon-only controls. It draws nothing, so it follows the theme in both light and dark mode and adds no color.
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: { children: 'Add item' },
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Default: Story = {
  render: (args) => (
    <Button>
      <Plus />
      <VisuallyHidden {...args} />
    </Button>
  ),
};
