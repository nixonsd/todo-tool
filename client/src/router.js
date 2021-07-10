import { createRouter, createWebHistory } from "vue-router";
import Index from "./views/Index.vue";
import About from "./views/About.vue";
import Login from "./views/Login.vue";
import Registration from "./views/Registration.vue"

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Index, meta: { layout: "main" } },
    { path: "/about", component: About, meta: { layout: "main" } },
    { path: "/login", component: Login, meta: { layout: "auth" } },
    { path: "/registration", component: Registration, meta: { layout: "auth" } },
  ],
});
