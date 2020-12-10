import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import config from '@/config';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/audio',
        name: 'audio',
        component: () => import('../views/audio/Index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(config.publicPath),
    routes
})

export default router
