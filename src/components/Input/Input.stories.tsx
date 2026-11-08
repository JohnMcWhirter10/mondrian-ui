import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { Label } from '../Label/Label';
import { ThemeProvider } from '../../themes';

const plane = ['blue', 'neutral', 'red', 'yellow'] as const;

// Define the component metadata for Storybook
const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          A white plane inside a black grid: base-weight verticals, a heavy bottom bar, and a flat swatch of the theme plane on that bar.
          Hover does not move it. Focus draws the standard outline. An invalid field (aria-invalid) doubles its left bar and runs the swatch the full length of the bottom bar.
          Note: To maintain single responsibility, Labels should be added separately using the Label component.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'green', 'yellow'],
      description: 'The theme color for the input',
    },
    id: {
      control: 'text',
      description: 'The ID for the input, used for accessibility with labels',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

// Standalone Input
export const Blue: Story = {
  args: {
    placeholder: 'Blue Input',
    theme: 'blue',
    id: 'blue-input',
  },
};

// Input with Label example (render function needed to compose components)
export const WithLabel: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label htmlFor="input-with-label" theme={args.theme} position="top">
        Input Label
      </Label>
      <Input {...args} id="input-with-label" />
    </div>
  ),
  args: {
    placeholder: 'Input with external label',
    theme: 'blue',
  },
};

export const Neutral: Story = {
  args: {
    placeholder: 'Neutral Input',
    theme: 'neutral',
    id: 'neutral-input',
  },
};

export const Red: Story = {
  args: {
    placeholder: 'Red Input',
    theme: 'red',
    id: 'red-input',
  },
};

export const Green: Story = {
  args: {
    placeholder: 'Green Input',
    theme: 'green',
    id: 'green-input',
  },
};

export const Yellow: Story = {
  args: {
    placeholder: 'Yellow Input',
    theme: 'yellow',
    id: 'yellow-input',
  },
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {plane.map((theme) => (
        <Input
          key={theme}
          theme={theme}
          aria-label={`${theme} input`}
          placeholder={`${theme} input`}
        />
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label htmlFor="invalid-input" theme="red" position="top">
        Email
      </Label>
      <Input
        id="invalid-input"
        aria-invalid="true"
        aria-describedby="invalid-input-error"
        defaultValue="not-an-email"
      />
      <span id="invalid-input-error" role="alert">
        Error: enter an email address like name@example.com.
      </span>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled input' },
};
