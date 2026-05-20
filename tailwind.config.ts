import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07111F',
        slate: '#6A8BA8',
        moss: {
          DEFAULT: '#5A7D54',
          deep: '#3D5A3A',
        },
        linen: '#E8EFE0',
        paper: '#FFFFFF',
        cream: '#F8F6F0',
        mist: '#E5E0D5',
        page: '#FAFAF7',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
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
