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
>(
  (
    { children, theme = 'blue', height, width, label, type = 'auto', ...props },
    ref
  ) => {
    const viewportRef = React.useRef<HTMLDivElement>(null);
    const [scrollable, setScrollable] = React.useState(false);

    // The viewport only joins the tab order when there is something to scroll,
    // so keyboard users can reach and scroll it.
    React.useEffect(() => {
      const viewport = viewportRef.current;
      if (!viewport) return undefined;

      const measure = () => {
        setScrollable(
          viewport.scrollHeight > viewport.clientHeight ||
            viewport.scrollWidth > viewport.clientWidth
        );
      };
      measure();

      if (typeof ResizeObserver === 'undefined') {
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
      }

      const observer = new ResizeObserver(measure);
      observer.observe(viewport);
      Array.from(viewport.children).forEach((child) => observer.observe(child));
      return () => observer.disconnect();
    }, [children]);

    // Create root style object based on height and width props
    const rootStyle: React.CSSProperties = {
      ...(height ? { height } : {}),
      ...(width ? { width } : {}),
    };

    const rootClassName = [
      'mondrian-scroll-area',
      `mondrian-scroll-area-${theme}`,
    ].join(' ');

    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        type={type}
        className={rootClassName}
        style={rootStyle}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          ref={viewportRef}
          className="mondrian-scroll-area-viewport"
          tabIndex={scrollable ? 0 : undefined}
          role={scrollable && label ? 'region' : undefined}
          aria-label={scrollable && label ? label : undefined}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar theme={theme} orientation="vertical" />
        <ScrollBar theme={theme} orientation="horizontal" />
        <ScrollAreaPrimitive.Corner className="mondrian-scroll-area-corner" />
      </ScrollAreaPrimitive.Root>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
