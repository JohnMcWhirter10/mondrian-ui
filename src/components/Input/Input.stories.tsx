import { StoryFn, Meta } from '@storybook/react';
import Input from './Input';
import { ThemeProvider, useTheme } from '../../themes';
import Button from '../Button';

export default {
  title: 'Components/Input',
  component: Input,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Input',
  placeholder: 'Primary Input',
  theme: 'primary',
};

export const Light = Template.bind({});
Light.args = {
  placeholder: 'Light Input',
  label: 'Light Input',
  theme: 'light',
};

export const Dark = Template.bind({});
Dark.args = {
  placeholder: 'Dark Input',
  label: 'Dark Input',
  theme: 'dark',
};

export const Error = Template.bind({});
Error.args = {
  placeholder: 'Error Input',
  label: 'Error Input',
  theme: 'error',
};

export const Success = Template.bind({});
Success.args = {
  placeholder: 'Success Input',
  label: 'Success Input',
  theme: 'success',
};
