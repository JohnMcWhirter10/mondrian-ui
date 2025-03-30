import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Alert, AlertTitle, AlertDescription } from './Alert';
import { Dash, Plus, MondrianRightArrow } from '../icons';

describe('Alert', () => {
  test('renders the alert with default props', () => {
    render(
      <Alert data-testid="alert">
        <AlertDescription>Test Alert</AlertDescription>
      </Alert>
    );

    const alert = screen.getByTestId('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('mondrian-alert');
    expect(alert).toHaveClass('mondrian-alert-blue');
    expect(alert).toHaveAttribute('role', 'alert');
  });

  test('applies the correct theme class', () => {
    render(
      <Alert data-testid="alert" theme="red">
        <AlertDescription>Test Alert</AlertDescription>
      </Alert>
    );

    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('mondrian-alert-red');
    expect(alert).not.toHaveClass('mondrian-alert-blue');
  });

  test('applies the correct size class', () => {
    render(
      <Alert data-testid="alert" size="lg">
        <AlertDescription>Test Alert</AlertDescription>
      </Alert>
    );

    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('mondrian-alert-lg');
  });

  test('renders all subcomponents correctly', () => {
    render(
      <Alert data-testid="alert">
        <AlertTitle data-testid="title">Alert Title</AlertTitle>
        <AlertDescription data-testid="description">
          Alert Description
        </AlertDescription>
      </Alert>
    );

    expect(screen.getByTestId('title')).toHaveClass('mondrian-alert-title');
    expect(screen.getByTestId('description')).toHaveClass(
      'mondrian-alert-description'
    );
  });

  test('renders alert with different themes', () => {
    const { rerender } = render(
      <Alert data-testid="alert" theme="neutral">
        <AlertDescription>Test Alert</AlertDescription>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass('mondrian-alert-neutral');

    rerender(
      <Alert data-testid="alert" theme="blue">
        <AlertDescription>Test Alert</AlertDescription>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass('mondrian-alert-blue');

    rerender(
      <Alert data-testid="alert" theme="yellow">
        <AlertDescription>Test Alert</AlertDescription>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass('mondrian-alert-yellow');

    rerender(
      <Alert data-testid="alert" theme="red">
        <AlertDescription>Test Alert</AlertDescription>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass('mondrian-alert-red');

    rerender(
      <Alert data-testid="alert" theme="green">
        <AlertDescription>Test Alert</AlertDescription>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass('mondrian-alert-green');
  });

  test('renders with forwarded ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Alert ref={ref}>
        <AlertDescription>Test Alert</AlertDescription>
      </Alert>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toHaveClass('mondrian-alert');
  });

  test('renders alert with title only', () => {
    render(
      <Alert data-testid="alert">
        <AlertTitle data-testid="title">Alert Title Only</AlertTitle>
      </Alert>
    );

    expect(screen.getByTestId('title')).toHaveClass('mondrian-alert-title');
    expect(screen.getByTestId('title')).toHaveTextContent('Alert Title Only');
    expect(screen.queryByTestId('description')).not.toBeInTheDocument();
  });

  test('renders alert with description only', () => {
    render(
      <Alert data-testid="alert">
        <AlertDescription data-testid="description">
          Alert Description Only
        </AlertDescription>
      </Alert>
    );

    expect(screen.getByTestId('description')).toHaveClass(
      'mondrian-alert-description'
    );
    expect(screen.getByTestId('description')).toHaveTextContent(
      'Alert Description Only'
    );
    expect(screen.queryByTestId('title')).not.toBeInTheDocument();
  });

  test('renders alert with icon', () => {
    render(
      <Alert data-testid="alert" theme="red">
        <Dash data-testid="icon" />
        <AlertTitle>Alert with Icon</AlertTitle>
        <AlertDescription>Description with icon</AlertDescription>
      </Alert>
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();

    // Check the title and description are present
    expect(screen.getByText('Alert with Icon')).toBeInTheDocument();
    expect(screen.getByText('Description with icon')).toBeInTheDocument();
  });

  test('renders different icon types with consistent styling', () => {
    const { rerender } = render(
      <Alert data-testid="alert">
        <Dash data-testid="icon" />
        <AlertTitle>Alert with Cross Icon</AlertTitle>
      </Alert>
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();

    rerender(
      <Alert data-testid="alert">
        <Plus data-testid="icon" />
        <AlertTitle>Alert with Check Icon</AlertTitle>
      </Alert>
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();

    rerender(
      <Alert data-testid="alert">
        <MondrianRightArrow data-testid="icon" />
        <AlertTitle>Alert with ChevronRight Icon</AlertTitle>
      </Alert>
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('applies proper padding to content when icon is present', () => {
    render(
      <Alert data-testid="alert">
        <Dash data-testid="icon" />
        <AlertTitle data-testid="title">Alert with Icon</AlertTitle>
        <AlertDescription data-testid="description">
          Description with icon
        </AlertDescription>
      </Alert>
    );

    const title = screen.getByTestId('title');
    const description = screen.getByTestId('description');

    // Check that both elements have appropriate padding
    expect(window.getComputedStyle(title).paddingLeft).not.toBe('0px');
    expect(window.getComputedStyle(description).paddingLeft).not.toBe('0px');
  });
});
