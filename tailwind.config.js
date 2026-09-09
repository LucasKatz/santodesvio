/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Mantener por si usas algo dentro de src
  ],
  theme: {
    extend: {
      colors: {
        'santo-ochre': '#F2A21B',
        'santo-dark': '#121212',
        'santo-black': '#010101',
        'santo-white': '#F0EDE4',
      },
      fontFamily: {
        'santo-display': ['"Permanent Marker"', 'cursive'],
        'santo-alt': ['Anton', 'sans-serif'],
        'santo-body': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};