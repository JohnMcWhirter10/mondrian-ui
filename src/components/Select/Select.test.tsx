import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './Select';

describe('Select Component', () => {
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
    expect(selectTrigger).toHaveClass('blue');
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
    expect(selectTrigger).toHaveClass('red');
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
});
