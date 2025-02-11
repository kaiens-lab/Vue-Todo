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
      class="flex justify-between items-center mt-12 xs:w-full xs:min-w-[327px] xs:mt-10"
    >
      <h2
        class="text-white font-bold text-[3rem] leading-[4rem] tracking-[15px] xs:text-[2rem]"
      >
        TODO
      </h2>
      <button class="bg-transparent border-none" @click="toggleTheme">
        <img
          v-if="props.isDarkMode"
          src="../../public/images/icon-sun.svg"
          alt="moonIcon"
        />
        <img v-else src="../../public/images/icon-moon.svg" alt="sunIcon" />
      </button>
    </section>
    <div class="flex flex-col text-softWhite text-[1.2rem]">
      <div class="w-[30%] pb-2" @click="logout()">Log out</div>
      <div>{{ userStore.username }}'s TodoList</div>
    </div>
    <div
      class="w-full bg-white p-4 xs:p-4 xs:px-6 rounded-md flex items-center mt-12 xs:mt-4 mb-10 border border-[#e3e4f1] dark:bg-[#25273d] dark:border-[#393a4b]"
    >
      <div
        class="w-6 h-6 border border-[#e3e4f1] rounded-full bg-transparent dark:border-[#393a4b]"
      ></div>

      <input
        v-model="inputValue"
        type="text"
        class="focus:outline-none todoInput text-base placeholder:text-[#c4c4c5] border-none font-inherit leading-8 ml-6 bg-transparent dark:placeholder:text-base dark:placeholder:text-[#4d5067]"
        placeholder="Create a new todo..."
        @keyup.enter="submitTodo"
      />
    </div>
  </header>
</template>
