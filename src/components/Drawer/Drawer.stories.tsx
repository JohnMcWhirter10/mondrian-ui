import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../themes';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Label } from '../Label/Label';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from './Drawer';

const meta: Meta<typeof DrawerContent> = {
  title: 'Overlays/Drawer',
  component: DrawerContent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A full-height panel anchored to the left or right edge. It is a thin layer over
\`Dialog\`, so the overlay, focus trap, Escape and close behavior are identical.
The header is the colour plane. Use the toolbar's light/dark switch to see it in
dark mode. Wrap any button that should dismiss the drawer in \`DrawerClose\`.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'inline-radio', options: ['right', 'left'] },
    theme: {
      control: 'select',
      options: ['blue', 'red', 'yellow', 'green', 'neutral'],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DrawerContent>;

export const Default: Story = {
  args: { side: 'right', theme: 'blue' },
  render: (args) => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent {...args}>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Narrow the list of results.</DrawerDescription>
        </DrawerHeader>
        <Label htmlFor="drawer-search">Search</Label>
        <Input id="drawer-search" placeholder="Type to filter" />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button theme="neutral">Cancel</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>Apply</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Left: Story = {
  ...Default,
  args: { side: 'left', theme: 'red' },
};

export const Yellow: Story = {
  ...Default,
  args: { side: 'right', theme: 'yellow' },
};

export const Neutral: Story = {
  ...Default,
  args: { side: 'left', theme: 'neutral' },
};
