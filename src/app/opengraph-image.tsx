import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Bayside AI — Your reputation is your season.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a1e1a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 80px 80px 96px',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Left accent bar */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: '6px', height: '100%', background: 'rgba(61,255,160,0.4)' }} />

        {/* Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
          <div style={{ width: '32px', height: '2px', background: '#3dffa0' }} />
          <span style={{ color: '#3dffa0', fontSize: '15px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            AI FOR THE EASTERN SHORE
          </span>
        </div>

        {/* Headline */}
        <div style={{ color: '#e8f5f0', fontSize: '72px', fontWeight: 700, lineHeight: 1.08, marginBottom: '32px' }}>
          Your reputation<br />is your season.
        </div>

        {/* Subtext */}
        <div style={{ color: 'rgba(232,245,240,0.5)', fontSize: '22px', lineHeight: 1.5, maxWidth: '680px', marginBottom: '64px' }}>
          AI-powered reputation management &amp; local search visibility for Ocean City businesses.
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span style={{ color: '#3dffa0', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.01em' }}>Bayside AI</span>
          <span style={{ color: 'rgba(232,245,240,0.3)', fontSize: '18px' }}>baysideai.co</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
