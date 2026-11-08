import type { PlaneTheme } from '../themes/Theme.types';

/** The four plane themes every themed component supports. */
export const PLANE_THEMES = [
  'blue',
  'neutral',
  'red',
  'yellow',
] as const satisfies readonly PlaneTheme[];

/** Plane themes plus `green`, kept by components that predate PlaneTheme. */
export const PLANE_THEMES_WITH_GREEN = [...PLANE_THEMES, 'green'] as const;

export type PlaneThemeName = (typeof PLANE_THEMES)[number];
export type PlaneThemeWithGreenName = (typeof PLANE_THEMES_WITH_GREEN)[number];
