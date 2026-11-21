import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from './Form';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Label } from '../Label/Label';

const meta: Meta<typeof Form> = {
  title: 'Forms/Form',
  component: Form,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A native form that stacks its fields in one column. It is layout only: it adds no label props and does not manage validation. Put a `Label` beside each control and give each control an `id`.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: (args) => (
    <Form
      {...args}
      aria-label="Sign in"
      style={{ maxWidth: '360px' }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <Label htmlFor="form-email">Email</Label>
        <Input id="form-email" type="email" autoComplete="email" />
      </div>
      <div>
        <Label htmlFor="form-password">Password</Label>
        <Input id="form-password" type="password" />
      </div>
      <Button type="submit">Sign in</Button>
    </Form>
  ),
};

export const Dark: Story = {
  ...Default,
  globals: { mode: 'dark' },
};
