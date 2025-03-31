<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores/darkModeStore";
import { auth } from "../firebase";
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppFooter from "./AppFooter.vue";
import "../styles/auth.css";

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
  } catch (error: any) {
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
    <div class="main__container">
      <div class="flex items-center">
        <h2 class="title sm:mr-5">LOGIN</h2>
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

      <div class="auth-container">
        <p class="text-[#494C6B] dark:text-light-text; mb-2">Email</p>
        <input
          type="email"
          v-model="email"
          class="input-field mb-4"
          placeholder="Email"
          required
        />
        <p class="auth-text mb-2">PassWord</p>
        <input
          v-model="password"
          class="input-field"
          placeholder="Password"
          type="password"
        />
        <button class="auth-btn" @click="loginUser()">Log in</button>
        <p
          @click="toSignUp()"
          class="btn-base text-light-text hover:text-indigo-500"
        >
          New here? Join Now
        </p>
      </div>
    </div>
  </div>
  <AppFooter />
</template>
