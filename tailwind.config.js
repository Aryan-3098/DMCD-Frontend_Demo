/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f8bf50",
        seconday: "#450a0a",
        accentsGY: "#feeae3",
        accentsGR: "#006E61",
      }
    },
  },
  plugins: [],
}

