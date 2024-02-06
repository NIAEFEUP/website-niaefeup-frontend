
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ['./src/**/*.{html,js,svelte,ts,stories.js,stories.ts}'],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				},
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
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
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
};
