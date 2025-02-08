<script setup>
import { ref, onMounted } from "vue";
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

// onMounted(() => {
//   userStore.fetchUser();
// });

// const test = () => {
//   console.log("傳遞的 username:", userStore.username);
//   console.log("目前登入使用者的 displayName:", auth.currentUser?.displayName);
// };
</script>

<template>
  <header class="header">
    <section class="logo">
      <h2 class="logo__title text-white font-bold">TODO</h2>
      <button class="btn btn--theme" @click="toggleTheme">
        <img
          v-if="props.isDarkMode"
          src="../../public/images/icon-sun.svg"
          alt="moonIcon"
        />
        <img v-else src="../../public/images/icon-moon.svg" alt="sunIcon" />
      </button>
    </section>
    <div class="user__bar text-softWhite">
      <div class="logOut__btn pb-2" @click="logout()">Log out</div>
      <div class="user__name">{{ userStore.username }}'s TodoList</div>
    </div>
    <div class="todo__header">
      <div class="todo__circle"></div>

      <input
        v-model="inputValue"
        type="text"
        class="todoInput"
        placeholder="Create a new todo..."
        @keyup.enter="submitTodo"
      />
    </div>
  </header>
</template>

<style scoped>
/*------Todo Header-----*/
.todo__header {
  width: 100%;
  background-color: white;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 2.4rem;
  border: 1px solid #e3e4f1;
}

.todo__header label {
  position: absolute;
  left: -25vw;
}

[data-theme="darkTheme"] .todo__header {
  background-color: #25273d;
  border: 1px solid #393a4b;
}

.logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0 0 0;
}

.logo__title {
  font-size: 3rem;
  line-height: 4rem;
  letter-spacing: 15px;
}

.btn--theme {
  background-color: transparent;
  border: none;
}

.todoInput,
todoInput::-webkit-input-placeholder {
  font-size: 1rem;
  color: #393a4b;
  border: none;
  font-family: inherit;
  line-height: 2rem;

  margin-left: 2rem;
  background: transparent;
}

.todoInput:focus {
  outline: none;
}

[data-theme="darkTheme"] .todo__input {
  color: inherit;
}

.todo__circle {
  width: 24px;
  height: 24px;
  border: 1px solid #e3e4f1;
  border-radius: 50%;
  background: transparent;
}

[data-theme="darkTheme"] .todo__circle {
  border: 1px solid #393a4b;
}

.user__bar {
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
}

.logOut__btn {
  width: 15%;
}

@media (max-width: 738px) {
  .todo {
    width: 100%;
    min-width: 327px;
  }

  .logo {
    margin: 3.5rem 0 0 0;
  }

  .logo__title {
    font-size: 2rem;
  }

  .todo__header {
    padding: 1rem 1.5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 2.4rem;
    border: 1px solid #e3e4f1;
  }
}
</style>
