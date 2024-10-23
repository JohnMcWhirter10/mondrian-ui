import { StoryFn, Meta } from '@storybook/react';
import Button from './Button';
import { ThemeProvider, useTheme } from '../../themes';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  theme: 'primary',
};

export const Light = Template.bind({});
Light.args = {
  children: 'Light Button',
  theme: 'light',
};

export const Dark = Template.bind({});
Dark.args = {
  children: 'Dark Button',
  theme: 'dark',
};

export const Error = Template.bind({});
Error.args = {
  children: 'Error Button',
  theme: 'error',
};

export const Success = Template.bind({});
Success.args = {
  children: 'Success Button',
  theme: 'success',
};
