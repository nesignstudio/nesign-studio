import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

type ProcessTab = 'brand-identity' | 'design-services';

export function Process() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ProcessTab>('brand-identity');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.process-content', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeTab, isRTL]); // Re-run animation when tab or language changes

  const brandStages = t('process.brand.stages') as any[];
  const designStages = t('process.design.stages') as any[];
  const brandMain = t('process.brand.main') as string[];
  const designMain = t('process.design.main') as string[];

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`relative py-16 md:py-48 overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`hidden md:block absolute ${isRTL ? 'right-1/2' : 'left-1/2'} top-0 bottom-0 w-px bg-[#1A1A3A] opacity-50`} />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className={`inline-flex items-center gap-2 text-[#8888AA] text-xs uppercase tracking-[0.3em] mb-6 font-display ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="w-8 h-px bg-[var(--color-accent)]" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
              {t('process.label')}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white font-display">
              {t('process.title')}
            </h2>
          </motion.div>

          {/* Tab Switcher */}
          <div className={`flex flex-col sm:flex-row gap-2 mb-16 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <button
              onClick={() => setActiveTab('brand-identity')}
              className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-display border transition-all duration-300 ${activeTab === 'brand-identity'
                ? 'bg-[var(--color-accent)] text-[#050510] border-[var(--color-accent)]'
                : 'bg-transparent text-[#8888AA] border-[#1A1A3A] hover:border-[var(--color-accent)] hover:text-white'
                }`}
              style={activeTab === 'brand-identity' ? { boxShadow: '0 0 20px rgba(var(--color-accent-rgb), 0.2)' } : {}}
            >
              {t('process.tabs.identity')}
            </button>
            <button
              onClick={() => setActiveTab('design-services')}
              className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-display border transition-all duration-300 ${activeTab === 'design-services'
                ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                : 'bg-transparent text-[#8888AA] border-[#1A1A3A] hover:border-[var(--color-accent)] hover:text-white'
                }`}
              style={activeTab === 'design-services' ? { boxShadow: '0 0 20px rgba(var(--color-accent-rgb), 0.2)' } : {}}
            >
              {t('process.tabs.design')}
            </button>
          </div>

          {/* Process Content */}
          <div className={`process-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 ${isRTL ? 'direction-rtl' : ''}`}>
            {/* Left/Right based on RTL: Process Description */}
            <div className={`lg:col-span-7 ${isRTL ? 'lg:order-2' : ''}`}>
              {activeTab === 'brand-identity' ? (
                <motion.div
                  key="brand-identity-process"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Main Description */}
                  <div className="mb-16">
                    {brandMain.map((paragraph: string, idx: number) => (
                      <p key={idx} className={`${idx === 0 ? 'text-white/90 text-lg md:text-xl' : 'text-[#8888AA] text-sm md:text-base'} leading-relaxed font-display ${idx === 0 ? 'font-light' : ''} mb-6 text-justify`} style={{ textAlignLast: isRTL ? 'right' : 'left' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Stages Timeline */}
                  <div className="space-y-0">
                    {brandStages.map((stage: any, index: number) => {
                      const colors = ['var(--color-accent)', 'var(--color-accent)', 'var(--color-accent)', 'var(--color-accent)'];
                      const color = colors[index % colors.length];
                      return (
                        <div
                          key={stage.id}
                          className={`relative ${isRTL ? 'border-r-2 pr-8 md:pr-12' : 'border-l-2 pl-8 md:pl-12'} py-6 group hover:bg-[#0A0A1A]/50 transition-colors duration-300`}
                          style={isRTL ? { borderRightColor: color } : { borderLeftColor: color }}
                        >
                          {/* Timeline Dot */}
                          <div
                            className={`absolute ${isRTL ? '-right-[7px]' : '-left-[7px]'} top-8 w-3 h-3 border-2`}
                            style={{
                              borderColor: color,
                              backgroundColor: '#050510',
                              boxShadow: `0 0 8px rgba(var(--color-accent-rgb), 0.27)`
                            }}
                          />

                          <div className={`flex flex-col md:flex-row md:items-start md:justify-between gap-2 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-1">
                              <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <span className="text-xs font-mono" style={{ color }}>
                                  {t('services.process.stage')} {stage.id}
                                </span>
                                <span className="text-[#1A1A3A]">—</span>
                                <span className="text-xs font-mono text-[#555577]">{stage.timeline}</span>
                              </div>
                              <h4 className="text-white text-lg font-bold mb-1 font-display">
                                {stage.title}
                              </h4>
                              <p className="text-[#8888AA] text-sm leading-relaxed text-justify" style={{ textAlignLast: isRTL ? 'right' : 'left' }}>
                                {stage.description}
                              </p>
                            </div>
                          </div>

                          {/* Connecting line glow on hover */}
                          {index < brandStages.length - 1 && (
                            <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} bottom-0 w-px h-0 group-hover:h-full transition-all duration-500`}
                              style={{ backgroundColor: color, opacity: 0.3 }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="design-services-process"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Main Description */}
                  <div className="mb-16">
                    {designMain.map((paragraph: string, idx: number) => (
                      <p key={idx} className={`${idx === 0 ? 'text-white/90 text-lg md:text-xl' : 'text-[#8888AA] text-sm md:text-base'} leading-relaxed font-display ${idx === 0 ? 'font-light' : ''} mb-6 text-justify`} style={{ textAlignLast: isRTL ? 'right' : 'left' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Design Process Steps */}
                  <div className="space-y-0">
                    {designStages.map((step: any, index: number) => {
                      const colors = ['var(--color-accent)', 'var(--color-accent)', 'var(--color-accent)', 'var(--color-accent)'];
                      const color = colors[index % colors.length];
                      return (
                        <div
                          key={step.id}
                          className={`relative ${isRTL ? 'border-r-2 pr-8 md:pr-12' : 'border-l-2 pl-8 md:pl-12'} py-6 group hover:bg-[#0A0A1A]/50 transition-colors duration-300`}
                          style={isRTL ? { borderRightColor: color } : { borderLeftColor: color }}
                        >
                          <div
                            className={`absolute ${isRTL ? '-right-[7px]' : '-left-[7px]'} top-8 w-3 h-3 border-2`}
                            style={{
                              borderColor: color,
                              backgroundColor: '#050510',
                              boxShadow: `0 0 8px rgba(var(--color-accent-rgb), 0.27)`
                            }}
                          />

                          <div className="flex-1">
                            <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <span className="text-xs font-mono" style={{ color }}>
                                {t('services.process.stage')} {step.id}
                              </span>
                            </div>
                            <h4 className="text-white text-lg font-bold mb-1 font-display">
                              {step.title}
                            </h4>
                            <p className="text-[#8888AA] text-sm leading-relaxed text-justify" style={{ textAlignLast: isRTL ? 'right' : 'left' }}>
                              {step.description}
                            </p>
                          </div>

                          {index < designStages.length - 1 && (
                            <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} bottom-0 w-px h-0 group-hover:h-full transition-all duration-500`}
                              style={{ backgroundColor: color, opacity: 0.3 }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right/Left based on RTL: Visual */}
            <div className={`lg:col-span-5 relative ${isRTL ? 'lg:order-1' : ''}`}>
              <div className="sticky top-32">
                {/* Visual Card */}
                <div className="relative h-80 w-full bg-[#0A0A1A] border border-[#1A1A3A] overflow-hidden">
                  <div className="absolute inset-0 grid-pattern opacity-20" />

                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: activeTab === 'brand-identity'
                        ? 'radial-gradient(circle at 30% 50%, rgba(var(--color-accent-rgb), 0.05) 0%, transparent 70%)'
                        : 'radial-gradient(circle at 70% 50%, rgba(var(--color-accent-rgb), 0.05) 0%, transparent 70%)'
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-6xl font-bold text-[#0A0A1A] font-display mb-2"
                        style={{ WebkitTextStroke: activeTab === 'brand-identity' ? '1px rgba(var(--color-accent-rgb), 0.15)' : '1px rgba(var(--color-accent-rgb), 0.15)' }}
                      >
                        {activeTab === 'brand-identity' ? t('process.visual.brand') : t('process.visual.design')}
                      </motion.div>
                      <div
                        className="text-sm uppercase tracking-[0.3em] font-display"
                        style={{
                          color: activeTab === 'brand-identity' ? 'var(--color-accent)' : 'var(--color-accent)',
                          textShadow: activeTab === 'brand-identity'
                            ? '0 0 15px rgba(var(--color-accent-rgb), 0.4)'
                            : '0 0 15px rgba(var(--color-accent-rgb), 0.4)'
                        }}
                      >
                        {activeTab === 'brand-identity' ? t('process.visual.identityLabel') : t('process.visual.servicesLabel')}
                      </div>
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-[#1A1A3A]" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-[#1A1A3A]" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-[#1A1A3A]" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-[#1A1A3A]" />
                </div>

                {/* Summary info */}
                <div className="mt-8 p-6 border border-[#1A1A3A]">
                  {activeTab === 'brand-identity' ? (
                    <>
                      <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-[#8888AA] text-xs uppercase tracking-[0.15em] font-display">
                          {t('process.brand.summary.title')}
                        </span>
                        <span className="text-white text-sm font-mono">{t('process.brand.summary.value')}</span>
                      </div>
                      <div className="w-full h-1 bg-[#1A1A3A] mb-4">
                        <div
                          className="h-full w-full bg-[var(--color-accent)]"
                          style={{ boxShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.3)' }}
                        />
                      </div>
                      <p className="text-[#555577] text-xs leading-relaxed">
                        {t('process.brand.summary.note')}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-[#8888AA] text-xs uppercase tracking-[0.15em] font-display">
                          {t('process.design.summary.title')}
                        </span>
                        <span className="text-white text-sm font-mono">{t('process.design.summary.value')}</span>
                      </div>
                      <div className="w-full h-1 bg-[#1A1A3A] mb-4">
                        <div
                          className="h-full w-2/3 bg-[var(--color-accent)]"
                          style={{ boxShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.3)' }}
                        />
                      </div>
                      <p className="text-[#555577] text-xs leading-relaxed">
                        {t('process.design.summary.note')}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
