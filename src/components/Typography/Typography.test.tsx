import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Heading, Text } from './index';

describe('Heading', () => {
  test('defaults to level 2', () => {
    render(<Heading>Title</Heading>);
    const el = screen.getByRole('heading', { level: 2 });
    expect(el).toHaveClass('mondrian-heading');
    expect(el).toHaveClass('mondrian-heading-2');
  });

  test.each([1, 2, 3, 4, 5, 6] as const)('level %i renders h%i', (level) => {
    render(<Heading level={level}>Title</Heading>);
    const el = screen.getByRole('heading', { level });
    expect(el.tagName).toBe(`H${level}`);
    expect(el).toHaveClass(`mondrian-heading-${level}`);
  });

  test('as separates the element from the visual level', () => {
    render(
      <Heading level={1} as="h3">
        Title
      </Heading>
    );
    const el = screen.getByRole('heading', { level: 3 });
    expect(el).toHaveClass('mondrian-heading-1');
  });

  test('forwards a ref', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(<Heading ref={ref}>Title</Heading>);
    expect(ref.current?.tagName).toBe('H2');
  });
});

describe('Text', () => {
  test('renders a p at small size by default', () => {
    render(<Text>Body</Text>);
    const el = screen.getByText('Body');
    expect(el.tagName).toBe('P');
    expect(el).toHaveClass('mondrian-text');
    expect(el).toHaveClass('mondrian-text-small');
  });

  test('applies as and size', () => {
    render(
      <Text as="span" size="large">
        Body
      </Text>
    );
    const el = screen.getByText('Body');
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveClass('mondrian-text-large');
  });

  test('forwards a ref and passes attributes', () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Text ref={ref} id="t" aria-label="Copy">
        Body
      </Text>
    );
    expect(ref.current).toHaveAttribute('id', 't');
    expect(screen.getByLabelText('Copy')).toBeInTheDocument();
  });
});
