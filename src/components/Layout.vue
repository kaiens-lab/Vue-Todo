<script setup>
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores/darkModeStore";
import { useTodoStore } from "../stores/todoStore";

import TodoHeader from "./TodoHeader.vue";
import TodoList from "./TodoList.vue";
import TodoFilter from "./TodoFilter.vue";
import AppFooter from "./AppFooter.vue";
import "../styles/auth.css";

const todoStore = useTodoStore();

const { todos, filterStatus, itemsLeft } = storeToRefs(todoStore);

const { handleFilterChange, removeTodo, toggleTodoStatus, clearCompleted } =
  todoStore;

const themeStore = useThemeStore();
</script>

<template>
  <div class="main__container">
    <div class="w-full min-w-[300px] max-w-[540px] sm:min-w-0">
      <TodoHeader
        @addTodo="todoStore.addTodo"
        :isDarkMode="themeStore.isDarkMode"
        @toggleTheme="themeStore.toggleDarkMode"
      />

      <main>
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
    <router-view />
  </div>
</template>
