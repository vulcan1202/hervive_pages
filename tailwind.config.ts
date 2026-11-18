import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#154337',
          dark: '#0D2C24',
          light: '#235E4E',
          soft: '#EAF1EE',
        },
        gold: {
          DEFAULT: '#D4AF37',
          muted: '#C5A880',
          deep: '#8A6A3B',
          light: '#F5EEDB',
        },
        cream: {
          DEFAULT: '#FAF4EE',
          light: '#FDFBF7',
          dark: '#FAF7F2',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans TC"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Cormorant Garamond"', '"Noto Serif TC"', 'serif'],
        'serif-luxury': ['"Cormorant Garamond"', '"Noto Serif TC"', 'serif'],
      },
      boxShadow: {
        'luxury': '0 16px 40px -8px rgba(21, 67, 55, 0.08), 0 4px 12px -2px rgba(197, 168, 128, 0.12)',
        'luxury-hover': '0 24px 50px -10px rgba(21, 67, 55, 0.14), 0 6px 16px -2px rgba(197, 168, 128, 0.20)',
        'inner-glow': 'inset 0 1px 1px rgba(255, 255, 255, 0.6)',
      }
    }
  }
}
