/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../test-utils';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';
import type { ToastProps, ToastViewportProps } from './Toast.types';

const renderToast = (
  props: Partial<ToastProps> = {},
  viewport: ToastViewportProps = {}
) =>
  renderWithTheme(
    <ToastProvider>
      <Toast open data-testid="toast" {...props}>
        <ToastTitle>Saved</ToastTitle>
        <ToastDescription>Your changes are stored.</ToastDescription>
        <ToastAction altText="Undo the save">Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport {...viewport} />
    </ToastProvider>
  );

describe('Toast', () => {
  it('shows title, description and action', () => {
    renderToast();
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Your changes are stored.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
  });

  it('defaults to the yellow plane', () => {
    renderToast();
    expect(screen.getByTestId('toast')).toHaveClass(
      'mondrian-toast mondrian-toast-yellow'
    );
  });

  it.each(['blue', 'red', 'neutral'] as const)('maps theme %s', (theme) => {
    renderToast({ theme });
    expect(screen.getByTestId('toast')).toHaveClass(`mondrian-toast-${theme}`);
  });

  it('places the viewport at the chosen edge', () => {
    renderToast({}, {
      position: 'top-left',
      'data-testid': 'vp',
    } as ToastViewportProps);
    expect(screen.getByTestId('vp')).toHaveClass(
      'mondrian-toast-viewport-top-left'
    );
  });

  it('closes from the close button, which has an accessible name', async () => {
    const onOpenChange = jest.fn();
    renderToast({ onOpenChange });
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('runs the action handler', async () => {
    const onClick = jest.fn();
    renderWithTheme(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Saved</ToastTitle>
          <ToastAction altText="Undo the save" onClick={onClick}>
            Undo
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('closes itself after duration', async () => {
    jest.useFakeTimers();
    const onOpenChange = jest.fn();
    renderToast({ duration: 500, onOpenChange });
    act(() => {
      jest.advanceTimersByTime(600);
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    jest.useRealTimers();
  });

  it('forwards a ref to the toast', () => {
    const ref = React.createRef<HTMLLIElement>();
    renderWithTheme(
      <ToastProvider>
        <Toast open ref={ref}>
          <ToastTitle>Hi</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(ref.current?.tagName).toBe('LI');
  });
});
