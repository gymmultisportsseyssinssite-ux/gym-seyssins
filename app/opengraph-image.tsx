import { ImageResponse } from 'next/og'

import { SITE } from '@/lib/constants'

export const alt = SITE.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px',
        background: 'linear-gradient(135deg, #1E5BA8 0%, #FF7A1A 100%)',
        color: '#FFFFFF',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 9999,
            background: '#FFFFFF',
            color: '#1E5BA8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          GMS
        </div>
        <span style={{ fontSize: 22, opacity: 0.9, letterSpacing: 4 }}>
          ASSOCIATION SPORTIVE DE SEYSSINS
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h1
          style={{
            fontSize: 90,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: -1,
            margin: 0,
            maxWidth: 1000,
          }}
        >
          {SITE.name}
        </h1>
        <p
          style={{
            fontSize: 32,
            opacity: 0.92,
            margin: 0,
            maxWidth: 900,
          }}
        >
          Le sport au cœur de la convivialité.
        </p>
      </div>
    </div>,
    { ...size },
  )
}
