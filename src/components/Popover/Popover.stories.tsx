import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../themes';
import { Button } from '../Button/Button';
import {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from './Popover';

const meta: Meta<typeof PopoverContent> = {
  title: 'Overlays/Popover',
  component: PopoverContent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A rectangle with a black border and a black offset shadow, wrapping `@radix-ui/react-popover`. It follows `side` and `align` from Radix, and focus returns to the trigger on close. No fades, no motion.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
  },
  args: { side: 'bottom', align: 'center' },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '6rem 8rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PopoverContent>;

export const Default: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <p style={{ margin: '0 0 0.75rem' }}>
          Dimensions are set on the grid, not by taste.
        </p>
        <PopoverClose asChild>
          <Button size="sm" theme="neutral">
            Close
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  ),
};

export const Placement: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button theme="neutral">{side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side}>Opens on the {side}.</PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const WithAnchor: Story = {
  render: () => (
    <Popover>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <PopoverAnchor asChild>
          <div
            style={{
              border: '3px solid var(--mondrian-border)',
              padding: '1rem 2rem',
            }}
          >
            Anchored here
          </div>
        </PopoverAnchor>
        <PopoverTrigger asChild>
          <Button size="sm">Toggle</Button>
        </PopoverTrigger>
      </div>
      <PopoverContent>
        Positioned against the anchor, not the trigger.
      </PopoverContent>
    </Popover>
  ),
};
