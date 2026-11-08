import * as React from 'react';

export interface KbdProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className'> {
  /**
   * The key label, such as "Ctrl" or "K".
   */
  children?: React.ReactNode;
}
