import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
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

  test('forwards refs to the title, description and actions', () => {
    const title = React.createRef<HTMLHeadingElement>();
    const description = React.createRef<HTMLParagraphElement>();
    const actions = React.createRef<HTMLDivElement>();

    render(
      <Empty>
        <EmptyTitle ref={title}>T</EmptyTitle>
        <EmptyDescription ref={description}>D</EmptyDescription>
        <EmptyActions ref={actions}>A</EmptyActions>
      </Empty>
    );

    expect(title.current?.tagName).toBe('H3');
    expect(description.current?.tagName).toBe('P');
    expect(actions.current).toHaveClass('mondrian-empty-actions');
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => <Empty ref={ref} />,
    tagName: 'DIV',
    className: 'mondrian-empty',
  });

  itPassesThroughAttributes({
    render: (props) => <Empty role="status" {...props} />,
  });

  test('sets display names', () => {
    expect(Empty.displayName).toBe('Empty');
    expect(EmptyTitle.displayName).toBe('EmptyTitle');
    expect(EmptyDescription.displayName).toBe('EmptyDescription');
    expect(EmptyActions.displayName).toBe('EmptyActions');
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    defaultTheme: 'blue',
    render: (theme) => <Empty theme={theme} />,
    classFor: (theme) => `mondrian-empty-${theme}`,
  });
});
