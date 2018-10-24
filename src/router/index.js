import Vue from 'vue'
import Router from 'vue-router'
const home = () => import('@/components/home/home')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
