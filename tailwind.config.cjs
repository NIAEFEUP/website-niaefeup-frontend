/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts,stories.js,stories.ts}'],
  future: {
    hoverOnlyWhenSupported: true
  },
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
      }
    }
  },
  plugins: []
};
