'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

type Phase = 'hidden' | 'scrambling' | 'locked';

function ScrambleLetter({
  char,
  appearAt,
  lockAt,
}: {
  char: string;
  appearAt: number;
  lockAt: number;
}) {
  const [display, setDisplay] = useState(char);
  const [phase, setPhase] = useState<Phase>('hidden');

  useEffect(() => {
    if (char === ' ') { setPhase('locked'); return; }

    let interval: ReturnType<typeof setInterval>;
    let lockTimer: ReturnType<typeof setTimeout>;

    const appearTimer = setTimeout(() => {
      setPhase('scrambling');
      setDisplay(CHARS[Math.floor(Math.random() * CHARS.length)]);
      interval = setInterval(() => {
        setDisplay(CHARS[Math.floor(Math.random() * CHARS.length)]);
      }, 45);
      lockTimer = setTimeout(() => {
        clearInterval(interval);
        setDisplay(char);
        setPhase('locked');
      }, lockAt - appearAt);
    }, appearAt);

    return () => {
      clearTimeout(appearTimer);
      clearInterval(interval);
      clearTimeout(lockTimer);
    };
  }, [char, appearAt, lockAt]);

  if (char === ' ') {
    return <span style={{ display: 'inline-block', width: '0.42em' }} />;
  }

  return (
    <span
      style={{
        display: 'inline-block',
        color:
          phase === 'hidden'
            ? 'transparent'
            : phase === 'scrambling'
            ? 'rgba(201,168,76,0.9)'
            : '#ffffff',
        transition: phase === 'locked' ? 'color 0.12s ease' : 'none',
      }}
    >
      {display}
    </span>
  );
}

const TITLE = 'KL SAC';
const SUBTITLE = 'STUDENT ACTIVITY CENTER';

export function IntroAnimation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sac-intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none"
          style={{ background: '#07070E' }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
          onClick={() => setVisible(false)}
        >
          {/* Title */}
          <div
            style={{
              fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(68px, 13vw, 132px)',
              letterSpacing: '0.08em',
              lineHeight: 1,
            }}
          >
            {TITLE.split('').map((char, i) => {
              const nsi = TITLE.slice(0, i).replace(/ /g, '').length;
              return (
                <ScrambleLetter
                  key={i}
                  char={char}
                  appearAt={char === ' ' ? 0 : nsi * 110}
                  lockAt={char === ' ' ? 0 : nsi * 110 + 440}
                />
              );
            })}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 1.0,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            style={{
              height: '1px',
              width: '180px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(139,0,0,0.9) 30%, rgba(201,168,76,0.7) 70%, transparent 100%)',
              margin: '28px 0 22px',
              transformOrigin: 'center',
            }}
          />

          {/* Subtitle */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {SUBTITLE.split('').map((char, i) =>
              char === ' ' ? (
                <span key={i} style={{ display: 'inline-block', width: '0.5em' }} />
              ) : (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.25 + i * 0.025, ease: 'easeOut' }}
                  style={{
                    display: 'inline-block',
                    fontSize: 'clamp(8px, 1.3vw, 13px)',
                    letterSpacing: '0.28em',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {char}
                </motion.span>
              )
            )}
          </div>

          {/* Progress bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.7, ease: 'linear' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #8B0000, #C9A84C)',
                transformOrigin: 'left',
              }}
            />
          </div>

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            style={{
              position: 'absolute',
              bottom: '16px',
              color: '#fff',
              fontSize: '9px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Click anywhere to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
