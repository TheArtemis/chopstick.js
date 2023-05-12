import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {path: '/', redirect: '/home'},    
    {path: '/home', name: 'home', component: () => import('@/pages/Home.vue')},
    {path: '/play', name: 'play', component: () => import('@/pages/Play.vue')},
    {path: '/play/computer', name: 'computer', component: () => import('@/pages/Computer.vue')},
    {path: '/login', name: 'login', component: () => import('@/pages/Login.vue')},
    {path: '/profile', name: 'profile', component: () => import('@/pages/Profile.vue')},
    {path: '/stats', name: 'stats', component: () => import('@/pages/Stats.vue')},
    {path: '/register', name: 'register', component: () => import('@/pages/Register.vue')},
    {path: '/settings', name: 'settings', component: () => import('@/pages/Settings.vue')},
    
]

const router = createRouter({
    routes,
    history: createWebHistory(), 
})

export default router