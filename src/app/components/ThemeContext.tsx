import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark';
export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'protanomaly' | 'deuteranomaly' | 'tritanomaly' | 'achromatopsia';

interface ThemeColors {
  // Background colors
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Brand colors (extraídas da logo Venuo)
  orange: string;        // Sol e anel superior
  orangeLight: string;
  orangeDark: string;
  orangeButtonBorder: string; // Borda para botões laranja (usado quando gradiente está ativo)
  blue: string;          // Azul marinho profundo (noite)
  blueLight: string;     // Azul ciano (parte iluminada)
  blueDark: string;      // Azul escuro do pin
  cyan: string;          // Azul ciano brilhante
  white: string;
  
  // UI Elements
  cardBg: string;
  cardBackground: string;
  cardBorder: string;
  glassBg: string;
  glassBorder: string;
  
  // Gradients
  gradientPrimary: string;
  gradientBackground: string;
  gradientAccent: string;
  
  // Theme indicator
  theme: Theme;
}

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  colorBlindMode: ColorBlindMode;
  setColorBlindMode: (mode: ColorBlindMode) => void;
  useOxfordBlue: boolean;
  toggleBackground: () => void;
  useGradientBg: boolean;
  toggleGradient: () => void;
}

const lightColors: ThemeColors = {
  bgPrimary: '#FFFFFF',
  bgSecondary: '#FFFFFF',
  bgTertiary: '#FFFFFF',

  textPrimary: '#041420',
  textSecondary: '#0A2540',
  textMuted: '#2D3748',

  // Cores da logo Venuo
  orange: '#FF7A3D',
  orangeLight: '#FF9B66',
  orangeDark: '#E55A2B',
  orangeButtonBorder: 'none',
  blue: '#0A2540',
  blueLight: '#0097B2',
  blueDark: '#041420',
  cyan: '#00B4D8',
  white: '#FFFFFF',

  cardBg: 'rgba(255, 255, 255, 0.85)',
  cardBackground: 'rgba(255, 255, 255, 0.85)',
  cardBorder: 'rgba(0, 180, 216, 0.25)',
  glassBg: 'rgba(232, 246, 249, 0.7)',
  glassBorder: 'rgba(72, 202, 228, 0.4)',

  gradientPrimary: 'linear-gradient(135deg, #FF7A3D 0%, #48CAE4 100%)',
  gradientBackground: '#FFFFFF',
  gradientAccent: 'linear-gradient(135deg, #FF7A3D 0%, #00B4D8 50%, #48CAE4 100%)',

  theme: 'light',
};

