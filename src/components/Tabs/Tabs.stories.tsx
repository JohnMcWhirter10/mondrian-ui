import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '../../themes';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A view switcher built on `@radix-ui/react-tabs`. The list sits on a heavy black rule, the active trigger is the one filled plane, and the panel shares the list border. Arrow keys, Home and End come from Radix; only the active panel is rendered.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['yellow', 'blue', 'red', 'green', 'neutral'],
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ width: 420 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const Demo = (args: React.ComponentProps<typeof Tabs>) => (
  <Tabs defaultValue="overview" {...args}>
    <TabsList aria-label="Project">
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">A summary of the project.</TabsContent>
    <TabsContent value="activity">Recent changes appear here.</TabsContent>
    <TabsContent value="settings">Configure the project.</TabsContent>
  </Tabs>
);

export const Default: Story = { render: (args) => <Demo {...args} /> };

export const Blue: Story = { render: () => <Demo theme="blue" /> };

export const Vertical: Story = {
  render: () => <Demo orientation="vertical" />,
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="a">
      <TabsList aria-label="Disabled example">
        <TabsTrigger value="a">Available</TabsTrigger>
        <TabsTrigger value="b" disabled>
          Locked
        </TabsTrigger>
      </TabsList>
      <TabsContent value="a">Only this tab can be opened.</TabsContent>
      <TabsContent value="b">Locked content.</TabsContent>
    </Tabs>
  ),
};

export const Dark: Story = {
  render: () => (
    <ThemeProvider mode="dark">
      <Demo />
    </ThemeProvider>
  ),
};
