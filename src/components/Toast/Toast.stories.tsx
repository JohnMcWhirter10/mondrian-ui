import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../themes';
import { Button } from '../Button/Button';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';
import type { ToastProps, ToastViewportPosition } from './Toast.types';

interface DemoProps {
  theme?: ToastProps['theme'];
  position?: ToastViewportPosition;
  duration?: number;
  progress?: boolean;
}

/** A button that opens a toast. Radix restarts the toast when `open` flips. */
const Demo = ({ theme, position, duration = 5000, progress }: DemoProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <ToastProvider duration={duration} swipeDirection="right">
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        theme={theme}
        progress={progress}
      >
        <ToastTitle>Saved</ToastTitle>
        <ToastDescription>Your changes are stored.</ToastDescription>
        <ToastAction altText="Undo the save">Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport position={position} />
    </ToastProvider>
  );
};

const meta: Meta<typeof Demo> = {
  title: 'Feedback/Toast',
  component: Demo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Stacked rectangles at one screen edge, wrapping `@radix-ui/react-toast`. A toast slides in along one axis and never fades. It closes after `duration`, by the close button, or by swiping away. Pair `ToastAction` with an `altText` so keyboard and screen reader users can reach the action.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['yellow', 'blue', 'red', 'neutral'],
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    duration: { control: 'number' },
    progress: { control: 'boolean' },
  },
  args: {
    theme: 'yellow',
    position: 'bottom-right',
    duration: 5000,
    progress: false,
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '4rem 8rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Demo>;

export const Default: Story = {};

export const Blue: Story = { args: { theme: 'blue' } };
export const Red: Story = { args: { theme: 'red' } };
export const Neutral: Story = { args: { theme: 'neutral' } };

export const WithProgress: Story = { args: { progress: true } };

export const TopLeft: Story = { args: { position: 'top-left' } };

export const Dark: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider mode="dark">
        <div
          style={{
            padding: '4rem 8rem',
            background: 'var(--mondrian-background)',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
