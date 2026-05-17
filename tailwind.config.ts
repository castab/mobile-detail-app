import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#202940',
        bark: '#4B4038',
        taupe: '#9A8678',
        blush: '#CAAA98',
        light: '#F5F0EC',
      },
      borderRadius: {
        // Spec: 12px for cards/containers, 8px for inputs/buttons/badges.
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        raised: '0 4px 24px rgba(0, 0, 0, 0.3)',
        overlay: '0 8px 40px rgba(0, 0, 0, 0.5)',
      },
      maxWidth: {
        // Spec: page max-width 1280px.
        page: '1280px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '1.1' }],
        h1: ['2.5rem', { lineHeight: '1.2' }],
        h2: ['1.875rem', { lineHeight: '1.3' }],
        h3: ['1.375rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.6' }],
        label: ['0.875rem', { lineHeight: '1.4' }],
        caption: ['0.75rem', { lineHeight: '1.4' }],
      },
    },
  },
  plugins: [],
}

export default config
