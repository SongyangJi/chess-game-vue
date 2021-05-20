import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from "@/views/Login";
import Home from "@/views/Home";


const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/layout',
        component: Home
    },
    {
        path: '*',
        redirect: '/login'
    }
]

const router = new VueRouter({
    routes
})

export default router
