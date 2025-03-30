import { defineStore } from "pinia";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useTodoStore } from "./todoStore"; // 引入 todoStore 來確保登入時同步 todos

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "Guest",
    userId: null as string | null,
  }),

  persist: true, // 讓 username 不會在刷新時丟失

  actions: {
    initAuthListener() {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        const todoStore = useTodoStore();
        if (user) {
          this.username =
            user.displayName || user.email?.split("@")[0] || "Guest";
          this.userId = user.uid;
          await todoStore.fetchTodos(); // 讀取該使用者的 Firestore 待辦事項
        } else {
          this.username = "Guest";
          this.userId = null;
          todoStore.todos = []; // 登出時清空 todos
        }
      });
    },
  },
});
