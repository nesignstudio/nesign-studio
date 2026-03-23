import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, animate } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onStartProject: () => void;
}

function StatCounter({ value, active, delay = 0 }: { value: string, active: boolean, delay?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const target = parseInt(value);
  const hasPlus = value.includes('+');

  useEffect(() => {
    if (!active) return;

    const timeout = setTimeout(() => {
      const controls = animate(0, target, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth finish
        onUpdate: (latest) => setDisplayValue(Math.floor(latest))
      });
      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [active, target, delay]);

  return (
    <>
      {displayValue}
      {hasPlus && '+'}
    </>
  );
}

function TechDataStream({ delay = 0 }: { delay?: number }) {
  const words = ['PROTOCOL_ACTIVE', 'SYSTEM_ENCRYPTED'];

  return (
    <div className="flex flex-col gap-1.5 opacity-40">
      {words.map((word, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: delay + i * 3,
            ease: "easeInOut"
          }}
          className="flex items-center gap-3 border-l border-[var(--color-accent)]/30 pl-3 py-1 relative overflow-hidden group"
        >
          {/* Scanning Line Pulse */}
          <motion.div
            animate={{ left: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 h-full w-[1px] bg-gradient-to-b from-[var(--color-accent)]/80 to-transparent z-10"
          />

          <span className="text-[8px] font-mono text-[var(--color-accent)] tracking-[0.2em] font-bold">
            {word}
          </span>

          <div className="flex gap-1 h-2 items-center">
            {[1, 2, 3].map(b => (
              <motion.div
                key={b}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: Math.random() }}
                className="w-[1px] h-full bg-[rgba(var(--color-accent-rgb),0.6)]"
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function Hero({ onStartProject }: HeroProps) {
  const { t: translate, isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [logoActive, setLogoActive] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(subtitleRef.current, { y: 0, opacity: 1 });
      gsap.set(ctaRef.current, { y: 30, opacity: 0 });
      gsap.set('.hero-description', { y: 0, opacity: 1 });
      gsap.set('.hero-stat', { y: 20, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.8 });

      // Trigger the CSS-based scanline reveal
      tl.call(() => setLogoActive(true))
        .to('.hero-stat', {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out'
        }, '-=0.2')
        .to(ctaRef.current, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
        }, '-=0.4');

      gsap.to('.float-element', {
        y: -20, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isRTL]);


  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgba(var(--color-accent-rgb),0.05)] rounded-full blur-3xl float-element" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[rgba(var(--color-accent-rgb),0.05)] rounded-full blur-3xl float-element" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(var(--color-accent-rgb),0.03)] rounded-full blur-[120px] float-element" />



        {/* Extra subtle horizontal lines that fade in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ delay: 2, duration: 2 }}
          className="absolute inset-0"
        >
          {[15, 30, 45, 60, 75, 90].map((pos) => (
            <div
              key={pos}
              className="absolute w-full h-px"
              style={{
                top: `${pos}%`,
                background: 'linear-gradient(90deg, transparent, var(--color-accent) 30%, var(--color-accent) 50%, var(--color-accent) 70%, transparent)',
              }}
            />
          ))}
        </motion.div>

        <div className="absolute top-20 left-6 md:left-12 lg:left-20 w-20 h-20 border-l border-t border-[#1A1A3A]" />
        <div className="absolute bottom-20 right-6 md:right-12 lg:right-20 w-20 h-20 border-r border-b border-[#1A1A3A]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Label & Brand Accent */}
          <div className="flex justify-between items-center mb-8 max-w-[90vw] md:max-w-3xl lg:max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full flex justify-between items-center"
            >
              <span className="flex items-center gap-2">
                <span className="w-4 md:w-8 h-px bg-[var(--color-accent)]" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
              </span>

              <span className="text-[#8888AA] text-[7.5px] md:text-xs uppercase tracking-[0.1em] font-display whitespace-nowrap">
                {translate('hero.label')}
              </span>
            </motion.div>
          </div>

          {/* Main Title — Custom Typography Logo */}
          <div className="relative mb-16 md:mb-8">
            <div
              ref={titleRef as any}
              className={`max-w-[90vw] md:max-w-3xl lg:max-w-4xl logo-activation-wrap ${logoActive ? 'revealed' : ''}`}
            >
              {/* Primary White Logo */}
              <img
                src="/hero-logo.png"
                alt="NESIGN STUDIO"
                className="hero-line w-full h-auto object-contain"
              />

              {/* Data Pulse Flow Overlay */}
              <div className="data-pulse-overlay">
                <img
                  src="/hero-logo.png"
                  alt=""
                  className="w-full h-auto object-contain pulse-base"
                />
                <div className="pulse-chromatic-wrap">
                  <img
                    src="/hero-logo.png"
                    alt=""
                    className="w-full h-auto object-contain pulse-chroma-red"
                  />
                  <img
                    src="/hero-logo.png"
                    alt=""
                    className="w-full h-auto object-contain pulse-chroma-cyan"
                  />
                </div>
              </div>

              <div className="scan-line" />
            </div>

            {/* Technical Data Stream Reveal */}
            <div className={`absolute top-0 ${isRTL ? '-left-20' : '-right-20'} h-full hidden xl:flex flex-col gap-4 py-4 pointer-events-none`}>
              <TechDataStream delay={3} />
            </div>
          </div>

          {/* Subheadline / Manifesto */}
          <div className="hidden md:block max-w-2xl min-h-[3em] mb-4">
            <motion.p
              ref={subtitleRef as any}
              className={`text-white/80 text-[10px] md:text-xl leading-relaxed font-display font-light md:text-justify`}
              style={{ textAlignLast: isRTL ? 'right' : 'left' }}
            >
              {translate('hero.subtitle').split("").map((char: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={logoActive ? { opacity: 1 } : {}}
                  transition={{ duration: 0.01, delay: 0.2 + i * 0.02 }}
                >
                  {char}
                </motion.span>
              ))}
              {logoActive && <span className="typewriter-cursor" />}
            </motion.p>
          </div>

          {/* Short Description */}
          <div className="max-w-[90vw] md:max-w-3xl lg:max-w-4xl min-h-[4em] mb-10">
            <p
              className={`hero-description text-[#8888AA] text-[11px] md:text-base leading-relaxed text-justify`}
              style={{ textAlignLast: isRTL ? 'right' : 'left' }}
            >
              {translate('hero.description').split("").map((char: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={logoActive ? { opacity: 1 } : {}}
                  transition={{ duration: 0.01, delay: 1.2 + i * 0.008 }}
                >
                  {char}
                </motion.span>
              ))}
            </p>
          </div>

          <div className={`flex flex-wrap gap-x-8 gap-y-6 md:gap-16 mb-12 pb-10 border-b border-[#1A1A3A] ${isRTL ? 'flex-row-reverse' : ''}`}>
            {[
              { number: '25+', label: translate('hero.stats.projects'), color: 'var(--color-accent)', glow: 'rgba(var(--color-accent-rgb), 0.3)' },
              { number: '30+', label: translate('hero.stats.clients'), color: 'var(--color-accent)', glow: 'rgba(var(--color-accent-rgb), 0.3)' },
              { number: '6+', label: translate('hero.stats.experience'), color: 'var(--color-accent)', glow: 'rgba(var(--color-accent-rgb), 0.3)' },
            ].map((stat, index) => (
              <div key={index} className="hero-stat flex flex-col items-start min-w-[100px] md:min-w-0 md:flex-none">
                <div
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 font-display"
                  style={{
                    color: stat.color,
                    textShadow: `0 0 10px rgba(var(--color-accent-rgb), 0.5), 0 0 25px rgba(var(--color-accent-rgb), 0.2)`
                  }}
                >
                  <StatCounter value={stat.number} active={logoActive} delay={0.6 + index * 0.1} />
                </div>
                <div className="text-[#8888AA] text-[9px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em] font-display flex flex-col mt-1 md:mt-0 leading-[1.2]">
                  {stat.label.split(' ').map((word: string, i: number) => (
                    <span key={i}>{word}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-3 md:gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                onStartProject();
              }}
              className="cyber-btn cyber-btn--primary group inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-8 md:py-4 text-[10px] md:text-sm uppercase tracking-[0.15em] font-medium font-display"
            >
              {translate('hero.cta')}
              <svg
                className={`w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-8 md:py-4 border border-[#1A1A3A] text-white text-[10px] md:text-sm uppercase tracking-[0.15em] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 font-display"
            >
              {translate('hero.viewWork')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[#8888AA] text-xs uppercase tracking-[0.2em] font-display">{translate('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-[var(--color-accent)] to-transparent"
          style={{ boxShadow: '0 0 6px rgba(var(--color-accent-rgb), 0.4)' }}
        />
      </motion.div>

      {/* Side coordinates & Metadata */}
      <div className={`absolute ${isRTL ? 'right-6 md:right-12 lg:right-20' : 'left-6 md:left-12 lg:left-20'} bottom-20 hidden lg:block`}>
        <div className="text-[#1A1A3A] text-xs font-mono space-y-1">
          <div>34° 01' N</div>
          <div>06° 50' W</div>
        </div>
      </div>

      <div className={`absolute ${isRTL ? 'left-6 md:left-12 lg:left-20' : 'right-6 md:right-12 lg:right-20'} bottom-20 hidden lg:block`}>
        <div className="text-[#1A1A3A] text-xs font-mono">
          {translate('hero.est')}
        </div>
      </div>
    </section >
  );
}
