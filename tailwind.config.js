/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "text-colour": "#a0b7bb",
      "disable-text-colour": "#232c2d",
      "border-colour": "#2e3535",
      "background-colour": "#161c1c",
      "cell-colour": "#0d1616",
      "black": "#121212",
      "enabled": "#ffb43d",
      "disabled": "#fc2c28",

      "white": "#fff",
      "green": "#36e517",
      "blue": "#3883fc",
      "blue-700": "#2b6cb0",
      "blue-800": "#2c5282",
      "blue-300": "#90cdf4",
      "blue-600": "#3182ce",
      "gray-50": "#f9fafb",
      "gray-300": "#e2e8f0",
      "gray-700": "#4a5568",
      "gray-600": "#718096",
      "gray-800": "#2d3748",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
