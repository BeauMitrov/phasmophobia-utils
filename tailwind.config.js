/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "text-colour": "#a0b7bb",
      "border-colour": "#2e3535",
      "background-colour": "#161c1c",
      "cell-colour": "#0d1616",
      black: "#121212",
      enabled: "#ffb43d",
      disabled: "#080d0b",
      white: "#fff",
      green: "#36e517",
    },
    extend: {
      animation: {
        swingIn: "swingIn 0.5s forwards",
        swingOut: "swingOut 0.5s forwards",
      },
      keyframes: {
        swingIn: {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(25%)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
