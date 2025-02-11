export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="darkTheme"]'],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#fafafa",
          border: "#e3e4f1",
          text: "#9495A5",
        },
        dark: {
          bg: "#171823",
          primary: "#25273d",
          secondary: "#393a4b",
          border: "#4d5067",
          text: "#C8CBE7",
        },
      },
    },
  },
  plugins: [],
};
