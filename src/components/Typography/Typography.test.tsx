import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
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

  itForwardsRef<HTMLHeadingElement>({
    render: (ref) => <Heading ref={ref}>Title</Heading>,
    tagName: 'H2',
    className: 'mondrian-heading',
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    defaultTheme: 'neutral',
    render: (theme) => <Heading theme={theme}>Title</Heading>,
    classFor: (theme) => `mondrian-heading-${theme}`,
  });

  test('accent bar adds no content to the accessibility tree', () => {
    render(<Heading theme="red">Title</Heading>);
    expect(screen.getByRole('heading')).toHaveTextContent(/^Title$/);
    expect(screen.getByRole('heading').children).toHaveLength(0);
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

  itForwardsRef<HTMLElement>({
    render: (ref) => <Text ref={ref}>Body</Text>,
    tagName: 'P',
    className: 'mondrian-text',
  });

  itPassesThroughAttributes({
    render: (props) => <Text {...props}>Body</Text>,
  });
});
