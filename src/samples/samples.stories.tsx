import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginSample } from './Login';
import { ContactFormSample } from './ContactForm';

const meta = {
  title: 'Examples/Samples',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

export const Login: StoryObj = {
  render: () => <LoginSample />,
  parameters: {
    docs: {
      description: {
        story:
          'A login form example using Mondrian UI components. Demonstrates form inputs, validation, and alerts.',
      },
    },
  },
};

export const ContactForm: StoryObj = {
  render: () => <ContactFormSample />,
  parameters: {
    docs: {
      description: {
        story:
          'A contact form example using Mondrian UI components. Demonstrates form controls, select dropdowns, checkboxes, and validation.',
      },
    },
  },
};
