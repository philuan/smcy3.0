'use strict'
import axios from 'axios'
let apiURL = 'http://192.168.31.236:8081'

// axios.default.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(config => {
  // loading 开始加载动画
  // Indicator.open()
  console.log(1)
  console.log(axios.default.headers.post['Content-Type'])
  let token = sessionStorage.getItem('token')
  console.log(token)
  // config.headers['yjtShareToken'] = token
  if (token) {
    if (!config.params) {
      config.params = {
        token: token
      }
    } else {
      config.params.token = token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
//  拦截返回值
/* axios.interceptors.response.use((response) => {
  // 关闭加载动画
  // Indicator.close()
  // let data = response.data
  // if (data.code === 70 || data.code === 40001 || data.code === 20001 || response.status === 403) {
  //   if (/localhost/.test(host)) {
  //
  //   } else {
  //     // session失效或者未登录时跳转登录页
  //     sessionStorage.removeItem('token')
  //   }
  // }
  console.log(response)
  // return data
  return response
}, (error) => {
  console.log(error)
  if (error && error.response) {
    let status = error.response.status
    console.log(status)
    // if (status === 403) {
    //   sessionStorage.removeItem('token')
    //   if (top !== self) {
    //     top.location.href = top.location.protocol + '//' + top.location.host
    //   } else {
    //     window.location.href = window.location.protocol + '//' + window.location.host
    //   }
    // }
  }
  return Promise.resolve(error.response)
}) */
export default {
  /**
   * post 请求
   * @param url
   * @param data
   */
  post: function (url, data) {
    return axios({
      method: 'post',
      baseURL: apiURL,
      withCredentials: true,
      crossDomain: true,
      url,
      data: data,
      timeout: 3000
    })
  },
  /**
   * get 请求
   * @param url
   * @param data
   */
  get: function (url, params) {
    return axios({
      method: 'get',
      baseURL: apiURL,
      withCredentials: true,
      crossDomain: true,
      url,
      params,
      timeout: 3000
    })
  }
}
