/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'foreground': '#98afb2',
      'border': '#2e3535',
      'background': '#161c1c',
      'black': '#121212',
      'enabled': '#ffb43d',
      'disabled': '#e52617',
      'white': '#fff',
      'ape': '#20aeea',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '1xl': '1920px',
      '2xl': '2560px',
    },
    extend: {},
  },
  plugins: [],
}

