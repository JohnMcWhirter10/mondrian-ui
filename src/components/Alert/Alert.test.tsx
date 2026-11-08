import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from './Alert';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
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
    expect(alert).toHaveAttribute('role', 'status');
    expect(alert).toHaveTextContent('Information');
  });

  test.each([
    ['blue', 'status', 'Information'],
    ['neutral', 'status', 'Note'],
    ['green', 'status', 'Success'],
    ['yellow', 'alert', 'Warning'],
    ['red', 'alert', 'Error'],
  ] as const)(
    '%s theme uses role=%s and a visible "%s" label',
    (theme, role, label) => {
      render(
        <Alert data-testid="alert" theme={theme}>
          <AlertDescription>Body</AlertDescription>
        </Alert>
      );
      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass(`mondrian-alert-${theme}`);
      expect(alert).toHaveAttribute('role', role);
      expect(alert).toHaveTextContent(label);
      // Glyph is decorative: label text carries the meaning.
      expect(alert.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    }
  );

  test('allows overriding the label and role', () => {
    render(
      <Alert data-testid="alert" theme="red" label="Fehler" role="status">
        <AlertDescription>Body</AlertDescription>
      </Alert>
    );
    const alert = screen.getByTestId('alert');
    expect(alert).toHaveTextContent('Fehler');
    expect(alert).toHaveAttribute('role', 'status');
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

  itForwardsRef<HTMLDivElement>({
    render: (ref) => (
      <Alert ref={ref}>
        <AlertDescription>Test Alert</AlertDescription>
      </Alert>
    ),
    tagName: 'DIV',
    className: 'mondrian-alert',
  });

  itPassesThroughAttributes({
    render: (props) => (
      <Alert {...props}>
        <AlertDescription>Test Alert</AlertDescription>
      </Alert>
    ),
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    defaultTheme: 'blue',
    render: (theme) => (
      <Alert theme={theme}>
        <AlertDescription>Test Alert</AlertDescription>
      </Alert>
    ),
    classFor: (theme) => `mondrian-alert-${theme}`,
  });
});
