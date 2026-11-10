import React from 'react';
import { ScrollArea } from './ScrollArea';

export default {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['blue', 'neutral', 'red', 'green', 'yellow'],
      defaultValue: 'blue',
    },
    height: {
      control: 'number',
      defaultValue: 200,
    },
    width: {
      control: 'number',
      defaultValue: 300,
    },
  },
};

// Long sample text for scrolling
const sampleText = `
  Psalm 41[a]
For the director of music. A psalm of David.
1 Blessed are those who have regard for the weak;
    the Lord delivers them in times of trouble.
2 The Lord protects and preserves them—
    they are counted among the blessed in the land—
    he does not give them over to the desire of their foes.
3 The Lord sustains them on their sickbed
    and restores them from their bed of illness.

4 I said, “Have mercy on me, Lord;
    heal me, for I have sinned against you.”
5 My enemies say of me in malice,
    “When will he die and his name perish?”
6 When one of them comes to see me,
    he speaks falsely, while his heart gathers slander;
    then he goes out and spreads it around.

7 All my enemies whisper together against me;
    they imagine the worst for me, saying,
8 “A vile disease has afflicted him;
    he will never get up from the place where he lies.”
9 Even my close friend,
    someone I trusted,
one who shared my bread,
    has turned[b] against me.

10 But may you have mercy on me, Lord;
    raise me up, that I may repay them.
11 I know that you are pleased with me,
    for my enemy does not triumph over me.
12 Because of my integrity you uphold me
    and set me in your presence forever.

13 Praise be to the Lord, the God of Israel,
    from everlasting to everlasting.
Amen and Amen.
`;

// Repeat the text to ensure scrolling
const longText = Array(5).fill(sampleText).join('\n\n');

export const Default = {
  args: {
    children: longText,
    theme: 'blue',
    height: 200,
    width: 300,
  },
};

export const Neutral = {
  args: {
    ...Default.args,
    theme: 'neutral',
  },
};

export const Red = {
  args: {
    ...Default.args,
    theme: 'red',
  },
};

export const Green = {
  args: {
    ...Default.args,
    theme: 'green',
  },
};

export const Yellow = {
  args: {
    ...Default.args,
    theme: 'yellow',
  },
};

export const Tall = {
  args: {
    ...Default.args,
    height: 400,
    width: 200,
  },
};

export const Wide = {
  args: {
    ...Default.args,
    height: 150,
    width: 500,
  },
};

// Example with horizontal scrolling content
export const HorizontalScroll = {
  args: {
    theme: 'blue',
    height: 100,
    width: 300,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div style={{ whiteSpace: 'nowrap', padding: '2px' }}>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <span key={i} style={{ marginRight: '16px' }}>
              Item {i + 1}
            </span>
          ))}
      </div>
    </ScrollArea>
  ),
};

const themes = ['blue', 'neutral', 'red', 'yellow', 'green'] as const;

export const Themes = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
      {themes.map((theme) => (
        <ScrollArea
          key={theme}
          theme={theme}
          height={160}
          width={220}
          label={`${theme} scroll area`}
        >
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0, padding: 8 }}>
            {longText}
          </pre>
        </ScrollArea>
      ))}
    </div>
  ),
};
