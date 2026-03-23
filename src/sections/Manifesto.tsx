import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.word');

      if (words) {
        gsap.set(words, { opacity: 0.1, y: 20 });

        gsap.to(words, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'center center',
            scrub: 1,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]); // Re-run if language changes

  const manifestoText = t('manifesto.main');
  const words = manifestoText.split(' ');

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative pt-8 pb-16 md:pt-32 md:pb-48 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-accent)]/3 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-[var(--color-accent)]/3 to-transparent pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-16"
          >
            <span className={`inline-flex items-center gap-2 text-[#8888AA] text-xs uppercase tracking-[0.3em] font-display ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="w-8 h-px bg-[var(--color-accent)]" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
              {t('manifesto.label')}
            </span>
          </motion.div>

          <div ref={textRef} className="mb-12 md:mb-24">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed max-w-5xl text-justify`}
              style={{ textAlignLast: isRTL ? 'right' : 'left' }}
            >
              {words.map((word: string, index: number) => (
                <span key={index}>
                  <span className={`word inline-block text-white font-display`}>
                    {word}
                  </span>
                  {index < words.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h2>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 border-t border-[#1A1A3A] pt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={isRTL ? 'text-right' : 'text-left'}
            >
              <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--color-accent)] mb-4 font-display"
                style={{ textShadow: '0 0 15px rgba(var(--color-accent-rgb), 0.3)' }}>
                {t('manifesto.mission.title')}
              </h3>
              <p
                className="text-[#8888AA] text-sm leading-relaxed text-justify"
                style={{ textAlignLast: isRTL ? 'right' : 'left' }}
              >
                {t('manifesto.mission.text')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={isRTL ? 'text-right' : 'text-left'}
            >
              <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--color-accent)] mb-4 font-display"
                style={{ textShadow: '0 0 15px rgba(var(--color-accent-rgb), 0.3)' }}>
                {t('manifesto.vision.title')}
              </h3>
              <p
                className="text-[#8888AA] text-sm leading-relaxed text-justify"
                style={{ textAlignLast: isRTL ? 'right' : 'left' }}
              >
                {t('manifesto.vision.text')}
              </p>
            </motion.div>
          </div>


        </div>
      </div>
    </section>
  );
}
