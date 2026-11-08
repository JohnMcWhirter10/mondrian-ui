import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tooltip component that follows Mondrian neoplasticism principles. Features rectangular shapes with strong black grid lines and the Mondrian color palette.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div style={{ padding: '5rem' }}>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Blue: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button theme="blue">Hover Me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip with Mondrian styling</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithDifferentPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>This tooltip appears on top</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>This tooltip appears on the right</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>This tooltip appears on the bottom</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>This tooltip appears on the left</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithOffset: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button theme="blue">With Offset</Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={15}>
        <p>This tooltip has an increased offset from the trigger (15px)</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button theme="blue">Default</Button>
        </TooltipTrigger>
        <TooltipContent variant="default">
          <p>Default tooltip (white background)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button theme="blue">Red</Button>
        </TooltipTrigger>
        <TooltipContent variant="red">
          <p>Red tooltip (Mondrian red)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button theme="blue">Blue</Button>
        </TooltipTrigger>
        <TooltipContent variant="blue">
          <p>Blue tooltip (Mondrian blue)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button theme="blue">Yellow</Button>
        </TooltipTrigger>
        <TooltipContent variant="yellow">
          <p>Yellow tooltip (Mondrian yellow)</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

const planeThemes = ['neutral', 'blue', 'red', 'yellow'] as const;

const ThemeTooltips = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    {planeThemes.map((theme) => (
      <Tooltip key={theme} defaultOpen={false}>
        <TooltipTrigger asChild>
          <Button theme="neutral">{theme}</Button>
        </TooltipTrigger>
        <TooltipContent theme={theme}>
          <p>{`Tooltip (${theme}): text stays on white or black`}</p>
        </TooltipContent>
      </Tooltip>
    ))}
  </div>
);

export const Themes: Story = {
  render: () => <ThemeTooltips />,
};

export const Dark: Story = {
  render: () => (
    <div data-theme="dark" style={{ padding: 24 }}>
      <ThemeTooltips />
    </div>
  ),
};
