import * as React from 'react';
import {
  AlertProps,
  AlertTheme,
  AlertTitleProps,
  AlertDescriptionProps,
} from './Alert.types';
import './Alert.css';

const SEVERITY: Record<
  AlertTheme,
  { label: string; role: 'alert' | 'status' }
> = {
  blue: { label: 'Information', role: 'status' },
  neutral: { label: 'Note', role: 'status' },
  green: { label: 'Success', role: 'status' },
  yellow: { label: 'Warning', role: 'alert' },
  red: { label: 'Error', role: 'alert' },
};

/** Square glyphs that differ in shape, not just in color. */
const SeverityGlyph = ({ theme }: { theme: AlertTheme }) => (
  <svg
    className="mondrian-alert-label-icon"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="1" y="1" width="14" height="14" />
    {theme === 'red' && <path d="M5 5l6 6M11 5l-6 6" />}
    {theme === 'yellow' && <path d="M8 4v5M8 11.5v1" />}
    {theme === 'green' && <path d="M4.5 8.5l2.5 2.5 4.5-5" />}
    {theme === 'blue' && <path d="M8 7v5M8 4v1" />}
    {theme === 'neutral' && <path d="M4 8h8" />}
  </svg>
);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ children, theme = 'blue', size = 'default', label, ...props }, ref) => {
    const alertClassName = [
      'mondrian-alert',
      `mondrian-alert-${theme}`,
      size === 'sm' ? 'mondrian-alert-sm' : '',
      size === 'lg' ? 'mondrian-alert-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const severity = SEVERITY[theme];

    return (
      <div ref={ref} className={alertClassName} role={severity.role} {...props}>
        <span className="mondrian-alert-label">
          <SeverityGlyph theme={theme} />
          <span>{label ?? severity.label}</span>
        </span>
        {children}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ children, ...props }, ref) => (
    <h5 ref={ref} className="mondrian-alert-title" {...props}>
      {children}
    </h5>
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ children, ...props }, ref) => (
  <div ref={ref} className="mondrian-alert-description" {...props}>
    {children}
  </div>
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
