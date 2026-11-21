import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from './Menubar';

const meta: Meta<typeof Menubar> = {
  title: 'Navigation/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A persistent horizontal application menu built on `@radix-ui/react-menubar`. Triggers sit on one heavy black rule and the open trigger fills with the plane colour and is underlined. Menus reuse the `DropdownMenu` item styles. Left and right arrows move across menus, up and down move within one.',
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
type Story = StoryObj<typeof Menubar>;

export const Basic: Story = {
  render: (args) => (
    <div style={{ width: 420, minHeight: 260 }}>
      <Menubar aria-label="Application" {...args}>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New window</MenubarItem>
            <MenubarItem disabled>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Export</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>PDF</MenubarItem>
                <MenubarItem>PNG</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked>
              Always show toolbar
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value="large">
              <MenubarRadioItem value="small">Small</MenubarRadioItem>
              <MenubarRadioItem value="large">Large</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  ),
};

export const Red: Story = { ...Basic, args: { theme: 'red' } };

export const Dark: Story = {
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
