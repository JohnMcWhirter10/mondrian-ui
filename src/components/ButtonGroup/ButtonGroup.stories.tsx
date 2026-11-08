import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../themes';
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Actions/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A joined row of buttons sharing single black borders, built on `@radix-ui/react-toggle-group`. `type="single"` and `type="multiple"` both work, arrow keys move focus, and `orientation="vertical"` stacks the group.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['default', 'sm', 'lg'] } },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Single: Story = {
  render: (args) => (
    <ButtonGroup {...args} type="single" defaultValue="week" aria-label="Range">
      <ButtonGroupItem value="day">Day</ButtonGroupItem>
      <ButtonGroupItem value="week">Week</ButtonGroupItem>
      <ButtonGroupItem value="month">Month</ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const Multiple: Story = {
  render: (args) => (
    <ButtonGroup {...args} type="multiple" defaultValue={['bold']}>
      <ButtonGroupItem value="bold">Bold</ButtonGroupItem>
      <ButtonGroupItem value="italic">Italic</ButtonGroupItem>
      <ButtonGroupItem value="underline">Underline</ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <ButtonGroup {...args} type="single" orientation="vertical">
      <ButtonGroupItem value="a">Top</ButtonGroupItem>
      <ButtonGroupItem value="b">Middle</ButtonGroupItem>
      <ButtonGroupItem value="c">Bottom</ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', justifyItems: 'start' }}>
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <ButtonGroup key={size} type="single" size={size}>
          <ButtonGroupItem value="a">One</ButtonGroupItem>
          <ButtonGroupItem value="b">Two</ButtonGroupItem>
        </ButtonGroup>
      ))}
    </div>
  ),
};
