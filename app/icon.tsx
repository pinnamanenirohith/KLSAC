import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: '#8B0000',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
      }}
    >
      <span
        style={{
          color: '#ffffff',
          fontSize: 28,
          fontWeight: 900,
          fontFamily: 'sans-serif',
          letterSpacing: '-1px',
          lineHeight: 1,
        }}
      >
        KL
      </span>
    </div>,
    { ...size },
  );
}
