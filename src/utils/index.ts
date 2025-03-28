/**
 * Simple classNames utility for conditionally joining CSS class names together
 */
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}
