import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

  test('applies the correct theme class', () => {
    render(
      <Card data-testid="card" theme="red">
        <CardContent>Test Content</CardContent>
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('red');
    expect(card).not.toHaveClass('blue');
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

  test('renders card with different themes', () => {
    const { rerender } = render(
      <Card data-testid="card" theme="blue">
        <CardContent>Test Content</CardContent>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('blue');

    rerender(
      <Card data-testid="card" theme="red">
        <CardContent>Test Content</CardContent>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('red');

    rerender(
      <Card data-testid="card" theme="yellow">
        <CardContent>Test Content</CardContent>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('yellow');

    rerender(
      <Card data-testid="card" theme="green">
        <CardContent>Test Content</CardContent>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('green');

    rerender(
      <Card data-testid="card" theme="neutral">
        <CardContent>Test Content</CardContent>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('neutral');
  });

  test('renders with forwarded ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Card ref={ref}>
        <CardContent>Test Content</CardContent>
      </Card>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toHaveClass('mondrian-card');
  });

  test.each(['blue', 'neutral', 'red', 'yellow', 'green'] as const)(
    'applies the %s theme class and keeps only one theme',
    (theme) => {
      render(
        <Card data-testid="card" theme={theme}>
          <CardContent>Test Content</CardContent>
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass(theme);
      ['blue', 'neutral', 'red', 'yellow', 'green']
        .filter((t) => t !== theme)
        .forEach((t) => expect(card).not.toHaveClass(t));
    }
  );

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
});
