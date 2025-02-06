import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  // 根據使用者系統預設主題
  const isDarkMode = ref(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  // 初始化時強制同步data-theme
  document.body.setAttribute(
    "data-theme",
    isDarkMode.value ? "darkTheme" : "lightTheme"
  );

  // 監聽isDarkMode並動態更新
  watch(
    isDarkMode,
    (newValue) => {
      console.log("Theme updated:", newValue ? "darkTheme" : "lightTheme");
      document.body.setAttribute(
        "data-theme",
        newValue ? "darkTheme" : "lightTheme"
      );
    },
    { immediate: true }
  );

  return { isDarkMode, toggleDarkMode };
});
