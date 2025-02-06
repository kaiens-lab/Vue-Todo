import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Layout from "./components/Layout.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/todolist", component: Layout },
];

const router = createRouter({
  history: createWebHistory("/Vue-Todo/"),
  //   history: createWebHistory(),
  routes,
});

export default router;
