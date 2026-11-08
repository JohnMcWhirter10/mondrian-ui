/** @jsxRuntime classic */
/** @jsx React.createElement */
import * as React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { itForwardsRef, renderWithTheme } from '../../test-utils';
import {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from './Popover';

const renderPopover = (contentProps = {}) =>
  renderWithTheme(
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent {...contentProps}>
        <p>Panel body</p>
        <PopoverClose>Done</PopoverClose>
      </PopoverContent>
    </Popover>
  );

describe('Popover', () => {
  it('is closed until the trigger is clicked', async () => {
    renderPopover();
    expect(screen.queryByText('Panel body')).not.toBeInTheDocument();
    expect(screen.getByText('Open')).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(screen.getByText('Open'));

    expect(await screen.findByText('Panel body')).toBeInTheDocument();
    expect(screen.getByText('Open')).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders the content as a dialog with the Mondrian frame class', async () => {
    renderPopover();
    await userEvent.click(screen.getByText('Open'));
    const panel = await screen.findByRole('dialog');
    expect(panel).toHaveClass('mondrian-popover-content');
  });

  it('follows side and align from Radix', async () => {
    renderPopover({ side: 'bottom', align: 'end' });
    await userEvent.click(screen.getByText('Open'));
    const panel = await screen.findByRole('dialog');
    expect(panel).toHaveAttribute('data-side', 'bottom');
    expect(panel).toHaveAttribute('data-align', 'end');
  });

  it('closes with PopoverClose and returns focus to the trigger', async () => {
    renderPopover();
    await userEvent.click(screen.getByText('Open'));
    await userEvent.click(await screen.findByText('Done'));
    await waitFor(() =>
      expect(screen.queryByText('Panel body')).not.toBeInTheDocument()
    );
    expect(screen.getByText('Open')).toHaveFocus();
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    renderPopover();
    await userEvent.click(screen.getByText('Open'));
    await screen.findByText('Panel body');
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(screen.queryByText('Panel body')).not.toBeInTheDocument()
    );
    expect(screen.getByText('Open')).toHaveFocus();
  });

  it('positions against a PopoverAnchor', async () => {
    renderWithTheme(
      <Popover defaultOpen>
        <PopoverAnchor data-testid="anchor">anchor</PopoverAnchor>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Anchored</PopoverContent>
      </Popover>
    );
    expect(screen.getByTestId('anchor')).toBeInTheDocument();
    expect(await screen.findByText('Anchored')).toBeInTheDocument();
  });

  describe('content', () => {
    itForwardsRef<HTMLDivElement>({
      render: (ref) => (
        <Popover defaultOpen>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent ref={ref}>Body</PopoverContent>
        </Popover>
      ),
      tagName: 'DIV',
      className: 'mondrian-popover-content',
    });
  });
});
