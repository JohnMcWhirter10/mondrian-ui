import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Label } from '../Label/Label';
import { Plus } from '../icons/Plus';
import { InputGroup, InputGroupInput, InputGroupSlot } from './InputGroup';

const frame = {
  width: '360px',
  padding: '4px 72px 48px 0',
};

const meta: Meta<typeof InputGroup> = {
  title: 'Forms/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A field with start and end slots inside one rectangle: a white plane, a black grid, a heavy bottom bar, and a flat swatch of the theme plane. The default plane is noncolor.

Slots take an icon, text, or a button as children. A button in a slot is a cell of the grid: it has no border of its own and it does not move the rectangle. Hover leaves the group where it is. Focus draws the standard outline. Place a Label beside the field; the group has no label of its own.
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
  },
  args: {
    theme: 'neutral',
    size: 'default',
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
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupSlot side="start">https://</InputGroupSlot>
      <InputGroupInput id="site" placeholder="example.com" />
      <InputGroupSlot side="end">
        <Button type="button">Go</Button>
      </InputGroupSlot>
    </InputGroup>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label htmlFor="amount">Amount</Label>
      <InputGroup {...args}>
        <InputGroupSlot side="start">
          <Plus size={16} />
        </InputGroupSlot>
        <InputGroupInput id="amount" placeholder="0" inputMode="numeric" />
        <InputGroupSlot side="end">
          <Button type="button">Add</Button>
        </InputGroupSlot>
      </InputGroup>
    </div>
  ),
};

export const StartSlot: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupSlot side="start">To</InputGroupSlot>
      <InputGroupInput id="recipient" placeholder="Name" />
    </InputGroup>
  ),
};

export const EndSlot: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput id="search" placeholder="Search" />
      <InputGroupSlot side="end">
        <Button type="button">Find</Button>
      </InputGroupSlot>
    </InputGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <InputGroup size="sm">
        <InputGroupSlot side="start">https://</InputGroupSlot>
        <InputGroupInput id="site-sm" placeholder="Small" />
      </InputGroup>
      <InputGroup>
        <InputGroupSlot side="start">https://</InputGroupSlot>
        <InputGroupInput id="site-md" placeholder="Default" />
      </InputGroup>
      <InputGroup size="lg">
        <InputGroupSlot side="start">https://</InputGroupSlot>
        <InputGroupInput id="site-lg" placeholder="Large" />
      </InputGroup>
    </div>
  ),
};

export const Planes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {(['neutral', 'blue', 'red', 'yellow', 'green'] as const).map((theme) => (
        <InputGroup key={theme} theme={theme}>
          <InputGroupSlot side="start">https://</InputGroupSlot>
          <InputGroupInput id={`site-${theme}`} placeholder={theme} />
        </InputGroup>
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupSlot side="start">https://</InputGroupSlot>
      <InputGroupInput
        id="site-invalid"
        defaultValue="not a host"
        aria-invalid
      />
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupSlot side="start">https://</InputGroupSlot>
      <InputGroupInput id="site-disabled" defaultValue="example.com" disabled />
      <InputGroupSlot side="end">
        <Button type="button" disabled>
          Go
        </Button>
      </InputGroupSlot>
    </InputGroup>
  ),
};
