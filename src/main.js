import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./styles/app.css"; // Here

window.store = store;

createApp(App).use(router).use(store).mount("#app");
