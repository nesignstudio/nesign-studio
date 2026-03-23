import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t, isRTL } = useLanguage();

  const footerLinks = {
    navigation: [
      { label: t('nav.manifesto'), href: '#manifesto' },
      { label: t('nav.services'), href: '#services' },
      { label: t('nav.work'), href: '#work' },
      { label: t('nav.process'), href: '#process' },
      { label: t('nav.contact'), href: '#contact' },
    ],
    social: [
      { label: t('cta.instagram'), href: 'https://instagram.com/Nesignstudio_' },
      { label: t('cta.behance'), href: 'https://www.behance.net/neezaryatuun?tracking_source=search_projects%7Cneezaryatuun' },
      { label: t('cta.whatsapp'), href: 'https://wa.me/212708781607' },
    ],
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative border-t border-[#1A1A3A]">
      <div className={`w-full px-6 md:px-12 lg:px-20 py-20 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
            {/* Brand Column */}
            <div className={`md:col-span-5 ${isRTL ? 'md:order-4' : ''}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={isRTL ? 'inline-block' : ''}>
                  <img
                    src="/logo.png"
                    alt="Nesign Studio"
                    className="h-16 w-auto mb-6"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(var(--color-accent-rgb), 0.3))' }}
                  />
                </a>
                <p className="text-[#8888AA] text-sm leading-relaxed mb-6 max-w-sm text-justify" style={{ textAlignLast: isRTL ? 'right' : 'left' }}>
                  {t('footer.brandDesc')}
                </p>
                <a
                  href="mailto:nesignstudio.contact@gmail.com"
                  className="text-[var(--color-accent)] text-sm font-display hover:text-white transition-colors duration-300"
                  style={{ textShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.2)' }}
                >
                  nesignstudio.contact@gmail.com
                </a>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className={`md:col-span-3 ${isRTL ? 'md:order-3' : ''}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#555577] mb-6 font-display">
                  {t('footer.navigation')}
                </h4>
                <ul className="space-y-3">
                  {footerLinks.navigation.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`text-[#8888AA] text-sm hover:text-[var(--color-accent)] transition-colors duration-300 font-display inline-flex items-center gap-2 group ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <span className="w-0 group-hover:w-4 h-px bg-[var(--color-accent)] transition-all duration-300" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Social */}
            <div className={`md:col-span-2 ${isRTL ? 'md:order-2' : ''}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#555577] mb-6 font-display">
                  {t('footer.social')}
                </h4>
                <ul className="space-y-3">
                  {footerLinks.social.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-[#8888AA] text-sm hover:text-[var(--color-accent)] transition-colors duration-300 font-display inline-flex items-center gap-2 group ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <span className="w-0 group-hover:w-4 h-px bg-[var(--color-accent)] transition-all duration-300" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Location */}
            <div className={`md:col-span-2 ${isRTL ? 'md:order-1' : ''}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#555577] mb-6 font-display">
                  {t('footer.location')}
                </h4>
                <p className="text-[#8888AA] text-sm leading-relaxed">
                  Morocco<br />
                  <span className="text-[#555577]">{t('footer.locNote')}</span>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#1A1A3A] ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-[#555577] text-xs font-display">
              &copy; {new Date().getFullYear()} Nesign Studio. {t('footer.rights')}
            </p>

            <div className="flex items-center gap-6">
              <span className="text-[#555577] text-xs font-mono">
                {t('footer.studioLabel')}
              </span>
            </div>

            <div className="flex items-center gap-5">
              {footerLinks.social.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#555577] hover:text-[var(--color-accent)] transition-colors duration-300"
                  title={link.label}
                >
                  {link.label === t('cta.instagram') && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  )}
                  {link.label === t('cta.behance') && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path><path d="M14 12H10c-2.76 0-5 2.24-5 5v2h14v-2c0-2.76-2.24-5-5-5z"></path><path d="M19.13 10.3c-.35 0-.64.2-.64.58 0 .34.22.5.54.5.34 0 .58-.16.58-.5 0-.38-.25-.58-.48-.58z"></path><path d="M18 6h4v1.5h-4z"></path><path d="M19.13 8.3c-.87 0-1.63.48-1.63 1.5s.76 1.48 1.63 1.48c.95 0 1.67-.5 1.67-1.48s-.72-1.5-1.67-1.5z"></path></svg>
                  )}
                  {link.label === t('cta.whatsapp') && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.18 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  )}
                </a>
              ))}
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`group flex items-center gap-2 text-[#555577] text-xs uppercase tracking-[0.15em] font-display hover:text-[var(--color-accent)] transition-colors duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t('footer.backToTop')}
              <svg
                className={`w-3 h-3 transform group-hover:-translate-y-1 transition-transform ${isRTL ? '' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
