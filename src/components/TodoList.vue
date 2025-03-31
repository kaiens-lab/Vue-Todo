<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTodoStore } from "../stores/todoStore";
import { useThemeStore } from "../stores/darkModeStore";
const props = defineProps({
  todos: Array,
  itemsLeft: Number,
  clearCompleted: Function,
  isDarkMode: Boolean,
});

const todoStore = useTodoStore();
const themeStore = useThemeStore();

const emit = defineEmits(["removeTodo", "toggle-todo"]);
</script>

<template>
  <div
    v-if="todoStore.filteredTodos.length === 0"
    class="centered text-light-text bg-transparent rounded-[5px] mb-5 custom-md:text-light-bg custom-lg:text-light-bg;"
  >
    No tasks yet, start planning your day now!
  </div>
  <div
    class="theme-bg border-t border-l border-r border-light-border dark:border-dark-secondary rounded-t-[5px] shadow-md"
  >
    <ul>
      <li
        v-for="(todo, index) in todoStore.filteredTodos"
        :key="todo.id"
        class="flex-between todo__item group"
      >
        <div
          class="centered text-light-text"
          :class="{
            completed: todo.isCompleted,
          }"
        >
          <button
            class="btn btn__check centered border border-light-border hover:border-[#c058f3]"
            :class="{
              todo__checked: todo.isCompleted,
            }"
            @click="todoStore.toggleTodoStatus(todo.id)"
          >
            <img src="/images/icon-check.svg" class="scale-hide dark:scale-0" />
          </button>

          {{ todo.text }}
        </div>
        <button
          class="centered scale-hide scale-0 group-hover:scale-100 dark:group-hover:scale-100"
          @click="todoStore.removeTodo(todo.id)"
        >
          <img src="/images/icon-cross.svg" />
        </button>
      </li>
    </ul>

    <div
      class="theme-bg flex-between rounded-t-[5px] shadow-md w-full p-8 px-4;"
    >
      <p class="btn">
        <span>{{ itemsLeft }}</span> item(s) left
      </p>
      <button class="btn" @click="() => props.clearCompleted?.()">
        Clear Completed
      </button>
    </div>
  </div>
</template>

<style scoped>
.centered {
  @apply flex items-center justify-center;
}

.flex-between {
  @apply flex items-center justify-between;
}

.theme-bg {
  @apply bg-light-bg dark:bg-dark-primary;
}

.btn-transparent {
  @apply cursor-pointer bg-transparent;
}

.scale-hide {
  @apply transition-transform duration-500 ease-in-out;
}

.todo__item {
  @apply text-dark-secondary dark:text-dark-text 
         border-b border-light-border dark:border-dark-secondary 
         p-4 px-6 mb-2;
}

.btn {
  @apply btn-transparent text-light-text text-base leading-none;
}

.btn__check {
  @apply w-[25px] h-[25px] mr-5 
         border border-light-border hover:border-[#c058f3]
         rounded-full 
         flex-none cursor-pointer 
         transition-colors duration-300
         dark:border-dark-border;
}

.completed {
  @apply line-through text-dark-text dark:text-dark-border 
         decoration-1 dark:decoration-dark-border;
}

.todo__checked {
  @apply bg-gradient-to-r from-[#55ddff] to-[#c058f3];
}

[data-theme="darkTheme"] .todo__checked img {
  @apply scale-100;
}
</style>
