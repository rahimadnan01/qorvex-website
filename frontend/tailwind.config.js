/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#152436',      // Primary / Logo (#152436)
          accent: '#0D98A2',       // Accent / Buttons (#0D98A2)
          hover: '#0A7880',        // Dark Hover (#0A7880)
          bgMain: '#FFFFFF',       // Main Background (#FFFFFF)
          bgLight: '#F5F7F9',      // Light Section Background (#F5F7F9)
          bodyText: '#0F172A',     // High-Contrast Body Text (#0F172A)
          navyCard: '#152436',     // Navy Card Surface
          navyDark: '#0B131F',     // Preloader / Deep Navy Background
          darkBorder: '#23374F'
        },
        muted: {
          light: '#FFFFFF',        // Pure White Text for dark backgrounds
          subtle: '#1E293B',       // Sharp Dark Slate for subtitles
          dim: '#334155'          // High-Contrast Slate for captions & tags
        }
      },
      fontFamily: {
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'glow-teal': '0 0 25px -5px rgba(13, 152, 162, 0.45)',
        'glow-navy': '0 10px 30px -5px rgba(21, 36, 54, 0.25)',
        'card-light': '0 10px 30px -5px rgba(21, 36, 54, 0.08)',
        'glass': '0 8px 32px 0 rgba(21, 36, 54, 0.12)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
