import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileCarouselProps {
    children: React.ReactNode;
    isRTL?: boolean;
    className?: string; // desktop grid formatting classes
}

export function MobileCarousel({ children, isRTL = false, className = '' }: MobileCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const scrollValue = Math.abs(scrollLeft);
            const maxScroll = scrollWidth - clientWidth;

            setIsAtStart(scrollValue < 10);
            setIsAtEnd(scrollValue >= maxScroll - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        // Use a small timeout to ensure content is rendered and scroll dimensions are accurate
        const timer = setTimeout(checkScroll, 100);
        window.addEventListener('resize', checkScroll);
        return () => {
            window.removeEventListener('resize', checkScroll);
            clearTimeout(timer);
        };
    }, [children]); // Also re-check when children change

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;

            scrollRef.current.scrollBy({
                left: isRTL ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const EdgeGlow = ({ direction }: { direction: 'left' | 'right' }) => {
        // In LTR: Left is Back, Right is Forward
        // In RTL: Right is Back, Left is Forward
        const isBack = isRTL ? direction === 'right' : direction === 'left';
        const isForward = isRTL ? direction === 'left' : direction === 'right';

        const visible = isBack ? !isAtStart : (isForward ? !isAtEnd : false);

        return (
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.15, 0.6, 0.15] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); scroll(direction); }}
                        className={`absolute top-4 bottom-4 z-20 w-16 md:hidden cursor-pointer pointer-events-auto ${direction === 'left'
                                ? 'left-0 bg-gradient-to-r'
                                : 'right-0 bg-gradient-to-l'
                            } from-[rgba(var(--color-accent-rgb),0.3)] to-transparent`}
                        style={{
                            mixBlendMode: 'screen',
                            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
                        }}
                    >
                        {/* Core intense edge line */}
                        <div
                            className={`absolute top-1/2 -translate-y-1/2 ${direction === 'left' ? 'left-0' : 'right-0'} w-[2px] h-1/2 bg-[var(--color-accent)] opacity-80`}
                            style={{ boxShadow: '0 0 15px rgba(var(--color-accent-rgb), 1)' }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        );
    };

    return (
        <div className="relative w-full max-md:-mx-6 max-md:w-[calc(100%+3rem)] group overflow-visible">
            {/* Container for Edge Glow to position them on screen edges */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                <EdgeGlow direction="left" />
                <EdgeGlow direction="right" />
            </div>

            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className={`flex max-md:px-6 max-md:flex-row max-md:overflow-x-auto max-md:snap-x snap-mandatory scrollbar-hide w-full ${className}`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {children}
            </div>
        </div>
    );
}
