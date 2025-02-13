<script setup>
import { ref } from "vue";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const inputValue = ref("");
const emit = defineEmits(["addTodo", "toggleTheme"]);
const props = defineProps({
  isDarkMode: Boolean,
  username: String,
});
const router = useRouter();
const userStore = useUserStore();

const submitTodo = () => {
  if (inputValue.value.trim() !== "") {
    emit("addTodo", inputValue.value);
    inputValue.value = "";
  }
};

const toggleTheme = () => {
  emit("toggleTheme");
};

const logout = async () => {
  await signOut(auth);
  console.log("已登出");
  alert("您已成功登出");
  router.push("/");
};
</script>

<template>
  <header class="header">
    <section
      class="flex justify-between items-center mt-12 xs:w-full xs:mt-10 min-w-[327px]"
    >
      <h2
        class="font-bold text-white tracking-[15px] text-[2rem] leading-[4rem] sm:-mt-4"
      >
        TODO
      </h2>
      <button
        class="bg-transparent border-none cursor-pointer p-2 rounded-md"
        @click="toggleTheme"
      >
        <img
          v-if="props.isDarkMode"
          src="../../public/images/icon-sun.svg"
          alt="moonIcon"
        />
        <img v-else src="../../public/images/icon-moon.svg" alt="sunIcon" />
      </button>
    </section>
    <div class="flex flex-col text-light-bg text-[1.2rem] mt-4 sm:mt-0">
      <div class="w-[30%]" @click="logout()">Log out</div>
      <div>{{ userStore.username }}'s TodoList</div>
    </div>
    <div
      class="todo-input-container dark:bg-dark-primary dark:border-dark-border"
    >
      <div class="todo-circle dark:border-[#393a4b]"></div>

      <input
        v-model="inputValue"
        type="text"
        class="todo-input w-[100%] bg-transparent"
        placeholder="Create a new todo..."
        @keyup.enter="submitTodo"
      />
    </div>
  </header>
</template>
<style scope>
.title-container {
  @apply flex justify-between items-center;
  min-width: 327px;
}

.todo-input-container {
  @apply w-full p-4 flex items-center border border-light-border bg-light-bg rounded-md 
         mt-6 mb-8 px-4 sm:px-6 sm:mt-4 sm:mb-10;
}

.todo-circle {
  @apply w-6 h-6 bg-transparent rounded-full border border-light-border mr-4;
}

.todo-input {
  @apply text-light-text  placeholder-light-text dark:bg-dark-primary dark:placeholder-dark-border dark:text-dark-text;
}

.todo-input:focus {
  @apply outline-none;
}
</style>
