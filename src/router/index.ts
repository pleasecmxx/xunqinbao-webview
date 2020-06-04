import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: '登录',   
    component: () => import('./../views/Login.vue')
  },
  {
    path: '/private',
    name: '隐私协议',
    component: () => import('./../views/Private.vue')
  },
  {
    path: '/invate',
    name: '邀请',
    component: () => import('./../views/Invate.vue')
  },
  {
    path: '/news',
    name: '新闻',
    component: () => import('./../views/News.vue')
  },
  {
    path: '/video-list',
    name: '新闻',
    component: () => import('./../views/VideoList.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
