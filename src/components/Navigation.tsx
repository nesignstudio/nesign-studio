import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ThemeSwitcher } from './ThemeSwitcher';

interface NavigationProps {
  onStartProject: () => void;
}

export function Navigation({ onStartProject }: NavigationProps) {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t('nav.manifesto'), href: '#manifesto' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.process'), href: '#process' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#050510]/90 backdrop-blur-md border-b border-[#1A1A3A]'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="relative group lg:ml-0"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src="./logo.png"
                  alt="Nesign Studio"
                  className="h-14 w-auto logo-neon-glow transition-all duration-300 group-hover:scale-105"
                  style={{ filter: 'drop-shadow(0 0 15px rgba(var(--color-accent-rgb), 0.6)) drop-shadow(0 0 40px rgba(var(--color-accent-rgb), 0.3))' }}
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="relative text-[#8888AA] hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300 group font-display"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" style={{ boxShadow: '0 0 8px rgba(var(--color-accent-rgb), 0.5)' }} />
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-3 md:gap-6 lg:mr-0">
              {/* Color Switcher */}
              <ThemeSwitcher />

              <div className="hidden sm:block w-px h-4 bg-[#1A1A3A]" />

              {/* Language Switcher */}
              <motion.button
                onClick={toggleLanguage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="relative w-11 h-8 flex items-center justify-center border border-[#1A1A3A] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-[var(--color-accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                <span className={`relative text-[10px] font-bold tracking-widest transition-colors duration-300 ${language === 'en' ? 'text-[var(--color-accent)]' : 'text-white'} group-hover:text-[#050510]`}>
                  {language === 'en' ? 'AR' : 'EN'}
                </span>
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  onStartProject();
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="cyber-btn cyber-btn--primary cyber-btn--nav hidden md:flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-display"
              >
                {t('nav.startProject')}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 flex flex-col items-end justify-center gap-1.5 px-2"
              >
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0
                  }}
                  className="w-6 h-px bg-[var(--color-accent)] block"
                  style={{ boxShadow: '0 0 4px rgba(var(--color-accent-rgb), 0.5)' }}
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className="w-6 h-px bg-[var(--color-accent)] block"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0
                  }}
                  className="w-6 h-px bg-[var(--color-accent)] block"
                  style={{ boxShadow: '0 0 4px rgba(var(--color-accent-rgb), 0.5)' }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#050510] md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-white text-2xl uppercase tracking-[0.2em] font-display hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                className="mt-8 flex flex-col items-center gap-8"
              >
                <ThemeSwitcher />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    onStartProject();
                  }}
                  className="cyber-btn cyber-btn--primary px-8 py-3 text-sm uppercase tracking-[0.2em] font-display"
                >
                  {t('nav.startProject')}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
