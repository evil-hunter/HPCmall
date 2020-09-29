import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('../views/home/home')
const category = () => import('../views/category/category')
const profile = () => import('../views/profile/profile')
const shopcart = () => import('../views/shopcart/shopcart')
const Detail = () => import('../views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/shopcart',
    component: shopcart
  },
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/detail:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
