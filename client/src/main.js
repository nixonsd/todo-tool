import { createApp } from 'vue'
import App from './views/layouts/Main.vue'
import router from './router'

import "materialize-css";
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'

const app = createApp(App)
app.use(router)

/// Components
import loader from './views/partials/Loader'
import navbar from './views/partials/Navbar'
app.component('app-loader', loader)
app.component('app-navbar', navbar)

app.mount('#app')
