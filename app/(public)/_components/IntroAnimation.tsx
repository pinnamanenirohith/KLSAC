'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CRIMSON = '#8B0000';
const DARK    = '#09090B';
const DISPLAY = "'Arial Black','Helvetica Neue',Arial,sans-serif";
const SANS    = "'Helvetica Neue',Helvetica,Arial,sans-serif";
const DRAW    = [0.76, 0, 0.24, 1] as [number, number, number, number];

/* ── Word reel — alternates white / crimson ──────────────
   "LIVE" is last and gets its own held scene with branding  */
const WORDS = [
  { text: 'MUSIC',   red: false },
  { text: 'CODE',    red: true  },
  { text: 'SPORT',   red: false },
  { text: 'ART',     red: true  },
  { text: 'DANCE',   red: false },
  { text: 'CREATE',  red: true  },
  { text: 'WIN',     red: false },
  { text: 'LEAD',    red: true  },
  { text: 'BUILD',   red: false },
  { text: 'DREAM',   red: true  },
  { text: 'THRIVE',  red: false },
  { text: 'INSPIRE', red: true  },
  { text: 'BELONG',  red: false },
  { text: 'LIVE',    red: true  }, // ← held with KL SAC branding
];

const WORD_MS  = 150;
const LAST_IDX = WORDS.length - 1;

type Phase = 'reel' | 'live-scene' | 'kl-sac' | 'tagline';

export function IntroAnimation() {
  const [idx,     setIdx]     = useState(0);
  const [phase,   setPhase]   = useState<Phase>('reel');
  const [visible, setVisible] = useState(true);
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

    /* Schedule every word in the reel */
    WORDS.forEach((_, i) => ts.push(setTimeout(() => setIdx(i), i * WORD_MS)));

    const reelEnd = WORDS.length * WORD_MS; // after LIVE's own flash

    /* After LIVE flashes, hold it with branding */
    ts.push(setTimeout(() => setPhase('live-scene'), reelEnd));

    /* KL SAC beat */
    ts.push(setTimeout(() => setPhase('kl-sac'),  reelEnd + 700));

    /* Transition to tagline */
    ts.push(setTimeout(() => setPhase('tagline'), reelEnd + 700 + 520));

    /* Auto-dismiss after tagline is felt */
    ts.push(setTimeout(dismiss, reelEnd + 700 + 520 + 520));

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

          {/* ══ Word reel + LIVE scene ════════════════════ */}
          {(phase === 'reel' || phase === 'live-scene') && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* The current word.
                  LIVE uses a stable key so it doesn't re-punch when the
                  phase switches from reel → live-scene.                   */}
              <motion.p
                key={idx === LAST_IDX ? 'live-word' : `w${idx}`}
                initial={{ scale: 1.1, opacity: 1 }}
                animate={{ scale: 1,   opacity: 1 }}
                transition={{ duration: 0.09, ease: 'easeOut' }}
                style={{
                  margin: 0,
                  fontFamily: DISPLAY, fontWeight: 900,
                  fontSize: 'clamp(52px, 13vw, 128px)',
                  letterSpacing: '0.05em',
                  color: WORDS[idx].red ? CRIMSON : '#FFFFFF',
                  userSelect: 'none',
                }}
              >
                {WORDS[idx].text}
              </motion.p>

              {/* KL SAC branding — fades in only during live-scene */}
              {phase === 'live-scene' && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ duration: 0.42, delay: 0.1, ease: 'easeOut' }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  {/* Separator line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.32, delay: 0.14, ease: DRAW }}
                    style={{
                      height: 1, width: 56,
                      background: 'rgba(255,255,255,0.14)',
                      margin: '26px 0 24px',
                      transformOrigin: 'center',
                    }}
                  />

                  {/* Tagline */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    style={{
                      margin: '10px 0 0', fontFamily: SANS,
                      fontSize: 9, fontWeight: 600,
                      letterSpacing: '0.3em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.36)',
                    }}
                  >
                    Student Activity Center
                  </motion.p>
                </motion.div>
              )}
            </div>
          )}

          {/* ══ KL SAC ═══════════════════════════════════ */}
          {phase === 'kl-sac' && (
            <motion.div
              key="kl-sac"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{ lineHeight: 1, whiteSpace: 'nowrap' }}
            >
              <span style={{
                fontFamily: DISPLAY, fontWeight: 900,
                fontSize: 'clamp(52px, 13vw, 128px)',
                letterSpacing: '0.05em', color: '#FFFFFF',
              }}>
                KL{' '}
              </span>
              <span style={{
                fontFamily: DISPLAY, fontWeight: 900,
                fontSize: 'clamp(52px, 13vw, 128px)',
                letterSpacing: '0.05em', color: CRIMSON,
              }}>
                SAC
              </span>
            </motion.div>
          )}

          {/* ══ YOUR TIME. tagline ════════════════════════ */}
          {phase === 'tagline' && (
            <motion.div
              key="tagline"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
              style={{ textAlign: 'center', lineHeight: 1 }}
            >
              <p style={{
                margin: 0, fontFamily: DISPLAY, fontWeight: 900,
                fontSize: 'clamp(40px, 8vw, 88px)',
                letterSpacing: '0.06em', color: '#FFFFFF',
              }}>
                YOUR
              </p>
              <p style={{
                margin: 0, fontFamily: DISPLAY, fontWeight: 900,
                fontSize: 'clamp(40px, 8vw, 88px)',
                letterSpacing: '0.06em', color: CRIMSON,
              }}>
                TIME.
              </p>
            </motion.div>
          )}

          {/* Tap to skip — barely visible */}
          <p style={{
            position: 'absolute', bottom: 22, margin: 0,
            fontFamily: SANS, fontSize: 8,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.16)',
          }}>
            Tap to skip
          </p>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
