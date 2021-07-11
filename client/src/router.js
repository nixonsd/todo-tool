import { createRouter, createWebHistory } from "vue-router";
import Index from "./views/Index.vue";
import About from "./views/About.vue";
import SignIn from "./views/SignIn.vue";
import SignUp from "./views/SignUp.vue"

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Index, meta: { layout: "main" } },
    { path: "/about", component: About, meta: { layout: "main" } },
    { path: "/signin", component: SignIn, meta: { layout: "auth" } },
    { path: "/signup", component: SignUp, meta: { layout: "auth" } },
  ],
});
