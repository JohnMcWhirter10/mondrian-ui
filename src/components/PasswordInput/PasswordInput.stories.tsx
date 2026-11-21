import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordInput } from './PasswordInput';
import { Label } from '../Label/Label';

const frame = {
  width: '320px',
  padding: '4px 72px 48px 0',
};

const meta: Meta<typeof PasswordInput> = {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A password field and a show/hide button inside one rectangle: a white plane, a black grid, a heavy bottom bar, and a flat swatch of the theme plane. The default plane is noncolor.

The button's name is "Show password" or "Hide password". Hover lifts only that cell up and to the left, leaving a hard shadow at its resting spot, and pressing drops it back onto that spot. No color change, and nothing leaves the rectangle. The rectangle does not move. Focus draws the standard outline. Place a Label beside it; this component has no label of its own.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['neutral', 'blue', 'red', 'yellow', 'green'],
      description: 'Plane color of the swatch on the bottom bar',
      table: { defaultValue: { summary: 'neutral' } },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Plane proportion from the library scale',
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: { control: 'boolean' },
    visible: { control: 'boolean' },
  },
  args: {
    id: 'password',
    theme: 'neutral',
    size: 'default',
    placeholder: 'Password',
    autoComplete: 'current-password',
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
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { id: 'password-label' },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label htmlFor="password-label">Password</Label>
      <PasswordInput {...args} />
    </div>
  ),
};

export const Revealed: Story = {
  args: { id: 'password-revealed', defaultVisible: true, defaultValue: 'grid' },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        width: '320px',
      }}
    >
      <PasswordInput id="password-sm" size="sm" placeholder="Small" />
      <PasswordInput id="password-md" placeholder="Default" />
      <PasswordInput id="password-lg" size="lg" placeholder="Large" />
    </div>
  ),
};

export const Planes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        width: '320px',
      }}
    >
      <PasswordInput
        id="password-neutral"
        theme="neutral"
        placeholder="Neutral"
      />
      <PasswordInput id="password-blue" theme="blue" placeholder="Blue" />
      <PasswordInput id="password-red" theme="red" placeholder="Red" />
      <PasswordInput id="password-yellow" theme="yellow" placeholder="Yellow" />
      <PasswordInput id="password-green" theme="green" placeholder="Green" />
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    id: 'password-invalid',
    'aria-invalid': true,
    defaultValue: 'short',
  },
};

export const Disabled: Story = {
  args: { id: 'password-disabled', disabled: true, defaultValue: 'hidden' },
};
