import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';
import { Label } from '../Label/Label';

const frame = {
  width: '360px',
  padding: '4px 72px 48px 0',
};

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A multiline field drawn as one white plane inside a black grid of a single weight.

The border stays black in light and dark. Text stays black on white. Theme uses the same names as Input and Label, and none of them recolor this plane. Rows pass through to the native element. The field resizes vertically only. Hover leaves the plane where it is. Keyboard focus shifts it and leaves a black offset shadow. Place a Label beside it; this component has no label of its own.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'green', 'yellow'],
      description:
        'Shared theme name. The plane stays black on white for every value.',
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
