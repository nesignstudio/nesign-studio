import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useState } from 'react';

export function BackToTop() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show after scrolling 100px
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Desktop View */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="hidden md:block fixed bottom-40 right-6 md:right-12 z-40 pointer-events-none"
                    >
                        <div className="flex flex-col items-center gap-6">
                            {/* The technical vertical line */}
                            <div className="h-24 w-px bg-gradient-to-t from-[var(--color-accent)]/40 via-[var(--color-accent)]/10 to-transparent relative">
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full blur-[2px] animate-pulse" />
                            </div>

                            <button
                                onClick={scrollToTop}
                                className="pointer-events-auto group relative flex flex-col items-center gap-4"
                                aria-label="Back to top"
                            >
                                {/* Vertical Text */}
                                <span
                                    className="text-[10px] uppercase tracking-[0.4em] font-display font-bold text-[#8888AA] group-hover:text-[var(--color-accent)] transition-colors duration-500 py-4"
                                    style={{
                                        writingMode: 'vertical-rl',
                                        textOrientation: 'mixed',
                                        transform: 'rotate(180deg)'
                                    }}
                                >
                                    {t('footer.backToTop')}
                                </span>

                                {/* Technical Indicator Square */}
                                <div className="relative w-10 h-10 border border-[#1A1A3A] bg-[#050510]/80 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:border-[rgba(var(--color-accent-rgb),0.5)] group-hover:bg-[rgba(var(--color-accent-rgb),0.05)]">
                                    {/* Arrow Icon */}
                                    <svg
                                        className="w-4 h-4 text-[#8888AA] group-hover:text-[var(--color-accent)] transition-all duration-500 transform group-hover:-translate-y-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                    </svg>

                                    {/* Corner Accents */}
                                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-[var(--color-accent)] scale-0 group-hover:scale-100 transition-transform duration-300 origin-top-left" />
                                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-[var(--color-accent)] scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-right" />

                                    {/* Scanning Light Effect */}
                                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-full h-[1px] bg-[rgba(var(--color-accent-rgb),0.3)] absolute top-0 animate-[scan_2s_linear_infinite]" />
                                    </div>
                                </div>

                                {/* Status Indicator */}
                                <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-[1px] h-2 bg-[var(--color-accent)]" />
                                    <div className="w-1 h-1 bg-[var(--color-accent)] rotate-45" />
                                    <div className="w-[1px] h-2 bg-[var(--color-accent)]" />
                                </div>
                            </button>
                        </div>
                    </motion.div>

                    {/* Mobile View */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="md:hidden fixed bottom-24 right-6 z-40 pointer-events-auto"
                    >
                        <button
                            onClick={scrollToTop}
                            className="relative w-10 h-10 border border-[#1A1A3A] bg-[#050510]/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 active:scale-95 active:border-[var(--color-accent)]"
                            aria-label="Back to top"
                        >
                            {/* Technical Icon */}
                            <svg
                                className="w-4 h-4 text-[var(--color-accent)]"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>

                            {/* Corner HUD mini-brackets */}
                            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[var(--color-accent)] opacity-60" />
                            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-[var(--color-accent)] opacity-60" />
                            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-[var(--color-accent)] opacity-60" />
                            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[var(--color-accent)] opacity-60" />

                            {/* Scanning Pulse */}
                            <div className="absolute inset-0 bg-[rgba(var(--color-accent-rgb),0.05)] animate-pulse" />
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
