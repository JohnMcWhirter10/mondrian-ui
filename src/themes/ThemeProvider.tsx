// themes/ThemeProvider.tsx
import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { Theme } from './Theme.types';
import { calculateColors, generateStyles } from '../utils/colorUtils';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [primaryColor, setPrimaryColor] = useState<string>('#007BFF'); // Default blue
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>({
    darkMode: false,
    primaryColor,
    lightColor: '',
    darkColor: '',
  });

  useEffect(() => {
    const { lightColor, darkColor } = calculateColors(primaryColor);
    setTheme({
      primaryColor,
      lightColor,
      darkColor,
      darkMode,
    });

    const hslStyle = generateStyles(primaryColor, darkMode);

    const styleSheet = document.createElement('style');
    styleSheet.innerText = hslStyle;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [primaryColor, darkMode]);

  return (
    <ThemeContext.Provider value={{ theme, setPrimaryColor, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
