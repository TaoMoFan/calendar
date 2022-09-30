import Vue from 'vue'
import VueRouter from 'vue-router'
import calendar from '../components/calendar'
import cal from '../components/cal'
import test from '../components/HelloWorld'

Vue.use(VueRouter)

const routes = [
  {
    path: '/calendar',
    name: 'calendar',
    component: calendar
  },
  {
    path: '/cal',
    name: 'cal',
    component: cal
  },
  {
    path: '/test',
    name: 'test',
    component: test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
