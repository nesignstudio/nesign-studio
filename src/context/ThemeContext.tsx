import React, { createContext, useContext, useState, useEffect } from 'react';

type AccentColor = '#00FFFE' | '#FE00FF' | '#FF3131' | '#FFFE00';

interface ThemeContextType {
    accentColor: AccentColor;
    setAccentColor: (color: AccentColor) => void;
    rgbValues: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorToRgb: Record<AccentColor, string> = {
    '#00FFFE': '0, 255, 254',
    '#FE00FF': '254, 0, 255',
    '#FF3131': '255, 49, 49',
    '#FFFE00': '255, 254, 0',
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accentColor, setAccentColor] = useState<AccentColor>(() => {
        const saved = localStorage.getItem('nesign-accent-color');
        if (saved && colorToRgb[saved as AccentColor]) return saved as AccentColor;
        return '#00FFFE';
    });

    useEffect(() => {
        const rgb = colorToRgb[accentColor];
        localStorage.setItem('nesign-accent-color', accentColor);
        document.documentElement.style.setProperty('--color-accent', accentColor);
        document.documentElement.style.setProperty('--color-accent-rgb', rgb);

        // Enhanced Neon Glow System
        // primary: vivid core, secondary: atmospheric bloom, tertiary: subtle environmental light
        const primaryGlow = `0 0 5px rgba(${rgb}, 0.6), 0 0 15px rgba(${rgb}, 0.3)`;
        const secondaryGlow = `0 0 10px rgba(${rgb}, 0.4), 0 0 30px rgba(${rgb}, 0.2)`;
        const tertiaryGlow = `0 0 20px rgba(${rgb}, 0.2), 0 0 60px rgba(${rgb}, 0.1)`;

        document.documentElement.style.setProperty('--neon-glow-primary', primaryGlow);
        document.documentElement.style.setProperty('--neon-glow-secondary', secondaryGlow);
        document.documentElement.style.setProperty('--neon-glow-tertiary', tertiaryGlow);
    }, [accentColor]);

    return (
        <ThemeContext.Provider value={{ accentColor, setAccentColor, rgbValues: colorToRgb[accentColor] }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
