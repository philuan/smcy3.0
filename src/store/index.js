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
    fetchLoading: false,
    shoppingCartTotal: commonFun.getStorage('shoppingCartTotal'),
    AvailableCoupons: commonFun.getStorage('AvailableCoupons')
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
    },
    // 获取当前可用优惠券
    getAvailableCoupons (ctx, project) {
      api.getUseCoupon(project).then(res => {
        if (res.data.code === 200) {
          commonFun.setStorage('AvailableCoupons', res.data.successObject)
          storeD.dispatch('triggerGetCoupons')
        }
      }).catch(res => {
        console.log(res)
      })
    },
    triggerGetCoupons (ctx) {
      ctx.commit('getCoupons')
    },
    // 请求数据时loading状态
    fetchLoading (ctx, type) {
      ctx.commit('fetchLoading', type)
    }
  },
  mutations: {
    // 购物车商品总数
    change (state) {
      state.shoppingCartTotal = commonFun.getStorage('shoppingCartTotal')
    },
    // 可用优惠券列表
    getCoupons (state) {
      state.AvailableCoupons = commonFun.getStorage('AvailableCoupons')
    },
    // 请求数据时loading状态
    fetchLoading (state, type) {
      state.fetchLoading = type
    }
  }
})

export default storeD
