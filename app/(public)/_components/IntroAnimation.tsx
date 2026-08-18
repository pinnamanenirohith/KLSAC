'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ── Brand tokens ───────────────────────────────────────── */
const CRIMSON  = '#8B0000';
const INK      = '#0D0D0D';
const PANEL_BG = '#FAFAFA';
const DISPLAY  = "'Arial Black','Helvetica Neue',Arial,sans-serif";

/* ── Precision easing curves ────────────────────────────── */
const SPRING = [0.16, 1, 0.3, 1]  as [number, number, number, number];
const SHARP  = [0.76, 0, 0.24, 1] as [number, number, number, number];
const EXIT   = [0.76, 0, 1, 0.45] as [number, number, number, number];

/* ── Corner mark geometry ───────────────────────────────── */
type CornerPos = { top?: number; bottom?: number; left?: number; right?: number };

const CORNERS: CornerPos[] = [
  { top: 18, left: 18 },
  { top: 18, right: 18 },
  { bottom: 18, left: 18 },
  { bottom: 18, right: 18 },
];

function cornerBorder(pos: CornerPos): React.CSSProperties {
  const line = '1.5px solid rgba(0,0,0,0.11)';
  return {
    borderTop:    pos.top    !== undefined ? line : undefined,
    borderBottom: pos.bottom !== undefined ? line : undefined,
    borderLeft:   pos.left   !== undefined ? line : undefined,
    borderRight:  pos.right  !== undefined ? line : undefined,
  };
}

/* ─────────────────────────────────────────────────────────
   IntroAnimation
   Split-panel reveal: "KL" descends into the top half,
   "SAC" ascends into the bottom half, divided by a crimson
   incision line. Panels split apart on exit.
───────────────────────────────────────────────────────── */
export function IntroAnimation() {
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  const fired = useRef(false);

  const dismiss = useCallback(() => {
    if (fired.current) return;
    fired.current = true;
    setExiting(true);
    setTimeout(() => setVisible(false), 1050);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }
    const t = setTimeout(dismiss, 2400);
    return () => clearTimeout(t);
  }, [dismiss]);

  if (!visible) return null;

  /* ── Shared label transition helper ── */
  const lt = (delay: number) => ({
    duration: 0.35,
    delay: exiting ? 0 : delay,
  });

  return (
    <div
      className="fixed inset-0 z-[9999] select-none cursor-pointer"
      onClick={dismiss}
      aria-hidden="true"
    >

      {/* ══════════════════════════════ TOP PANEL — "KL" */}
      <motion.div
        animate={exiting ? { y: '-100%' } : { y: '0%' }}
        transition={exiting ? { duration: 0.88, ease: EXIT } : {}}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '50vh',
          background: PANEL_BG, overflow: 'hidden',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          willChange: 'transform',
        }}
      >
        {/* "KL" — slides up from behind the bottom edge */}
        <motion.span
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.0, ease: SPRING, delay: 0.18 }}
          style={{
            display: 'block',
            fontFamily: DISPLAY,
            fontWeight: 900,
            /* vh-constrained so text fills the panel proportionally on every device */
            fontSize: 'clamp(80px, min(36vh, 26vw), 320px)',
            letterSpacing: '-0.025em',
            lineHeight: 0.82,
            color: INK,
            userSelect: 'none',
          }}
        >
          KL
        </motion.span>

        {/* Institution name — top-right */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: exiting ? 0 : 1, x: exiting ? 8 : 0 }}
          transition={lt(1.1)}
          style={{ position: 'absolute', top: 22, right: 24, textAlign: 'right' }}
        >
          <p style={{
            margin: 0, fontSize: 10, fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: INK,
          }}>
            KL University
          </p>
          <p style={{
            margin: '5px 0 0', fontSize: 9, fontWeight: 400,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B2B2B2',
          }}>
            Est. 2000 · Vijayawada
          </p>
        </motion.div>

        {/* Thin vertical accent — top-left */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: exiting ? 0 : 1 }}
          transition={{ duration: 0.45, delay: exiting ? 0 : 0.88, ease: SHARP }}
          style={{
            position: 'absolute', top: 18, left: 24,
            width: 1.5, height: 36,
            background: CRIMSON, transformOrigin: 'top',
          }}
        />

        {/* Corner marks — top two */}
        {CORNERS.slice(0, 2).map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: 0.28, delay: exiting ? 0 : 0.72 + i * 0.06 }}
            style={{
              position: 'absolute', width: 16, height: 16,
              ...pos, ...cornerBorder(pos),
            }}
          />
        ))}
      </motion.div>

      {/* ══════════════════ CRIMSON INCISION LINE (centre) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: exiting ? 0 : 1 }}
        transition={{
          duration: exiting ? 0.26 : 0.5,
          delay: exiting ? 0 : 0.06,
          ease: SHARP,
        }}
        style={{
          position: 'absolute', top: '50vh', left: 0, right: 0,
          height: 1.5, marginTop: -0.75,
          background: CRIMSON,
          transformOrigin: 'center', zIndex: 10,
        }}
      />

      {/* ══════════════════════════ BOTTOM PANEL — "SAC" */}
      <motion.div
        animate={exiting ? { y: '100%' } : { y: '0%' }}
        transition={exiting ? { duration: 0.88, ease: EXIT, delay: 0.06 } : {}}
        style={{
          position: 'absolute', top: '50vh', left: 0, right: 0, bottom: 0,
          background: PANEL_BG, overflow: 'hidden',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          willChange: 'transform',
        }}
      >
        {/* "SAC" — slides down from behind the top edge */}
        <motion.span
          initial={{ y: '-110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.0, ease: SPRING, delay: 0.24 }}
          style={{
            display: 'block',
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 'clamp(80px, min(36vh, 26vw), 320px)',
            letterSpacing: '-0.025em',
            lineHeight: 0.82,
            color: CRIMSON,
            userSelect: 'none',
          }}
        >
          SAC
        </motion.span>

        {/* Full name — bottom-left */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: exiting ? 0 : 1, x: exiting ? -8 : 0 }}
          transition={lt(1.15)}
          style={{ position: 'absolute', bottom: 22, left: 24 }}
        >
          <p style={{
            margin: 0, fontSize: 10, fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: INK,
          }}>
            Student Activity Center
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: exiting ? 0 : 1 }}
          transition={{
            duration: exiting ? 0.2 : 2.2,
            delay: exiting ? 0 : 0.08,
            ease: exiting ? SHARP : 'linear',
          }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, ${CRIMSON} 0%, #C9A84C 100%)`,
            transformOrigin: 'left',
          }}
        />

        {/* Skip hint — bottom-right */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 0.35, delay: exiting ? 0 : 1.65 }}
          style={{
            position: 'absolute', bottom: 20, right: 24, margin: 0,
            fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#C0C0C0', whiteSpace: 'nowrap',
          }}
        >
          Click to skip
        </motion.p>

        {/* Corner marks — bottom two */}
        {CORNERS.slice(2).map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: 0.28, delay: exiting ? 0 : 0.78 + i * 0.06 }}
            style={{
              position: 'absolute', width: 16, height: 16,
              ...pos, ...cornerBorder(pos),
            }}
          />
        ))}
      </motion.div>

    </div>
  );
}
