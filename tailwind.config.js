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
        cyber: {
          dark: '#080c14',
          card: '#0d131f',
          'card-hover': '#131b2c',
          border: 'rgba(56, 189, 248, 0.15)',
          'border-bright': 'rgba(56, 189, 248, 0.4)',
          cyan: '#06b6d4',
          'cyan-glow': 'rgba(6, 182, 212, 0.4)',
          blue: '#3b82f6',
          green: '#10b981',
          emerald: '#34d399',
          purple: '#a855f7',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'matrix-rain': 'matrix 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'terminal-blink': 'blink 1s step-start infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px -3px rgba(6, 182, 212, 0.35)',
        'neon-blue': '0 0 20px -3px rgba(59, 130, 246, 0.35)',
        'neon-green': '0 0 20px -3px rgba(16, 185, 129, 0.35)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
};
