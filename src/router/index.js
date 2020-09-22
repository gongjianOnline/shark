import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name: "layout",
    redirect:'/record'
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children:[
      {
        path: '/detailed',
        name: 'detailed',
        component: () => import('../views/detailed.vue')
      },
      {
        path: '/record',
        name: 'record',
        component: () => import('../views/record.vue')
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import('../views/statistics.vue')
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
