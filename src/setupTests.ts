import '@testing-library/jest-dom';

/**
 * Browser APIs that jsdom lacks but Radix and ThemeProvider rely on.
 * Stubbed once here so no test file has to repeat them. Tests that need a
 * different behavior (for example a dark OS) call `mockMatchMedia` from
 * `src/test-utils`.
 */
const defineStub = (target: object, key: string, value: unknown) => {
  if (!(key in target)) {
    Object.defineProperty(target, key, {
      value,
      writable: true,
      configurable: true,
    });
  }
};

// ThemeProvider reads prefers-color-scheme. Default: light OS.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

// Radix ScrollArea and Select observe element size.
defineStub(
  globalThis,
  'ResizeObserver',
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
);

// Radix Select scrolls the highlighted item into view and uses pointer capture.
defineStub(window.HTMLElement.prototype, 'scrollIntoView', () => undefined);
defineStub(window.HTMLElement.prototype, 'hasPointerCapture', () => false);
defineStub(
  window.HTMLElement.prototype,
  'releasePointerCapture',
  () => undefined
);
