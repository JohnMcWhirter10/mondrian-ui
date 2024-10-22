export interface Theme {
    darkMode: boolean;
    primaryColor: string;
    lightColor: string;
    darkColor: string;
}

export interface ThemeContextType {
    theme: Theme;
    setPrimaryColor: (color: string) => void;
    setDarkMode: (on: boolean) => void;
}
