/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bg: '#f8f9fa',
				surface: '#ffffff',
				'surface-hover': '#f1f3f4',
				border: '#dadce0',
				'border-light': '#e8eaed',
				'text-primary': '#000000',
				'text-secondary': '#1a1a1a',
				'text-dim': '#2d2d2d',
				'text-muted': '#4a4a4a',
				accent: '#1a73e8',
				danger: '#d93025',
				success: '#188038',
				warning: '#f9ab00',
				info: '#1a73e8'
			},
			fontFamily: {
				sans: [
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'Oxygen',
					'Ubuntu',
					'Cantarell',
					'"Fira Sans"',
					'"Droid Sans"',
					'"Helvetica Neue"',
					'Arial',
					'sans-serif'
				]
			},
			fontSize: {
				'2xs': '0.65rem'
			},
			animation: {
				shimmer: 'shimmer 1.5s infinite'
			},
			keyframes: {
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				}
			}
		}
	},
	plugins: []
};
