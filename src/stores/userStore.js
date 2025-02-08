import { defineStore } from "pinia";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "Guest",
  }),
  persist: true, //  讓 username 不會在刷新時丟失
  actions: {
    initAuthListener() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.username = user.displayName || user.email.split("@")[0];
        } else {
          this.username = "Guest";
        }
      });
    },
  },
});
