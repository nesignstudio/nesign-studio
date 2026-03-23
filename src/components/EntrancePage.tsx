import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { InteractiveGrid } from './InteractiveGrid';
import { ThemeSwitcher } from './ThemeSwitcher';

interface EntrancePageProps {
    onEnter: () => void;
}

export function EntrancePage({ onEnter }: EntrancePageProps) {
    const { t, language, setLanguage, isRTL } = useLanguage();
    const [isEntering, setIsEntering] = useState(false);

    // Parallax spring settings
    const springConfig = { damping: 30, stiffness: 100 };
    const translateX = useSpring(useMotionValue(0), springConfig);
    const translateY = useSpring(useMotionValue(0), springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;
            translateX.set(x);
            translateY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [translateX, translateY]);

    const handleEnterClick = () => {
        setIsEntering(true);
        setTimeout(() => {
            onEnter();
        }, 800); // Wait for animation
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <div className={`fixed inset-0 z-[100] flex bg-[#050510] overflow-hidden ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Cinematic Transition Overlay */}
            <AnimatePresence>
                {isEntering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black z-[110]"
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                )}
            </AnimatePresence>

            {/* Background Grid Lines (Engineered Motion) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 grid-pattern-technical" />
                <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--color-accent-rgb),0.05),transparent)]"
                    style={{ x: translateX, y: translateY }}
                />
            </div>

            {/* Left Side: Immersive Visual */}
            <motion.div
                className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#050510] items-center justify-center p-12"
                initial={{ x: isRTL ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="w-full max-w-[500px] aspect-square relative z-20">
                    <div className="relative z-10 w-full h-full">
                        <InteractiveGrid />
                    </div>

                    {/* Floating HUD status */}
                    <div className="absolute -bottom-12 left-0 font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent)]/40 flex items-center gap-4">
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                            GRID_STABLE
                        </span>
                        <span>0x4F92_MEMBRANE</span>
                    </div>
                </div>

                {/* Subtle environmental glow around the square */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--color-accent-rgb),0.03),transparent_60%)] pointer-events-none" />
            </motion.div>

            {/* Right Side: Content Area */}
            <motion.div
                className={`w-full lg:w-1/2 relative bg-gradient-to-b from-[#0A0A1A] to-[#050510] flex flex-col justify-center p-8 md:p-12 lg:p-20 ${isRTL ? 'items-end' : 'items-start'}`}
                initial={{ x: isRTL ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
                {/* Content Container */}
                <div className={`max-w-2xl w-full flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'} ${isRTL ? 'rtl' : 'ltr'} -translate-y-20`}>
                    {/* Header Row: Logo & Language Switcher */}
                    <div className="w-full flex items-center justify-between mb-32">
                        {/* Brand Logo */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <img
                                src="/entrance-logo.png"
                                alt="Logo"
                                className="h-8 md:h-10 w-auto object-contain brightness-125"
                                style={{ filter: 'drop-shadow(0 0 12px rgba(var(--color-accent-rgb), 0.4))' }}
                            />
                        </motion.div>

                        {/* Secondary Header Row: Theme & Language */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex items-center gap-6"
                        >
                            {/* Color Switcher */}
                            <ThemeSwitcher />

                            <div className="w-px h-4 bg-[#1A1A3A]" />

                            {/* Language Switcher */}
                            <button
                                onClick={toggleLanguage}
                                className="relative w-12 h-9 flex items-center justify-center border border-[#1A1A3A] group overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)]"
                            >
                                <div className="absolute inset-0 bg-[var(--color-accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                                <span className={`relative text-[10px] font-bold tracking-[0.3em] font-display transition-colors duration-300 ${language === 'en' ? 'text-[var(--color-accent)]' : 'text-white'} group-hover:text-[#050510] uppercase`}>
                                    {language === 'en' ? 'AR' : 'EN'}
                                </span>
                            </button>
                        </motion.div>
                    </div>

                    {/* Main Headline */}
                    <motion.div
                        className="mb-24"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <img
                            src="/towards-the-future.png"
                            alt="TOWARDS THE FUTURE"
                            className="h-auto w-full max-w-[320px] object-contain brightness-110"
                        />
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="mb-12"
                    >
                        <button
                            onClick={handleEnterClick}
                            className="relative px-12 py-4 text-[var(--color-accent)] text-sm tracking-[0.4em] uppercase font-bold font-display overflow-hidden group transition-all duration-500"
                            style={{
                                backgroundColor: 'rgba(var(--color-accent-rgb), 0.05)',
                                borderColor: 'rgba(var(--color-accent-rgb), 0.3)',
                                borderStyle: 'solid',
                                borderWidth: '1px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(var(--color-accent-rgb), 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(var(--color-accent-rgb), 0.05)';
                            }}
                        >
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                                {t('entrance.button')}
                            </span>

                            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
                            <div className="absolute top-0 right-0 w-0 h-[2px] bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
                            <div className="absolute top-0 left-0 w-[2px] h-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:h-full" />
                            <div className="absolute bottom-0 right-0 w-[2px] h-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:h-full" />

                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                                style={{ backgroundColor: 'rgba(var(--color-accent-rgb), 0.2)' }} />
                        </button>
                    </motion.div>

                    {/* Small Strategic Paragraph */}
                    <motion.p
                        className="text-[#8888AA] text-xs md:text-sm leading-relaxed tracking-wider font-light max-w-md opacity-80 text-justify"
                        style={{ textAlignLast: 'justify' }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        {t('entrance.description')}
                    </motion.p>
                </div>

                {/* Technical Data Elements */}
                <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} md:bottom-12 md:${isRTL ? 'right-12' : 'left-12'} opacity-10 flex flex-col gap-2 font-mono text-[10px] tracking-widest text-[var(--color-accent)]`}>
                    <span>SYSTEM_INIT: SUCCESS</span>
                    <span>CORE_LINK: ESTABLISHED</span>
                    <span>ENV_RENDER: 4.0.1</span>
                </div>
            </motion.div>

            <style>{`
        .grid-pattern-technical {
          background-image: 
            linear-gradient(rgba(var(--color-accent-rgb), 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--color-accent-rgb), 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .reveal-text {
          animation: revealText 1.5s cubic-bezier(0.77, 0, 0.175, 1);
        }
        @keyframes revealText {
          0% { transform: translateY(100%); clip-path: inset(0 0 100% 0); }
          100% { transform: translateY(0); clip-path: inset(0 0 0 0); }
        }
      `}</style>
        </div>
    );
}
