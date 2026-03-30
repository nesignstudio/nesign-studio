import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchInstance {
    id: number;
    x: number;
    y: number;
}

export function ClickEffect() {
    const [glitches, setGlitches] = useState<GlitchInstance[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // First condition: The exact element matches (for actual glitch generation)
            // Second condition: It's an a/button/input for the sound effect

            const isClickable = target.closest('a, button, input, textarea');
            const isThemeColorSwitcher = target.closest('button[title$=" Protocol"]');

            if (isClickable && !isThemeColorSwitcher) {
                // Play global sound effect for buttons/links
                const audio = new Audio('./audio/rescopicsound-ui-click-menu-modern-interface-select-small-01-230473.mp3');
                audio.volume = 0.4; // Adjust volume as needed
                audio.play().catch(e => console.log('Audio play error:', e));
            }

            if (isClickable) return; // Prevent glitches on interactable elements

            const newGlitch = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
            };

            setGlitches(prev => [...prev, newGlitch]);
            setTimeout(() => {
                setGlitches(prev => prev.filter(g => g.id !== newGlitch.id));
            }, 500);
        };

        window.addEventListener('mousedown', handleClick);
        return () => window.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9997] overflow-hidden">
            <AnimatePresence>
                {glitches.map((glitch) => (
                    <ElectricShock key={glitch.id} x={glitch.x} y={glitch.y} />
                ))}
            </AnimatePresence>
        </div>
    );
}

function ElectricShock({ x, y }: { x: number; y: number }) {
    const color = 'var(--color-accent)'; // Magenta
    // 4 lines in crosshair pattern
    const sparks = [0, 90, 180, 270];

    return (
        <div
            className="absolute"
            style={{ left: x, top: y }}
        >
            {sparks.map((angle, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 1,
                        scaleX: 0,
                        rotate: angle,
                        originX: 0
                    }}
                    animate={{
                        opacity: 0,
                        scaleX: [0, 1, 0.5],
                        x: [0, Math.cos(angle * Math.PI / 180) * 15],
                        y: [0, Math.sin(angle * Math.PI / 180) * 15],
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                    className="absolute h-[1px] w-3"
                    style={{
                        backgroundColor: color,
                        boxShadow: `0 0 6px ${color}`,
                    }}
                />
            ))}

            {/* Radial wave ring */}
            <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-[var(--color-accent)]"
            />

            {/* Mini jitter particles */}
            {[1, 2, 3, 4].map((_, i) => (
                <motion.div
                    key={`dot-${i}`}
                    initial={{ opacity: 1, x: 0, y: 0 }}
                    animate={{
                        opacity: 0,
                        x: (Math.random() - 0.5) * 20,
                        y: (Math.random() - 0.5) * 20,
                    }}
                    transition={{ duration: 0.25, delay: i * 0.02 }}
                    className="absolute w-0.5 h-0.5 rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}` }}
                />
            ))}
        </div>
    );
}
