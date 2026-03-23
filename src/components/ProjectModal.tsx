import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
    const { t, isRTL } = useLanguage();
    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [brief, setBrief] = useState('');

    const whatsappLink = "https://wa.me/212708781607?text=" + encodeURIComponent(t('modal.waTemplate'));

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !brief) return;

        const subject = encodeURIComponent(`New Project Inquiry from ${name}`);
        const bodyText = `Name: ${name}\nEmail: ${email}\n\nProject Brief:\n${brief}\n\n---\nSent via Nesign Studio Website`;
        const body = encodeURIComponent(bodyText);

        window.location.href = `mailto:nesignstudio.contact@gmail.com?subject=${subject}&body=${body}`;

        // Reset and close
        setName('');
        setEmail('');
        setBrief('');
        setIsFormExpanded(false);
        onClose();
    };

    if (typeof document === 'undefined') return null; // Safe guard for portals just in case

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-[#050510]/60 backdrop-blur-[8px]"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: {
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1]
                                }
                            }}
                            exit={{
                                opacity: 0,
                                y: 20,
                                scale: 0.98,
                                transition: {
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1]
                                }
                            }}
                            className={`relative w-full max-w-lg bg-[#0A0A1A]/80 border border-[#1A1A3A]/50 rounded-[16px] overflow-hidden pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.5)] ${isRTL ? 'text-right' : 'text-left'}`}
                            style={{
                                backdropFilter: 'blur(20px)',
                                boxShadow: 'inset 0 0 20px rgba(var(--color-accent-rgb), 0.05), 0 0 40px rgba(0, 0, 0, 0.4)'
                            }}
                        >
                            {/* Top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} text-[#555577] hover:text-[var(--color-accent)] transition-colors duration-300`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            <div className="p-6 md:p-10 text-center">
                                {/* HUD Elements */}
                                <div className="flex justify-center mb-8">
                                    <div className="relative">
                                        <div className="w-16 h-16 border border-[var(--color-accent)]/20 rounded-full flex items-center justify-center">
                                            <div className="w-12 h-12 border border-[var(--color-accent)]/30 rounded-full flex items-center justify-center animate-pulse">
                                                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-2 h-2 bg-[var(--color-accent)] rounded-full shadow-[0_0_10px_var(--color-accent)]`} />
                                    </div>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-display tracking-tight">
                                    {t('modal.title')}
                                </h2>
                                <p className="text-[#8888AA] text-sm mb-10 font-display leading-relaxed max-w-xs mx-auto">
                                    {t('modal.subtitle')}
                                </p>

                                {/* Primary CTA */}
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative w-full flex items-center justify-center gap-3 py-4 bg-[var(--color-accent)] text-[#050510] font-bold uppercase tracking-[0.1em] text-sm transition-all duration-300 hover:bg-[var(--color-accent)] hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.4)] ${isRTL ? 'flex-row-reverse' : ''}`}
                                    style={{ borderRadius: '8px' }}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    {t('modal.whatsapp')}
                                    <div className={`absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-x-0 group-hover:scale-x-100 ${isRTL ? 'origin-right' : 'origin-left'}`} />
                                </a>

                                {/* Secondary Option */}
                                <div className="mt-8">
                                    <button
                                        onClick={() => setIsFormExpanded(!isFormExpanded)}
                                        className="text-[#555577] text-xs font-display hover:text-[var(--color-accent)] transition-colors duration-300 underline underline-offset-4"
                                    >
                                        {t('modal.emailToggle')}
                                    </button>

                                    <AnimatePresence>
                                        {isFormExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden mt-6"
                                            >
                                                <form className="space-y-3" onSubmit={handleEmailSubmit}>
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder={t('modal.form.name')}
                                                        required
                                                        className={`w-full bg-[#050510]/50 border border-[#1A1A3A] rounded-[8px] px-4 py-3 text-sm text-white focus:border-[var(--color-accent)]/50 outline-none transition-all placeholder:text-[#333355] ${isRTL ? 'text-right' : 'text-left'}`}
                                                    />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder={t('modal.form.email')}
                                                        required
                                                        className={`w-full bg-[#050510]/50 border border-[#1A1A3A] rounded-[8px] px-4 py-3 text-sm text-white focus:border-[var(--color-accent)]/50 outline-none transition-all placeholder:text-[#333355] ${isRTL ? 'text-right' : 'text-left'}`}
                                                    />
                                                    <textarea
                                                        value={brief}
                                                        onChange={(e) => setBrief(e.target.value)}
                                                        placeholder={t('modal.form.brief')}
                                                        required
                                                        rows={3}
                                                        className={`w-full bg-[#050510]/50 border border-[#1A1A3A] rounded-[8px] px-4 py-3 text-sm text-white focus:border-[var(--color-accent)]/50 outline-none transition-all placeholder:text-[#333355] resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="w-full py-3 bg-[#1A1A3A] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#2A2A5A] transition-all duration-300 rounded-[8px]"
                                                    >
                                                        {t('modal.form.submit')}
                                                    </button>
                                                </form>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Technical footer */}
                            <div className={`flex items-center justify-between px-10 py-4 bg-[#050510]/40 border-t border-[#1A1A3A]/50 pointer-events-none ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <span className="text-[8px] text-[#333355] font-mono uppercase tracking-tighter">SECURE_CONNECT / V_2.0</span>
                                <div className="flex gap-2">
                                    <div className="w-1 h-1 bg-[rgba(var(--color-accent-rgb),0.5)] rounded-full" />
                                    <div className="w-1 h-1 bg-[rgba(var(--color-accent-rgb),0.5)] rounded-full" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
