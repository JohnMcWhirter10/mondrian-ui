import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Empty, EmptyActions, EmptyDescription, EmptyTitle } from './Empty';
import { Button } from '../Button';

const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A rectangular empty-state frame for lists and tables with no content.

One black-bordered plane with asymmetric spacing and left-aligned content. A yellow strip runs along the left edge. Compose it from \`EmptyTitle\`, \`EmptyDescription\`, and \`EmptyActions\`.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'yellow'],
      description: 'Plane color',
      table: { defaultValue: { summary: 'blue' } },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '480px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyTitle>No projects yet</EmptyTitle>
      <EmptyDescription>Projects you create will appear here.</EmptyDescription>
      <EmptyActions>
        <Button>Create project</Button>
      </EmptyActions>
    </Empty>
  ),
};

export const TitleOnly: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyTitle>Nothing found</EmptyTitle>
    </Empty>
  ),
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['blue', 'neutral', 'red', 'yellow'] as const).map((theme) => (
        <Empty key={theme} theme={theme}>
          <EmptyTitle>{theme}</EmptyTitle>
          <EmptyDescription>Nothing here yet.</EmptyDescription>
        </Empty>
      ))}
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark">
      <Empty>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Projects you create will appear here.
        </EmptyDescription>
      </Empty>
    </div>
  ),
};
