import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './Card';
import { Button } from '../Button/Button';
import React from 'react';
import { Check, Cross } from '../icons';
import { Box } from '../Box/Box';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'red', 'yellow', 'green', 'neutral'],
      description: 'The theme color for the card',
      table: {
        defaultValue: { summary: 'blue' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the card',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    theme: 'blue',
    size: 'default',
  },
  render: (args) => (
    <Card {...args} style={{ width: '350px' }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a description of the card content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This is the main content area of the card. It can contain any elements
          like text, images, or other components.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action Button</Button>
      </CardFooter>
    </Card>
  ),
};

export const Red: Story = {
  args: {
    theme: 'red',
    size: 'default',
  },
  render: (args) => (
    <Card {...args} style={{ width: '350px' }}>
      <CardHeader>
        <CardTitle>Warning Card</CardTitle>
        <CardDescription>
          This card uses the red theme to indicate caution.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Red cards can be used to highlight warnings or errors that require
          attention.
        </p>
      </CardContent>
      <CardFooter>
        <Button theme="red" size="sm">
          Acknowledge
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Yellow: Story = {
  args: {
    theme: 'yellow',
    size: 'default',
  },
  render: (args) => (
    <Card {...args} style={{ width: '350px' }}>
      <CardHeader>
        <CardTitle>Note Card</CardTitle>
        <CardDescription>
          Yellow theme cards can be used for notes or announcements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          The yellow theme provides high visibility while maintaining the
          Mondrian aesthetic.
        </p>
      </CardContent>
      <CardFooter>
        <Button theme="yellow" size="sm">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Green: Story = {
  args: {
    theme: 'green',
    size: 'default',
  },
  render: (args) => (
    <Card {...args} style={{ width: '350px' }}>
      <CardHeader>
        <CardTitle>Success Card</CardTitle>
        <CardDescription>
          Green theme indicates success or completion.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Green cards are useful for presenting successful operations or
          completed steps.
        </p>
      </CardContent>
      <CardFooter>
        <Button theme="green" size="sm">
          Continue
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Large: Story = {
  args: {
    theme: 'blue',
    size: 'lg',
  },
  render: (args) => (
    <Card {...args} style={{ width: '400px' }}>
      <CardHeader>
        <CardTitle>Large Card</CardTitle>
        <CardDescription>
          This is a larger variant of the card component.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Large cards can be used for featuring important content or as the main
          focal point of a section.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="lg">Primary Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Small: Story = {
  args: {
    theme: 'neutral',
    size: 'sm',
  },
  render: (args) => (
    <Card {...args} style={{ width: '300px' }}>
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
        <CardDescription>
          A compact card for secondary information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Small cards work well for side panels or supporting information.</p>
      </CardContent>
      <CardFooter>
        <Button theme="neutral" size="sm">
          Optional Action
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const NoHeader: Story = {
  args: {
    theme: 'blue',
  },
  render: (args) => (
    <Card {...args} style={{ width: '350px' }}>
      <CardContent>
        <p>
          This is a simplified card without a header, useful for when you just
          need to present content without a title.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const NoFooter: Story = {
  args: {
    theme: 'blue',
  },
  render: (args) => (
    <Card {...args} style={{ width: '350px' }}>
      <CardHeader>
        <CardTitle>No Footer Card</CardTitle>
        <CardDescription>
          This card has no footer section, focusing only on content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Cards without footers are useful when you don&apos;t need action
          buttons or additional information at the bottom.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  args: {
    theme: 'blue',
  },
  render: (args) => (
    <Card {...args} style={{ width: '350px' }}>
      <CardHeader>
        <CardTitle>Card with Image</CardTitle>
        <CardDescription>
          Cards can contain images in their content area.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          style={{
            width: '100%',
            height: '180px',
            backgroundColor: 'var(--mondrian-blue)',
            marginBottom: '16px',
            border: '2px solid var(--mondrian-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--mondrian-white)',
            fontWeight: 'bold',
          }}
        >
          Image Placeholder
        </div>
        <p>
          Images can be included within card content while maintaining the
          Mondrian aesthetic.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">View Details</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithMultipleActions: Story = {
  args: {
    theme: 'blue',
  },
  render: (args) => (
    <Card {...args} style={{ width: '350px' }}>
      <CardHeader>
        <CardTitle>Multiple Actions</CardTitle>
        <CardDescription>
          Card footers can contain multiple action buttons.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          For more complex interactions, cards can include multiple action
          buttons in the footer.
        </p>
      </CardContent>
      <CardFooter
        style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}
      >
        <Button theme="neutral" size="sm">
          Cancel
        </Button>
        <Button size="sm">Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithIcon: Story = {
  args: {
    theme: 'green',
  },
  render: (args) => (
    <Card {...args} style={{ width: '350px' }}>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Check
            style={{
              color: 'var(--mondrian-success)',
              width: '24px',
              height: '24px',
            }}
          />
          <CardTitle>Success Status</CardTitle>
        </div>
        <CardDescription>
          Icons can be incorporated in card headers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Using icons alongside titles helps communicate status or purpose at a
          glance.
        </p>
      </CardContent>
      <CardFooter>
        <Button theme="green" size="sm">
          Continue
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const WithErrorState: Story = {
  args: {
    theme: 'red',
  },
  render: (args) => (
    <Card {...args} style={{ width: '350px' }}>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Cross
            style={{
              color: 'var(--mondrian-error)',
              width: '24px',
              height: '24px',
            }}
          />
          <CardTitle>Error State</CardTitle>
        </div>
        <CardDescription>
          Error state with prominent visual indicators.
        </CardDescription>
      </CardHeader>
      <CardContent
        style={{
          border: '2px solid var(--mondrian-error)',
          backgroundColor: 'rgba(212, 32, 41, 0.05)',
        }}
      >
        <p>
          This card demonstrates how to represent error states while maintaining
          the Mondrian aesthetic.
        </p>
      </CardContent>
      <CardFooter>
        <Button theme="red" size="sm">
          Fix Error
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const NestedLayout: Story = {
  args: {
    theme: 'blue',
  },
  render: (args) => (
    <Card {...args} style={{ width: '400px' }}>
      <CardHeader>
        <CardTitle>Nested Content</CardTitle>
        <CardDescription>
          Cards can contain nested layouts and complex content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Box
          style={{
            padding: '12px',
            marginBottom: '12px',
            border: '2px solid var(--mondrian-black)',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0' }}>Section One</h4>
          <p style={{ margin: '0' }}>
            This is the first content section in a nested layout.
          </p>
        </Box>
        <Box
          style={{
            padding: '12px',
            border: '2px solid var(--mondrian-yellow)',
            backgroundColor: 'rgba(255, 222, 3, 0.05)',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', color: 'var(--mondrian-yellow)' }}>
            Section Two
          </h4>
          <p style={{ margin: '0' }}>
            This is the second content section with different styling.
          </p>
        </Box>
      </CardContent>
      <CardFooter>
        <Button size="sm">View All Sections</Button>
      </CardFooter>
    </Card>
  ),
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '24px', padding: '8px 24px 24px 8px' }}>
      {(['blue', 'neutral', 'red', 'yellow', 'green'] as const).map((theme) => (
        <Card key={theme} theme={theme} style={{ width: '350px' }}>
          <CardHeader>
            <CardTitle>{theme} card</CardTitle>
            <CardDescription>One plane, one swatch, one bar.</CardDescription>
          </CardHeader>
          <CardContent>
            Content sits on white, away from the swatch.
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div
      data-theme="dark"
      style={{ display: 'grid', gap: '24px', padding: '16px 24px 24px 16px' }}
    >
      {(['blue', 'neutral', 'red', 'yellow'] as const).map((theme) => (
        <Card key={theme} theme={theme} style={{ width: '350px' }}>
          <CardHeader>
            <CardTitle>{theme} card</CardTitle>
            <CardDescription>Lines invert; planes stay.</CardDescription>
          </CardHeader>
          <CardContent>Content on black.</CardContent>
        </Card>
      ))}
    </div>
  ),
};
