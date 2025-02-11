import { defineStore } from "pinia";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useUserStore } from "./userStore"; // 引入 userStore 來取得 userId

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [],
    filterStatus: "all",
  }),

  getters: {
    filteredTodos(state) {
      if (state.filterStatus === "active") {
        return state.todos.filter((todo) => !todo.isCompleted);
      } else if (state.filterStatus === "completed") {
        return state.todos.filter((todo) => todo.isCompleted);
      }
      return state.todos;
    },

    itemsLeft(state) {
      return state.todos.filter((todo) => !todo.isCompleted).length;
    },
  },

  actions: {
    async fetchTodos() {
      const userStore = useUserStore();
      if (!userStore.userId) return;
      const db = getFirestore();
      const todosRef = collection(
        doc(collection(db, "todos"), userStore.userId),
        "tasks"
      );

      try {
        const snapshot = await getDocs(todosRef);
        this.todos = snapshot.empty
          ? []
          : snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
        this.todos = [...this.todos];
      } catch (error) {
        console.error("讀取待辦事項時出錯:", error);
      }
    },

    async addTodo(text) {
      const userStore = useUserStore();
      if (!userStore.userId) return;
      const db = getFirestore();
      const todosRef = collection(
        doc(collection(db, "todos"), userStore.userId),
        "tasks"
      );

      try {
        await addDoc(todosRef, { text, isCompleted: false });
        await this.fetchTodos();
      } catch (error) {
        console.error("新增待辦事項失敗:", error);
      }
    },

    async toggleTodoStatus(id) {
      const userStore = useUserStore();
      if (!userStore.userId) return;
      const db = getFirestore();
      const todoRef = doc(db, "todos", userStore.userId, "tasks", id);

      try {
        const todoIndex = this.todos.findIndex((todo) => todo.id === id);
        if (todoIndex === -1) return;

        const newStatus = !this.todos[todoIndex].isCompleted;
        await updateDoc(todoRef, { isCompleted: newStatus });

        this.todos[todoIndex].isCompleted = newStatus;
        this.todos = [...this.todos];
      } catch (error) {
        console.error("更新待辦事項失敗:", error);
      }
    },

    async removeTodo(id) {
      const userStore = useUserStore();
      if (!userStore.userId) return;
      const db = getFirestore();
      const todoRef = doc(db, "todos", userStore.userId, "tasks", id);

      try {
        await deleteDoc(todoRef); // 刪除 Firestore

        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.todos = [...this.todos];

        console.log(`已刪除待辦事項 (ID: ${id})，UI 已同步`);

        setTimeout(async () => {
          await this.fetchTodos(); // 避免 Firestore 延遲導致 UI 不同步
        }, 300);
      } catch (error) {
        console.error("刪除待辦事項失敗:", error);
      }
    },

    handleFilterChange(status) {
      this.filterStatus = status;
    },

    async clearCompleted() {
      const userStore = useUserStore();
      if (!userStore.userId) return;
      const db = getFirestore();

      try {
        // 刪除 Firestore 中的已完成任務
        await Promise.all(
          this.todos
            .filter((todo) => todo.isCompleted)
            .map((todo) =>
              deleteDoc(doc(db, "todos", userStore.userId, "tasks", todo.id))
            )
        );

        // 更新本地狀態
        this.todos = this.todos.filter((todo) => !todo.isCompleted);
      } catch (error) {
        console.error("清除已完成的待辦事項失敗:", error);
      }
    },
  },
});
