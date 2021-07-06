import { createRouter, createWebHistory } from 'vue-router'
import Index from './views/Index.vue'
import About from './views/About.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: Index },
    { path: '/about', component: About }]
})