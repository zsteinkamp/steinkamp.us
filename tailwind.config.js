/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,md}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ['"Playfair Display"', ...fontFamily.sans],
        sans: ['"IBM Plex Sans"', ...fontFamily.sans],
      },
      colors: {
        pagebg: 'var(--pagebg)',
        shadebg: 'var(--shadebg)',
        shadeshadow: 'var(--shadeshadow)',
        shadetext: 'var(--shadetext)',
        border: 'var(--border)',
        text: 'var(--text)',
        date: 'var(--date)',
        'date-lite': 'var(--date-lite)',
        themetoggle: 'var(--themetoggle)',
        'themetoggle-hover': 'var(--themetoggle-hover)',
        mid: 'var(--mid)',
        header: 'var(--header)',
        'link-base': 'var(--link-base)',
        'link-visited': 'var(--link-visited)',
        'link-hover': 'var(--link-hover)',
        'thumb-text': 'var(--thumb-text)',
        histogram: 'var(--histogram)',
        'histogram-hover': 'var(--histogram-hover)',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/line-clamp')],
}
