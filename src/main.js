// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './css/common.css'
import 'lib-flexible/flexible'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
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
