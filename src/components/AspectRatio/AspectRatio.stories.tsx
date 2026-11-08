import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A black-bordered rectangle that holds a fixed proportion. Children fill the frame.

The grid line is black and one weight on every side, in light and dark. Use it as the image slot in other components.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: 'number',
      description: 'Width divided by height',
      table: { defaultValue: { summary: '1' } },
    },
  },
  args: { ratio: 16 / 9 },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

const Plane = ({ color }: { color: string }) => (
  <div style={{ width: '100%', height: '100%', background: color }} />
);

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '320px' }}>
      <AspectRatio {...args}>
        <Plane color="var(--mondrian-blue)" />
      </AspectRatio>
    </div>
  ),
};

export const Ratios: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'flex-start',
        width: '640px',
      }}
    >
      <div style={{ width: '200px' }}>
        <AspectRatio ratio={1}>
          <Plane color="var(--mondrian-red)" />
        </AspectRatio>
      </div>
      <div style={{ width: '280px' }}>
        <AspectRatio ratio={16 / 9}>
          <Plane color="var(--mondrian-yellow)" />
        </AspectRatio>
      </div>
      <div style={{ width: '120px' }}>
        <AspectRatio ratio={3 / 4}>
          <Plane color="var(--mondrian-blue)" />
        </AspectRatio>
      </div>
    </div>
  ),
};
