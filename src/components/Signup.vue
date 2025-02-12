<script setup>
import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores/darkModeStore";
import "../styles/auth.css";
import AppFooter from "./AppFooter.vue";

const email = ref("");
const username = ref("");
const password = ref("");
const router = useRouter();
const themeStore = useThemeStore();
const { isDarkMode } = storeToRefs(themeStore);

const registerUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    await updateProfile(userCredential.user, {
      displayName: username.value,
    });
    console.log("註冊成功:", userCredential.user);

    //立即登出，確保用戶不會保持登入狀態
    await signOut(auth);
    console.log("已登出，請使用者手動登入");

    alert("註冊成功! 現在您可以登入了");
    router.push("/");
  } catch (error) {
    console.error("註冊錯誤:", error.message);
  }
};
const toLogin = () => {
  router.push("/");
};
</script>

<template>
  <div>
    <div class="main__container">
      <div class="flex items-center">
        <h2 class="title sm:mr-5">SIGN UP</h2>
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
        <p class="auth-text mb-2">Email</p>
        <input
          type="email"
          v-model="email"
          class="input-field mb-2"
          placeholder="Email"
          required
        />
        <p class="auth-text mb-2">Username</p>
        <input
          type="text"
          v-model="username"
          class="input-field auth-text mb-2"
          placeholder="Username"
          required
        />
        <p class="auth-text mb-2">PassWord</p>
        <input
          type="password"
          v-model="password"
          class="input-field"
          placeholder="Password"
          required
        />
        <button class="auth-btn" @click="registerUser">Join Todo App</button>
        <p
          @click="toLogin()"
          class="btn-base text-light-text hover:text-indigo-500"
        >
          Return to Login
        </p>
      </div>
    </div>
  </div>
  <AppFooter />
</template>
