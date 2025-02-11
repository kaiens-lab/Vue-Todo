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
    <div class="main__container" :class="{ dark: isDarkMode }">
      <div class="titleAndBtn">
        <h2 class="login__title">LOGIN</h2>
        <div class="toggle-btn">
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
        <p class="mb-2">Email</p>
        <input v-model="email" class="textInput mb-4" placeholder="Email" />
        <p class="mb-2">PassWord</p>
        <input
          v-model="password"
          class="textInput"
          placeholder="Password"
          type="password"
        />
        <button class="login__btn bg-indigo-500 mb-2" @click="loginUser()">
          Log in
        </button>
        <p @click="toSignUp()" class="invite-msg">New here? Join Now</p>
      </div>
    </div>
  </div>
  <AppFooter />
</template>
<style scoped>
[data-theme="darkTheme"] {
  color: #c8cbe7;
}

.main__container {
  width: 100vw;
  min-height: 100vh;
  background: url("/images/bg-desktop-light.jpg");
  background-color: #fafafa;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 50px;
}

[data-theme="darkTheme"] .main__container {
  background: url("/images/bg-desktop-dark.jpg");
  background-color: #171823;
  background-repeat: no-repeat;
  background-size: contain;
}

.invite-msg {
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.titleAndBtn {
  display: flex;
  align-items: center;
}

/* .login__title {
  position: absolute;
  top: 6%;
  left: 30%;
  color: white;
  font-weight: bold;
  font-size: 3rem;
  line-height: 4rem;
  letter-spacing: 15px;
} */

.login__title {
  display: flex;
  margin-top: 40px;
  color: white;
  font-weight: bold;
  font-size: 3rem;
  line-height: 4rem;
  letter-spacing: 15px;
}

.login__container {
  min-width: 320px;
  background-color: #fafafa;
  border-radius: 10px;
  margin: 0px 10px;
  padding: 3rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

[data-theme="darkTheme"] .login__container {
  background-color: #25273d;
  color: #e3e4f1;
}

.toggle-btn {
  display: flex;
  margin-top: 40px;
}

.textInput {
  border-radius: 5px;
  border: 1px solid #4d5067;
  width: 100%;
  height: 2rem;
}

.space-10 {
  margin-bottom: 10px;
}

input {
  padding: 0 8px;
}

input:focus {
  border: none;
  outline: 1px solid #c7c8cd;
  outline-offset: 1px;
}

[data-theme="darkTheme"] input {
  background-color: #25273d;
}

.login__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fafafa;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  border: none;
  margin-top: 20px;
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

  .login__title {
    font-size: 1.5rem;
    margin-right: 20px;
  }
}
</style>
