/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        mono: ['var(--font-cormorant-garamond)', 'monospace'],
      },
      backgroundImage: {
        'hotel-image': "url('/images/hotel-img.png')",
        'background-image': "url('/images/background.png')",
        'light-background-image': "url('/images/light-background.png')",
      },
      boxShadow: {
        big: '0px 0px 68px 7px rgba(255, 255, 255, 0.4)', 
        small: '0px 0px 68px 1px rgba(255, 255, 255, 0.4)',
      },
    },
  },
  plugins: [],
};