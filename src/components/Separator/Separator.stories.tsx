import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A solid black line of one grid weight, horizontal or vertical.

The line is black and the same weight in light and dark. A decorative separator is purely visual and drops its role; set \`decorative={false}\` to expose it to assistive technology.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the line',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    decorative: {
      control: 'boolean',
      description: 'Drops the separator role when true',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '240px' }}>
      <Separator {...args} />
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '240px', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div style={{ padding: '8px 0' }}>Above</div>
      <Separator />
      <div style={{ padding: '8px 0' }}>Below</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        height: '32px',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};

export const Themes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '0 24px 24px',
      }}
    >
      {(['blue', 'neutral', 'red', 'yellow'] as const).map((theme) => (
        <div key={theme}>
          <div style={{ width: '240px' }}>
            <Separator theme={theme} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Dark: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div
      data-theme="dark"
      style={{
        padding: '24px',
        background: 'var(--mondrian-background)',
        color: 'var(--mondrian-text)',
      }}
    >
      <div style={{ width: '240px' }}>
        <Separator theme="red" />
      </div>
      <div
        style={{
          display: 'flex',
          height: '48px',
          gap: '12px',
          marginTop: '24px',
        }}
      >
        <span>L</span>
        <Separator orientation="vertical" theme="yellow" />
        <span>R</span>
      </div>
    </div>
  ),
};
