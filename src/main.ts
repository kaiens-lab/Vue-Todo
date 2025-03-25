import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);
pinia.use(piniaPluginPersistedstate); //  啟用 persist 插件
app.mount("#app");
