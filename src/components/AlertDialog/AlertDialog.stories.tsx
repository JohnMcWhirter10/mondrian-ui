import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../themes';
import { Button } from '../Button/Button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog';

const meta: Meta<typeof AlertDialogContent> = {
  title: 'Overlays/AlertDialog',
  component: AlertDialogContent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A confirmation that needs an explicit choice, wrapping `@radix-ui/react-alert-dialog`. Unlike `Dialog` it cannot be dismissed by clicking outside, and focus starts on Cancel. It reuses the Dialog overlay and frame; the Action button is red for destructive confirms.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['red', 'blue', 'yellow', 'green', 'neutral'],
    },
  },
  args: { theme: 'red' },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AlertDialogContent>;

export const Destructive: Story = {
  render: (args) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button theme="red">Delete project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent {...args}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the project and every file in it. It cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const NonDestructive: Story = {
  args: { theme: 'blue' },
  render: (args) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Publish</Button>
      </AlertDialogTrigger>
      <AlertDialogContent {...args}>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish now?</AlertDialogTitle>
          <AlertDialogDescription>
            Everyone with the link will see the latest version.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Not yet</AlertDialogCancel>
          <AlertDialogAction theme="blue">Publish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
