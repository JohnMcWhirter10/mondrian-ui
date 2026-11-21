import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './NavigationMenu';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Navigation/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A site navigation bar built on `@radix-ui/react-navigation-menu`. Triggers sit on a heavy black rule and open rectangular panels beneath it. Panels slide by transform, never fade, and not at all under reduced motion. Arrow keys, Home, End and focus handling come from Radix. The open trigger and current link fill with the plane and are underlined.',
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
type Story = StoryObj<typeof NavigationMenu>;

const Links = ({ items }: { items: string[] }) => (
  <div style={{ display: 'grid', gap: 4, minWidth: 220 }}>
    {items.map((i) => (
      <NavigationMenuLink key={i} href={`#${i.toLowerCase()}`}>
        {i}
      </NavigationMenuLink>
    ))}
  </div>
);

export const Basic: Story = {
  render: (args) => (
    <div style={{ minHeight: 260 }}>
      <NavigationMenu aria-label="Main" {...args}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Links items={['Alpha', 'Beta', 'Gamma']} />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Company</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Links items={['About', 'Careers']} />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#docs" active>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
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