const getDarkColors = (useOxfordBlue: boolean, useGradientBg: boolean): ThemeColors => {
  if (useGradientBg) {
    // Full diagonal gradient version
    return {
      bgPrimary: 'transparent',
      bgSecondary: 'rgba(0, 0, 0, 0.25)',
      bgTertiary: 'rgba(0, 0, 0, 0.25)',

      textPrimary: '#FFFFFF',
      textSecondary: '#FFFFFF',
      textMuted: '#E8EDF3',

      // Cores da logo Venuo
      orange: '#F4622A',
      orangeLight: '#FF9B66',
      orangeDark: '#E55A2B',
      orangeButtonBorder: '1px solid rgba(255, 255, 255, 0.8)',
      blue: '#002147',
      blueLight: '#4BC8D4',
      blueDark: '#001633',
      cyan: '#4BC8D4',
      white: '#FFFFFF',

      cardBg: 'rgba(0, 0, 0, 0.3)',
      cardBackground: 'rgba(0, 0, 0, 0.3)',
      cardBorder: 'rgba(255, 255, 255, 0.1)',
      glassBg: 'rgba(0, 0, 0, 0.2)',
      glassBorder: 'rgba(255, 255, 255, 0.15)',

      gradientPrimary: 'linear-gradient(135deg, #F4622A 0%, #4BC8D4 100%)',
      gradientBackground: '#000D1A',
      gradientAccent: 'linear-gradient(135deg, #F4622A 0%, #001535 15%, #000D1A 100%)',

      theme: 'dark',
    };
  }

  if (useOxfordBlue) {
    // Oxford Blue version (#002147)
    return {
      bgPrimary: '#001633',
      bgSecondary: '#002147',
      bgTertiary: '#003366',

      textPrimary: '#FFFFFF',
      textSecondary: '#E8EDF3',
      textMuted: '#B8C5D6',

      // Cores da logo Venuo (mantidas)
      orange: '#F4622A',
      orangeLight: '#FF9B66',
      orangeDark: '#E55A2B',
      orangeButtonBorder: 'none',
      blue: '#002147',
      blueLight: '#4BC8D4',
      blueDark: '#001633',
      cyan: '#4BC8D4',
      white: '#FFFFFF',

      cardBg: 'rgba(255, 255, 255, 0.08)',
      cardBackground: 'rgba(255, 255, 255, 0.08)',
      cardBorder: 'rgba(75, 200, 212, 0.25)',
      glassBg: 'rgba(255, 255, 255, 0.05)',
      glassBorder: 'rgba(75, 200, 212, 0.2)',

      gradientPrimary: 'linear-gradient(135deg, #F4622A 0%, #4BC8D4 100%)',
      gradientBackground: 'linear-gradient(135deg, #001633 0%, #002147 50%, #003366 100%)',
      gradientAccent: 'linear-gradient(135deg, #F4622A 0%, #4BC8D4 50%, #4BC8D4 100%)',

      theme: 'dark',
    };
  }

  // Padrão original (#0D1B2A)
  return {
    bgPrimary: '#041420',
    bgSecondary: '#0D1B2A',
    bgTertiary: '#1A2535',

    textPrimary: '#FFFFFF',
    textSecondary: '#E8EDF3',
    textMuted: '#B8C5D6',

    // Cores da logo Venuo
    orange: '#F4622A',
    orangeLight: '#FF9B66',
    orangeDark: '#E55A2B',
    orangeButtonBorder: 'none',
    blue: '#0A2540',
    blueLight: '#4BC8D4',
    blueDark: '#041420',
    cyan: '#4BC8D4',
    white: '#FFFFFF',

    cardBg: 'rgba(255, 255, 255, 0.08)',
    cardBackground: 'rgba(255, 255, 255, 0.08)',
    cardBorder: 'rgba(75, 200, 212, 0.25)',
    glassBg: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(75, 200, 212, 0.2)',

    gradientPrimary: 'linear-gradient(135deg, #F4622A 0%, #4BC8D4 100%)',
    gradientBackground: 'linear-gradient(135deg, #041420 0%, #0D1B2A 50%, #1A2535 100%)',
    gradientAccent: 'linear-gradient(135deg, #F4622A 0%, #4BC8D4 50%, #4BC8D4 100%)',

    theme: 'dark',
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('venuo-theme') as Theme;
    return savedTheme || 'dark';
  });

  const [colorBlindMode, setColorBlindModeState] = useState<ColorBlindMode>(() => {
    // Check localStorage for saved colorblind mode
    const savedMode = localStorage.getItem('venuo-colorblind-mode') as ColorBlindMode;
    return savedMode || 'none';
  });

  const [useOxfordBlue, setUseOxfordBlue] = useState<boolean>(() => {
    // Check localStorage for saved background preference
    const savedBg = localStorage.getItem('venuo-oxford-blue');
    return savedBg === 'true';
  });

  const [useGradientBg, setUseGradientBg] = useState<boolean>(() => {
    // Check localStorage for saved gradient preference
    const savedGradient = localStorage.getItem('venuo-gradient-bg');
    return savedGradient === 'true';
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('venuo-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Save colorblind mode to localStorage
    localStorage.setItem('venuo-colorblind-mode', colorBlindMode);

    // Apply filter to document root
    const filterValue = getColorBlindFilter(colorBlindMode);
    document.documentElement.style.filter = filterValue;
  }, [colorBlindMode]);

  useEffect(() => {
    // Save background preference to localStorage
    localStorage.setItem('venuo-oxford-blue', String(useOxfordBlue));
  }, [useOxfordBlue]);

  useEffect(() => {
    // Save gradient preference to localStorage
    localStorage.setItem('venuo-gradient-bg', String(useGradientBg));
  }, [useGradientBg]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setColorBlindMode = (mode: ColorBlindMode) => {
    setColorBlindModeState(mode);
  };

  const toggleBackground = () => {
    setUseOxfordBlue((prev) => !prev);
  };

  const toggleGradient = () => {
    setUseGradientBg((prev) => !prev);
  };

  const colors = theme === 'light' ? lightColors : getDarkColors(useOxfordBlue, useGradientBg);

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, colorBlindMode, setColorBlindMode, useOxfordBlue, toggleBackground, useGradientBg, toggleGradient }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Helper function to get CSS filter for colorblind mode
function getColorBlindFilter(mode: ColorBlindMode): string {
  switch (mode) {
    case 'protanopia':
      // Red-blind (missing red cones)
      return 'url(#protanopia)';
    case 'deuteranopia':
      // Green-blind (missing green cones)
      return 'url(#deuteranopia)';
    case 'tritanopia':
      // Blue-blind (missing blue cones)
      return 'url(#tritanopia)';
    case 'protanomaly':
      // Red-weak
      return 'url(#protanomaly)';
    case 'deuteranomaly':
      // Green-weak (most common)
      return 'url(#deuteranomaly)';
    case 'tritanomaly':
      // Blue-weak
      return 'url(#tritanomaly)';
    case 'achromatopsia':
      // Monochrome (no color vision)
      return 'grayscale(100%)';
    case 'none':
    default:
      return 'none';
  }
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}