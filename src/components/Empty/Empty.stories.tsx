import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
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
