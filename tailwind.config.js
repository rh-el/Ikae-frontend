/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{html,tsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		colors: {
			'primary': '#33363D',
			'customwhite': '#F7F7F7',
			'secondary': '#B9E9E1'
		}
  	},
	fontFamily: {
		'nunito': ["Nunito"],
		'news-cycle': ["News_Cycle"],
		"domine": ["Domine"]
	}
  },
  plugins: [require("tailwindcss-animate")],
}

