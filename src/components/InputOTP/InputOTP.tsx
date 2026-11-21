import * as React from 'react';
import { InputOTPProps } from './InputOTP.types';
import './InputOTP.css';

function clip(value: string, length: number) {
  return Array.from(value).slice(0, length).join('');
}

function cellsFrom(value: string, length: number) {
  const chars = Array.from(value);
  return Array.from({ length }, (_, index) => chars[index] ?? '');
}

function removeAt(value: string, index: number) {
  const chars = Array.from(value);
  chars.splice(index, 1);
  return chars.join('');
}

function sanitize(raw: string) {
  return Array.from(raw.replace(/\s/g, ''));
}

/**
 * Writes characters from `index`, snapping to the end of the current code
 * so a click past the last filled cell appends instead of opening a gap.
 */
function placeChars(
  current: string,
  index: number,
  incoming: string[],
  length: number
) {
  const cells = cellsFrom(current, length);
  const start = Math.min(index, Array.from(current).length);
  let cursor = start;
  incoming.forEach((char) => {
    if (cursor < length) {
      cells[cursor] = char;
      cursor += 1;
    }
  });
  return {
    next: cells.join('').slice(0, length),
    focus: Math.min(Math.max(cursor, start), length - 1),
  };
}

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  (
    {
      id,
      length = 6,
      size = 'default',
      value,
      defaultValue = '',
      onChange,
      disabled = false,
      name,
      inputMode = 'text',
      autoComplete = 'one-time-code',
      pattern,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-invalid': ariaInvalid,
      ...rest
    },
    ref
  ) => {
    const count = Math.max(1, Math.floor(length) || 1);
    const [uncontrolled, setUncontrolled] = React.useState(() =>
      clip(defaultValue, count)
    );
    const current = clip(value !== undefined ? value : uncontrolled, count);
    const cells = cellsFrom(current, count);
    const inputs = React.useRef<Array<HTMLInputElement | null>>([]);
    const forwardedRef = React.useRef(ref);
    forwardedRef.current = ref;
    const skipChange = React.useRef(false);

    const setInput = React.useMemo(
      () =>
        Array.from({ length: count }, (_, index) => {
          return (node: HTMLInputElement | null) => {
            inputs.current[index] = node;
            if (index !== 0) return;
            const outer = forwardedRef.current;
            if (typeof outer === 'function') outer(node);
            else if (outer) outer.current = node;
          };
        }),
      [count]
    );

    // Fast typing can fire several keys before React re-renders, so handlers
    // read the latest code from a ref instead of the render's closure.
    const latest = React.useRef(current);
    latest.current = current;

    const commit = (next: string) => {
      const clipped = clip(next, count);
      latest.current = clipped;
      if (value === undefined) setUncontrolled(clipped);
      onChange?.(clipped);
    };

    const focusAt = (index: number) => {
      const node = inputs.current[index];
      if (!node) return;
      node.focus();
      node.select();
    };

    const onCellChange = (
      index: number,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (skipChange.current) return;
      // Typed keys are handled in onKeyDown. This path is for autofill, IME,
      // and mobile keyboards that send no usable key. If the cell was filled,
      // the browser appended to it, so drop the old character once.
      const incoming = sanitize(event.target.value);
      const old = cellsFrom(latest.current, count)[index];
      if (old && incoming.length > 1) {
        const at = incoming.indexOf(old);
        if (at !== -1) incoming.splice(at, 1);
      }
      if (incoming.length === 0) return;
      const { next, focus } = placeChars(
        latest.current,
        index,
        incoming,
        count
      );
      commit(next);
      focusAt(focus);
    };

    const onPaste = (
      index: number,
      event: React.ClipboardEvent<HTMLInputElement>
    ) => {
      event.preventDefault();
      // The input event that follows a paste would see one cell and wipe the code.
      skipChange.current = true;
      queueMicrotask(() => {
        skipChange.current = false;
      });
      const text =
        event.clipboardData.getData('text/plain') ||
        event.clipboardData.getData('text');
      const incoming = sanitize(text);
      if (incoming.length === 0) return;
      const { next, focus } = placeChars(
        latest.current,
        index,
        incoming,
        count
      );
      commit(next);
      focusAt(focus);
    };

    const onKeyDown = (
      index: number,
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (index > 0) focusAt(index - 1);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (index < count - 1) focusAt(index + 1);
        return;
      }
      if (event.key === 'Home') {
        event.preventDefault();
        focusAt(0);
        return;
      }
      if (event.key === 'End') {
        event.preventDefault();
        focusAt(count - 1);
        return;
      }
      if (event.key === 'Backspace') {
        event.preventDefault();
        if (cellsFrom(latest.current, count)[index]) {
          commit(removeAt(latest.current, index));
          return;
        }
        if (index > 0) {
          commit(removeAt(latest.current, index - 1));
          focusAt(index - 1);
        }
        return;
      }
      if (event.key === 'Delete') {
        event.preventDefault();
        if (cellsFrom(latest.current, count)[index])
          commit(removeAt(latest.current, index));
        return;
      }
      // A typed character replaces whatever the cell holds and moves on, so
      // a filled cell takes a new character on the first try.
      if (
        Array.from(event.key).length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        event.preventDefault();
        if (/\s/.test(event.key)) return;
        const { next, focus } = placeChars(
          latest.current,
          index,
          [event.key],
          count
        );
        commit(next);
        focusAt(focus);
      }
    };

    const rootClassName = [
      'mondrian-input-otp',
      size === 'sm' ? 'mondrian-input-otp-sm' : '',
      size === 'lg' ? 'mondrian-input-otp-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const labelled = Boolean(ariaLabel || ariaLabelledby);

    return (
      <div
        {...rest}
        className={rootClassName}
        role={labelled ? 'group' : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-invalid={ariaInvalid}
        aria-disabled={disabled || undefined}
      >
        {name ? <input type="hidden" name={name} value={current} /> : null}
        {cells.map((char, index) => (
          <input
            key={index}
            ref={setInput[index]}
            id={index === 0 ? id : `${id}-${index}`}
            className="mondrian-input-otp-cell"
            type="text"
            inputMode={inputMode}
            autoComplete={index === 0 ? autoComplete : 'off'}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            pattern={pattern}
            value={char}
            disabled={disabled}
            aria-invalid={ariaInvalid}
            aria-label={`Character ${index + 1} of ${count}`}
            onChange={(event) => onCellChange(index, event)}
            onKeyDown={(event) => onKeyDown(index, event)}
            onPaste={(event) => onPaste(index, event)}
            onFocus={(event) => event.currentTarget.select()}
          />
        ))}
      </div>
    );
  }
);

InputOTP.displayName = 'InputOTP';

export { InputOTP };
