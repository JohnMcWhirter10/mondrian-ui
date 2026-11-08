import { render, screen, fireEvent } from '@testing-library/react';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './Collapsible';

describe('Collapsible', () => {
  it('renders correctly with default props', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    expect(screen.getByText('Trigger')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('opens when trigger is clicked', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Content')).toBeVisible();
  });

  it('closes when trigger is clicked again', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    // First click to open
    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Content')).toBeVisible();

    // Second click to close
    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('respects the open prop', () => {
    render(
      <Collapsible open>
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    expect(screen.getByText('Content')).toBeVisible();
  });

  it('applies size class correctly', () => {
    const { container } = render(
      <Collapsible size="sm">
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    const collapsibleElement = container.querySelector('.mondrian-collapsible');
    expect(collapsibleElement).toHaveClass('mondrian-collapsible-sm');
  });

  it('disables trigger when disabled prop is applied', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger disabled>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    const triggerElement = screen.getByText('Trigger');
    expect(triggerElement).toBeDisabled();
  });

  it('exposes aria-expanded and a decorative glyph', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger.querySelector('.mondrian-collapsible-icon')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });
  itForwardsRef<HTMLDivElement>({
    render: (ref) => (
      <Collapsible ref={ref}>
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    ),
    tagName: 'DIV',
    className: 'mondrian-collapsible',
  });

  itPassesThroughAttributes({
    render: (props) => (
      <Collapsible {...props}>
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    ),
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    defaultTheme: 'blue',
    render: (theme) => (
      <Collapsible theme={theme}>
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    ),
    classFor: (theme) => theme,
  });
});
