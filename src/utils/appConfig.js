import common from './common'
// import wx from 'weixin-js-sdk'
import api from './api'

export default {
  // 刷新token，并重写token和过期时间
  refreshToken () {
    api.refreshToken().then(res => {
      if (res.data.code === 200) {
      }
    }).catch(res => {
      console.log(res)
    })
  },

  // 获取cookie返回的过期时间和当前时间对比，小于1小时则刷新token
  handleTime () {
    let endTime = common.getCookie('EXPIRES')
    let currentTime = common.getServerDate().getTime()
    // common.setCookie('WX_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJXWF9UT0tFTiI6IjMwMTA0NDU5OTEwNjA0ODAwMCIsImV4cCI6MTU0NTM2MDkyNiwiaWF0IjoxNTQ1Mjc0NTI2fQ.zNbHevP-hqxlqC3NgzwWjbE_Kh__g_xUPuWHQ-5nsq0')
    // common.setCookie('EXPIRES', '')
    if ((endTime - currentTime) / 1000 < 3600) {
      this.refreshToken()
    }
  },

  // 初始化
  init () {
    this.handleTime()
  }
}
