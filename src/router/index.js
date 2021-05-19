import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from "@/views/Login";
import Layout from "@/views/Layout";
import Hall from "@/views/Hall";
import Room from "@/views/Room";

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/layout',
        component: Layout,
        children: [
            {
                path: 'room',
                component: Room
            },
            {
                path: 'hall',
                component: Hall
            },
            {
                path: '*',
                redirect: 'room'
            }
        ],
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
