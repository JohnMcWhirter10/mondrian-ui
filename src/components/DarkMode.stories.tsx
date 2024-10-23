import React from 'react';
import { ThemeProvider, useTheme } from '../themes';
import Input from './Input';
import Checkbox from './Checkbox/Checkbox';
import Button from './Button';
import { Meta } from '@storybook/react';

export const ToggleDarkMode = () => {
  const { theme, setDarkMode, setPrimaryColor } = useTheme();

  const handleToggle = () => {
    setDarkMode(!theme.darkMode);
  };

  const handleColorChange = (color: string) => {
    setPrimaryColor(color);
  };

  return (
    <>
      <Button /> <br />
      <Input placeholder="Input Field" label={'Input Field Label'} />
      <br />
      <Checkbox label="Checkbox Label" />
      <br />
      <Button onClick={handleToggle}>
        Toggle Dark Mode (Current: {theme.darkMode ? 'On' : 'Off'})
      </Button>
      <Button onClick={() => handleColorChange('#FF5733')}>
        Set Primary to Coral
      </Button>
      <Button onClick={() => handleColorChange('#007BFF')}>
        Set Primary to Blue
      </Button>
      <Button onClick={() => handleColorChange('#28A745')}>
        Set Primary to Green
      </Button>
    </>
  );
};

export default {
  title: 'Dark Mode',
  component: ToggleDarkMode,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;
