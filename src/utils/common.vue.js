'use strict'
import common from './common.js'

export default {
  install: function (Vue, options) {
    Vue.prototype.common = common
  }
}
