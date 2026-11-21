import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../Label/Label';
import { InputOTP } from './InputOTP';

const meta: Meta<typeof InputOTP> = {
  title: 'Forms/InputOTP',
  component: InputOTP,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A row of single-character cells sharing one black grid, with a heavy bottom bar. Cells never change color: hover and focus thicken the cell's border inward, focus more than hover.

Typing advances, Backspace retreats, and pasting a code fills the row. Hover does not move it. The first cell carries the id; give the row its name with \`aria-label\` or \`aria-labelledby\`.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: 'number',
      description: 'Number of cells',
      table: { defaultValue: { summary: '6' } },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Square size from the library scale',
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    id: 'otp',
    length: 6,
    size: 'default',
    'aria-label': 'Verification code',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '4px 72px 48px 0' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { id: 'otp-label', 'aria-label': undefined },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label id="otp-label-text">Verification code</Label>
      <InputOTP {...args} aria-labelledby="otp-label-text" />
    </div>
  ),
};

export const FourDigits: Story = {
  args: {
    id: 'otp-four',
    length: 4,
    inputMode: 'numeric',
    'aria-label': 'Four digit code',
  },
};

export const Filled: Story = {
  args: { id: 'otp-filled', defaultValue: '123456' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <InputOTP id="otp-sm" size="sm" length={4} aria-label="Small code" />
      <InputOTP id="otp-md" length={4} aria-label="Default code" />
      <InputOTP id="otp-lg" size="lg" length={4} aria-label="Large code" />
    </div>
  ),
};

export const Invalid: Story = {
  args: { id: 'otp-invalid', defaultValue: '000000', 'aria-invalid': true },
};

export const Disabled: Story = {
  args: { id: 'otp-disabled', defaultValue: '123456', disabled: true },
};
