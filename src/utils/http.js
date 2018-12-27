'use strict'
import axios from 'axios'
import storeD from '../store'
import {config} from '../config/config'
let apiURL = config.service_url
// let apiURL = window.location.protocol + '//' + window.location.host

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 加载动画
  storeD.dispatch('fetchLoading', true)
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器,返回状态判断
axios.interceptors.response.use((res) => {
  // 隐藏动画
  storeD.dispatch('fetchLoading', false)
  return res
}, (error) => {
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
