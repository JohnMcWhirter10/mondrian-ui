import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';

describe('Card', () => {
  test('renders the card with default props', () => {
    render(
      <Card data-testid="card">
        <CardContent>Test Content</CardContent>
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('mondrian-card');
    expect(card).toHaveClass('blue');
  });

  test('applies the correct size class', () => {
    render(
      <Card data-testid="card" size="lg">
        <CardContent>Test Content</CardContent>
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('mondrian-card-lg');
  });

  test('renders all subcomponents correctly', () => {
    render(
      <Card data-testid="card">
        <CardHeader data-testid="header">
          <CardTitle data-testid="title">Card Title</CardTitle>
          <CardDescription data-testid="description">
            Card Description
          </CardDescription>
        </CardHeader>
        <CardContent data-testid="content">Card Content</CardContent>
        <CardFooter data-testid="footer">Card Footer</CardFooter>
      </Card>
    );

    expect(screen.getByTestId('header')).toHaveClass('mondrian-card-header');
    expect(screen.getByTestId('title')).toHaveClass('mondrian-card-title');
    expect(screen.getByTestId('description')).toHaveClass(
      'mondrian-card-description'
    );
    expect(screen.getByTestId('content')).toHaveClass('mondrian-card-content');
    expect(screen.getByTestId('footer')).toHaveClass('mondrian-card-footer');
  });

  test('does not expose className and keeps decoration out of the DOM', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    );
    const card = screen.getByTestId('card');
    // Swatch and bar are CSS pseudo-elements, so only the header exists as a child.
    expect(card.children).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
  });
  itForwardsRef<HTMLDivElement>({
    render: (ref) => (
      <Card ref={ref}>
        <CardContent>Test Content</CardContent>
      </Card>
    ),
    tagName: 'DIV',
    className: 'mondrian-card',
  });

  itPassesThroughAttributes({
    render: (props) => (
      <Card {...props}>
        <CardContent>Test Content</CardContent>
      </Card>
    ),
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    defaultTheme: 'blue',
    render: (theme) => (
      <Card theme={theme}>
        <CardContent>Test Content</CardContent>
      </Card>
    ),
    classFor: (theme) => theme,
  });
});
