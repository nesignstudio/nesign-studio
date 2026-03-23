import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

interface CustomCursorProps {
  hasEntered?: boolean;
}

export function CustomCursor({ hasEntered = false }: CustomCursorProps) {
  const { language } = useLanguage();
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const outlinePos = useRef({ x: 0, y: 0 });
  const isInitialized = useRef(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    isMobileRef.current = isMobile;

    gsap.set([dot, outline], { xPercent: -50, yPercent: -50 });

    if (isMobile) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      pos.current = { x: cx, y: cy };
      outlinePos.current = { x: cx, y: cy };
      gsap.set(dot, { x: cx, y: cy, opacity: 1 });
      gsap.set(outline, { x: cx, y: cy, opacity: 1 });
      isInitialized.current = true;
    } else {
      gsap.set([dot, outline], { opacity: 0 });
    }

    const tickerFunc = () => {
      const lerpFactor = 0.15;
      outlinePos.current.x += (pos.current.x - outlinePos.current.x) * lerpFactor;
      outlinePos.current.y += (pos.current.y - outlinePos.current.y) * lerpFactor;
      gsap.set(dot, { x: pos.current.x, y: pos.current.y });
      gsap.set(outline, { x: outlinePos.current.x, y: outlinePos.current.y });
    };
    gsap.ticker.add(tickerFunc);

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!isInitialized.current) {
        outlinePos.current.x = e.clientX;
        outlinePos.current.y = e.clientY;
        isInitialized.current = true;
      }
      gsap.to([dot, outline], { opacity: 1, duration: 0.2, overwrite: true });
    };

    const handleMouseLeave = () => {
      gsap.to([dot, outline], { opacity: 0, duration: 0.3, overwrite: true });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest('a, button, [data-cursor-hover]')) {
        outline.classList.add('hover');
        gsap.to(dot, { scale: 1.5, duration: 0.2 });
      }
      const textEl = target.closest('p, h1, h2, h3, h4, h5, h6, span, li, blockquote');
      if (textEl && !textEl.closest('a, button')) {
        gsap.to([dot, outline], { opacity: 0, duration: 0.3, overwrite: true });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest('a, button, [data-cursor-hover]')) {
        outline.classList.remove('hover');
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
      const textEl = target.closest('p, h1, h2, h3, h4, h5, h6, span, li, blockquote');
      if (textEl) {
        gsap.to([dot, outline], { opacity: 1, duration: 0.3, overwrite: true });
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      document.documentElement.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      gsap.ticker.remove(tickerFunc);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('mouseover', handleMouseOver);
        window.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, [language, hasEntered]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 1 }}
      />
      <div
        ref={outlineRef}
        className="cursor-outline"
        style={{ opacity: 1 }}
      />
    </>
  );
}
