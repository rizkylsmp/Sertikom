/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["'Lexend'", "sans-serif"],
        readex: ["'Readex Pro'"],
        palanquin: ["Palanquin"],
        nunito: ["Nunito Sans"],
        opensans: ["Open Sans"],
        lato: ["Lato"],
        montserrat: ["Montserrat"],
        raleway: ["Raleway"],
        poppins: ["Poppins"],
      },
      colors: {
        "color-1": "#141619",
        "color-2": "#2C2E3A",
        "color-3": "#050A44",
        "color-4": "#0A21C0",
        "color-5": "#B3B4BD",
        "color-6": "#FFFFFF",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: { themes: false, darkTheme: "lights" },
};
