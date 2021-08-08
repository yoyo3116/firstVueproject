import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/pages/Login.vue'
import Admin from '../views/admin.vue'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'


const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect:'/',
    hidden: true
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta:{requiresAuth:true}
  },
  {
    path:'/',
    name:'home',
    component:Home
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/product/:id',
    name:'Product',
    component:Product
  },
  {
    path: '/admin/coupons',
    name: 'Coupons',
    component: () => import(/* webpackChunkName: "about" */ '../views/Coupons.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
