<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { RouterView } from "vue-router";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("使用者已登入:", user.email);
  } else {
    console.log("使用者未登入");
  }
});
</script>
<template>
  <router-view />
</template>
<style scoped></style>
