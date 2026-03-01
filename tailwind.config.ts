import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          dark: '#07111f',
          mid: '#0c1a2e',
          light: '#1a3352',
          mist: '#2a4a6a',
        },
        bio: {
          DEFAULT: '#3d9eff',
          dim: '#2a80cc',
          faint: 'rgba(61,158,255,0.12)',
        },
        sand: '#c8a96e',
        foam: '#e8f5f0',
        coral: '#ff7a54',
      },
      fontFamily: {
        mono: ['var(--font-space-mono)', 'Space Mono', 'Courier New', 'monospace'],
        sans: ['var(--font-plus-jakarta)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 1.5rem + 4vw, 5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.75rem, 1rem + 2.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.25rem, 0.75rem + 1.5vw, 1.875rem)', { lineHeight: '1.2' }],
        'label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.15em' }],
      },
    },
  },
  plugins: [],
}
export default config
