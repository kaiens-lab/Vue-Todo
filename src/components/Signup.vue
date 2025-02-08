<script setup>
import { ref } from "vue";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const email = ref("");
const username = ref("");
const password = ref("");

const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: username.value,
    });

    console.log("註冊成功:", userCredential.user);
  } catch (error) {
    console.error("註冊錯誤:", error.message);
  }
};
</script>

<template>
  <div>
    <div class="main__container">
      <h2 class="signup__title">SIGN UP</h2>
      <div class="login__container">
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
        <button class="login__btn" @click="registerUser()">
          Join Todo App
        </button>
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

.signup__title {
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
  background-color: #6559cc;
  color: #fafafa;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  border: none;
  margin-top: 20px;
}
</style>
