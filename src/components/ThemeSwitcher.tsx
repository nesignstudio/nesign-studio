import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const THEME_COLORS = [
    { name: 'Neon', color: '#00FFFE' },
    { name: 'Magenta', color: '#FE00FF' },
    { name: 'Red', color: '#FF3131' },
    { name: 'Yellow', color: '#FFFE00' },
] as const;

export function ThemeSwitcher() {
    const { accentColor, setAccentColor } = useTheme();

    const cycleTheme = () => {
        const currentIndex = THEME_COLORS.findIndex(t => t.color === accentColor);
        const nextIndex = (currentIndex + 1) % THEME_COLORS.length;
        setAccentColor(THEME_COLORS[nextIndex].color);

        // Sound effect
        const audio = new Audio('/audio/soundreality-ui-pop-up-clear-391155.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play error:', e));
    };

    return (
        <div className="flex items-center">
            {/* Mobile View: Single Square Cycle */}
            <div className="sm:hidden">
                <motion.button
                    onClick={cycleTheme}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative w-8 h-8 flex items-center justify-center border border-[#1A1A3A] bg-[#0A0A1A]/40"
                    title="Cycle Theme Protocol"
                >
                    <div
                        className="w-3 h-3 transition-all duration-300"
                        style={{
                            backgroundColor: accentColor,
                            boxShadow: `0 0 10px ${accentColor}66`
                        }}
                    />
                    {/* HUD Bracket */}
                    <div className="absolute inset-1 pointer-events-none opacity-40">
                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/60" />
                        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/60" />
                        <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/60" />
                        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/60" />
                    </div>
                </motion.button>
            </div>

            {/* Desktop View: Multi-dot Selection */}
            <div className="hidden sm:flex gap-4 items-center px-2 py-1 bg-[#0A0A1A]/40 border border-[#1A1A3A] rounded-sm">
                <div className="flex gap-2.5">
                    {THEME_COLORS.map((theme) => {
                        const isActive = accentColor === theme.color;
                        return (
                            <motion.button
                                key={theme.name}
                                onClick={() => {
                                    setAccentColor(theme.color);
                                    const audio = new Audio('/audio/soundreality-ui-pop-up-clear-391155.mp3');
                                    audio.volume = 0.5;
                                    audio.play().catch(e => console.log('Audio play error:', e));
                                }}
                                whileHover={{ scale: 1.1, y: -1, opacity: 1 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    opacity: isActive ? 1 : 0.45
                                }}
                                className="relative w-3 h-3 group flex items-center justify-center transition-opacity duration-300"
                                title={`${theme.name} Protocol`}
                            >
                                <div
                                    className={`w-full h-full transition-all duration-300 ${isActive ? 'rotate-45 scale-75' : 'scale-100 hover:scale-90'}`}
                                    style={{
                                        backgroundColor: theme.color,
                                        boxShadow: isActive ? `0 0 12px ${theme.color}44` : 'none'
                                    }}
                                />
                                {isActive && (
                                    <motion.div
                                        layoutId="theme-active-frame"
                                        className="absolute -inset-1 pointer-events-none"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/60" />
                                        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/60" />
                                        <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/60" />
                                        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/60" />
                                        <div className="absolute inset-0 bg-white/5 animate-pulse" />
                                    </motion.div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
