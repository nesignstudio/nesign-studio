import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface CTAProps {
  onStartProject: () => void;
}

export function CTA({ onStartProject }: CTAProps) {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-line', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.cta-button', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-button',
          start: 'top 95%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.contact-card', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top bottom', // Triggers as soon as the top of the grid enters the bottom of the viewport
          toggleActions: 'play none none reverse'
        }
      });

      // Refresh ScrollTrigger once after a short delay to account for layout shifts
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]); // Re-run when language changes to recalculate positions

  const headline = t('cta.headline') as string[];

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 md:py-48 overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[rgba(var(--color-accent-rgb),0.03)] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[rgba(var(--color-accent-rgb),0.03)] rounded-full blur-[150px]" />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className={`inline-flex items-center gap-2 text-[#8888AA] text-xs uppercase tracking-[0.3em] font-display ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="w-8 h-px bg-[var(--color-accent)]" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
              {t('cta.label')}
            </span>
          </motion.div>

          {/* Main Headline */}
          <div ref={textRef} className="mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1] font-display">
              {headline.map((line: string, idx: number) => (
                <span
                  key={idx}
                  className={`cta-line block mb-2 ${idx === headline.length - 1 ? 'text-[var(--color-accent)]' : 'text-white'}`}
                  style={idx === headline.length - 1 ? { textShadow: '0 0 30px rgba(var(--color-accent-rgb), 0.3)' } : {}}
                >
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {/* CTA Button */}
          <div className="cta-button mb-20">
            <button
              onClick={(e) => {
                e.preventDefault();
                onStartProject();
              }}
              className="cyber-btn cyber-btn--primary group inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.15em] font-medium font-display"
            >
              {t('cta.button')}
              <svg className={`w-4 h-4 transform group-hover:translate-x-2 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Contact Grid */}
          <div id="contact" className="contact-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1A3A] scroll-mt-32">
            {/* Email */}
            <a
              href="mailto:nesignstudio.contact@gmail.com"
              className="contact-card bg-[#050510] p-8 group hover:bg-[#0A0A1A] transition-colors duration-300"
            >
              <div className="text-[var(--color-accent)] text-xs uppercase tracking-[0.2em] mb-4 font-display"
                style={{ textShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.3)' }}>
                {t('cta.email')}
              </div>
              <div className="text-white text-sm font-display group-hover:text-[var(--color-accent)] transition-colors duration-300">
                nesignstudio.contact@gmail.com
              </div>
            </a>

            {/* Cosmos */}
            <a
              href="https://www.cosmos.so/nesignstudio/nesign-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card bg-[#050510] p-8 group hover:bg-[#0A0A1A] transition-colors duration-300"
            >
              <div className="text-[var(--color-accent)] text-xs uppercase tracking-[0.2em] mb-4 font-display"
                style={{ textShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.3)' }}>
                {t('cta.cosmos')}
              </div>
              <div className="text-white text-sm font-display group-hover:text-[var(--color-accent)] transition-colors duration-300">
                {t('cta.cosmosValue')}
              </div>
            </a>

            {/* Social - Instagram */}
            <a
              href="https://instagram.com/Nesignstudio_"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card bg-[#050510] p-8 group hover:bg-[#0A0A1A] transition-colors duration-300"
            >
              <div className="text-[var(--color-accent)] text-xs uppercase tracking-[0.2em] mb-4 font-display"
                style={{ textShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.3)' }}>
                {t('cta.instagram')}
              </div>
              <div className="text-white text-sm font-display group-hover:text-[var(--color-accent)] transition-colors duration-300">
                @Nesignstudio_
              </div>
            </a>

            {/* Social - Behance */}
            <a
              href="https://www.behance.net/neezaryatuun?tracking_source=search_projects%7Cneezaryatuun"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card bg-[#050510] p-8 group hover:bg-[#0A0A1A] transition-colors duration-300"
            >
              <div className="text-[var(--color-accent)] text-xs uppercase tracking-[0.2em] mb-4 font-display"
                style={{ textShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.3)' }}>
                {t('cta.behance')}
              </div>
              <div className="text-white text-sm font-display group-hover:text-[var(--color-accent)] transition-colors duration-300">
                neezaryatuun
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
