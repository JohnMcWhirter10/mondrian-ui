import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/themes';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
  },

  // Stories start in light mode regardless of the OS setting, so "light" is
  // always light. Use the toolbar to preview dark or follow the system.
  initialGlobals: {
    mode: 'light',
  },

  globalTypes: {
    mode: {
      description: 'Color mode',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'browser' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => (
      <ThemeProvider mode={context.globals.mode ?? 'light'}>
        <Story />
      </ThemeProvider>
    ),
  ],

  tags: ['autodocs'],
};

export default preview;
