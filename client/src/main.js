import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GoogleAuth from "vue3-google-oauth2";

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";

const app = createApp(App);
app.use(router);
app.use(store);

app.use(GoogleAuth, {
  clientId: process.env.VUE_APP_CLIENT_ID,
  scope: "email",
  prompt: "consent",
  fetch_basic_profile: false,
});

/// Components
import M from "materialize-css";
import loader from "./views/partials/Loader";
import navbar from "./views/partials/Navbar";
app.component("app-loader", loader);
app.component("app-navbar", navbar);

/// Mixins
app.mixin({
  mounted() {
    M.updateTextFields();
  },
});

app.mount("#app");
