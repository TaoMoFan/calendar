import Vue from 'vue'
import VueRouter from 'vue-router'
import calendar from '../components/calendar'
import cal from '../components/cal'

Vue.use(VueRouter)

const routes = [
  {
    path: '/calendar',
    name: 'calendar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: calendar
  },
  {
    path: '/cal',
    name: 'cal',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: cal
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
