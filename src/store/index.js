import Vue from 'vue'
import vuex from 'vuex'
import api from '../utils/api.js'
import commonFun from '../utils/common'
import { Toast } from 'mint-ui'
// import state from './state'
// import mutations from './mutations'

Vue.use(vuex) // 全局挂载

// 导出状态
const storeD = new vuex.Store({
// export default new vuex.Store({
  state: {
    coupon: {},
    // hospitalList: commonFun.getStorage('hospitalList'),
    shoppingCartTotal: commonFun.getStorage('shoppingCartTotal')
  },
  actions: {
    // 添加至购物车
    addToCart (ctx, project) {
      api.addToCart(project).then(res => {
        if (res.data.code === 208) {
          Toast({
            message: '您已添加过该项目',
            position: 'bottom',
            duration: 2000
          })
        } else if (res.data.code === 200) {
          Toast({
            message: '成功添加至购物车',
            position: 'bottom',
            duration: 2000
          })
          storeD.dispatch('getShoppingCartTotal')
        }
      }).catch(res => {
        console.log(res)
      })
    },
    // 获取购物车商品数量
    getShoppingCartTotal () {
      api.shoppingCartTotal().then(res => {
        if (res.data.code === 200) {
          commonFun.setStorage('shoppingCartTotal', res.data.successObject)
          storeD.dispatch('changeShoppingCartNumber')
        }
      }).catch(res => {
        console.log(res)
      })
    },
    changeShoppingCartNumber (ctx) {
      ctx.commit('change')
    }
  },
  mutations: {
    change (state) {
      state.shoppingCartTotal = commonFun.getStorage('shoppingCartTotal')
      console.log(state.shoppingCartTotal)
    }
  }
})

export default storeD
