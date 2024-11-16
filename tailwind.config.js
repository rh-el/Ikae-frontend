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
		colors: {}
  	},
	fontFamily: {
		'nunito': ["Nunito"],
		'news-cycle': ["News_Cycle"],
		"domine": ["Domine"]
	}
  },
  plugins: [require("tailwindcss-animate")],
}

