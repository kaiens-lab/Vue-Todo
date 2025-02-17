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
const errorMessage = ref("");
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

    await signOut(auth);
    console.log("已登出，請使用者手動登入");

    alert("註冊成功! 現在您可以登入了");
    router.push("/login");
  } catch (error) {
    console.error("註冊失敗:", error);

    // 錯誤情況
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage.value = "此 Email 已被註冊，請使用其他 Email。";
        break;
      case "auth/weak-password":
        errorMessage.value = "密碼強度不足，請輸入至少 6 個字元。";
        break;
      case "auth/invalid-email":
        errorMessage.value = "Email 格式不正確，請重新輸入。";
        break;
      default:
        errorMessage.value = "註冊失敗，請稍後再試。";
    }
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
        <p v-if="errorMessage" class="text-red-600 text-sm mt-2">
          {{ errorMessage }}
        </p>

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
