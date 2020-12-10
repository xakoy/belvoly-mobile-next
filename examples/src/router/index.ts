import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import config from '@/config'

export const routeNames = {
    home: 'home',
    audio: {
        main: 'audio'
    },
    system: {
        main: 'system'
    }
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: { name: routeNames.home }
    },
    {
        path: '/home',
        name: routeNames.home,
        component: Home
    },
    {
        path: '/audio',
        name: routeNames.audio.main,
        component: () => import('../views/audio/Index.vue')
    },
    {
        path: '/system',
        name: routeNames.system.main,
        component: () => import('../views/system/Index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(config.publicPath),
    routes
})

export default router
