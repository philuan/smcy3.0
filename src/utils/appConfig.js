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
    common.setCookie('WX_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJXWF9UT0tFTiI6IjI5OTY5NjU5NjUyOTE4ODg2NCIsImV4cCI6MTU0NTIyMzc2NywiaWF0IjoxNTQ1MTM3MzY3fQ.TE5ybhzaToa0AF2G4g6DC6vO9Hnwon7TUW3FdBLZ_tA')
    common.setCookie('EXPIRES', '')
    if ((endTime - currentTime) / 1000 < 3600) {
      this.refreshToken()
    }
  },

  // 初始化
  init () {
    this.handleTime()
  }
}
