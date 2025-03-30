import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollArea } from './ScrollArea';

describe('ScrollArea Component', () => {
  it('renders correctly with children', () => {
    const testContent = 'Test content for scroll area';
    render(<ScrollArea data-testid="scroll-area">{testContent}</ScrollArea>);

    const scrollArea = screen.getByTestId('scroll-area');
    expect(scrollArea).toBeInTheDocument();
    expect(scrollArea).toHaveClass('mondrian-scroll-area');
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('applies height and width correctly', () => {
    const { container } = render(<ScrollArea height={200} width={300} />);

    const scrollArea = container.querySelector('.mondrian-scroll-area');
    expect(scrollArea).toHaveStyle({
      height: '200px',
      width: '300px',
    });
  });

  it('uses theme for scrollbar thumb', () => {
    const { container } = render(
      <ScrollArea theme="red">Test content</ScrollArea>
    );

    const thumbElements = container.querySelectorAll(
      '.mondrian-scrollbar-thumb'
    );
    thumbElements.forEach((thumb) => {
      expect(thumb).toHaveClass('red');
    });
  });

  it('renders both vertical and horizontal scrollbars', () => {
    const { container } = render(<ScrollArea>Test content</ScrollArea>);

    const verticalScrollbar = container.querySelector(
      '.mondrian-scrollbar-vertical'
    );
    const horizontalScrollbar = container.querySelector(
      '.mondrian-scrollbar-horizontal'
    );

    expect(verticalScrollbar).toBeInTheDocument();
    expect(horizontalScrollbar).toBeInTheDocument();
  });

  it('defaults to blue theme when no theme is specified', () => {
    const { container } = render(<ScrollArea>Test content</ScrollArea>);

    const thumbElements = container.querySelectorAll(
      '.mondrian-scrollbar-thumb'
    );
    thumbElements.forEach((thumb) => {
      expect(thumb).toHaveClass('blue');
    });
  });
});
