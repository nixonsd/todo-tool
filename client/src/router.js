import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
import Index from "./views/Index.vue";
import About from "./views/About.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Restore from "./views/Restore.vue";
import Reset from "./views/Reset.vue";

// Default title
const DEFAULT_TITLE = "Some Default Title";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Home Page
    {
      path: "/",
      component: Index,
      meta: { layout: "main", auth: true, title: "Home - TodoTool" },
    },
    // About Page
    {
      path: "/about",
      component: About,
      meta: { layout: "main", auth: true, title: "About - TodoTool" },
    },
    // Login Page
    {
      path: "/login",
      component: Login,
      meta: { layout: "auth", auth: false, title: "Login - TodoTool" },
    },
    // Restore Page
    {
      path: "/restore",
      component: Restore,
      meta: {
        layout: "auth",
        auth: false,
        title: "Restore Password - TodoTool",
      },
    },
    // New password Page
    {
      path: "/restore/:resetToken",
      component: Reset,
      meta: {
        layout: "auth",
        auth: false,
        title: "Restore Password - TodoTool",
      },
    },
    // Register Page
    {
      path: "/register",
      component: Register,
      meta: { layout: "auth", auth: false, title: "Register - TodoTool" },
    },
  ],
});

// Default options (permissions)
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

// Set title
router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
