import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';
import { Label } from '../Label/Label';

const frame = {
  width: '360px',
  padding: '4px 72px 48px 0',
};

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A multiline field: a white plane inside a black grid, with a heavy bottom bar and a flat swatch of the theme plane on that bar.

Hover does not move it. Focus draws the standard outline. An invalid field (aria-invalid) doubles its left bar and runs the swatch the full length of the bottom bar. Rows pass through to the native element, and the field resizes vertically only. Place a Label beside it; this component has no label of its own.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'green', 'yellow'],
      description: 'Plane color of the swatch on the bottom bar.',
      table: {
        defaultValue: { summary: 'blue' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Plane proportion from the library scale',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    rows: {
      control: 'number',
      description: 'Native rows, passed through',
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    placeholder: 'Write a paragraph',
    theme: 'blue',
    size: 'default',
    rows: 5,
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
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '28px',
        width: '360px',
      }}
    >
      <Textarea size="sm" rows={3} placeholder="Small" />
      <Textarea rows={5} placeholder="Default" />
      <Textarea size="lg" rows={6} placeholder="Large" />
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
        width: '360px',
        gap: '8px',
      }}
    >
      <Label htmlFor="message" theme="blue">
        Message
      </Label>
      <Textarea id="message" rows={5} placeholder="Your message" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'This plane does not move.',
    placeholder: undefined,
  },
};

const planes = ['blue', 'neutral', 'red', 'yellow'] as const;

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {planes.map((theme) => (
        <Textarea
          key={theme}
          theme={theme}
          rows={3}
          aria-label={`${theme} textarea`}
          placeholder={theme}
        />
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label htmlFor="invalid-message" theme="red" position="top">
        Message
      </Label>
      <Textarea
        id="invalid-message"
        rows={4}
        aria-invalid="true"
        aria-describedby="invalid-message-error"
        defaultValue="Hi"
      />
      <span id="invalid-message-error" role="alert">
        Error: write at least 20 characters.
      </span>
    </div>
  ),
};
