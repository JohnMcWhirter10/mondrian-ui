import React from 'react';
import Checkbox from './Checkbox';
import { Meta, StoryFn } from '@storybook/react/*';
import { ThemeProvider } from '../../themes';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Checkbox',
  id: 'primary-checkbox',
  theme: 'primary',
};

export const Light = Template.bind({});
Light.args = {
  label: 'Light Checkbox',
  id: 'light-checkbox',
  theme: 'light',
};

export const Dark = Template.bind({});
Dark.args = {
  label: 'Dark Checkbox',
  id: 'dark-checkbox',
  theme: 'dark',
};

export const Error = Template.bind({});
Error.args = {
  label: 'Error Checkbox',
  id: 'error-checkbox',
  theme: 'error',
};

export const Success = Template.bind({});
Success.args = {
  label: 'Success Checkbox',
  id: 'success-checkbox',
  theme: 'success',
};
