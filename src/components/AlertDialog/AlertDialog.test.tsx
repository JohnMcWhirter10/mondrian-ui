/** @jsxRuntime classic */
/** @jsx React.createElement */
import * as React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  PLANE_THEMES_WITH_GREEN,
  itForwardsRef,
  renderWithTheme,
} from '../../test-utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog';

const onAction = jest.fn();
const onCancel = jest.fn();

const renderAlert = (contentProps = {}, actionProps = {}, cancelProps = {}) =>
  renderWithTheme(
    <AlertDialog>
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogContent {...contentProps}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} {...cancelProps}>
            Keep
          </AlertDialogCancel>
          <AlertDialogAction onClick={onAction} {...actionProps}>
            Delete it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

describe('AlertDialog', () => {
  beforeEach(() => jest.clearAllMocks());

  it('opens as an alertdialog named and described by title and description', async () => {
    renderAlert();
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Delete'));

    const dialog = await screen.findByRole('alertdialog');
    expect(dialog).toHaveAccessibleName('Delete project?');
    expect(dialog).toHaveAccessibleDescription('This cannot be undone.');
  });

  it('focuses the cancel button first', async () => {
    renderAlert();
    await userEvent.click(screen.getByText('Delete'));
    await screen.findByRole('alertdialog');
    expect(screen.getByRole('button', { name: 'Keep' })).toHaveFocus();
  });

  it('cannot be dismissed by clicking outside', async () => {
    renderAlert();
    await userEvent.click(screen.getByText('Delete'));
    await screen.findByRole('alertdialog');

    const overlay = document.querySelector('.mondrian-dialog-overlay');
    expect(overlay).toBeInTheDocument();
    await userEvent.click(overlay as Element);

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('runs the action handler and closes', async () => {
    renderAlert();
    await userEvent.click(screen.getByText('Delete'));
    await userEvent.click(await screen.findByText('Delete it'));

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    );
  });

  it('runs the cancel handler, closes, and returns focus to the trigger', async () => {
    renderAlert();
    await userEvent.click(screen.getByText('Delete'));
    await userEvent.click(await screen.findByText('Keep'));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onAction).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    );
    expect(screen.getByText('Delete')).toHaveFocus();
  });

  it('closes on Escape', async () => {
    renderAlert();
    await userEvent.click(screen.getByText('Delete'));
    await screen.findByRole('alertdialog');
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    );
  });

  it('has no close cell', async () => {
    renderAlert();
    await userEvent.click(screen.getByText('Delete'));
    await screen.findByRole('alertdialog');
    expect(document.querySelector('.mondrian-dialog-close')).toBeNull();
  });

  describe('content theme', () => {
    it('defaults to red and reuses the Dialog frame', async () => {
      renderAlert();
      await userEvent.click(screen.getByText('Delete'));
      const dialog = await screen.findByRole('alertdialog');
      expect(dialog).toHaveClass('mondrian-dialog-content');
      expect(dialog).toHaveClass('red');
    });

    it.each(PLANE_THEMES_WITH_GREEN)('applies the %s theme', async (theme) => {
      renderAlert({ theme });
      await userEvent.click(screen.getByText('Delete'));
      expect(await screen.findByRole('alertdialog')).toHaveClass(theme);
    });
  });

  describe('buttons', () => {
    it('action is a red button by default and cancel is neutral', async () => {
      renderAlert();
      await userEvent.click(screen.getByText('Delete'));
      await screen.findByRole('alertdialog');
      expect(screen.getByText('Delete it')).toHaveClass('mondrian-button-red');
      expect(screen.getByText('Keep')).toHaveClass('mondrian-button-neutral');
    });

    it('accepts a theme override on each button', async () => {
      renderAlert({}, { theme: 'blue' }, { theme: 'yellow' });
      await userEvent.click(screen.getByText('Delete'));
      await screen.findByRole('alertdialog');
      expect(screen.getByText('Delete it')).toHaveClass('mondrian-button-blue');
      expect(screen.getByText('Keep')).toHaveClass('mondrian-button-yellow');
    });

    itForwardsRef<HTMLButtonElement>({
      render: (ref) => (
        <AlertDialog defaultOpen>
          <AlertDialogContent>
            <AlertDialogTitle>t</AlertDialogTitle>
            <AlertDialogDescription>d</AlertDialogDescription>
            <AlertDialogAction ref={ref}>Go</AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      ),
      tagName: 'BUTTON',
      className: 'mondrian-button',
    });

    itForwardsRef<HTMLButtonElement>({
      render: (ref) => (
        <AlertDialog defaultOpen>
          <AlertDialogContent>
            <AlertDialogTitle>t</AlertDialogTitle>
            <AlertDialogDescription>d</AlertDialogDescription>
            <AlertDialogCancel ref={ref}>No</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      ),
      tagName: 'BUTTON',
      className: 'mondrian-button',
    });
  });

  it('forwards refs on content, title and description', () => {
    const content = React.createRef<HTMLDivElement>();
    const title = React.createRef<HTMLHeadingElement>();
    const description = React.createRef<HTMLParagraphElement>();
    renderWithTheme(
      <AlertDialog defaultOpen>
        <AlertDialogContent ref={content}>
          <AlertDialogTitle ref={title}>t</AlertDialogTitle>
          <AlertDialogDescription ref={description}>d</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    );
    expect(content.current).toHaveClass('mondrian-alert-dialog-content');
    expect(title.current).toHaveClass('mondrian-dialog-title');
    expect(description.current).toHaveClass('mondrian-dialog-description');
  });
});
