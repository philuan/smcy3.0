// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './css/common.css'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfontCommon.css'
import 'lib-flexible/flexible'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import common from './utils/common.vue.js'
import appConfig from './utils/appConfig'
// import vConsole from '../static/vconsole.js'
import { Lazyload, InfiniteScroll, Picker } from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/scss/my-mint.css'

// 挂载到Vue实例上面
Vue.use(Lazyload)
Vue.use(InfiniteScroll)
Vue.component(Picker.name, Picker)
Vue.use(common)
// Vue.prototype.wx = wx
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  // 处理只存储一级路由
  let levelRoute = ['Home', 'Classification', 'ShoppingCart', 'Order', 'Mine']
  if (levelRoute.indexOf(to.name) > -1) {
    sessionStorage.setItem('smcyPathName', to.name) // 存储路由
  } else {
    sessionStorage.removeItem('smcyPathName')
  }

  if (!from.name) {
    appConfig.init()
  }

  // 如果to.meta.roleCode等于5，则证明该组件为公共组件，所有人都可以进入
  // let roleCode = 1 // 最后通过后台返回状态值决定
  // if (to.meta.roleCode === 5) {
  //   next()
  // } else if (to.meta.roleCode === roleCode) {
  //   next()
  // } else {
  //   console.log('您么有权限')
  // }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 使用store
  components: { App },
  template: '<App/>'
})
