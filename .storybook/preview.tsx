import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/themes';

const preview: Preview = {
  parameters: {
    options: {
      // Sidebar order: components grouped by what they do, not alphabetically.
      // Storybook serializes this function, so it must not use outer variables.
      // Sidebar order: components grouped by what they do, not alphabetically.
      // Storybook reads this function as plain JavaScript and serializes it, so
      // it uses no TypeScript syntax and no outer variables.
      storySort: (a, b) => {
        const groups = [
          'Foundations',
          'Layout',
          'Content',
          'Forms',
          'Navigation',
          'Disclosure',
          'Overlays',
          'Feedback',
          'Examples',
        ];
        if (a.title === b.title) {
          // Within a component: Default first, then file order.
          if (a.name === 'Default' && b.name !== 'Default') return -1;
          if (b.name === 'Default' && a.name !== 'Default') return 1;
          return 0;
        }
        const rankA = groups.indexOf(a.title.split('/')[0]);
        const rankB = groups.indexOf(b.title.split('/')[0]);
        return (
          (rankA === -1 ? groups.length : rankA) -
            (rankB === -1 ? groups.length : rankB) ||
          a.title.localeCompare(b.title)
        );
      },
    },
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
