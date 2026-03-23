import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface BehanceDisclaimerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BehanceDisclaimer({ isOpen, onClose }: BehanceDisclaimerProps) {
    const { t, isRTL } = useLanguage();
    const behanceProfile = "https://www.behance.net/neezaryatuun?tracking_source=search_projects%7Cneezaryatuun";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(8px)' }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="max-w-md w-full relative border border-[#1A1A3A] bg-[#0A0A1A] p-8 overflow-hidden group/disclaimer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* HUD Elements */}
                        <div className="hud-scan-line" />
                        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} p-4`}>
                            <div className="text-[10px] text-[var(--color-accent)] font-mono opacity-40 uppercase">COMM_LINK: ACTIVE</div>
                        </div>

                        {/* HUD Corners */}
                        <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-8 h-8 border-t border-${isRTL ? 'r' : 'l'} border-[var(--color-accent)]/30`} />
                        <div className={`absolute bottom-0 ${isRTL ? 'left-0' : 'right-0'} w-8 h-8 border-b border-${isRTL ? 'l' : 'r'} border-[var(--color-accent)]/30`} />

                        <div className="relative z-10">
                            <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full shadow-[0_0_8px_var(--color-accent)]" />
                                <h3 className="text-xl font-bold text-white font-display uppercase tracking-wider">
                                    {t('work.disclaimer.title')}
                                </h3>
                            </div>

                            <p className={`text-[#8888AA] text-sm leading-relaxed mb-8 font-display ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('work.disclaimer.description')}
                            </p>

                            <div className="flex justify-center">
                                <a
                                    href={behanceProfile}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={onClose}
                                    className="cyber-btn cyber-btn--primary px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold font-display w-full text-center"
                                    style={{ background: 'rgba(var(--color-accent-rgb), 0.1)', border: '1px solid rgba(var(--color-accent-rgb), 0.3)' }}
                                >
                                    {t('work.disclaimer.action')}
                                </a>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-[#555577] hover:text-white transition-colors p-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
