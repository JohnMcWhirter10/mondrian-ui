export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  theme?: 'primary' | 'light' | 'dark' | 'error' | 'success';
}
