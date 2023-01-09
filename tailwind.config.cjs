const primaryColor = "#872020";
const secondaryColor = "#B33636";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "primary": primaryColor,
        "secondary": secondaryColor,
      },

      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
        'source-code-pro': ['Source Code Pro', 'sans-serif'],
      },

      fontSize: {
        'huge': '10rem',
      }
    },
  },
  plugins: [],
}
