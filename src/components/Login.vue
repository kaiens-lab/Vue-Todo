<script setup>
import { signInWithEmailAndPassword } from "firebase/auth";
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores/darkModeStore";
import { auth } from "../firebase";
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppFooter from "./AppFooter.vue";

const email = ref("");
const password = ref("");
const router = useRouter();
const themeStore = useThemeStore();
const { isDarkMode } = storeToRefs(themeStore);

const loginUser = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log("登入成功:", userCredential.user);
    router.push("/todolist");
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      alert("帳號或密碼錯誤，請檢查輸入內容！");
    } else {
      console.error("登入錯誤:", error.message);
    }
  }
};

const toSignUp = () => {
  router.push("/signup");
};
</script>
<template>
  <div>
    <div
      class="main__container flex flex-col items-center bg-light-bg dark:bg-dark-bg"
      :class="{ dark: isDarkMode }"
    >
      <div class="flex items-center">
        <h2 class="login__title">LOGIN</h2>
        <div class="flex mt-8">
          <button
            class="btn bg-transparent border-none"
            @click="themeStore.toggleDarkMode"
          >
            <img
              v-if="isDarkMode"
              src="../../public/images/icon-sun.svg"
              alt="moonIcon"
            />
            <img v-else src="../../public/images/icon-moon.svg" alt="sunIcon" />
          </button>
        </div>
      </div>

      <div class="login__container">
        <p class="mb-2 text-[#494C6B] dark:text-light-text">Email</p>
        <input v-model="email" class="mb-4 input-field" placeholder="Email" />
        <p class="mb-2 text-[#494C6B] dark:text-light-text">PassWord</p>
        <input
          v-model="password"
          class="input-field"
          placeholder="Password"
          type="password"
        />
        <button class="login__btn" @click="loginUser()">Log in</button>
        <p @click="toSignUp()" class="signup-link">New here? Join Now</p>
      </div>
    </div>
  </div>
  <AppFooter />
</template>
<style scoped>
.main__container {
  width: 100vw;
  min-height: 100vh;
  background-image: url("/images/bg-desktop-light.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  padding-top: 50px;
}

[data-theme="darkTheme"] .main__container {
  background-image: url("/images/bg-desktop-dark.jpg");
}

.signup-link {
  @apply flex justify-center cursor-pointer text-light-text hover:text-indigo-500;
}

.login__title {
  @apply mt-10 text-white font-bold text-[3rem] leading-[4rem] tracking-[15px]
  sm:text-[1.5rem] sm:mr-5;
}

.login__container {
  @apply min-w-[320px] bg-light-bg rounded-lg mx-2.5 p-12 shadow-md 
         dark:bg-dark-primary dark:text-dark-text;
}

.textInput {
  @apply w-full h-8 border border-dark-border rounded-md;
}

.input-field {
  @apply w-full h-8 px-2 border border-light-border rounded-md 
         focus:outline focus:outline-1 focus:outline-[#c7c8cd] focus:outline-offset-1 
         dark:bg-dark-primary dark:placeholder-dark-border dark:border-dark-border;
}

.login__btn {
  @apply flex justify-center items-center w-full rounded-lg 
         p-2.5 border-none mt-5 mb-2 text-light-bg bg-indigo-500;
}

@media (max-width: 738px) {
  .main__container {
    padding: 0 15%;
    background: url("/images/bg-mobile-light.jpg");
    background-color: #fafafa;
    background-repeat: no-repeat;
    background-size: contain;
  }

  [data-theme="darkTheme"] .main__container {
    background: url("/images/bg-mobile-dark.jpg");
    background-color: #171823;
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>
