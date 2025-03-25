import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Login from "./components/Login.vue";
import Layout from "./components/Layout.vue";
import Signup from "./components/Signup.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Login },
  { path: "/todolist", component: Layout },
  { path: "/signup", component: Signup },
];

const router = createRouter({
  history: createWebHistory("/Vue-Todo/"),
  routes,
});

export default router;
