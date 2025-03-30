import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { ScrollAreaProps, ScrollBarProps } from './ScrollArea.types';
import './ScrollArea.css';

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ orientation = 'vertical', theme = 'blue', ...props }, ref) => {
  const scrollbarClassName = [
    'mondrian-scrollbar',
    orientation === 'vertical'
      ? 'mondrian-scrollbar-vertical'
      : 'mondrian-scrollbar-horizontal',
  ].join(' ');

  const thumbClassName = ['mondrian-scrollbar-thumb', theme].join(' ');

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={scrollbarClassName}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className={thumbClassName} />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
});

ScrollBar.displayName = 'ScrollBar';

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ children, theme = 'blue', height, width, ...props }, ref) => {
  // Create root style object based on height and width props
  const rootStyle: React.CSSProperties = {
    ...(height ? { height } : {}),
    ...(width ? { width } : {}),
  };

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className="mondrian-scroll-area"
      style={rootStyle}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="mondrian-scroll-area-viewport">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar theme={theme} orientation="vertical" />
      <ScrollBar theme={theme} orientation="horizontal" />
      <ScrollAreaPrimitive.Corner className="mondrian-scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  );
});

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
