import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { ClickEffect } from './components/ClickEffect';
import { HudShapes } from './components/HudShapes';
import { Navigation } from './components/Navigation';
import { ProjectModal } from './components/ProjectModal';
import { BehanceDisclaimer } from './components/BehanceDisclaimer';
import { BackToTop } from './components/BackToTop';
import { EntrancePage } from './components/EntrancePage';
import { Hero } from './sections/Hero';
import { Manifesto } from './sections/Manifesto';
import { Services } from './sections/Services';
import { Work } from './sections/Work';
import { Process } from './sections/Process';
import { CTA } from './sections/CTA';
import { Footer } from './sections/Footer';
import { BackgroundMusic } from './components/BackgroundMusic';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isBehanceDisclaimerOpen, setIsBehanceDisclaimerOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative min-h-screen bg-[#050510] overflow-x-hidden ${(isProjectModalOpen || !hasEntered) ? 'lenis-stopped' : ''}`}>
      {/* Main Content & Navigation Flow */}
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <EntrancePage key="entrance" onEnter={() => setHasEntered(true)} />
        ) : (
          <div key="site-content">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              <Navigation onStartProject={() => setIsProjectModalOpen(true)} />
            </motion.div>

            <motion.main
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{
                opacity: isProjectModalOpen ? 0.7 : 1,
                scale: isProjectModalOpen ? 0.98 : 1,
                filter: isProjectModalOpen ? 'blur(4px)' : 'blur(0px)'
              }}
              transition={{
                opacity: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
                filter: { duration: 0.5 },
                scale: { duration: 0.5 }
              }}
              className="relative z-20"
            >
              <Hero onStartProject={() => setIsProjectModalOpen(true)} />
              <Manifesto />
              <Services />
              <Work
                onStartProject={() => setIsProjectModalOpen(true)}
                onSeeMoreBehance={() => setIsBehanceDisclaimerOpen(true)}
              />
              <Process />
              <CTA onStartProject={() => setIsProjectModalOpen(true)} />
              <Footer />
            </motion.main>
          </div>
        )}
      </AnimatePresence>

      <BackgroundMusic hasEntered={hasEntered} />

      {/* Background grid pattern */}
      <motion.div
        className={`fixed inset-0 grid-pattern opacity-30 pointer-events-none ${isProjectModalOpen ? 'distort' : ''}`}
        style={{ y: backgroundY }}
      />

      {/* Global flowing lines — futuristic rain effect */}
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden opacity-20">
        {/* Vertical Rain Lines */}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((pos, i) => (
          <div
            key={`v-${i}`}
            className={`rain-line rain-line--delay-${(i % 3) + 1}`}
            style={{ left: `${pos}%` }}
          />
        ))}

        {/* Horizontal Sweeping Scanlines (from Hero) */}
        <div className="absolute inset-0">
          <div className="glitch-scanline" style={{ width: '100%', right: 0 }} />
          {[20, 50, 80].map((delay, i) => (
            <div
              key={`h-${i}`}
              className="glitch-bar"
              style={{
                animationDelay: `${delay * 0.1}s`,
                height: '1px',
                width: '100%',
                opacity: 0.1
              }}
            />
          ))}
        </div>
      </div>

      {/* Futuristic geometric shapes */}
      <HudShapes />

      {/* Scanlines overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none z-10" />

      {/* Custom cursor */}
      <CustomCursor hasEntered={hasEntered} />
      <ClickEffect />
      <BackToTop />

      {/* Project Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

      {/* Behance Disclaimer Modal */}
      <BehanceDisclaimer
        isOpen={isBehanceDisclaimerOpen}
        onClose={() => setIsBehanceDisclaimerOpen(false)}
      />
    </div>
  );
}
