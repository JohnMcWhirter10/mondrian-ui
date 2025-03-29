import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    expect(screen.queryByText('Content')).not.toBeVisible();
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
    expect(screen.queryByText('Content')).not.toBeVisible();
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

  it('applies theme class correctly', () => {
    const { container } = render(
      <Collapsible theme="red">
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    const collapsibleElement = container.querySelector('.mondrian-collapsible');
    expect(collapsibleElement).toHaveClass('red');
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
});
