import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex) // 全局挂载
// 导出状态
export default new vuex.Store({
  state: {
    show: false
  }
})
