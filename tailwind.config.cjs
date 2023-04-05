const primaryColor = '#872020FF';
const secondaryColor = '#B33636FF';
const tertiaryColor = '#C04343FF';
const tertiary60Color = '#C0434399';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        tertiary: tertiaryColor,
        tertiary60: tertiary60Color
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
