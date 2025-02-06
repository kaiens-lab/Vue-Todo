import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDarkMode = ref(false);

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  // 監聽 isDarkMode 變化，動態更新全局樣式
  watch(
    isDarkMode,
    (newValue) => {
      document.body.setAttribute(
        "data-theme",
        newValue ? "darkTheme" : "lightTheme"
      );
    },
    { immediate: true }
  );

  return { isDarkMode, toggleDarkMode };
});
