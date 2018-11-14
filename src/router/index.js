import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/home/Home')
const Classification = () => import('@/components/classification/Classification')
const Shopping = () => import('@/components/shopping/Shopping')
const Order = () => import('@/components/order/Order')
const Mine = () => import('@/components/mine/Mine')
const Footer = () => import('@/components/common/Footer')
const Message = () => import('@/components/home/Message')
const Lsearch = () => import('@/components/home/lsearch/Lsearch')
const SearchResult = () => import('@/components/home/lsearch/SearchResult')
Vue.use(Router)
// meta下边的roleCode通过状态值跟后端匹配，判断用户访问权限, 暂时权限code对应信息还没定
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        roleCode: 1
      }
    },
    {
      path: '/classification',
      name: 'Classification',
      component: Classification,
      meta: {
        roleCode: 5
      }
    },
    {
      path: '/shopping',
      name: 'Shopping',
      component: Shopping,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/footer',
      name: 'Footer',
      component: Footer,
      meta: {
        roleCode: 5
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta: {
        roleCode: 1
      }
    },
    {
      path: '/lsearch',
      name: 'Lsearch',
      component: Lsearch,
      meta: {
        roleCode: 1
      }
    },
    {
      path: '/searchresult',
      name: 'SearchResult',
      component: SearchResult,
      meta: {
        roleCode: 1
      }
    }
  ]
})
