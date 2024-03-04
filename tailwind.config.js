/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const shade = colors.stone
const linkbase = colors.blue

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,md}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ['"Averia Serif Libre"', ...fontFamily.sans],
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        pagebg: { dark: shade['900'], light: shade['100'] },
        shadebg: { dark: shade['800'], light: shade['200'] },
        shadetext: { dark: shade['400'], light: shade['600'] },
        border: { dark: shade['800'], light: shade['200'] },
        text: { dark: shade['400'], light: shade['600'] },
        date: { dark: shade['500'], light: shade['500'] },
        themetoggle: { dark: linkbase['400'], light: colors.orange['400'] },
        mid: { dark: shade['200'], light: shade['800'] },
        header: { dark: shade['200'], light: shade['900'] },
        link: {
          base: { dark: linkbase['400'], light: linkbase['700'] },
          visited: { dark: linkbase['400'], light: linkbase['700'] },
          hover: { dark: linkbase['300'], light: linkbase['800'] },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/line-clamp')],
}
