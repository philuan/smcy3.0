'use strict'
import axios from 'axios'
// import {config} from '../config/config'
// let apiURL = config.service_url
let apiURL = window.location.protocol + '//' + window.location.host

axios.interceptors.request.use(config => {
  // loading 开始加载动画
  // Indicator.open()
  // let token = sessionStorage.getItem('token')
  // if (token) {
  //   if (!config.params) {
  //     config.params = {
  //       token: token
  //     }
  //   } else {
  //     config.params.token = token
  //   }
  // }
  return config
}, error => {
  return Promise.reject(error)
})

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
      timeout: 3000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  },
  /**
   * get 请求
   * @param url
   * @param data
   */

  // timestamp (url) {
  //   var getTimestamp = new Date().getTime()
  //   url = url + '?timestamp=' + getTimestamp
  //   return url
  // }
  get: function (url, params) {
    var getTimestamp = new Date().getTime()
    url = url + '?timestamp=' + getTimestamp

    return axios({
      method: 'get',
      baseURL: apiURL,
      withCredentials: true,
      crossDomain: true,
      url,
      params,
      timeout: 3000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  }
}
