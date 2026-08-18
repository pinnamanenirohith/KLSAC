'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CRIMSON = '#8B0000';
const SANS    = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const DRAW    = [0.76, 0, 0.24, 1] as [number, number, number, number];

export function IntroAnimation() {
  const [visible, setVisible] = useState(true);
  const fired = useRef(false);

  const dismiss = useCallback(() => {
    if (fired.current) return;
    fired.current = true;
    setVisible(false);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }
    const t = setTimeout(dismiss, 2800);
    return () => clearTimeout(t);
  }, [dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, transition: { duration: 0.85, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer select-none"
          style={{ background: '#F8F8F8' }}
          onClick={dismiss}
          aria-hidden="true"
        >

          {/* ── Centre composition ─────────────────────── */}
          <div style={{ textAlign: 'center', userSelect: 'none' }}>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.22, ease: 'easeOut' }}
              style={{
                fontFamily: SANS,
                fontWeight: 300,
                fontSize: 'clamp(28px, 4.5vw, 46px)',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              <span style={{ color: '#1C1C1C' }}>KL </span>
              <span style={{ color: CRIMSON    }}>SAC</span>
            </motion.div>

            {/* Thin rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: 0.7, ease: DRAW }}
              style={{
                height: 1, width: 44,
                background: CRIMSON,
                margin: '22px auto 22px',
                transformOrigin: 'center',
              }}
            />

            {/* Student Activity Center */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.95, ease: 'easeOut' }}
              style={{
                margin: '0 0 9px', fontFamily: SANS,
                fontSize: 9, fontWeight: 600,
                letterSpacing: '0.38em', textTransform: 'uppercase',
                color: '#2A2A2A',
              }}
            >
              Student Activity Center
            </motion.p>

            {/* KL University */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 1.15, ease: 'easeOut' }}
              style={{
                margin: 0, fontFamily: SANS,
                fontSize: 8, fontWeight: 400,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#ABABAB',
              }}
            >
              KL University · Vijayawada
            </motion.p>
          </div>

          {/* ── Progress line ───────────────────────────── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.55, delay: 0.1, ease: 'linear' }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 1.5,
              background: `linear-gradient(90deg, ${CRIMSON} 0%, rgba(201,168,76,0.7) 100%)`,
              transformOrigin: 'left',
              opacity: 0.65,
            }}
          />

          {/* ── Skip hint ────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.6 }}
            style={{
              position: 'absolute', bottom: 16,
              left: '50%', transform: 'translateX(-50%)',
              margin: 0, fontFamily: SANS,
              fontSize: 8, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#CACACA',
              whiteSpace: 'nowrap',
            }}
          >
            Click anywhere to skip
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
