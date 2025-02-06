import { defineStore } from "pinia";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [
      { id: 1, text: "Complete online JavaScript course", isCompleted: true },
      { id: 2, text: "Jog around the park 3x", isCompleted: false },
      { id: 3, text: "10 minutes meditation", isCompleted: false },
      { id: 4, text: "Read for 1 hour", isCompleted: false },
      { id: 5, text: "Pick up groceries", isCompleted: false },
      {
        id: 6,
        text: "Complete Todo App on Frontend Mentor",
        isCompleted: false,
      },
    ],
    filterStatus: "all", // "all" | "active" | "completed"
  }),

  getters: {
    filteredTodos: (state) => {
      if (state.filterStatus === "active") {
        return state.todos.filter((todo) => !todo.isCompleted);
      } else if (state.filterStatus === "completed") {
        return state.todos.filter((todo) => todo.isCompleted);
      }
      return state.todos;
    },
    itemsLeft: (state) =>
      state.todos.filter((todo) => !todo.isCompleted).length,
  },

  actions: {
    handleFilterChange(status) {
      this.filterStatus = status;
    },

    handleAddTodo(newTodo) {
      this.todos.push({ text: newTodo, id: Date.now(), isCompleted: false });
    },

    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },

    toggleTodoStatus(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.isCompleted);
    },
  },
});
