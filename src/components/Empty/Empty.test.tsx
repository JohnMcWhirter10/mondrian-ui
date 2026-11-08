import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Empty, EmptyActions, EmptyDescription, EmptyTitle } from './index';

describe('Empty', () => {
  test('renders the frame with its slots', () => {
    render(
      <Empty data-testid="empty">
        <EmptyTitle>No items</EmptyTitle>
        <EmptyDescription>Add one to begin.</EmptyDescription>
        <EmptyActions>
          <button type="button">Add</button>
        </EmptyActions>
      </Empty>
    );

    expect(screen.getByTestId('empty')).toHaveClass('mondrian-empty');
    const title = screen.getByRole('heading', { name: 'No items' });
    expect(title).toHaveClass('mondrian-empty-title');
    expect(screen.getByText('Add one to begin.')).toHaveClass(
      'mondrian-empty-description'
    );
    expect(
      screen.getByRole('button', { name: 'Add' }).parentElement
    ).toHaveClass('mondrian-empty-actions');
  });

  test('forwards refs on every part', () => {
    const root = React.createRef<HTMLDivElement>();
    const title = React.createRef<HTMLHeadingElement>();
    const description = React.createRef<HTMLParagraphElement>();
    const actions = React.createRef<HTMLDivElement>();

    render(
      <Empty ref={root}>
        <EmptyTitle ref={title}>T</EmptyTitle>
        <EmptyDescription ref={description}>D</EmptyDescription>
        <EmptyActions ref={actions}>A</EmptyActions>
      </Empty>
    );

    expect(root.current).toHaveClass('mondrian-empty');
    expect(title.current?.tagName).toBe('H3');
    expect(description.current?.tagName).toBe('P');
    expect(actions.current).toHaveClass('mondrian-empty-actions');
  });

  test('passes through attributes', () => {
    render(
      <Empty role="status" id="e">
        Empty
      </Empty>
    );
    expect(screen.getByRole('status')).toHaveAttribute('id', 'e');
  });

  test('sets display names', () => {
    expect(Empty.displayName).toBe('Empty');
    expect(EmptyTitle.displayName).toBe('EmptyTitle');
    expect(EmptyDescription.displayName).toBe('EmptyDescription');
    expect(EmptyActions.displayName).toBe('EmptyActions');
  });

  test.each(['blue', 'neutral', 'red', 'yellow'] as const)(
    'applies the %s theme class',
    (theme) => {
      render(<Empty theme={theme} data-testid="e" />);
      expect(screen.getByTestId('e')).toHaveClass(`mondrian-empty-${theme}`);
    }
  );

  test('defaults to the blue theme', () => {
    render(<Empty data-testid="e" />);
    expect(screen.getByTestId('e')).toHaveClass('mondrian-empty-blue');
  });
});
