<script setup>
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref } from "vue";
import { auth } from "../firebase";
</script>
<template>
  <div>
    <div class="main__container">
      <h2 class="login__title">LOGIN</h2>
      <div class="login__container">
        <p class="space-10">Email</p>
        <input v-model="email" class="textInput space-10" placeholder="Email" />
        <p class="space-10">PassWord</p>
        <input
          v-model="password"
          class="textInput"
          placeholder="Password"
          type="password"
        />
        <button class="login__btn">Log in</button>
        <p>New here? Join Now</p>
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
}
</style>
