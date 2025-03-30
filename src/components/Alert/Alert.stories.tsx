import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from './Alert';
import { SquareAlert, Plus, Dash, MondrianRightArrow } from '../icons';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'green', 'yellow'],
      description: 'The theme color for the alert',
      table: {
        defaultValue: { summary: 'blue' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the alert',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    theme: 'blue',
    size: 'default',
  },
  render: (args) => (
    <Alert {...args} style={{ width: '450px' }}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Info: Story = {
  args: {
    theme: 'blue',
    size: 'default',
  },
  render: (args) => (
    <Alert {...args} style={{ width: '450px' }}>
      <MondrianRightArrow />
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        Your license will expire in 30 days. Please renew it to continue using
        all features.
      </AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  args: {
    theme: 'yellow',
    size: 'default',
  },
  render: (args) => (
    <Alert {...args} style={{ width: '450px' }}>
      <SquareAlert />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your storage is almost full. Consider upgrading your plan or removing
        unused files.
      </AlertDescription>
    </Alert>
  ),
};

export const Error: Story = {
  args: {
    theme: 'red',
    size: 'default',
  },
  render: (args) => (
    <Alert {...args} style={{ width: '450px' }}>
      <Dash />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        There was a problem processing your request. Please try again later.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  args: {
    theme: 'green',
    size: 'default',
  },
  render: (args) => (
    <Alert {...args} style={{ width: '450px' }}>
      <Plus />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
};

export const Neutral: Story = {
  args: {
    theme: 'neutral',
    size: 'default',
  },
  render: (args) => (
    <Alert {...args} style={{ width: '450px' }}>
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is a neutral alert with standard styling.
      </AlertDescription>
    </Alert>
  ),
};

export const SmallWithIcon: Story = {
  args: {
    theme: 'blue',
    size: 'sm',
  },
  render: (args) => (
    <Alert {...args} style={{ width: '400px' }}>
      <MondrianRightArrow />
      <AlertTitle>Compact Alert</AlertTitle>
      <AlertDescription>
        This is a smaller alert that takes up less space.
      </AlertDescription>
    </Alert>
  ),
};

export const LargeWithIcon: Story = {
  args: {
    theme: 'yellow',
    size: 'lg',
  },
  render: (args) => (
    <Alert {...args} style={{ width: '500px' }}>
      <Dash />
      <AlertTitle>Important Notice</AlertTitle>
      <AlertDescription>
        This is a larger, more prominent alert for important information that
        needs to stand out on the page. It uses the larger size to draw more
        attention.
      </AlertDescription>
    </Alert>
  ),
};

export const MondrianIconsComparison: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '450px',
      }}
    >
      <Alert theme="red">
        <Dash />
        <AlertTitle>Using RectangleDash Icon</AlertTitle>
        <AlertDescription>
          This alert uses the RectangleDash icon for errors, following Mondrian
          principles.
        </AlertDescription>
      </Alert>
      <Alert theme="green">
        <Plus />
        <AlertTitle>Using RectanglePlus Icon</AlertTitle>
        <AlertDescription>
          This alert uses the RectanglePlus icon for success, following Mondrian
          principles.
        </AlertDescription>
      </Alert>
      <Alert theme="blue">
        <MondrianRightArrow />
        <AlertTitle>Using RectangleArrow Icon</AlertTitle>
        <AlertDescription>
          This alert uses the RectangleArrow icon for direction, following
          Mondrian principles.
        </AlertDescription>
      </Alert>
      <Alert theme="yellow">
        <SquareAlert />
        <AlertTitle>Using SquareAlert Icon</AlertTitle>
        <AlertDescription>
          This alert uses the SquareAlert icon for warnings, following Mondrian
          principles.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const TraditionalIconsComparison: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '450px',
      }}
    >
      <Alert theme="red">
        <Dash />
        <AlertTitle>Using Cross Icon</AlertTitle>
        <AlertDescription>
          This alert uses the traditional Cross icon for errors.
        </AlertDescription>
      </Alert>
      <Alert theme="green">
        <Plus />
        <AlertTitle>Using Check Icon</AlertTitle>
        <AlertDescription>
          This alert uses the traditional Check icon for success.
        </AlertDescription>
      </Alert>
      <Alert theme="blue">
        <MondrianRightArrow />
        <AlertTitle>Using ChevronRight Icon</AlertTitle>
        <AlertDescription>
          This alert uses the traditional ChevronRight icon for direction.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const SizeVariations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '450px',
      }}
    >
      <Alert theme="red" size="sm">
        <Dash />
        <AlertTitle>Small Alert (sm)</AlertTitle>
        <AlertDescription>
          Uses an icon sized at 16px with smaller padding.
        </AlertDescription>
      </Alert>
      <Alert theme="red">
        <Dash />
        <AlertTitle>Default Size Alert</AlertTitle>
        <AlertDescription>
          Uses an icon sized at 18px with standard padding.
        </AlertDescription>
      </Alert>
      <Alert theme="red" size="lg">
        <Dash />
        <AlertTitle>Large Alert (lg)</AlertTitle>
        <AlertDescription>
          Uses an icon sized at 22px with increased padding.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const TitleOnly: Story = {
  args: {
    theme: 'red',
    size: 'default',
  },
  render: (args) => (
    <Alert {...args} style={{ width: '450px' }}>
      <Dash />
      <AlertTitle>Critical System Error - Please Contact Support</AlertTitle>
    </Alert>
  ),
};

export const DescriptionOnly: Story = {
  args: {
    theme: 'blue',
    size: 'default',
  },
  render: (args) => (
    <Alert {...args} style={{ width: '450px' }}>
      <MondrianRightArrow />
      <AlertDescription>
        This alert contains only a description without a title, which can be
        useful for simple, non-critical notifications.
      </AlertDescription>
    </Alert>
  ),
};

export const WithCustomContent: Story = {
  args: {
    theme: 'neutral',
    size: 'default',
  },
  render: (args) => (
    <Alert {...args} style={{ width: '450px' }}>
      <AlertTitle>Custom Content</AlertTitle>
      <AlertDescription>
        <p>This alert contains custom nested content, including:</p>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>Multiple paragraphs</li>
          <li>A bullet list</li>
          <li>Other HTML elements</li>
        </ul>
        <p>All while maintaining the Mondrian design principles.</p>
      </AlertDescription>
    </Alert>
  ),
};
