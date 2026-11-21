import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { defaultValue: [40], 'aria-label': 'Value' },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    theme: {
      control: 'select',
      options: ['red', 'blue', 'yellow', 'neutral', 'green'],
      description: 'Plane colour of the range. Green means success only.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8 }}>
      {(['red', 'blue', 'yellow', 'neutral'] as const).map((theme) => (
        <Slider
          key={theme}
          theme={theme}
          defaultValue={[50]}
          aria-label={theme}
        />
      ))}
    </div>
  ),
};

export const Range: Story = {
  args: { defaultValue: [25, 75], 'aria-label': undefined },
};

export const Stepped: Story = {
  args: { step: 10, defaultValue: [30] },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Dark: Story = {
  globals: { mode: 'dark' },
};
