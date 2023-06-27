const primaryColor = '#872020FF';
const secondaryColor = '#B33636FF';
const tertiaryColor = '#C04343FF';
const tertiary60Color = '#C0434399';
const quaternaryColor = '#411315FF';
const quaternary54Color = '#4113158A';
const lightRedColor = '#FFE9E9FF';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts,stories.js,stories.ts}'],
  theme: {
    extend: {
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        tertiary: tertiaryColor,
        tertiary60: tertiary60Color,
        quaternary: quaternaryColor,
        quaternary54: quaternary54Color,
        lightRed: lightRedColor
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
