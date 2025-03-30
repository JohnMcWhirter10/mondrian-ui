import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoginSample } from './Login';
import { BlogSample } from './Blog';
import { ContactFormSample } from './ContactForm';
import { Box } from '../components';

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

export const Blog: StoryObj = {
  render: () => <BlogSample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A blog listing page example using Mondrian UI components. Demonstrates responsive layout, cards, and interactive content.',
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
