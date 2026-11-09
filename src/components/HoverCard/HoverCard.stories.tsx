import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../themes';
import { Avatar, AvatarFallback } from '../Avatar';
import { Button } from '../Button/Button';
import { CardDescription, CardTitle } from '../Card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard';

const meta: Meta<typeof HoverCard> = {
  title: 'Overlays/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A rich preview on hover and keyboard focus, wrapping `@radix-ui/react-hover-card`. A black frame and shadow with a blue header strip. It opens after a short delay (`openDelay`, 200ms by default) and appears without a fade.',
      },
    },
  },
  tags: ['autodocs'],
  args: { openDelay: 200 },
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
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <Button asChild theme="neutral">
          <a href="#mondrian">@mondrian</a>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Avatar>
            <AvatarFallback>PM</AvatarFallback>
          </Avatar>
          <div>
            <strong>Piet Mondrian</strong>
            <div>Painter of grids since 1917.</div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithCard: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button asChild theme="neutral">
          <a href="#broadway">Broadway Boogie Woogie</a>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent side="right">
        <CardTitle>Broadway Boogie Woogie</CardTitle>
        <CardDescription>1942–43, oil on canvas.</CardDescription>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const SlowOpen: Story = {
  args: { openDelay: 800 },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <Button asChild theme="neutral">
          <a href="#slow">Hover and wait</a>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>Opened after 800ms.</HoverCardContent>
    </HoverCard>
  ),
};
