import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from './ContextMenu';

const meta: Meta<typeof ContextMenu> = {
  title: 'Navigation/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A right-click and long-press menu built on `@radix-ui/react-context-menu`. It shares its frame, rows, separators and sub-menus with `DropdownMenu`, so the two look identical. Arrow keys, Enter, Escape and type-ahead come from Radix. Highlighted rows invert and gain a left bar and underline, never colour alone.',
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'red', 'yellow', 'green', 'neutral'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

const Region = ({ children }: { children: React.ReactNode }) => (
  <ContextMenuTrigger>
    <div
      style={{
        width: 280,
        height: 140,
        display: 'grid',
        placeItems: 'center',
        border: '2px dashed var(--mondrian-border)',
        fontFamily: 'var(--mondrian-font-family)',
        color: 'var(--mondrian-text)',
        background: 'var(--mondrian-background)',
      }}
    >
      {children}
    </div>
  </ContextMenuTrigger>
);

export const Basic: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <Region>Right click here</Region>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem disabled>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Inspect</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithSubMenuAndChoices: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <Region>Right click here</Region>
      <ContextMenuContent>
        <ContextMenuLabel>View</ContextMenuLabel>
        <ContextMenuCheckboxItem checked>
          Show bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="comfortable">
          <ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem>
          <ContextMenuRadioItem value="comfortable">
            Comfortable
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save page</ContextMenuItem>
            <ContextMenuItem>Developer tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['blue', 'red', 'yellow', 'green', 'neutral'] as const).map((t) => (
        <ContextMenu key={t} theme={t}>
          <ContextMenuTrigger>
            <div
              style={{
                padding: 16,
                border: '2px solid var(--mondrian-border)',
                fontFamily: 'var(--mondrian-font-family)',
                color: 'var(--mondrian-text)',
              }}
            >
              {t}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>First</ContextMenuItem>
            <ContextMenuItem>Second</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  ),
};

export const Dark: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  decorators: [
    (Story) => (
      <div
        className="dark"
        data-theme="dark"
        style={{ padding: 24, background: 'var(--mondrian-background)' }}
      >
        <Story />
      </div>
    ),
  ],
  render: Basic.render,
};
