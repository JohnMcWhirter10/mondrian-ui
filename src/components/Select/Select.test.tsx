import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
} from '../../test-utils';
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
    expect(selectTrigger).toHaveClass('mondrian-select-trigger-blue');
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

  itForwardsRef<HTMLButtonElement>({
    render: (ref) => (
      <Select>
        <SelectTrigger ref={ref}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    ),
    tagName: 'BUTTON',
    className: 'mondrian-select-trigger',
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    defaultTheme: 'blue',
    render: (theme) => (
      <Select>
        <SelectTrigger theme={theme}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    ),
    classFor: (theme) => `mondrian-select-trigger-${theme}`,
    target: () => screen.getByRole('combobox'),
  });
});
