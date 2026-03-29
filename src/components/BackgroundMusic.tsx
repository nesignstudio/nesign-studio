import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundMusicProps {
    hasEntered: boolean;
}

export function BackgroundMusic({ hasEntered }: BackgroundMusicProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (hasEntered && audioRef.current) {
            // Set initial volume to be quiet
            audioRef.current.volume = 0.15;

            // Small delay to ensure smooth transition after entrance
            const timer = setTimeout(() => {
                audioRef.current?.play().then(() => {
                    setIsPaused(false);
                }).catch(error => {
                    console.log("Autoplay was prevented. User interaction required.", error);
                });
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [hasEntered]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPaused) {
                audioRef.current.play();
                setIsPaused(false);
            } else {
                audioRef.current.pause();
                setIsPaused(true);
            }
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                src="./audio/running-arpeggio.mp3"
                loop
                preload="auto"
            />

            <AnimatePresence>
                {hasEntered && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="fixed bottom-8 right-6 md:right-12 z-[60] flex items-center gap-3"
                    >
                        {/* Compact HUD Visualizer Square */}
                        <button
                            onClick={togglePlay}
                            className="group relative w-10 h-10 flex items-end justify-center gap-[3px] pb-2 border border-[#1A1A3A] bg-[#050510]/90 backdrop-blur-md transition-all duration-300 active:scale-95 active:border-[var(--color-accent)] hover:border-[var(--color-accent)] overflow-hidden"
                            aria-label={isPaused ? "Play Music" : "Pause Music"}
                        >
                            <div className="absolute inset-0 bg-[rgba(var(--color-accent-rgb),0.05)] opacity-0 group-hover:opacity-100 transition-opacity" />

                            {[1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={!isPaused ? {
                                        height: [4, 18, 10, 22, 6],
                                    } : { height: 2 }}
                                    transition={{
                                        duration: 4,
                                        repeat: !isPaused ? Infinity : 0,
                                        delay: i * 0.4,
                                        ease: "easeInOut"
                                    }}
                                    className="w-[3px] bg-[var(--color-accent)]"
                                    style={{
                                        boxShadow: isPaused ? 'none' : '0 0 10px rgba(var(--color-accent-rgb), 0.4)',
                                        opacity: isPaused ? 0.3 : 0.9,
                                        transformOrigin: 'bottom'
                                    }}
                                />
                            ))}

                            {/* Corner HUD mini-brackets to match BackToTop */}
                            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[var(--color-accent)] opacity-60" />
                            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-[var(--color-accent)] opacity-60" />
                            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-[var(--color-accent)] opacity-60" />
                            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[var(--color-accent)] opacity-60" />

                            {/* HUD scan line on button */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--color-accent)] opacity-20 md:group-hover:animate-scan" />
                        </button>

                        {/* Technical Detail Label - Hidden on Mobile */}
                        <div className="hidden md:flex flex-col text-right">
                            <span className="text-[8px] font-mono text-[#8888AA] tracking-[0.2em] leading-none mb-1">AUDIO_STREAM</span>
                            <span className="text-[9px] font-mono text-[var(--color-accent)] tracking-[0.1em] opacity-80 leading-none uppercase">
                                {isPaused ? 'SIGNAL_OFF' : 'ARC_RAIDERS_RA'}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
