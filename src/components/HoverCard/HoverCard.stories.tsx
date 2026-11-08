import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../themes';
import { Avatar, AvatarFallback } from '../Avatar';
import { Card, CardContent, CardDescription, CardTitle } from '../Card';
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
      <HoverCardTrigger href="#mondrian">@mondrian</HoverCardTrigger>
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
      <HoverCardTrigger href="#broadway">
        Broadway Boogie Woogie
      </HoverCardTrigger>
      <HoverCardContent side="right">
        <Card>
          <CardContent>
            <CardTitle>Broadway Boogie Woogie</CardTitle>
            <CardDescription>1942–43, oil on canvas.</CardDescription>
          </CardContent>
        </Card>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const SlowOpen: Story = {
  args: { openDelay: 800 },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger href="#slow">Hover and wait</HoverCardTrigger>
      <HoverCardContent>Opened after 800ms.</HoverCardContent>
    </HoverCard>
  ),
};
