/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // <-- Esta línea asegura que escanee todo dentro de src
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