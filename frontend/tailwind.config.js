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
        bunker: {
          900: '#07090E',
          800: '#0D111A',
          700: '#141A28',
          600: '#1F293D',
          gold: '#FFB800',
          accent: '#00FFA3',
          purple: '#7928CA',
          cyan: '#00F0FF',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
