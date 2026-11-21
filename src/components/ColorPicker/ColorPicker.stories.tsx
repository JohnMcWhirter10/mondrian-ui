import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Forms/ColorPicker',
  component: ColorPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { defaultValue: 'red', 'aria-label': 'Plane colour' },
  argTypes: {
    primary: {
      control: 'select',
      options: ['red', 'blue', 'yellow', 'black', 'white'],
      description: 'The colour that takes the large cell.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {};

export const PrimaryBlue: Story = {
  args: { primary: 'blue', defaultValue: 'blue' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Dark: Story = {
  globals: { mode: 'dark' },
};
