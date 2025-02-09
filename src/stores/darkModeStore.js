import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDarkMode = ref(false);

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;

    document.body.setAttribute(
      "data-theme",
      isDarkMode.value ? "darkTheme" : "lightTheme"
    );

    if (isDarkMode.value) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  document.body.setAttribute(
    "data-theme",
    isDarkMode.value ? "darkTheme" : "lightTheme"
  );

  if (isDarkMode.value) {
    document.body.classList.add("dark");
  }

  return { isDarkMode, toggleDarkMode };
});
