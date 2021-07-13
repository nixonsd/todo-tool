import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
import Index from "./views/Index.vue";
import About from "./views/About.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Index, meta: { layout: "main", auth: true } },
    { path: "/about", component: About, meta: { layout: "main", auth: true } },
    { path: "/login", component: Login, meta: { layout: "auth", auth: false } },
    {
      path: "/register",
      component: Register,
      meta: { layout: "auth", auth: false },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth;
  if (requireAuth && store.getters["auth/isAuthenticated"]) {
    next();
  } else if (requireAuth && !store.getters["auth/isAuthenticated"]) {
    next("/login");
  } else if (!requireAuth && store.getters["auth/isAuthenticated"]) {
    next("/");
  } else {
    next();
  }
});

export default router;
