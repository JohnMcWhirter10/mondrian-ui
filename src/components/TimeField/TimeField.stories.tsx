import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimeField } from './TimeField';
import { Label } from '../Label/Label';

const frame = {
  width: '280px',
  padding: '4px 72px 48px 0',
};

const meta: Meta<typeof TimeField> = {
  title: 'Forms/TimeField',
  component: TimeField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A native time field that reuses the Input grid: a white plane inside a black line, a heavy bottom bar, and a flat swatch of the theme plane on that bar.

The value is the browser's string and the glyph opens the browser picker (24px hit box). Hover does not move it. Focus draws the standard outline. An invalid field (aria-invalid) doubles its left bar and runs the swatch the full length of the bottom bar. Place a Label beside it; this component has no label of its own.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'yellow'],
      description: 'Plane color of the swatch on the bottom bar',
      table: { defaultValue: { summary: 'blue' } },
    },
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

const planes = ['blue', 'neutral', 'red', 'yellow'] as const;

export const Themes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '280px',
      }}
    >
      {planes.map((theme) => (
        <TimeField
          key={theme}
          theme={theme}
          aria-label={`${theme} time`}
          defaultValue="09:30"
        />
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '280px',
      }}
    >
      <Label htmlFor="invalid-time" theme="red">
        Time
      </Label>
      <TimeField
        id="invalid-time"
        aria-invalid="true"
        aria-describedby="invalid-time-error"
      />
      <span id="invalid-time-error" role="alert">
        Error: enter a time.
      </span>
    </div>
  ),
};
