export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="darkTheme"]'],
  theme: {
    extend: {
      colors: {
        softWhite: "#fafafa",
        steelBlue: "#393a4b",
        formBackground: "#25273d",
      },
      screens: {
        xs: "738px",
      },
    },
  },
  plugins: [],
};
