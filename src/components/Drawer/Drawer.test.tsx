/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../test-utils';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from './Drawer';

const renderDrawer = (contentProps = {}) =>
  renderWithTheme(
    <Drawer>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent {...contentProps}>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Narrow the list</DrawerDescription>
        </DrawerHeader>
        <input aria-label="Search" />
        <DrawerFooter>
          <DrawerClose>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

describe('Drawer', () => {
  test('is closed until triggered', () => {
    renderDrawer();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  test('opens as a dialog anchored right by default', async () => {
    renderDrawer();
    await userEvent.click(screen.getByText('Open drawer'));
    const drawer = await screen.findByRole('dialog', { name: 'Filters' });
    expect(drawer).toHaveAttribute('data-side', 'right');
    expect(drawer).toHaveAccessibleDescription('Narrow the list');
  });

  test('anchors left when asked', async () => {
    renderDrawer({ side: 'left' });
    await userEvent.click(screen.getByText('Open drawer'));
    expect(await screen.findByRole('dialog')).toHaveAttribute(
      'data-side',
      'left'
    );
  });

  test('applies the theme class', async () => {
    renderDrawer({ theme: 'red' });
    await userEvent.click(screen.getByText('Open drawer'));
    expect((await screen.findByRole('dialog')).className).toContain('red');
  });

  test('Escape closes it', async () => {
    renderDrawer();
    await userEvent.click(screen.getByText('Open drawer'));
    await screen.findByRole('dialog');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  test('close buttons close it', async () => {
    renderDrawer();
    await userEvent.click(screen.getByText('Open drawer'));
    await screen.findByRole('dialog');
    await userEvent.click(screen.getByRole('button', { name: 'Done' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  test('defaults to the blue plane', async () => {
    renderDrawer();
    await userEvent.click(screen.getByText('Open drawer'));
    expect((await screen.findByRole('dialog')).className).toContain('blue');
  });
});
