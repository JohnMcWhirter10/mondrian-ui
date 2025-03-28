import { render, screen } from '@testing-library/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';

describe('Tooltip', () => {
  it('should render the trigger', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover Me</TooltipTrigger>
          <TooltipContent>Tooltip Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    expect(screen.getByText('Hover Me')).toBeInTheDocument();
    // Tooltip content is not visible initially
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });

  it('should apply Mondrian styling classes to tooltip content', () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover Me</TooltipTrigger>
          <TooltipContent>Tooltip Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    // Since the tooltip is open (defaultOpen), we can check for the content
    const tooltipContent = document.querySelector('.mondrian-tooltip-content');
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent).toHaveTextContent('Tooltip Content');
  });

  it('should apply variant classes when variant prop is provided', () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover Me</TooltipTrigger>
          <TooltipContent variant="red">Red Tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const tooltipContent = document.querySelector(
      '.mondrian-tooltip-content.red'
    );
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent).toHaveTextContent('Red Tooltip');
  });

  it('should position tooltip based on side prop', () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover Me</TooltipTrigger>
          <TooltipContent side="bottom">Bottom Tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const tooltipContent = document.querySelector('.mondrian-tooltip-content');
    expect(tooltipContent).toHaveAttribute('data-side', 'bottom');
  });
});
