/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        japanese: ['"Noto Sans JP"', 'sans-serif'],
      },
      colors: {
        sakura: {
          50:  '#fff0f5',
          100: '#ffe0eb',
          200: '#ffb3cc',
          300: '#ff80aa',
          400: '#ff4d88',
          500: '#ff1a66',
          600: '#e60052',
          700: '#b3003f',
          800: '#80002d',
          900: '#4d001a',
        },
      },
      animation: {
        'flip-in':  'flipIn 0.4s ease-out',
        'flip-out': 'flipOut 0.2s ease-in',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'fade-up': 'fadeUp 0.4s ease-out',
      },
      keyframes: {
        flipIn: {
          '0%':   { transform: 'rotateY(90deg)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg)',  opacity: '1' },
        },
        flipOut: {
          '0%':   { transform: 'rotateY(0deg)',  opacity: '1' },
          '100%': { transform: 'rotateY(90deg)', opacity: '0' },
        },
        bounceIn: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-12px)' },
          '60%': { transform: 'translateY(-6px)' },
        },
        fadeUp: {
          '0%':   { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
