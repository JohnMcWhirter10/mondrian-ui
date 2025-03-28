import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion';
import { ThemeProvider } from '../../themes';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'green', 'yellow'],
      description: 'The visual theme of the accordion',
      defaultValue: 'blue',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the accordion',
      defaultValue: 'default',
    },
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether one or multiple items can be open at once',
      defaultValue: 'single',
    },
    collapsible: {
      control: 'boolean',
      description:
        'When type is "single", determines whether the open item can be closed by clicking it',
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    type: 'single',
    defaultValue: 'item-1',
    theme: 'blue',
    size: 'default',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is mondrian-ui?</AccordionTrigger>
        <AccordionContent>
          mondrian-ui is a React component library inspired by Piet Mondrian's
          neoplasticism style, featuring clean rectangular shapes, primary
          colors, and strong grid lines.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Which dependencies are used?</AccordionTrigger>
        <AccordionContent>
          mondrian-ui is built on top of Radix UI primitives to provide
          accessible and composable components with a Mondrian-inspired design.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          You can install mondrian-ui via npm or yarn:
          <pre>npm install mondrian-ui</pre>
          <pre>yarn add mondrian-ui</pre>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const NonCollapsible: Story = {
  args: {
    ...Default.args,
    collapsible: false,
  },
  render: Default.render,
};

export const Red: Story = {
  args: {
    ...Default.args,
    theme: 'red',
  },
  render: Default.render,
};

export const Yellow: Story = {
  args: {
    ...Default.args,
    theme: 'yellow',
  },
  render: Default.render,
};

export const Green: Story = {
  args: {
    ...Default.args,
    theme: 'green',
  },
  render: Default.render,
};

export const Neutral: Story = {
  args: {
    ...Default.args,
    theme: 'neutral',
  },
  render: Default.render,
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
  render: Default.render,
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
  render: Default.render,
};

export const Multiple: Story = {
  args: {
    ...Default.args,
    type: 'multiple',
    defaultValue: ['item-1', 'item-3'],
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>
          This is the first accordion item. You can have multiple items open
          simultaneously.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>
          This is the second accordion item. Try opening it while others are
          open.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Item</AccordionTrigger>
        <AccordionContent>
          This is the third accordion item. Multiple items can be expanded at
          once.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
