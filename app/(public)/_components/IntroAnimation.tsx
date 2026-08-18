'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Easing — each curve chosen for its specific motion role
const LINE_EASE = [0.76, 0, 0.24, 1] as [number, number, number, number]; // precise draw
const TEXT_EASE = [0.16, 1, 0.3,  1] as [number, number, number, number]; // spring settle
const EXIT_EASE = [0.55, 0, 1,  0.45] as [number, number, number, number]; // accelerating release

const CRIMSON     = '#8B0000';
const DISPLAY     = "'Arial Black', 'Helvetica Neue', Arial, sans-serif";
const LABEL_STYLE = {
  fontSize:      9,
  fontWeight:    700,
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color:         '#A8A8A8',
  margin:        0,
  whiteSpace:    'nowrap' as const,
};

export function IntroAnimation() {
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  const fired = useRef(false);

  const dismiss = useCallback((instant = false) => {
    if (fired.current) return;
    fired.current = true;
    if (instant) {
      setVisible(false);
    } else {
      setExiting(true);
      setTimeout(() => setVisible(false), 920);
    }
  }, []);

  useEffect(() => {
    // Respect the user's motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dismiss(true);
      return;
    }
    const t = setTimeout(dismiss, 2050);
    return () => clearTimeout(t);
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] select-none"
      onClick={() => dismiss()}
      aria-hidden="true"
    >
      {/* ─────────────────────────────────────── TOP PANEL — "KL" ─── */}
      <motion.div
        animate={{ y: exiting ? '-100%' : '0%' }}
        transition={{ duration: 0.82, ease: EXIT_EASE }}
        style={{
          position:       'absolute',
          top: 0, left: 0, right: 0,
          height:         '50vh',
          background:     '#fff',
          overflow:       'hidden',
          display:        'flex',
          alignItems:     'flex-end',
          justifyContent: 'center',
          willChange:     'transform',
        }}
      >
        <motion.span
          initial={{ y: '-108%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.92, ease: TEXT_EASE, delay: 0.18 }}
          style={{
            display:       'block',
            fontFamily:    DISPLAY,
            fontWeight:    900,
            fontSize:      'clamp(96px, 20vw, 240px)',
            letterSpacing: '-0.02em',
            lineHeight:    0.85,
            color:         '#0A0A0A',
            whiteSpace:    'nowrap',
          }}
        >
          KL
        </motion.span>

        {/* Institution label — top-right, slides in from right */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: exiting ? 0 : 1, x: exiting ? 10 : 0 }}
          transition={{ duration: 0.42, delay: exiting ? 0 : 1.02 }}
          style={{ position: 'absolute', top: 26, right: 30, textAlign: 'right' }}
        >
          <p style={LABEL_STYLE}>KL University</p>
          <p style={{ ...LABEL_STYLE, fontWeight: 400, letterSpacing: '0.12em', marginTop: 4, color: '#C8C8C8' }}>
            Vijayawada · AP
          </p>
        </motion.div>
      </motion.div>

      {/* ─────────────────────────── CENTER INCISION LINE ─────────── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: exiting ? 0 : 1, opacity: exiting ? 0 : 1 }}
        transition={{
          scaleX:  { duration: 0.58, delay: exiting ? 0 : 0.08, ease: LINE_EASE },
          opacity: { duration: 0.22 },
        }}
        style={{
          position:        'absolute',
          top:             '50vh',
          left: 0, right:  0,
          height:          1.5,
          marginTop:       -0.75,
          background:      CRIMSON,
          transformOrigin: 'center',
          zIndex:          10,
        }}
      />

      {/* ─────────────────────────────────────── BOTTOM PANEL — "SAC" */}
      <motion.div
        animate={{ y: exiting ? '100%' : '0%' }}
        transition={{ duration: 0.82, ease: EXIT_EASE, delay: exiting ? 0.05 : 0 }}
        style={{
          position:       'absolute',
          top: '50vh', left: 0, right: 0, bottom: 0,
          background:     '#fff',
          overflow:       'hidden',
          display:        'flex',
          alignItems:     'flex-start',
          justifyContent: 'center',
          willChange:     'transform',
        }}
      >
        <motion.span
          initial={{ y: '108%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.92, ease: TEXT_EASE, delay: 0.23 }}
          style={{
            display:       'block',
            fontFamily:    DISPLAY,
            fontWeight:    900,
            fontSize:      'clamp(96px, 20vw, 240px)',
            letterSpacing: '-0.02em',
            lineHeight:    0.85,
            color:         CRIMSON,
            whiteSpace:    'nowrap',
          }}
        >
          SAC
        </motion.span>

        {/* Center name label — bottom-left, slides in from left */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: exiting ? 0 : 1, x: exiting ? -10 : 0 }}
          transition={{ duration: 0.42, delay: exiting ? 0 : 1.07 }}
          style={{ position: 'absolute', bottom: 26, left: 30 }}
        >
          <p style={LABEL_STYLE}>Student Activity Center</p>
        </motion.div>

        {/* Skip hint — bottom-right */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 0.38, delay: exiting ? 0 : 1.5 }}
          style={{
            position:      'absolute',
            bottom:        26,
            right:         30,
            margin:        0,
            fontSize:      9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         '#C8C8C8',
            whiteSpace:    'nowrap',
          }}
        >
          Click to skip
        </motion.p>
      </motion.div>
    </div>
  );
}
