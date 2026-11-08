import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, GridItem } from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A layout primitive for placing planes on a rectangular grid. Unlike Box, it is not a bordered flex container: it only defines columns and gap. Items bound their plane with the black grid line, and may span columns and rows so an uneven composition is possible.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    lines: {
      control: 'boolean',
      description: 'Draw base weight verticals and heavy horizontals',
      table: { defaultValue: { summary: 'false' } },
    },
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'yellow'],
      description: 'Plane color',
      table: { defaultValue: { summary: 'neutral' } },
    },
    columns: {
      control: 'text',
      description: 'Column count, or a grid-template-columns value',
      table: { defaultValue: { summary: '12' } },
    },
    gap: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Gap from the spacing scale',
      table: { defaultValue: { summary: 'none' } },
    },
  },
  args: { columns: 12, gap: 'none' },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const cell = { padding: '16px' };

export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      <GridItem span={8}>
        <div style={cell}>Span 8</div>
      </GridItem>
      <GridItem span={4}>
        <div style={cell}>Span 4</div>
      </GridItem>
      <GridItem span={3}>
        <div style={cell}>Span 3</div>
      </GridItem>
      <GridItem span={9}>
        <div style={cell}>Span 9</div>
      </GridItem>
    </Grid>
  ),
};

export const Composition: Story = {
  render: () => (
    <Grid columns={4} gap="small">
      <GridItem span={2} rowSpan={2}>
        <div style={{ ...cell, minHeight: '120px' }}>Large plane</div>
      </GridItem>
      <GridItem span={2}>
        <div style={cell}>Upper</div>
      </GridItem>
      <GridItem>
        <div style={cell}>A</div>
      </GridItem>
      <GridItem>
        <div style={cell}>B</div>
      </GridItem>
    </Grid>
  ),
};

export const Dark: Story = {
  render: () => (
    <div data-theme="dark">
      <Grid columns={3}>
        <GridItem span={2}>
          <div style={cell}>Two</div>
        </GridItem>
        <GridItem>
          <div style={cell}>One</div>
        </GridItem>
      </Grid>
    </div>
  ),
};

export const Lines: Story = {
  render: () => (
    <div style={{ padding: '8px 8px 8px 16px' }}>
      <Grid columns={3} lines>
        <GridItem span={2}>
          <div style={cell}>Two</div>
        </GridItem>
        <GridItem>
          <div style={cell}>One</div>
        </GridItem>
        <GridItem span={3}>
          <div style={cell}>Three</div>
        </GridItem>
      </Grid>
    </div>
  ),
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, padding: '8px 8px 8px 16px' }}>
      {(['blue', 'neutral', 'red', 'yellow'] as const).map((theme) => (
        <Grid key={theme} columns={2} lines theme={theme}>
          <GridItem>
            <div style={cell}>{theme}</div>
          </GridItem>
          <GridItem>
            <div style={cell}>Cap</div>
          </GridItem>
        </Grid>
      ))}
    </div>
  ),
};
