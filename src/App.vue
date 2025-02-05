<script setup>
import { computed, ref } from "vue";
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList.vue";
import TodoFilter from "./components/TodoFilter.vue";
import AppFooter from "./components/AppFooter.vue";

const todos = ref([
  { id: 1, text: "Complete online JavaScript course", isCompleted: true },
  { id: 2, text: "Jog around the park 3x", isCompleted: false },
  { id: 3, text: "10 minutes meditation", isCompleted: false },
  { id: 4, text: "Read for 1 hour", isCompleted: false },
  { id: 5, text: "Pick up groceries", isCompleted: false },
  { id: 6, text: "Complete Todo App on Frontend Mentor", isCompleted: false },
]);
const isDarkMode = ref(false);
const filterStatus = ref("all");

const handleAddTodo = (newTodo) => {
  todos.value.push({ text: newTodo, id: Date.now(), isCompleted: false }); // 新增待辦項目，id為現在時間戳
  // console.log(todos);
};

const removeTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value; // 切換模式
  document.body.setAttribute(
    "data-theme",
    isDarkMode.value ? "darkTheme" : "lightTheme"
  ); // 切換全局樣式
};

const toggleTodoStatus = (id) => {
  const todo = todos.value.find((todo) => todo.id === id);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
  }
};

const itemsLeft = computed(() => {
  return todos.value.filter((todo) => !todo.isCompleted).length;
});

const filteredTodos = computed(() => {
  if (filterStatus.value == "active") {
    return todos.value.filter((todo) => todo.isCompleted == false);
  } else if (filterStatus.value == "completed") {
    return todos.value.filter((todo) => todo.isCompleted == true);
  } else {
    return todos.value;
  }
});

const handleFilterChange = (status) => {
  filterStatus.value = status;
};

const clearCompleted = () => {
  todos.value = todos.value.filter((todo) => todo.isCompleted == false);
};
</script>

<template>
  <div class="main__container">
    <div class="todo">
      <TodoHeader
        @addTodo="handleAddTodo"
        :isDarkMode="isDarkMode"
        @toggleTheme="toggleDarkMode"
      />

      <main class="main">
        <TodoList
          @remove-todo="removeTodo"
          @toggle-todo="toggleTodoStatus"
          :todos="filteredTodos"
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
