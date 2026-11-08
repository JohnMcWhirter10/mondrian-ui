import type { Meta, StoryObj } from '@storybook/react-vite';
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
A native date field that reuses the Input grid: a white plane inside a black line, a heavy bottom bar, and a flat swatch of the theme plane on that bar.

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
        <DateField
          key={theme}
          theme={theme}
          aria-label={`${theme} date`}
          defaultValue="2026-11-07"
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
      <Label htmlFor="invalid-date" theme="red">
        Date
      </Label>
      <DateField
        id="invalid-date"
        aria-invalid="true"
        aria-describedby="invalid-date-error"
      />
      <span id="invalid-date-error" role="alert">
        Error: enter a date.
      </span>
    </div>
  ),
};

export const Dark: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        width: '280px',
      }}
    >
      {planes.map((theme) => (
        <DateField
          key={theme}
          theme={theme}
          aria-label={`${theme} date`}
          defaultValue="2026-11-07"
        />
      ))}
      <DateField aria-label="Invalid date" aria-invalid="true" />
    </div>
  ),
};
