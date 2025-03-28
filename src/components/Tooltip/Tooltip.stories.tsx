import type { Meta, StoryObj } from '@storybook/react';
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

export const Default: Story = {
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
          <Button theme="blue">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>This tooltip appears on top</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button theme="blue">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>This tooltip appears on the right</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button theme="blue">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>This tooltip appears on the bottom</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button theme="blue">Left</Button>
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
