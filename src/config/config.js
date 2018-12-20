'use strict'
// 根据环境参数 --env <环境名> 加载不同的配置文件
// 例如 npm run dev --env test 则加载 ../config/config.test.js 文件
var cfgAll

if (process.env.NODE_ENV !== 'development') {
  cfgAll = require('./config.' + process.env.NODE_ENV + '.js')
} else {
  cfgAll = require('./config.development.js')
}
module.exports = cfgAll
