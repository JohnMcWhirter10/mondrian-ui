import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Square,
  SquareAlert,
  MondrianRightArrow,
  MondrianLeftArrow,
  MondrianUpArrow,
  MondrianDownArrow,
  Plus,
  Dash,
} from './index';

// Create a wrapper component to display all icons
const IconsDisplay = () => {
  const iconSize = 32;
  const iconColors = {
    blue: 'var(--mondrian-blue)',
    red: 'var(--mondrian-error)',
    yellow: 'var(--mondrian-yellow)',
    green: 'var(--mondrian-success)',
    neutral: 'var(--mondrian-text)',
  };

  // Define all icons with their names
  const icons = [
    { name: 'Square', component: Square },
    { name: 'SquareAlert', component: SquareAlert },
    { name: 'MondrianRightArrow', component: MondrianRightArrow },
    { name: 'MondrianLeftArrow', component: MondrianLeftArrow },
    { name: 'MondrianUpArrow', component: MondrianUpArrow },
    { name: 'MondrianDownArrow', component: MondrianDownArrow },
    { name: 'Plus', component: Plus },
    { name: 'Dash', component: Dash },
  ];

  return (
    <div>
      <h1>Mondrian UI Icons</h1>
      <p>
        All icons follow Mondrian neoplasticism principles with rectangular
        shapes and 90-degree angles only.
      </p>

      <h2>Icon Grid (Default Color)</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {icons.map(({ name, component: Icon }) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px',
              border: '1px solid var(--mondrian-border)',
              borderRadius: '0', // Respecting Mondrian principles
              backgroundColor: 'var(--mondrian-background)',
            }}
          >
            <Icon size={iconSize} />
            <div style={{ marginTop: '12px', fontSize: '14px' }}>{name}</div>
          </div>
        ))}
      </div>

      <h2>Color Variations</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {Object.entries(iconColors).map(([colorName, colorValue]) => (
          <div
            key={colorName}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px',
              border: '1px solid var(--mondrian-border)',
              borderRadius: '0', // Respecting Mondrian principles
              backgroundColor: 'var(--mondrian-background)',
            }}
          >
            <Square size={iconSize} color={colorValue} />
            <div style={{ marginTop: '12px', fontSize: '14px' }}>
              {colorName}
            </div>
          </div>
        ))}
      </div>

      <h2>Size Variations</h2>
      <div
        style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '40px',
          alignItems: 'flex-end',
        }}
      >
        {[16, 24, 32, 48].map((size) => (
          <div
            key={size}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px',
              border: '1px solid var(--mondrian-border)',
              borderRadius: '0', // Respecting Mondrian principles
              backgroundColor: 'var(--mondrian-background)',
            }}
          >
            <Square size={size} />
            <div style={{ marginTop: '12px', fontSize: '14px' }}>{size}px</div>
          </div>
        ))}
      </div>

      <h2>Directional Arrows</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {[
          { name: 'Right', component: MondrianRightArrow },
          { name: 'Left', component: MondrianLeftArrow },
          { name: 'Up', component: MondrianUpArrow },
          { name: 'Down', component: MondrianDownArrow },
        ].map(({ name, component: Icon }) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px',
              border: '1px solid var(--mondrian-border)',
              borderRadius: '0', // Respecting Mondrian principles
              backgroundColor: 'var(--mondrian-background)',
            }}
          >
            <Icon size={iconSize} color={iconColors.blue} />
            <div style={{ marginTop: '12px', fontSize: '14px' }}>{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Icons',
  component: IconsDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Collection of icons following Mondrian neoplasticism principles for use throughout the UI.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconsDisplay>;

export const AllIcons: Story = {};
