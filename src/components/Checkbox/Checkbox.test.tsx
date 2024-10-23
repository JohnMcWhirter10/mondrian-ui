// Checkbox.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox Component', () => {
  it('should render with the correct initial state', () => {
    const { getByRole } = render(
      <Checkbox label="Test Checkbox" defaultChecked={false} />
    );
    const checkbox = getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should toggle state on click', () => {
    const { getByRole } = render(
      <Checkbox label="Test Checkbox" defaultChecked={false} />
    );
    const checkbox = getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('should call onChange with the correct state', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Checkbox
        label="Test Checkbox"
        defaultChecked={false}
        onChange={handleChange}
      />
    );
    const checkbox = getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { checked: true },
      })
    );

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { checked: false },
      })
    );
  });
});
