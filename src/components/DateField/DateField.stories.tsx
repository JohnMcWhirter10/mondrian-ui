import type { Meta, StoryObj } from '@storybook/react';
import { DateField } from './DateField';
import { Label } from '../Label/Label';

const frame = {
  width: '280px',
  padding: '4px 72px 48px 0',
};

const meta: Meta<typeof DateField> = {
  title: 'Components/DateField',
  component: DateField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A native date field drawn as one white plane inside a black grid of a single weight.

The border stays black in light and dark. Text stays black on white until the field takes keyboard focus, when the plane fills with blue and the text turns white. The value is the browser's \`YYYY-MM-DD\` string. The calendar button stays inside the rectangle and opens the browser picker. Hover leaves the plane where it is. Place a Label beside it; this component has no label of its own.
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
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    size: 'default',
    'aria-label': 'Date',
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
type Story = StoryObj<typeof DateField>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: '2026-11-07',
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
      <DateField size="sm" aria-label="Small date" defaultValue="2026-11-07" />
      <DateField aria-label="Default date" defaultValue="2026-11-07" />
      <DateField size="lg" aria-label="Large date" defaultValue="2026-11-07" />
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
      <Label htmlFor="start-date" theme="blue">
        Start
      </Label>
      <DateField id="start-date" defaultValue="2026-11-07" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '2026-11-07',
  },
};
