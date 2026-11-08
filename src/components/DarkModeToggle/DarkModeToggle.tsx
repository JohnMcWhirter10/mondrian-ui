import * as React from 'react';
import { useTheme } from '../../themes';
import { writeStoredDarkMode } from '../../themes/darkModeStorage';
import { Label } from '../Label/Label';
import { Toggle } from '../Toggle/Toggle';
import { DarkModeToggleProps } from './DarkModeToggle.types';

/**
 * A switch bound to `useTheme().setDarkMode`. The choice is saved in
 * localStorage and restored on mount. The visible text is its children, and
 * the switch sits inside its own label so no id is needed.
 */
const DarkModeToggle = React.forwardRef<HTMLButtonElement, DarkModeToggleProps>(
  ({ children, theme = 'yellow', ...props }, ref) => {
    const { theme: current, setDarkMode } = useTheme();

    const handleChange = (on: boolean) => {
      setDarkMode(on);
      writeStoredDarkMode(on);
    };

    return (
      <Label theme="neutral">
        <Toggle
          ref={ref}
          theme={theme}
          {...props}
          checked={current.isDarkMode}
          onCheckedChange={handleChange}
        />
        {children}
      </Label>
    );
  }
);

DarkModeToggle.displayName = 'DarkModeToggle';

export { DarkModeToggle };
