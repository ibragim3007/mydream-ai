import { ThemeContext } from '@react-navigation/native';
import { useContext } from 'react';

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return theme;
}
