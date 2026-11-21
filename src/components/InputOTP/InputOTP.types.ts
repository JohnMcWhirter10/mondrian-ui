import * as React from 'react';

/**
 * A row of single-character cells for a one-time code. The cells share one
 * black grid. The consumer supplies `id` for the first cell.
 */
export type InputOTPProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'className' | 'onChange' | 'defaultValue' | 'children'
> & {
  /**
   * Id of the first cell. Later cells use `${id}-${index}`.
   */
  id: string;

  /**
   * How many cells to render.
   * @default 6
   */
  length?: number;

  /**
   * Size from the library scale. Cells are squares on that scale.
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg';

  /**
   * The code. Omit to let the row remember what was typed.
   */
  value?: string;

  /**
   * Initial code when `value` is omitted.
   * @default ""
   */
  defaultValue?: string;

  /**
   * Called with the code after a type, delete, or paste.
   */
  onChange?: (value: string) => void;

  /**
   * Disables every cell.
   * @default false
   */
  disabled?: boolean;

  /**
   * Name of a hidden input that submits the whole code with a form.
   */
  name?: string;

  /**
   * Hint for the cell keyboard.
   * @default "text"
   */
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];

  /**
   * Autocomplete token for the first cell. Later cells opt out.
   * @default "one-time-code"
   */
  autoComplete?: string;

  /**
   * Passed through to each cell.
   */
  pattern?: string;
};
