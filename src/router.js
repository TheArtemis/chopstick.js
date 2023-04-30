import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {path: '', name: 'home', component: () => import('@/pages/Home.vue')},
    {path: '/play', name: 'play', component: () => import('@/pages/Play.vue')},
    {path: '/login', name: 'login', component: () => import('@/pages/Login.vue')},
    {path: '/profile', name: 'profile', component: () => import('@/pages/Profile.vue')},

]

const router = createRouter({
    routes,
    history: createWebHistory(), 
})

export default router