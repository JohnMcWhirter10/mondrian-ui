import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronRight } from '../icons';
import {
  SelectProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectLabelProps,
  SelectSeparatorProps,
  SelectGroupProps,
  SelectValueProps,
} from './Select.types';
import './Select.css';

const Select = ({
  children,
  theme = 'blue',
  size = 'default',
  ...props
}: SelectProps) => (
  <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
);
Select.displayName = 'Select';

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps & {
    theme?: SelectProps['theme'];
    size?: SelectProps['size'];
  }
>(({ children, theme = 'blue', size = 'default', ...props }, ref) => {
  const triggerClassName = [
    'mondrian-select-trigger',
    theme,
    size === 'sm' ? 'mondrian-select-trigger-sm' : '',
    size === 'lg' ? 'mondrian-select-trigger-lg' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <SelectPrimitive.Trigger className={triggerClassName} ref={ref} {...props}>
      {children}
      <SelectPrimitive.Icon className="mondrian-select-icon">
        <ChevronRight className="mondrian-select-icon-chevron" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  SelectValueProps
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Value className="mondrian-select-value" ref={ref} {...props}>
    {children}
  </SelectPrimitive.Value>
));
SelectValue.displayName = 'SelectValue';

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps & {
    theme?: SelectProps['theme'];
  }
>(({ children, theme = 'blue', ...props }, ref) => {
  const contentClassName = ['mondrian-select-content', theme]
    .filter(Boolean)
    .join(' ');

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={contentClassName}
        position="popper"
        ref={ref}
        {...props}
      >
        <SelectPrimitive.Viewport className="mondrian-select-viewport">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item className="mondrian-select-item" ref={ref} {...props}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="mondrian-select-item-indicator" />
  </SelectPrimitive.Item>
));
SelectItem.displayName = 'SelectItem';

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Label className="mondrian-select-label" ref={ref} {...props}>
    {children}
  </SelectPrimitive.Label>
));
SelectLabel.displayName = 'SelectLabel';

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>((props, ref) => (
  <SelectPrimitive.Separator
    className="mondrian-select-separator"
    ref={ref}
    {...props}
  />
));
SelectSeparator.displayName = 'SelectSeparator';

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Group>,
  SelectGroupProps
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Group className="mondrian-select-group" ref={ref} {...props}>
    {children}
  </SelectPrimitive.Group>
));
SelectGroup.displayName = 'SelectGroup';

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
};
