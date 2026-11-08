import type { Meta, StoryObj } from '@storybook/react';
import { TimeField } from './TimeField';
import { Label } from '../Label/Label';

const frame = {
  width: '280px',
  padding: '4px 72px 48px 0',
};

const meta: Meta<typeof TimeField> = {
  title: 'Components/TimeField',
  component: TimeField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A native time field drawn as one white plane inside a black grid of a single weight.

The border, size scale, and focus shift are the same rules as Input, so the grid line stays one weight. The border stays black in light and dark. Text stays black on white until the field is focused, when the plane fills with blue and the text turns white. The value is the browser's time string. \`step\` passes through in seconds. The clock stays inside the rectangle and opens the browser picker. Hover leaves the plane where it is. Place a Label beside it; this component has no label of its own.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Plane proportion from the library scale',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    step: {
      control: 'number',
      description: 'Native step, in seconds. 1 shows seconds.',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    size: 'default',
    'aria-label': 'Time',
  },
  decorators: [
    (Story) => (
      <div style={frame}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TimeField>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: '09:30',
  },
};

export const WithSeconds: Story = {
  args: {
    step: 1,
    defaultValue: '09:30:00',
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '28px',
        width: '280px',
      }}
    >
      <TimeField size="sm" aria-label="Small time" defaultValue="09:30" />
      <TimeField aria-label="Default time" defaultValue="09:30" />
      <TimeField size="lg" aria-label="Large time" defaultValue="09:30" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '280px',
        gap: '8px',
      }}
    >
      <Label htmlFor="start-time" theme="blue">
        Start
      </Label>
      <TimeField id="start-time" defaultValue="09:30" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '09:30',
  },
};
