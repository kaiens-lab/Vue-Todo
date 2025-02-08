<script setup>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

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
    <div class="main__container">
      <h2 class="login__title">LOGIN</h2>
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
        <p @click="toSignUp()">New here? Join Now</p>
      </div>
    </div>
  </div>
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

.login__title {
  position: absolute;
  top: 6%;
  left: 30%;
  color: white;
  font-weight: bold;
  font-size: 3rem;
  line-height: 4rem;
  letter-spacing: 15px;
}

.login__container {
  position: absolute;
  top: 15%;
  background-color: #fafafa;
  border-radius: 10px;
  width: 40%;
  padding: 3rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.textInput {
  border-radius: 5px;
  border: 1px solid #9495a5;
  width: 100%;
  height: 2rem;
}

.space-10 {
  margin-bottom: 10px;
}

input {
  outline: 1px solid #e8e8e9;
  padding: 0 5px;
}

input:focus {
  border: none;
  outline: 1px solid #c7c8cd;
  outline-offset: 1px;
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
}
</style>
