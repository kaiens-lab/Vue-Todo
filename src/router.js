import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Layout from "./components/Layout.vue";
import Signup from "./components/Signup.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/todolist", component: Layout },
  { path: "/signup", component: Signup },
];

const router = createRouter({
  history: createWebHistory("/Vue-Todo/"),
  //   history: createWebHistory(),
  routes,
});

export default router;
