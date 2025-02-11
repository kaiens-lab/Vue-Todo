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
      <div class="titleAndBtn">
        <h2 class="signup__title">SIGN UP</h2>
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

      <div class="signUp__container">
        <p class="space-10">Email</p>
        <input v-model="email" class="textInput space-10" placeholder="Email" />
        <p class="space-10">Username</p>
        <input
          v-model="username"
          class="textInput space-10"
          placeholder="Username"
        />
        <p class="space-10">PassWord</p>
        <input
          v-model="password"
          class="textInput"
          placeholder="Password"
          type="password"
        />
        <button class="join__btn" @click="registerUser">Join Todo App</button>
        <p @click="toLogin()" class="back-msg">Return to Login</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
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

.back-msg {
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 10px;
}

.toggle-btn {
  display: flex;
  margin-top: 35px;
  margin-left: 10px;
}

.titleAndBtn {
  display: flex;
  align-items: center;
}

.signup__title {
  display: flex;
  margin-top: 40px;
  color: white;
  font-weight: bold;
  font-size: 3rem;
  line-height: 4rem;
  letter-spacing: 15px;
}

.signUp__container {
  min-width: 320px;
  background-color: #fafafa;
  border-radius: 10px;
  padding: 3rem;
  margin: 0px 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

[data-theme="darkTheme"] .signUp__container {
  background-color: #25273d;
  color: #e3e4f1;
}

.textInput {
  border-radius: 5px;
  border: 1px solid #4d5067;
  width: 100%;
  height: 2rem;
}

[data-theme="darkTheme"] .textInput {
  background-color: #25273d;
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

.join__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6559cc;
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

  .signup__title {
    font-size: 1.5rem;
    top: 6%;
    left: 20%;
  }

  .toggle-btn {
    top: 8%;
    right: 20%;
  }
}

@media (min-width: 739px) {
  .signUp__container {
    top: 25%;
    background-color: #fafafa;
    border-radius: 10px;
    width: 40%;
    padding: 3rem;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
}

@media (max-width: 347px) {
  .signup__title {
    margin-top: 40px;
    letter-spacing: 10px;
  }
  .signUp__container {
    top: 15%;
  }
}
</style>
