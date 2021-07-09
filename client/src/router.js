import { createRouter, createWebHistory } from "vue-router";
import Index from "./views/Index.vue";
import About from "./views/About.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Index, meta: { layout: "main" } },
    { path: "/about", component: About, meta: { layout: "main" } },
  ],
});
