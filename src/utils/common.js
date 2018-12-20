/*************************************************************************
 * <p>Title:common.js</p>
 * <p>Description:yjc 公用方法</p>
 * <p>Company: 迪康网络 </p>
 *
 * @author   : 燕明媚
 * @version : 1.00
 * @date     : 2018-11-27
 * @direction: 公用弹框等封装
 * @comment ：
 **************************************************************************/
// import Vue from 'vue'
export default {
  encodePrefix: 'YJC',

  setStorage (name, value, prefix) {
    name = this.get_localStorage_key(name, prefix)
    value = this.encode(value)
    localStorage.setItem(name, value)
  },

  getStorage (name, prefix) {
    var val
    name = this.get_localStorage_key(name, prefix)
    val = window.localStorage.getItem(name)
    val = this.decode(val)
    return val
  },

  get_localStorage_key (key, prefix) {
    if (!prefix) {
      prefix = this.encodePrefix
    }
    key = prefix + '_' + key
    return key
  },

  removeStorage (name, prefix) {
    name = this.get_localStorage_key(name, prefix)
    localStorage.removeItem(name)
  },

  str_shuffle (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: shuffled = str_shuffle("abcdef");
    // *     results 1: shuffled.length == 6

    if (str === null) {
      return ''
    }

    str += ''
    var newStr = ''
    var rand
    var i = str.length

    while (i) {
      rand = Math.floor(Math.random() * i)
      newStr += str.charAt(rand)
      str = str.substring(0, rand) + str.substr(rand + 1)
      i--
    }

    return newStr
  },

  // 加密方法
  encode (data) {
    var a, b
    if (data === '' || data === undefined || data === null) {
      return ''
    }

    a = {
      '%22': '0',
      '%2C': '1',
      '%3A': '2',
      '%5B': '3',
      '%5D': '4',
      '%7B': '5',
      '%7D': '6'
    }

    b = this.str_shuffle('^`$<,>@:')
    b = b.split('')

    try {
      return 'df' + window.encodeURIComponent(JSON.stringify(data)).replace(/%22|%2C|%3A|%5B|%5D|%7B|%7D/g, function (c) {
        return b[a[c]]
      }).replace(/%/g, b[7]).split('').reverse().join('') + b.join('') + 'wf'
    } catch (e) {
      // console.error(e, 'error')
    }
  },

  // 解密方法
  decode (data) {
    if (!data || typeof data !== 'string') {
      return ''
    }

    if (!/^df/.test(data) || !/wf$/.test(data)) {
      try {
        return JSON.parse(data)
      } catch (e) {
        return data
      }
    }

    var i = ''
    var l = data.length
    var a = ['%22', '%2C', '%3A', '%5B', '%5D', '%7B', '%7D']
    var b = data.substr(l - 10, 8).split('')

    try {
      return JSON.parse(window.decodeURIComponent(data.substring(2, l - 10).split('').reverse().join('').replace(new RegExp('\\' + b[7], 'g'), '%').replace(new RegExp('\\' + b.join('|\\'), 'g'), function (c) {
        for (i in b) {
          if (b[i] === c) {
            return a[i]
          }
        }
      })))
    } catch (e) {
      // console.error(e, 'error')
    }
  },

  // 获取服务器时间
  getServerDate () {
    if (navigator.onLine) {
      var xhr = null
      if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest()
        xhr.open('GET', '/', false)
        xhr.send(null)
        var date = xhr.getResponseHeader('Date')
        // navigator.onLine 判断当前网络连接状况
        return new Date(date)
      } else {
        return this.toast('请升级当前浏览器版本')
      }
    } else {
      return this.toast('请检查当前网络')
    }
  },
  // 获取cookie
  getCookie (key) {
    let COOKIE, ARRAY_COOKIE
    // 获取cookie，去除cookie中的空字符串
    COOKIE = document.cookie.replace(/[ ]/g, '')
    // 将cookie分割为字符串数组
    ARRAY_COOKIE = COOKIE.split(';')
    var tips
    for (let i in ARRAY_COOKIE) {
      let arr = ARRAY_COOKIE[i].split('=')
      if (key === arr[0]) {
        tips = arr[1]
        break
      }
    }
    return tips
  },
  // 设置cookie
  setCookie (name, value) {
    let Days = 1
    let exp = this.getServerDate()
    let endTimestamp = exp.getTime() + Days * 24 * 60 * 60 * 1000
    exp.setTime(endTimestamp)
    if (name === 'WX_TOKEN') {
      document.cookie = name + '=' + value + ';expires=' + exp.toGMTString() + ';path=/'
    } else {
      document.cookie = name + '=' + endTimestamp + ';expires=' + exp.toGMTString() + ';path=/'
    }
  }
}
