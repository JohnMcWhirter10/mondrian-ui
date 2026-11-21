import * as React from 'react';
import * as P from '@radix-ui/react-context-menu';
import { MondrianRightArrow, Plus, Square } from '../icons';
import type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuCheckboxItemProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuLabelProps,
  ContextMenuSeparatorProps,
  ContextMenuGroupProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubContentProps,
} from './ContextMenu.types';
import '../../styles/native-scroll.css';
// Shares the DropdownMenu rows, frame and separators so the two look identical.
import '../DropdownMenu/DropdownMenu.css';
import './ContextMenu.css';

const ContextMenuContext = React.createContext<{
  theme: ContextMenuProps['theme'];
}>({ theme: 'blue' });

const cx = (...c: Array<string | undefined | false>) =>
  c.filter(Boolean).join(' ');

const ContextMenu = ({
  children,
  theme = 'blue',
  ...props
}: ContextMenuProps) => (
  <ContextMenuContext.Provider value={{ theme }}>
    <P.Root {...props}>{children}</P.Root>
  </ContextMenuContext.Provider>
);
ContextMenu.displayName = 'ContextMenu';

const ContextMenuTrigger = React.forwardRef<
  React.ElementRef<typeof P.Trigger>,
  ContextMenuTriggerProps
>((props, ref) => (
  <P.Trigger className="mondrian-context-trigger" ref={ref} {...props} />
));
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof P.Content>,
  ContextMenuContentProps
>(({ children, theme: propTheme, ...props }, ref) => {
  const { theme: ctx } = React.useContext(ContextMenuContext);
  return (
    <P.Portal>
      <P.Content
        className={cx('mondrian-dropdown-content', propTheme || ctx)}
        ref={ref}
        {...props}
      >
        <div className="mondrian-dropdown-scroll mondrian-native-scroll">
          {children}
        </div>
      </P.Content>
    </P.Portal>
  );
});
ContextMenuContent.displayName = 'ContextMenuContent';

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof P.Item>,
  ContextMenuItemProps
>((props, ref) => (
  <P.Item className="mondrian-dropdown-item" ref={ref} {...props} />
));
ContextMenuItem.displayName = 'ContextMenuItem';

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof P.CheckboxItem>,
  ContextMenuCheckboxItemProps
>(({ children, ...props }, ref) => (
  <P.CheckboxItem
    className="mondrian-dropdown-checkbox-item"
    ref={ref}
    {...props}
  >
    <P.ItemIndicator className="mondrian-dropdown-item-indicator">
      <Plus size={16} aria-hidden="true" focusable="false" />
    </P.ItemIndicator>
    {children}
  </P.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

const ContextMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof P.RadioGroup>,
  ContextMenuRadioGroupProps
>((props, ref) => (
  <P.RadioGroup
    className="mondrian-dropdown-radio-group"
    ref={ref}
    {...props}
  />
));
ContextMenuRadioGroup.displayName = 'ContextMenuRadioGroup';

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof P.RadioItem>,
  ContextMenuRadioItemProps
>(({ children, ...props }, ref) => (
  <P.RadioItem className="mondrian-dropdown-radio-item" ref={ref} {...props}>
    <P.ItemIndicator className="mondrian-dropdown-item-indicator">
      <Square size={12} aria-hidden="true" focusable="false" />
    </P.ItemIndicator>
    {children}
  </P.RadioItem>
));
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof P.Label>,
  ContextMenuLabelProps
>((props, ref) => (
  <P.Label className="mondrian-dropdown-label" ref={ref} {...props} />
));
ContextMenuLabel.displayName = 'ContextMenuLabel';

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof P.Separator>,
  ContextMenuSeparatorProps
>((props, ref) => (
  <P.Separator className="mondrian-dropdown-separator" ref={ref} {...props} />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

const ContextMenuGroup = React.forwardRef<
  React.ElementRef<typeof P.Group>,
  ContextMenuGroupProps
>((props, ref) => (
  <P.Group className="mondrian-dropdown-group" ref={ref} {...props} />
));
ContextMenuGroup.displayName = 'ContextMenuGroup';

const ContextMenuSub = (props: ContextMenuSubProps) => <P.Sub {...props} />;
ContextMenuSub.displayName = 'ContextMenuSub';

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof P.SubTrigger>,
  ContextMenuSubTriggerProps
>(({ children, ...props }, ref) => {
  const { theme } = React.useContext(ContextMenuContext);
  return (
    <P.SubTrigger
      className={cx('mondrian-dropdown-sub-trigger', theme)}
      ref={ref}
      {...props}
    >
      {children}
      <div className="mondrian-dropdown-sub-icon" aria-hidden="true">
        <MondrianRightArrow />
      </div>
    </P.SubTrigger>
  );
});
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof P.SubContent>,
  ContextMenuSubContentProps
>(({ children, theme: propTheme, ...props }, ref) => {
  const { theme: ctx } = React.useContext(ContextMenuContext);
  return (
    <P.SubContent
      className={cx('mondrian-dropdown-sub-content', propTheme || ctx)}
      ref={ref}
      {...props}
    >
      <div className="mondrian-dropdown-scroll mondrian-native-scroll">
        {children}
      </div>
    </P.SubContent>
  );
});
ContextMenuSubContent.displayName = 'ContextMenuSubContent';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
};
