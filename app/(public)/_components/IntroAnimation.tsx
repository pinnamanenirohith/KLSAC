'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CRIMSON = '#8B0000';
const DARK    = '#09090B';
const DISPLAY = "'Arial Black','Helvetica Neue',Arial,sans-serif";

/* Words that map to student passions across SAC's five domains.
   Alternating white / crimson keeps the rhythm visually alive.     */
const WORDS = [
  { text: 'MUSIC',   red: false },
  { text: 'CODE',    red: true  },
  { text: 'SPORT',   red: false },
  { text: 'ART',     red: true  },
  { text: 'DANCE',   red: false },
  { text: 'CREATE',  red: true  },
  { text: 'WIN',     red: false },
  { text: 'LIVE',    red: true  },
];

const WORD_MS = 175; // ms per word — fast enough to feel kinetic

export function IntroAnimation() {
  const [idx,         setIdx]         = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const [visible,     setVisible]     = useState(true);
  const fired = useRef(false);

  const dismiss = useCallback(() => {
    if (fired.current) return;
    fired.current = true;
    setVisible(false);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dismiss();
      return;
    }

    const ts: ReturnType<typeof setTimeout>[] = [];

    // Schedule every word
    WORDS.forEach((_, i) => {
      ts.push(setTimeout(() => setIdx(i), i * WORD_MS));
    });

    // After the reel, show the tagline
    const reelEnd = WORDS.length * WORD_MS;
    ts.push(setTimeout(() => setShowTagline(true), reelEnd));

    // Auto-dismiss — tagline is felt for ~580 ms then fades
    ts.push(setTimeout(dismiss, reelEnd + 580));

    return () => ts.forEach(clearTimeout);
  }, [dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, transition: { duration: 0.65, ease: 'easeIn' } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer select-none"
          style={{ background: DARK }}
          onClick={dismiss}
          aria-hidden="true"
        >

          {/* ── Word reel ───────────────────────────── */}
          {!showTagline && (
            <motion.p
              key={`w${idx}`}
              initial={{ scale: 1.12, opacity: 1 }}
              animate={{ scale: 1,    opacity: 1 }}
              transition={{ duration: 0.09, ease: 'easeOut' }}
              style={{
                margin: 0,
                fontFamily: DISPLAY,
                fontWeight: 900,
                fontSize: 'clamp(52px, 13vw, 128px)',
                letterSpacing: '0.05em',
                color: WORDS[idx].red ? CRIMSON : '#FFFFFF',
                userSelect: 'none',
              }}
            >
              {WORDS[idx].text}
            </motion.p>
          )}

          {/* ── Tagline ─────────────────────────────── */}
          {showTagline && (
            <motion.div
              key="tagline"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
              style={{ textAlign: 'center', lineHeight: 1 }}
            >
              <p style={{
                margin: 0,
                fontFamily: DISPLAY, fontWeight: 900,
                fontSize: 'clamp(40px, 8vw, 88px)',
                letterSpacing: '0.06em', color: '#FFFFFF',
              }}>
                YOUR
              </p>
              <p style={{
                margin: 0,
                fontFamily: DISPLAY, fontWeight: 900,
                fontSize: 'clamp(40px, 8vw, 88px)',
                letterSpacing: '0.06em', color: CRIMSON,
              }}>
                TIME.
              </p>
            </motion.div>
          )}

          {/* ── Skip hint (barely visible) ──────────── */}
          <p style={{
            position: 'absolute', bottom: 22, margin: 0,
            fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
            fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.16)',
          }}>
            Tap to skip
          </p>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
