import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0f2744', light: '#1a3a5c', dark: '#0a1f36' },
        warm: { DEFAULT: '#fafaf8', dim: '#f0f4f8', muted: '#e8edf2' },
        gold: { DEFAULT: '#c9a96e', light: '#d4b87f', dark: '#a8884a' },
        slate: '#4a7fa5',
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 2rem + 5vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 1.5rem + 3vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 1rem + 2vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.15em' }],
      },
    },
  },
  plugins: [],
};
export default config;
