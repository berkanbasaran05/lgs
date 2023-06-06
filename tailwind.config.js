/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      animation: {
        scroll: "scroll 10s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      boxShadow: {
        container: "rgb(76 78 100 / 22%) 0px 2px 10px 0px",
        mobileNavbar: "rgb(0 0 0 / 12%) 3px 0px 20px 0px",
      },
      colors: {
        brand: {
          blue: {
            primary: "#437EFD",
            primaryLight: "#EEF3FF",
          },
          palette: {
            primary: "#047857",
            primaryLight: "#f0fdfa",
          },
          black: {
            primary: "#313131",
            secondary: "#6D6D6D",
            light: "#b1b1b1",
            ultralight: "#DCDCDC",
          },
          red: {
            primary: "#FF6463",
            primaryLight: "#FFF2F3",
          },
          yellow: {
            primary: "#f59e0b",
            primaryLight: "#FEF8F0",
          },
          green: {
            primary: "#04543E",
            primaryLight: "#DEF7EC",
          },
          background: "#fcfcfc",
        },
      },
      animation: {
        enter: "enter 200ms ease-out",
        enterSelect: "enterSelect 180ms ease-in-out",
        leave: "leave 150ms ease-in forwards",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        enterSelect: {
          "0%": {
            transform: "scale(0.9)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1)",
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
