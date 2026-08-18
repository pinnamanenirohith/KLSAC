'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function IntroAnimation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sac-intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none"
          style={{ background: '#0A0A0F' }}
          exit={{ opacity: 0, transition: { duration: 0.75, ease: 'easeInOut' } }}
          onClick={() => setVisible(false)}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <Image
              src="/logo.png"
              alt="KL SAC"
              height={72}
              width={340}
              style={{
                height: 'clamp(48px, 8vw, 72px)',
                width: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
              }}
              priority
            />
          </motion.div>

          {/* Crimson accent line — extends from left */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{
              height: '2px',
              width: '88px',
              background: 'linear-gradient(90deg, #8B0000, #C9A84C)',
              marginTop: '22px',
              transformOrigin: 'left',
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.42, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95, ease: 'easeOut' }}
            style={{
              color: '#fff',
              fontSize: '10px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginTop: '14px',
            }}
          >
            KL University · Vijayawada
          </motion.p>

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 0.4, delay: 1.5 }}
            style={{
              position: 'absolute',
              bottom: '28px',
              color: '#fff',
              fontSize: '9px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Click to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
