import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";

const app = createApp(App);
app.use(router);
app.use(store);

/// Components
import M from "materialize-css";
import loader from "./views/partials/Loader";
import navbar from "./views/partials/Navbar";
app.component("app-loader", loader);
app.component("app-navbar", navbar);

/// Mixins
app.mixin({
  created() {
    M.updateTextFields();
  }
});

app.mount("#app");
