import React, {createContext, useContext, useState, ReactNode} from 'react';
import {lightTheme, darkTheme} from '../theme/themes';

type Theme = typeof lightTheme;

interface ThemeContextProps {
  theme: Theme;
  isDark : boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
    setIsLightTheme(prev => !prev);
  };

  const theme = isLightTheme ? lightTheme : darkTheme; 

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, isDark}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
