import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './Select';

describe('Select Component', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('renders the Select component with default props', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    const selectTrigger = screen.getByRole('combobox');
    expect(selectTrigger).toBeInTheDocument();
    expect(selectTrigger).toHaveClass('mondrian-select-trigger');
    expect(selectTrigger).toHaveClass('mondrian-select-trigger-blue');
  });

  it('applies different themes to the Select component', () => {
    render(
      <Select>
        <SelectTrigger theme="red">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    );

    const selectTrigger = screen.getByRole('combobox');
    expect(selectTrigger).toHaveClass('mondrian-select-trigger-red');
  });

  it('applies different sizes to the Select component', () => {
    render(
      <Select>
        <SelectTrigger size="sm">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    );

    const selectTrigger = screen.getByRole('combobox');
    expect(selectTrigger).toHaveClass('mondrian-select-trigger-sm');
  });

  it('disables the Select component', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    );

    const selectTrigger = screen.getByRole('combobox');
    expect(selectTrigger).toBeDisabled();
  });

  it.each(['blue', 'neutral', 'red', 'yellow', 'green'] as const)(
    'applies the %s theme class to the trigger',
    (theme) => {
      render(
        <Select>
          <SelectTrigger theme={theme}>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
        </Select>
      );

      expect(screen.getByRole('combobox')).toHaveClass(
        `mondrian-select-trigger-${theme}`
      );
    }
  );

  it('applies the theme class to the content', async () => {
    render(
      <Select defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent theme="yellow">
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(await screen.findByRole('listbox')).toHaveClass(
      'mondrian-select-content-yellow'
    );
  });

  it('exposes aria-invalid and combobox semantics on the trigger', () => {
    render(
      <Select>
        <SelectTrigger aria-invalid="true" aria-label="Fruit">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByRole('combobox', { name: 'Fruit' });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('forwards a ref to the trigger', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Select>
        <SelectTrigger ref={ref}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    );

    expect(ref.current).toBe(screen.getByRole('combobox'));
  });
});
