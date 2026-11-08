/** localStorage key holding an explicit dark mode choice ('dark' or 'light'). */
export const DARK_MODE_STORAGE_KEY = 'mondrian-ui:dark-mode';

/** The saved choice, or null when none is saved or storage is unavailable. */
export const readStoredDarkMode = (): boolean | null => {
  try {
    const value = window.localStorage.getItem(DARK_MODE_STORAGE_KEY);
    return value === null ? null : value === 'dark';
  } catch {
    return null;
  }
};

export const writeStoredDarkMode = (on: boolean): void => {
  try {
    window.localStorage.setItem(DARK_MODE_STORAGE_KEY, on ? 'dark' : 'light');
  } catch {
    // Storage can be unavailable (private mode); the choice still applies.
  }
};
