export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="darkTheme"]'],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#fafafa",
          border: "#e3e4f1",
          text: "#494C6B",
        },
        dark: {
          bg: "#171823",
          primary: "#25273d",
          border: "#393a4b",
          text: "#C8CBE7",
        },
      },
    },
  },
  plugins: [],
};
