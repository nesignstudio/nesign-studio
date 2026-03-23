import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/**
 * HudShapes — Futuristic geometric decorations (rectangles, squares, brackets, crosshairs)
 * Scattered across sections as fixed/absolute positioned elements for a hi-tech feel.
 */
export function HudShapes() {
    const { isRTL } = useLanguage();

    return (
        <div className="fixed inset-0 pointer-events-none z-[4] overflow-hidden">
            {/* Top-right/left floating squares */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                className={`absolute top-[8%] ${isRTL ? 'left-[20%]' : 'right-[20%]'} hidden lg:block`}
            >
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="w-3 h-3 border border-[var(--color-accent)]/30" />
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                className={`absolute top-[14%] ${isRTL ? 'left-[17%]' : 'right-[17%]'} hidden lg:block`}
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                    <div className="w-2 h-2 bg-[rgba(var(--color-accent-rgb),0.2)]" />
                </motion.div>
            </motion.div>

            {/* Mid-left/right — pulsing square outline */}
            <motion.div
                animate={{ opacity: [0.08, 0.2, 0.08], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute top-[35%] ${isRTL ? 'right-[7%]' : 'left-[7%]'} hidden lg:block`}
            >
                <div className="w-8 h-8 border border-[var(--color-accent)]/20" />
            </motion.div>

            {/* Bottom-right/left — small floating square */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className={`absolute bottom-[15%] ${isRTL ? 'left-[12%]' : 'right-[12%]'} hidden lg:block`}
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="w-4 h-4 border border-[var(--color-accent)]/25" />
                </motion.div>
            </motion.div>

            {/* Top-left/right — tiny solid square */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className={`absolute top-[20%] ${isRTL ? 'right-[12%]' : 'left-[12%]'} hidden lg:block`}
            >
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                    <div className="w-2 h-2 bg-[rgba(var(--color-accent-rgb),0.2)]" />
                </motion.div>
            </motion.div>
        </div>
    );
}
