/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    // "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/app/gio-event.{js,ts,jsx,tsx,mdx}",
    "./src/components/gio-profile/gioprofile.{js,ts,jsx,tsx,mdx}",
    "./src/components/ui/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/certification-form.{js,ts,jsx,tsx,mdx}",
    "./src/app/archive.{js,ts,jsx,tsx,mdx}",
    
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/line-clamp'),
],

}