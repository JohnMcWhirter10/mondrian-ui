import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Typography';
import { Text } from './Typography';

const meta: Meta<typeof Heading> = {
  title: 'Components/Typography',
  component: Heading,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
\`Heading\` and \`Text\` use the theme type scale, set in Helvetica or Arial from \`--mondrian-font-family\`.

\`level\` picks the scale step. \`as\` picks the element, so visual level and document outline stay separate.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Scale step and default element',
      table: { defaultValue: { summary: '2' } },
    },
    as: {
      control: 'select',
      options: [
        undefined,
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'div',
        'span',
        'p',
      ],
      description: 'Element to render',
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Composition',
    level: 2,
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const HeadingScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} level={level}>
          Heading {level}
        </Heading>
      ))}
    </div>
  ),
};

export const TextScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {(['large', 'medium', 'small', 'tiny'] as const).map((size) => (
        <Text key={size} size={size}>
          Text {size}: lines, planes, and primary color.
        </Text>
      ))}
    </div>
  ),
};

export const VisualLevelApartFromOutline: Story = {
  render: () => (
    <Heading level={4} as="h2">
      Level 4 look, h2 in the outline
    </Heading>
  ),
};

export const Themes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '0 24px 24px',
      }}
    >
      {(['blue', 'neutral', 'red', 'yellow'] as const).map((theme) => (
        <div key={theme}>
          <Heading theme={theme}>Composition ({theme})</Heading>
        </div>
      ))}
    </div>
  ),
};

export const Dark: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div
      data-theme="dark"
      style={{
        padding: '24px',
        background: 'var(--mondrian-background)',
        color: 'var(--mondrian-text)',
      }}
    >
      <Heading theme="neutral">Composition</Heading>
      <Heading theme="yellow">Composition</Heading>
    </div>
  ),
};
