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

  it('should render with a provided id', () => {
    const { getByLabelText } = render(
      <Checkbox label="Test Checkbox" id="test-checkbox" />
    );
    const checkbox = getByLabelText('Test Checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should toggle state when the label is clicked', () => {
    const { getByLabelText } = render(
      <Checkbox label="Test Checkbox" defaultChecked={false} />
    );
    const checkbox = getByLabelText('Test Checkbox');

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('should toggle state when the custom checkbox mark is clicked', () => {
    const { getByRole } = render(
      <Checkbox label="Test Checkbox" defaultChecked={false} />
    );
    const checkbox = getByRole('checkbox');
    const customMark = getByRole('button'); // Assuming the span has role="button"

    fireEvent.click(customMark);
    expect(checkbox).toBeChecked();

    fireEvent.click(customMark);
    expect(checkbox).not.toBeChecked();
  });

  it('should be accessible with keyboard events', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Checkbox
        label="Test Checkbox"
        defaultChecked={false}
        onChange={handleChange}
      />
    );
    const customMark = getByRole('button');

    // Focus the custom checkbox mark
    customMark.focus();

    // Simulate Enter key press
    fireEvent.keyDown(customMark, { key: 'Enter', code: 'Enter' });
    expect(customMark).toHaveFocus(); // Ensure it's focused
    expect(getByRole('checkbox')).toBeChecked();
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { checked: true },
      })
    );

    // Simulate Space key press
    fireEvent.keyDown(customMark, { key: ' ', code: 'Space' });
    expect(customMark).toHaveFocus(); // Ensure it's focused
    expect(getByRole('checkbox')).not.toBeChecked();
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { checked: false },
      })
    );
  });
});
