
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: 'primary' | 'light' | 'dark' | 'error' | 'success'
}