/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts,stories.js,stories.ts}'],
  theme: {
    extend: {
      colors: {
        taupe: {
          300: '#AB8586',
          200: '#D7C0C0',
          100: '#FFE9E9'
        },
        'vivid-red': {
          950: '#4D0000',
          900: '#570000',
          700: '#A40202',
          400: '#DC4F47'
        },
        'muted-red': {
          800: '#740F0F',
          700: '#872020',
          600: '#9D2B2B',
          500: '#B33636',
          400: '#C04343',
          300: '#DF6363'
        },
        rose: {
          950: '#411315',
          600: '#8D3739',
          400: '#A46868',
          200: '#DAB5B5'
        }
      },

      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        source_code: ['Source Code Pro', 'sans-serif']
      },

      fontSize: {
        huge: '10rem'
      },

      textShadow: {
        none: '0 0 0 var(--tw-shadow-color)',
        sm: '0 2px 4px var(--tw-shadow-color)',
        DEFAULT: '0 4px 6px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)'
      }
    }
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value
          })
        },
        { values: theme('textShadow') }
      );
    })
  ]
};
