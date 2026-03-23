import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';

interface WorkProps {
  onStartProject: () => void;
  onSeeMoreBehance: () => void;
}

export function Work({ onStartProject, onSeeMoreBehance }: WorkProps) {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showActivation, setShowActivation] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      const scrollValue = isRTL ? Math.abs(scrollLeft) : scrollLeft;
      const maxScroll = scrollWidth - clientWidth;

      setCanScrollLeft(scrollValue > 10);
      setCanScrollRight(scrollValue < maxScroll - 10);
      setScrollProgress((scrollValue / maxScroll) * 100);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [isRTL]);

  useEffect(() => {
    if (selectedProject) {
      setShowActivation(true);
      const timer = setTimeout(() => {
        setShowActivation(false);
      }, 4000); // 4s matches one full down/up cycle (4s)
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.4 : clientWidth * 0.4;

      carouselRef.current.scrollBy({
        left: isRTL ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const projectsData = [
    { id: 1, color: 'var(--color-accent)', image: '/projects/nesign-studio.png', year: '2024', link: 'https://www.behance.net/gallery/241391103/Nesign-Studio' },
    { id: 2, color: 'var(--color-accent)', image: '/projects/neet-black.jpg', year: '2023', link: 'https://www.behance.net/neezaryatuun' },
    { id: 3, color: 'var(--color-accent)', image: '/projects/trobax-new.jpg', year: '2024', link: 'https://www.behance.net/gallery/236504011/TRX-FIX' },
    { id: 4, color: 'var(--color-accent)', image: '/projects/ld-export-new.jpg', year: '2023', link: 'https://www.behance.net/gallery/189332431/LD-EXPORT' },
    { id: 5, color: 'var(--color-accent)', image: '/projects/runs-black.jpg', year: '2022', link: 'https://www.behance.net/gallery/187420689/Runz-(Brand-Identity)' },
    { id: 6, color: 'var(--color-accent)', image: '/projects/towards-the-future-new.jpg', year: '2024', link: 'https://www.behance.net/neezaryatuun' }
  ];

  const translatedItems = t('work.items') as any[];
  const projects = projectsData.map((data, index) => ({
    ...data,
    ...translatedItems[index]
  }));


  return (
    <section
      ref={sectionRef}
      id="work"
      className={`relative py-16 md:py-48 overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A1A]/50 to-transparent pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-20 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className={`inline-flex items-center gap-2 text-[#8888AA] text-xs uppercase tracking-[0.3em] mb-6 font-display ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="w-8 h-px bg-[var(--color-accent)]" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
                {t('work.label')}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white font-display">
                {t('work.title')}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 md:mt-0"
            >
              <span className="text-[#8888AA] text-sm font-display">
                {projects.length} {t('work.selectedProjects')}
              </span>
            </motion.div>
          </div>

          {/* Projects Container (Carousel on Mobile, Grid on Desktop) */}
          <div className="relative group">
            <div
              ref={carouselRef}
              onScroll={checkScroll}
              className="projects-container flex md:grid overflow-x-auto md:overflow-visible scrollbar-hide snap-x md:snap-none snap-mandatory md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 md:pb-0 transition-all duration-500"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project, index: number) => (
                <motion.div
                  key={project.id}
                  className="project-card flex-shrink-0 md:flex-shrink-1 w-[85vw] md:w-full snap-center md:snap-align-none group relative cursor-pointer overflow-hidden bg-[#0A0A1A] border border-[#1A1A3A] hover:border-transparent transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                  whileHover={{ y: -8 }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay"
                      style={{ backgroundColor: project.color }}
                    />
                    {/* Bottom gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#050510] to-transparent" />

                    {/* Category Tag */}
                    <div
                      className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-display border backdrop-blur-sm`}
                      style={{
                        borderColor: `${project.color}44`,
                        backgroundColor: `${project.color}10`,
                        color: project.color
                      }}
                    >
                      {project.category}
                    </div>

                    {/* View Project Overlay Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className={`flex justify-between items-start mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <h3
                        className="text-xl font-bold font-display transition-colors duration-300"
                        style={{ color: hoveredProject === project.id ? project.color : '#ffffff' }}
                      >
                        {project.title}
                      </h3>
                      <div className="flex gap-2">
                        <a
                          href="https://www.instagram.com/nesignstudio_/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-[#8888AA] hover:text-[var(--color-accent)] transition-colors border border-transparent hover:border-[var(--color-accent)]/20 rounded-md"
                          onClick={(e) => e.stopPropagation()}
                          title="View on Instagram"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                      </div>
                    </div>
                    <p className={`text-[#555577] text-sm leading-relaxed text-justify ${isRTL ? 'pl-4' : 'pr-4'}`} style={{ textAlignLast: isRTL ? 'right' : 'left' }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-out"
                    style={{
                      width: hoveredProject === project.id ? '100%' : '0%',
                      backgroundColor: project.color,
                      boxShadow: hoveredProject === project.id ? `0 0 15px ${project.color}66` : 'none'
                    }}
                  />

                  {/* Carousel Navigation Controls (Integrated into Card on Mobile) */}
                  <div className={`md:hidden flex items-center gap-4 px-6 pb-6 pt-4 border-t border-[#1A1A3A]/50 ${isRTL ? 'flex-row-reverse' : 'justify-start'}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scroll('left');
                      }}
                      disabled={!canScrollLeft}
                      className={`w-10 h-10 flex items-center justify-center border border-[#1A1A3A] transition-all duration-300 group ${!canScrollLeft ? 'opacity-20 grayscale pointer-events-none' : 'hover:border-[var(--color-accent)]'}`}
                    >
                      <svg className={`w-4 h-4 transition-transform group-hover:scale-110 ${isRTL ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="flex-1 h-[1px] bg-[#1A1A3A] relative">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-[var(--color-accent)] shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.5)]"
                        style={{ width: `${scrollProgress}%` }}
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scroll('right');
                      }}
                      disabled={!canScrollRight}
                      className={`w-10 h-10 flex items-center justify-center border border-[#1A1A3A] transition-all duration-300 group ${!canScrollRight ? 'opacity-20 grayscale pointer-events-none' : 'hover:border-[var(--color-accent)]'}`}
                    >
                      <svg className={`w-4 h-4 transition-transform group-hover:scale-110 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className={`mt-16 md:mt-24 flex flex-col md:flex-row items-start md:items-center md:justify-center gap-6 ${isRTL ? 'items-end' : ''}`}>
            <button
              onClick={onSeeMoreBehance}
              className="px-8 py-3 border border-[#1A1A3A] text-[#8888AA] text-xs uppercase tracking-[0.2em] font-display hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 group"
            >
              {t('work.seeMore')}
            </button>

            <button
              onClick={onStartProject}
              className="cyber-btn cyber-btn--primary group inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.15em] font-medium font-display"
            >
              {t('cta.button')}
              <svg
                className={`w-4 h-4 transform group-hover:translate-x-2 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#050510]/95 backdrop-blur-sm p-6"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const project = projects.find(p => p.id === selectedProject);
                  if (!project) return null;
                  return (
                    <div className="relative border border-[#1A1A3A] bg-[#0A0A1A] overflow-hidden group/modal">
                      {/* HUD Scan Line - Only show for 3s */}
                      {showActivation && <div className="hud-scan-line" />}

                      {/* Image Container */}
                      <div className="relative aspect-video overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />

                        {/* Scanning Overlay Grid */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1A] via-transparent to-transparent opacity-60" />

                        {/* Top HUD Bar */}
                        <div className={`absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className={`text-[10px] text-[var(--color-accent)] font-mono tracking-widest uppercase ${showActivation ? 'hud-flicker' : ''}`}>{t('work.hud.target')}: {project.title.replace(/\s+/g, '_').toUpperCase()}</div>
                            <div className="text-[10px] text-[#8888AA] font-mono tracking-tighter uppercase">ID_REF: P_00{project.id}</div>
                          </div>
                          <div className={isRTL ? 'text-left' : 'text-right'}>
                            <div className="text-[10px] text-[var(--color-accent)] font-mono tracking-widest uppercase">SYST_TIME: {new Date().getHours()}:{new Date().getMinutes()}:{new Date().getSeconds()}</div>
                            <div className="text-[10px] text-[#8888AA] font-mono tracking-tighter uppercase font-bold">{t('work.hud.status')}</div>
                          </div>
                        </div>

                        {/* HUD Corners */}
                        {/* Top Left */}
                        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} w-12 h-12 border-t-2 ${isRTL ? 'border-r-2' : 'border-l-2'} border-[var(--color-accent)]/40 pointer-events-none`} />
                        <div className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} text-[8px] text-[var(--color-accent)] font-mono ${isRTL ? 'rotate-[90deg] origin-top-right' : 'rotate-[-90deg] origin-top-left'} translate-x-[4px] opacity-40 uppercase`}>{t('work.hud.project')}: {project.title}</div>

                        {/* Top Right */}
                        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} w-12 h-12 border-t-2 ${isRTL ? 'border-l-2' : 'border-r-2'} border-[var(--color-accent)]/40 pointer-events-none`} />
                        <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} text-[8px] text-[var(--color-accent)] font-mono uppercase opacity-40`}>{t('work.hud.year')}: {project.year}</div>

                        {/* Bottom Left */}
                        <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} w-12 h-12 border-b-2 ${isRTL ? 'border-r-2' : 'border-l-2'} border-[var(--color-accent)]/40 pointer-events-none`} />
                        <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} text-[8px] text-[var(--color-accent)] font-mono uppercase opacity-40`}>{t('work.hud.identity')}: {project.category}</div>

                        {/* Bottom Right */}
                        <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} w-12 h-12 border-b-2 ${isRTL ? 'border-l-2' : 'border-r-2'} border-[var(--color-accent)]/40 pointer-events-none`} />

                        {/* Technical Specs Overlay */}
                        <div className={`absolute bottom-8 ${isRTL ? 'left-8 text-left' : 'right-8 text-right'} space-y-1 hidden md:block`}>
                          <div className="text-[9px] text-[#8888AA] font-mono opacity-50">RES: 1920X1080</div>
                          <div className="text-[9px] text-[#8888AA] font-mono opacity-50">FREQ: 60HZ</div>
                          <div className={`text-[9px] text-[var(--color-accent)] font-mono opacity-70 ${showActivation ? 'hud-flicker' : ''}`}>ENCRYPTED_DATA_PACKET.V3</div>
                        </div>
                      </div>

                      <div className="p-8 border-t border-[#1A1A3A] flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-2xl">
                          <div className="flex items-center gap-4 mb-4">
                            <motion.span
                              initial={{ width: 0 }}
                              animate={{ width: 40 }}
                              className="h-px bg-[var(--color-accent)]"
                            />
                            <span className="text-xs uppercase tracking-[0.2em] font-display font-bold" style={{ color: project.color }}>
                              {project.category}
                            </span>
                          </div>
                          <h3 className="text-4xl font-bold text-white mb-4 font-display tracking-tight">{project.title}</h3>
                          <p className="text-[#8888AA] text-lg leading-relaxed font-display text-justify" style={{ textAlignLast: isRTL ? 'right' : 'left' }}>{project.description}</p>
                        </div>

                        <a
                          href="https://www.instagram.com/nesignstudio_/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center justify-center w-12 h-12 bg-[rgba(var(--color-accent-rgb),0.1)] border border-[rgba(var(--color-accent-rgb),0.2)] text-[var(--color-accent)] hover:bg-[rgba(var(--color-accent-rgb),0.2)] transition-all duration-300 group rounded-md"
                          title="View on Instagram"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                      </div>

                      <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center text-white/50 hover:text-[var(--color-accent)] transition-all duration-300 hover:scale-110"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
