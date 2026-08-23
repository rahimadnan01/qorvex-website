import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'view' | 'drag'>('default');
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('[data-cursor]');
      if (interactive) {
        const variant = interactive.getAttribute('data-cursor') as 'hover' | 'view' | 'drag';
        const text = interactive.getAttribute('data-cursor-text') || '';
        setCursorVariant(variant || 'hover');
        setCursorText(text);
      } else if (target.closest('a, button, input, textarea, [role="button"]')) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Hide cursor on touch screens
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: '#00F0FF',
      mixBlendMode: 'difference' as const,
      transition: { type: 'spring', damping: 30, mass: 0.2, stiffness: 400 }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(0, 240, 255, 0.15)',
      border: '1px solid #00F0FF',
      mixBlendMode: 'normal' as const,
      transition: { type: 'spring', damping: 25, mass: 0.3, stiffness: 350 }
    },
    view: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: '#00F0FF',
      mixBlendMode: 'normal' as const,
      transition: { type: 'spring', damping: 25, mass: 0.3, stiffness: 300 }
    },
    drag: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: '#7000FF',
      mixBlendMode: 'normal' as const,
      transition: { type: 'spring', damping: 25, mass: 0.3, stiffness: 300 }
    }
  };

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 rounded-full flex items-center justify-center font-mono text-xs font-bold uppercase tracking-wider text-dark-base"
      variants={variants}
      animate={cursorVariant}
    >
      {cursorVariant === 'view' && (
        <span className="text-dark-base font-bold">{cursorText || 'VIEW'}</span>
      )}
      {cursorVariant === 'drag' && (
        <span className="text-white font-bold">{cursorText || 'DRAG'}</span>
      )}
    </motion.div>
  );
}
