import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../themes';
import {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from './Toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Actions/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Groups buttons, toggle groups, links and separators into one keyboard-navigable row with roving focus (`@radix-ui/react-toolbar`). Items share borders so it reads as one rectangle: black grid on white.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  render: (args) => (
    <Toolbar aria-label="Formatting" {...args}>
      <ToolbarToggleGroup type="multiple" aria-label="Text style">
        <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
        <ToolbarToggleItem value="italic">Italic</ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup
        type="single"
        defaultValue="left"
        aria-label="Alignment"
      >
        <ToolbarToggleItem value="left">Left</ToolbarToggleItem>
        <ToolbarToggleItem value="center">Center</ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton>Copy</ToolbarButton>
      <ToolbarLink href="#help">Help</ToolbarLink>
    </Toolbar>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Toolbar aria-label="Tools" orientation="vertical">
      <ToolbarButton>Select</ToolbarButton>
      <ToolbarButton>Draw</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton>Erase</ToolbarButton>
    </Toolbar>
  ),
};
