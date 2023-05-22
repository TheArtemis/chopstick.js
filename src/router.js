import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {path: '/', redirect: '/home'},    
    {path: '/home', redirect: '/play/computer', name: 'home', component: () => import('@/pages/Home.vue')},
    {path: '/play', redirect: 'play/computer', component: () => import('@/pages/Play.vue')},
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

/* ADD WHEN COMPLETE */

router.beforeEach((to, from, next) => {
    if(localStorage.getItem('chopsticks_authToken') === null && (to.name === 'profile' || to.name === 'stats' || to.name === 'settings')) {        
        next('/login')        
        
    }
    else {
        next();
    }
});

export default router