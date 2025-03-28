/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../themes';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './Dialog';
import { Button } from '../Button/Button';

describe('Dialog Component', () => {
  const renderDialog = (contentProps = {}, children?: React.ReactNode) => {
    render(
      <ThemeProvider>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent {...contentProps}>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
              <DialogDescription>Test Description</DialogDescription>
            </DialogHeader>
            {children}
            <DialogFooter>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    );
  };

  test('dialog is not visible until triggered', async () => {
    renderDialog();

    // Dialog should not be in the document initially
    expect(screen.queryByRole('dialog')).toBeNull();

    // Click the button to open the dialog
    const button = screen.getByRole('button', { name: /open dialog/i });
    userEvent.click(button);

    // Wait for the dialog to appear
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  test('renders dialog with blue theme', async () => {
    renderDialog({ theme: 'blue' });

    // Click to open the dialog
    userEvent.click(screen.getByText('Open Dialog'));

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.className.includes('blue')).toBe(true);
  });

  test('renders dialog with red theme', async () => {
    renderDialog({ theme: 'red' });

    // Click to open the dialog
    userEvent.click(screen.getByText('Open Dialog'));

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.className.includes('red')).toBe(true);
  });

  test('renders dialog with small size', async () => {
    renderDialog({ size: 'sm' });

    // Click the button to open the dialog
    const button = screen.getByRole('button', { name: /open dialog/i });
    userEvent.click(button);

    // Wait for the dialog to appear
    const dialog = await screen.findByRole('dialog');
    expect(dialog.className.includes('mondrian-dialog-content-sm')).toBe(true);
  });

  test('renders dialog with large size', async () => {
    renderDialog({ size: 'lg' });

    // Click the button to open the dialog
    const button = screen.getByRole('button', { name: /open dialog/i });
    userEvent.click(button);

    // Wait for the dialog to appear
    const dialog = await screen.findByRole('dialog');
    expect(dialog.className.includes('mondrian-dialog-content-lg')).toBe(true);
  });

  test('dialog can be closed with the close button', async () => {
    renderDialog();

    // Click the button to open the dialog
    const button = screen.getByRole('button', { name: /open dialog/i });
    userEvent.click(button);

    // Wait for the dialog to appear
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Click the close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    userEvent.click(closeButton);

    // Wait for the dialog to disappear
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  test('renders dialog with custom content', async () => {
    const customContent = (
      <div data-testid="custom-content">Custom content here</div>
    );
    renderDialog({}, customContent);

    // Click the button to open the dialog
    const button = screen.getByRole('button', { name: /open dialog/i });
    userEvent.click(button);

    // Wait for the dialog and check for custom content
    await screen.findByRole('dialog');
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.getByText('Custom content here')).toBeInTheDocument();
  });
});
