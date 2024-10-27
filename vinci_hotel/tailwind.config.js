/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        mono: ['var(--font-eb-garamond)', 'monospace'],
      },
      boxShadow: {
        big: '0px 0px 68px 7px rgba(5, 150, 105, 0.4)',
        small:'0px 0px 68px 1px rgba(5, 150, 105, 0.4)',
      },
    },
  },
  plugins: [],
};
