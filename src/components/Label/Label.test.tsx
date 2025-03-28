/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';
import { ThemeProvider } from '../../themes';
import { LabelProps } from './Label.types';

describe('Label Component', () => {
  const renderLabel = (props: Partial<LabelProps>) => {
    render(
      <ThemeProvider>
        <Label {...props}>Test Label</Label>
      </ThemeProvider>
    );
  };

  test('renders the label with default theme', () => {
    renderLabel({});

    const label = screen.getByText(/test label/i);
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('mondrian-label-blue');
  });

  test('renders the label with blue theme', () => {
    renderLabel({ theme: 'blue' });

    const label = screen.getByText(/test label/i);
    expect(label).toHaveClass('mondrian-label-blue');
  });

  test('renders the label with neutral theme', () => {
    renderLabel({ theme: 'neutral' });

    const label = screen.getByText(/test label/i);
    expect(label).toHaveClass('mondrian-label-neutral');
  });

  test('renders the label with contrast theme', () => {
    renderLabel({ theme: 'contrast' });

    const label = screen.getByText(/test label/i);
    expect(label).toHaveClass('mondrian-label-contrast');
  });

  test('renders the label with red theme', () => {
    renderLabel({ theme: 'red' });

    const label = screen.getByText(/test label/i);
    expect(label).toHaveClass('mondrian-label-red');
  });

  test('renders the label with green theme', () => {
    renderLabel({ theme: 'green' });

    const label = screen.getByText(/test label/i);
    expect(label).toHaveClass('mondrian-label-green');
  });

  test('renders the label with yellow theme', () => {
    renderLabel({ theme: 'yellow' });

    const label = screen.getByText(/test label/i);
    expect(label).toHaveClass('mondrian-label-yellow');
  });

  test('renders different size variants', () => {
    renderLabel({ size: 'sm' });
    let label = screen.getByText('Test Label');
    expect(label).toHaveClass('mondrian-label-sm');

    renderLabel({ size: 'lg' });
    label = screen.getByText('Test Label');
    expect(label).toHaveClass('mondrian-label-lg');
  });

  test('renders different position variants', () => {
    renderLabel({ position: 'left' });
    let label = screen.getByText('Test Label');
    expect(label).toHaveClass('mondrian-label-position-left');

    renderLabel({ position: 'right' });
    label = screen.getByText('Test Label');
    expect(label).toHaveClass('mondrian-label-position-right');

    renderLabel({ position: 'top' });
    label = screen.getByText('Test Label');
    expect(label).toHaveClass('mondrian-label-position-top');

    renderLabel({ position: 'bottom' });
    label = screen.getByText('Test Label');
    expect(label).toHaveClass('mondrian-label-position-bottom');

    renderLabel({ position: 'floating' });
    label = screen.getByText('Test Label');
    expect(label).toHaveClass('mondrian-label-position-floating');
  });

  test('applies htmlFor attribute correctly', () => {
    renderLabel({ htmlFor: 'test-input' });
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  test('applies custom className', () => {
    renderLabel({ className: 'custom-class' });
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('custom-class');
  });
});
