<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useTodoStore } from "./stores/todoStore";
import { useThemeStore } from "./stores/darkModeStore";
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList.vue";
import TodoFilter from "./components/TodoFilter.vue";
import AppFooter from "./components/AppFooter.vue";

const todoStore = useTodoStore(); // 先初始化 Pinia store
const { todos } = storeToRefs(todoStore); // 再取出 todos
const { filteredTodos, filterStatus } = storeToRefs(todoStore);
const { handleFilterChange, handleAddTodo, removeTodo, toggleTodoStatus } =
  todoStore;

const themeStore = useThemeStore();
themeStore.toggleDarkMode();

const isDarkMode = ref(false);

// const handleAddTodo = (newTodo) => {
//   todos.value.push({ text: newTodo, id: Date.now(), isCompleted: false });
//   // console.log(todos);
// };

// const removeTodo = (id) => {
//   todos.value = todos.value.filter((todo) => todo.id !== id);
// };

// const toggleTodoStatus = (id) => {
//   const todo = todos.value.find((todo) => todo.id === id);
//   if (todo) {
//     todo.isCompleted = !todo.isCompleted;
//   }
// };

const itemsLeft = computed(() => {
  return todos.value.filter((todo) => !todo.isCompleted).length;
});

const clearCompleted = () => {
  todos.value = todos.value.filter((todo) => todo.isCompleted == false);
};
</script>

<template>
  <div class="main__container">
    <div class="todo">
      <TodoHeader
        @addTodo="handleAddTodo"
        :isDarkMode="themeStore.isDarkMode"
        @toggleTheme="themeStore.toggleDarkMode"
      />

      <main class="main">
        <TodoList
          @remove-todo="removeTodo"
          @toggle-todo="toggleTodoStatus"
          :todos="todoStore.filteredTodos"
          :itemsLeft="itemsLeft"
          :clear-completed="clearCompleted"
        />

        <TodoFilter
          :todos="todos"
          :filterStatus="filterStatus"
          @filterStatus="handleFilterChange"
        />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
[data-theme="darkTheme"] {
  color: #c8cbe7;
}

.main__container {
  width: 100vw;
  min-height: 100vh;
  background: url("../public/images/bg-desktop-light.jpg");
  background-color: #fafafa;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

[data-theme="darkTheme"] .main__container {
  background: url("../public/images/bg-desktop-dark.jpg");
  background-color: #171823;
  background-repeat: no-repeat;
  background-size: contain;
}

.btn {
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #9495a5;
  font-size: 1rem;
  line-height: 1rem;
  font-family: inherit;
}

.todo {
  width: 100%;
  max-width: 540px;
}

.todo__circle,
.todo__check {
  width: 24px;
  height: 24px;
  border: 1px solid #e3e4f1;
  border-radius: 50%;
  background: transparent;
}

[data-theme="darkTheme"] .todo__circle,
[data-theme="darkTheme"] .todo__check {
  border: 1px solid #393a4b;
}

@media (max-width: 738px) {
  .main__container {
    padding: 0 15%;
    background: url("../public/images/bg-mobile-light.jpg");
    background-color: #fafafa;
    background-repeat: no-repeat;
    background-size: contain;
  }

  [data-theme="darkTheme"] .main__container {
    background: url("../public/images/bg-mobile-dark.jpg");
    background-color: #171823;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .todo {
    width: 100%;
    min-width: 327px;
  }
}
</style>
