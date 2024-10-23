export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  theme?: 'primary' | 'light' | 'dark' | 'error' | 'success';
  className?: string;
}
