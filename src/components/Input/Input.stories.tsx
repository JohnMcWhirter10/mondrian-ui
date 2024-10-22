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

export const ToggleDarkMode = () => {
  const { theme, setDarkMode, setPrimaryColor } = useTheme();
  const handleToggle = () => {
    setDarkMode(!theme.darkMode);
  };

  const handleColorChange = (color: string) => {
    setPrimaryColor(color);
  };

  return (
    <div>
      <Input placeholder="Input Field" label={'Input Field Label'} />
      <br />
      <Button onClick={handleToggle}>
        Toggle Dark Mode (Current: {theme.darkMode ? 'On' : 'Off'})
      </Button>
      <br />
      <Button onClick={() => handleColorChange('#FF5733')}>
        Set Primary to Coral
      </Button>
      <br />
      <Button onClick={() => handleColorChange('#007BFF')}>
        Set Primary to Blue
      </Button>
      <br />
      <Button onClick={() => handleColorChange('#28A745')}>
        Set Primary to Green
      </Button>
      <br />
    </div>
  );
};
