import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { MobileCarousel } from '../components/MobileCarousel';

gsap.registerPlugin(ScrollTrigger);

type ServiceTab = 'brand-identity' | 'design-services';

export function Services() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ServiceTab>('brand-identity');
  const [expandedScope, setExpandedScope] = useState<number | null>(0);

  // Dynamic Data based on language
  const scopeOfWork = [
    {
      title: t('services.scope.strategy'),
      items: t('services.scope.strategyItems') as string[],
      color: 'var(--color-accent)'
    },
    {
      title: t('services.scope.visual'),
      items: t('services.scope.visualItems') as string[],
      color: 'var(--color-accent)'
    },
    {
      title: t('services.scope.application'),
      items: t('services.scope.applicationItems') as string[],
      color: 'var(--color-accent)'
    }
  ];

  const brandingPackages = [
    {
      name: t('services.packages.essential'),
      timeline: '15–20',
      logo: t('services.packages.logoNote.essential'),
      target: t('services.packages.targets.starter'),
      color: 'var(--color-accent)',
      tier: 'starter'
    },
    {
      name: t('services.packages.pro'),
      timeline: '20–30',
      logo: t('services.packages.logoNote.pro'),
      target: t('services.packages.targets.pro'),
      color: 'var(--color-accent)',
      recommended: true,
      tier: 'pro'
    },
    {
      name: t('services.packages.complete'),
      timeline: '30–35',
      logo: t('services.packages.logoNote.complete'),
      target: t('services.packages.targets.premium'),
      color: 'var(--color-accent)',
      tier: 'premium'
    }
  ];

  const projectStages = [
    { id: '01', title: t('services.process.discovery'), timeline: '2–6', description: t('services.process.desc1') },
    { id: '02', title: t('services.process.identity'), timeline: '7–15', description: t('services.process.desc2') },
    { id: '03', title: t('services.process.refinement'), timeline: '4–8', description: t('services.process.desc3') },
    { id: '04', title: t('services.process.finalization'), timeline: '2–5', description: t('services.process.desc4') },
  ];

  const logoPackagesI = [
    {
      name: t('services.logoPackages.basic'),
      items: t('services.logoPackages.items.basic') as string[],
      timeline: '3–4',
      color: 'var(--color-accent)'
    },
    {
      name: t('services.logoPackages.pro'),
      items: t('services.logoPackages.items.pro') as string[],
      timeline: '6–8',
      color: 'var(--color-accent)'
    }
  ];

  const logoPackagesII = [
    {
      name: t('services.logoPackages.combo1'),
      items: t('services.logoPackages.items.combo1') as string[],
      timeline: '7–9',
      color: 'var(--color-accent)'
    },
    {
      name: t('services.logoPackages.combo2'),
      items: t('services.logoPackages.items.combo2') as string[],
      timeline: '8–10',
      color: 'var(--color-accent)'
    }
  ];

  const individualServices = [
    { name: t('services.individual.items.card'), timeline: '2–3' },
    { name: t('services.individual.items.flyer'), timeline: '2–3' },
    { name: t('services.individual.items.banner'), timeline: '2–3' },
    { name: t('services.individual.items.motion'), timeline: '3–4' },
    { name: t('services.individual.items.post'), timeline: '1–3' },
    { name: t('services.individual.items.pfp'), timeline: '1–2' },
    { name: t('services.individual.items.sticker'), timeline: '1–2' },
    { name: t('services.individual.items.story'), timeline: '1–3' },
  ];


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-header', {
        y: 60, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} id="services" className={`relative py-16 md:py-48 overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1A1A3A] to-transparent" />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="service-header mb-16">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className={`inline-flex items-center gap-2 text-[#8888AA] text-xs uppercase tracking-[0.3em] mb-6 font-display ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="w-8 h-px bg-[var(--color-accent)]" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
                {t('services.label')}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white font-display">
                {t('services.title')}
              </h2>
            </motion.div>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-col sm:flex-row gap-2 mb-16">
            <button
              onClick={() => setActiveTab('brand-identity')}
              className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-display border transition-all duration-300 ${activeTab === 'brand-identity'
                ? 'bg-[var(--color-accent)] text-[#050510] border-[var(--color-accent)]'
                : 'bg-transparent text-[#8888AA] border-[#1A1A3A] hover:border-[var(--color-accent)] hover:text-white'
                }`}
              style={activeTab === 'brand-identity' ? { boxShadow: '0 0 20px rgba(var(--color-accent-rgb), 0.2)' } : {}}
            >
              {t('services.tabs.identity')}
            </button>
            <button
              onClick={() => setActiveTab('design-services')}
              className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-display border transition-all duration-300 ${activeTab === 'design-services'
                ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                : 'bg-transparent text-[#8888AA] border-[#1A1A3A] hover:border-[var(--color-accent)] hover:text-white'
                }`}
              style={activeTab === 'design-services' ? { boxShadow: '0 0 20px rgba(var(--color-accent-rgb), 0.2)' } : {}}
            >
              {t('services.tabs.design')}
            </button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'brand-identity' ? (
              <motion.div
                key="brand-identity"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Scope of Work */}
                <div className="mb-20">
                  <h3 className={`text-lg uppercase tracking-[0.2em] text-white mb-8 font-display flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="w-2 h-2 bg-[var(--color-accent)]" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
                    {t('services.scope.title')}
                  </h3>

                  {/* Mobile: card carousel */}
                  <div className="md:hidden">
                    <MobileCarousel isRTL={isRTL} className="gap-4">
                      {scopeOfWork.map((scope, idx) => (
                        <div key={idx} className="relative bg-[#050510] border border-[#1A1A3A] min-w-[85vw] snap-center shrink-0 h-[260px] flex flex-col p-5">
                          {/* Accent top line */}
                          <div
                            className="absolute top-0 left-0 right-0 h-1"
                            style={{ backgroundColor: scope.color, boxShadow: `0 0 15px rgba(var(--color-accent-rgb), 0.5)` }}
                          />

                          {/* Card number */}
                          <span className="text-[var(--color-accent)] text-[9px] font-mono mb-2 opacity-60">
                            {String(idx + 1).padStart(2, '0')} / {String(scopeOfWork.length).padStart(2, '0')}
                          </span>

                          {/* Title */}
                          <h4 className="text-white text-sm font-bold font-display mb-4">{scope.title}</h4>

                          {/* Items */}
                          <ul className={`grid grid-cols-1 gap-2 flex-1 ${isRTL ? 'mr-1' : 'ml-1'}`}>
                            {scope.items.map((item, itemIdx) => (
                              <li key={itemIdx} className={`flex items-start gap-2 text-[#8888AA] text-[11px] font-display leading-[1.4] ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <span className="w-1 h-1 mt-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: scope.color, boxShadow: `0 0 4px rgba(var(--color-accent-rgb), 0.4)` }} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </MobileCarousel>
                  </div>

                  {/* Desktop: accordion */}
                  <div className="hidden md:block space-y-px">
                    {scopeOfWork.map((scope, idx) => (
                      <div key={idx} className="bg-[#0A0A1A] border border-[#1A1A3A]">
                        <button
                          onClick={() => setExpandedScope(expandedScope === idx ? null : idx)}
                          className={`w-full flex items-center justify-between p-6 group ${isRTL ? 'text-right' : 'text-left'}`}
                        >
                          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div
                              className="w-2 h-2 shrink-0"
                              style={{ backgroundColor: scope.color, boxShadow: `0 0 8px rgba(var(--color-accent-rgb), 0.4)` }}
                            />
                            <span className="text-white text-lg font-display font-medium">
                              {scope.title}
                            </span>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedScope === idx ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-[#8888AA] text-2xl font-light"
                          >
                            +
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {expandedScope === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-2">
                                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${isRTL ? 'mr-6' : 'ml-6'}`}>
                                  {scope.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className={`flex items-center gap-3 text-[#8888AA] text-sm font-display leading-[1.4] ${isRTL ? 'flex-row-reverse' : ''}`}>
                                      <span className="w-1 h-1 flex-shrink-0" style={{ backgroundColor: scope.color }} />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Branding Packages */}
                <div className="mb-20">
                  <h3 className={`text-lg uppercase tracking-[0.2em] text-white mb-8 font-display flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="w-2 h-2 bg-[var(--color-accent)]" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
                    {t('services.packages.title')}
                  </h3>

                  <div className="bg-transparent md:bg-[#1A1A3A] p-0 md:p-px">
                    <MobileCarousel isRTL={isRTL} className="gap-4 md:gap-px md:grid md:grid-cols-3 items-stretch h-full">
                      {brandingPackages.map((pkg, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ y: -8 }}
                          className="relative bg-[#050510] border border-[#1A1A3A] md:border-none p-4 md:p-8 flex flex-col max-md:h-[280px] md:min-h-[480px] group transition-all duration-300 max-md:min-w-[85vw] snap-center shrink-0"
                        >
                          {/* Hover/Active Accent Line */}
                          <div
                            className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 opacity-100 md:opacity-0 group-hover:opacity-100"
                            style={{ backgroundColor: pkg.color, boxShadow: `0 0 15px rgba(var(--color-accent-rgb), 0.5)` }}
                          />

                          {/* Recommended badge or spacer — fixed height on all cards */}
                          <div className="h-5 md:h-6 mb-2 md:mb-4 flex items-start">
                            {pkg.recommended && (
                              <span
                                className={`inline-flex px-2 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-display ${isRTL ? 'mr-auto' : ''}`}
                                style={{ backgroundColor: `rgba(var(--color-accent-rgb), 0.08)`, color: pkg.color, border: `1px solid rgba(var(--color-accent-rgb), 0.2)` }}
                              >
                                {t('services.packages.recommended')}
                              </span>
                            )}
                          </div>

                          <h4 className="text-white text-sm md:text-xl font-bold mb-3 md:mb-6 font-display">{pkg.name}</h4>

                          <div className="space-y-2 md:space-y-4 flex-1">
                            <div className={`flex items-center gap-2 md:gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                              <span className="text-[#555577] text-[10px] md:text-xs uppercase tracking-[0.1em] font-display w-20 md:w-24 flex-shrink-0">{t('services.packages.timeline')}</span>
                              <span className="text-white text-xs md:text-sm font-mono" style={{ color: pkg.color }}>{pkg.timeline} {isRTL ? t('services.daysRef') : t('services.days')}</span>
                            </div>
                            <div className={`flex items-start gap-2 md:gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                              <span className="text-[#555577] text-[10px] md:text-xs uppercase tracking-[0.1em] font-display w-20 md:w-24 flex-shrink-0">{t('services.packages.logo')}</span>
                              <span className="text-[#8888AA] text-xs md:text-sm leading-[1.3]">{pkg.logo}</span>
                            </div>
                            <div className={`flex items-start gap-2 md:gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                              <span className="text-[#555577] text-[10px] md:text-xs uppercase tracking-[0.1em] font-display w-20 md:w-24 flex-shrink-0">{t('services.packages.bestFor')}</span>
                              <span className="text-[#8888AA] text-xs md:text-sm leading-[1.3]">{pkg.target}</span>
                            </div>
                          </div>

                          <a
                            href="#contact"
                            onClick={(e) => {
                              e.preventDefault();
                              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="mt-4 md:mt-8 inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 border text-[10px] md:text-xs uppercase tracking-[0.15em] font-display transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)]"
                            style={{
                              borderColor: pkg.color,
                              color: pkg.color,
                            }}
                          >
                            {t('services.packages.getStarted')}
                          </a>
                        </motion.div>
                      ))}
                    </MobileCarousel>
                  </div>
                </div>

                {/* Project Stages */}
                <div>
                  <h3 className={`text-lg uppercase tracking-[0.2em] text-white mb-8 font-display flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="w-2 h-2 bg-[var(--color-accent)]" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
                    {t('services.process.title')}
                  </h3>

                  <div className="bg-transparent md:bg-[#1A1A3A] p-0 md:p-px">
                    <MobileCarousel isRTL={isRTL} className="gap-4 md:gap-px md:grid md:grid-cols-2 lg:grid-cols-4 items-stretch h-full">
                      {projectStages.map((stage, idx) => (
                        <div key={idx} className="bg-[#050510] border border-[#1A1A3A] md:border-none p-3 md:p-6 group hover:bg-[#0A0A1A] transition-colors duration-300 max-md:min-w-[85vw] snap-center shrink-0 flex flex-col h-full">
                          <div className={`text-[var(--color-accent)] text-[9px] md:text-xs font-mono mb-1 md:mb-3 ${isRTL ? 'text-right' : ''}`}>
                            {t('services.process.stage')} {stage.id}
                          </div>
                          <h4 className="text-white text-xs md:text-lg font-bold mb-1 md:mb-2 font-display">{stage.title}</h4>
                          <p className="text-[#8888AA] text-[11px] md:text-sm mb-1.5 md:mb-4 leading-[1.45] md:leading-relaxed flex-1 max-w-[90%] text-justify" style={{ textAlignLast: isRTL ? 'right' : 'left' }}>{stage.description}</p>
                          <span className="text-[#555577] text-[9px] md:text-xs font-mono">{stage.timeline} {isRTL ? t('services.daysRef') : t('services.days')}</span>
                        </div>
                      ))}
                    </MobileCarousel>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="design-services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Logo Packages I */}
                <div className="mb-16">
                  <h3 className={`text-lg uppercase tracking-[0.2em] text-white mb-8 font-display flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="w-2 h-2 bg-[var(--color-accent)]" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
                    {t('services.logoPackages.title')}
                  </h3>

                  <div className="bg-transparent md:bg-[#1A1A3A] p-0 md:p-px">
                    <MobileCarousel isRTL={isRTL} className="gap-4 md:gap-px md:grid md:grid-cols-2 items-stretch h-full">
                      {logoPackagesI.map((pkg, idx) => (
                        <div key={idx} className="bg-[#050510] border border-[#1A1A3A] md:border-none p-8 group hover:bg-[#0A0A1A] transition-colors duration-300 max-md:min-w-[85vw] snap-center shrink-0 flex flex-col h-full">
                          <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <h4 className="text-white text-xl font-bold font-display">{pkg.name}</h4>
                            <span className="text-xs font-mono" style={{ color: pkg.color }}>{pkg.timeline} {t('services.days')}</span>
                          </div>
                          <ul className="space-y-3 flex-1">
                            {pkg.items.map((item, itemIdx) => (
                              <li key={itemIdx} className={`flex items-start gap-3 text-[#8888AA] text-sm leading-[1.4] ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                                <span className="w-1.5 h-1.5 mt-1.5 flex-shrink-0" style={{ backgroundColor: pkg.color, boxShadow: `0 0 4px ${pkg.color}66` }} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </MobileCarousel>
                  </div>
                </div>

                {/* Logo Packages II */}
                <div className="mb-16">
                  <h3 className={`text-lg uppercase tracking-[0.2em] text-white mb-8 font-display flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="w-2 h-2 bg-[var(--color-accent)]" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
                    {t('services.logoPackages.comboTitle')}
                  </h3>

                  <div className="bg-transparent md:bg-[#1A1A3A] p-0 md:p-px">
                    <MobileCarousel isRTL={isRTL} className="gap-4 md:gap-px md:grid md:grid-cols-2 items-stretch h-full">
                      {logoPackagesII.map((pkg, idx) => (
                        <div key={idx} className="bg-[#050510] border border-[#1A1A3A] md:border-none p-8 group hover:bg-[#0A0A1A] transition-colors duration-300 max-md:min-w-[85vw] snap-center shrink-0 flex flex-col h-full">
                          <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <h4 className="text-white text-xl font-bold font-display">{pkg.name}</h4>
                            <span className="text-xs font-mono" style={{ color: pkg.color }}>{pkg.timeline} {t('services.days')}</span>
                          </div>
                          <ul className="space-y-3 flex-1">
                            {pkg.items.map((item, itemIdx) => (
                              <li key={itemIdx} className={`flex items-start gap-3 text-[#8888AA] text-sm leading-[1.4] ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                                <span className="w-1.5 h-1.5 mt-1.5 flex-shrink-0" style={{ backgroundColor: pkg.color, boxShadow: `0 0 4px ${pkg.color}66` }} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </MobileCarousel>
                  </div>
                </div>

                {/* Individual Services */}
                <div>
                  <h3 className={`text-lg uppercase tracking-[0.2em] text-white mb-8 font-display flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="w-2 h-2 bg-[var(--color-accent)]" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
                    {t('services.individual.title')}
                  </h3>

                  <div className="bg-[#1A1A3A] p-0 md:p-px">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px items-stretch overflow-hidden">
                      {individualServices.map((service, idx) => (
                        <div key={idx} className={`bg-[#050510] p-4 md:p-6 group hover:bg-[#0A0A1A] transition-colors duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${isRTL ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
                          <span className="text-white text-[10px] md:text-sm font-display truncate w-full">{service.name}</span>
                          <span className="text-[var(--color-accent)] text-[9px] md:text-xs font-mono whitespace-nowrap">{service.timeline} {t('services.days')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`mt-16 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <p className="text-[#8888AA] text-sm mb-6 max-w-2xl">
              {t('services.footer.custom')}
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-3 text-[var(--color-accent)] text-xs md:text-sm uppercase tracking-[0.2em] hover:text-white transition-colors duration-300 font-display group ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t('services.footer.cta')}
              <svg className={`w-4 h-4 transform group-hover:translate-x-2 transition-transform ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
