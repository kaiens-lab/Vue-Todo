<script setup lang="ts">
import { useRouter } from "vue-router";
import "../styles/auth.css";
import AppFooter from "./AppFooter.vue";

const router = useRouter();

const toLogin = () => {
  router.push("/");
};

const toSignUp = () => {
  router.push("/signup");
};
</script>

<template>
  <div class="main__container">
    <div class="flex items-center">
      <h2 class="title sm:mr-5">Oops!</h2>
      <div class="flex mt-8"></div>
    </div>

    <div class="auth-container">
      <p class="auth-text mb-2">
        Looks like this page is missing or you need to
        <span
          @click="toLogin()"
          class="text-light-text hover:text-indigo-500 mt-8"
          >log in</span
        >
        first.
      </p>
      <p class="auth-text mb-2">
        <span
          @click="toSignUp()"
          class="text-light-text hover:text-indigo-500 mt-8"
          >Sign in</span
        >
        to see what’s here!
      </p>
    </div>
    <AppFooter />
  </div>
</template>
