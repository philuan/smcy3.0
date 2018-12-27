import $http from './http'
const api = {
  // reportReminding: (obj) => {
  //   return $http.post('/reportInfo/add', obj)
  // },
  // 首页轮播图
  hSlider: () => {
    return $http.get('/rest/carousel/list')
  },
  // 首页广告
  adv: () => {
    return $http.get('/rest/carousel/static')
  },
  // 医院列表
  hospitalList: () => {
    return $http.get('/rest/hospital/list')
  },
  // 医院详情
  hospitalInfo: (obj) => {
    return $http.get('/rest/hospital/getByUuid', obj)
  },
  // 首页项目
  hProjectList: () => {
    return $http.get('/rest/index/list')
  },
  // 更多入口项目列表
  moreProjectList: (obj) => {
    return $http.get('/rest/index/more', obj)
  },
  // 添加至购物车
  addToCart: (obj) => {
    return $http.post('/rest/shoppingCart/add', obj)
  },
  // 购物车列表
  shoppingCartTotal: () => {
    return $http.get('/rest/shoppingCart/total')
  },
  // 获取购物车商品数量
  shoppingCart: (obj) => {
    return $http.get('/rest/shoppingCart/list', obj)
  },
  // 删除购物车商品
  deleteFromCart: (obj) => {
    return $http.get('/rest/shoppingCart/delete', obj)
  },
  // 获取用户备注
  remark: () => {
    return $http.get('/rest/remark/list')
  },
  // 获取注意事项
  notes: (obj) => {
    return $http.post('/rest/project/getNotes', obj)
  },
  // 获取预支付信息
  prepay: (obj) => {
    return $http.get('/rest/pay/prepay', obj)
  },
  // 提交订单
  orderPay: (obj) => {
    return $http.post('/rest/order/add', obj)
  },
  // 更新订单信息
  orderUpdate: (obj) => {
    return $http.post('/rest/order/update', obj)
  },
  // 更新订单状态
  orderStatusUpdate: (obj) => {
    return $http.get('/rest/order/paid', obj)
  },
  // 刷新token
  refreshToken: () => {
    return $http.get('rest/refreshToken')
  },
  // 获取就医人列表
  patient: (obj) => {
    return $http.get('/rest/patient/list', obj)
  },
  // 搜索历史
  history: () => {
    return $http.get('/rest/searchHis/list')
  },
  // 热门搜索
  hotSearch: () => {
    return $http.get('/rest/searchHot/list')
  },
  // 关键字搜索补全列表
  keywordSearch: (obj) => {
    return $http.get('/rest/search/autoComplete', obj)
  },
  // 搜索结果列表
  KeywordsResult: (obj) => {
    return $http.get('/rest/search', obj)
  },
  // 删除
  clearHistory: () => {
    return $http.get('/rest/searchHis/clear')
  },
  // 获取项目详情
  getProjectDetail: (obj) => {
    return $http.get('/rest/project/detail', obj)
  },
  //  就医人列表
  getPatientList: () => {
    return $http.get('/rest/patient/list')
  },
  //  添加就医人
  addPatient: (obj) => {
    return $http.post('/rest/patient/add', obj)
  },
  //  删除就医人
  delPatient: (obj) => {
    return $http.get('/rest/patient/delete', obj)
  },
  //  更新就医人
  updatePatient: (obj) => {
    return $http.post('/rest/patient/update', obj)
  },
  // 获取用户可使用的优惠券
  getUseCoupon: (obj) => {
    return $http.post('/rest/coupon/usable/list', obj)
  },
  // 获取分类接口
  getClassify: () => {
    return $http.get('/rest/classify/list')
  },
  // 获取订单列表
  getOrderList: (obj) => {
    return $http.get('/rest/order/list', obj)
  },
  // 获取订单详情
  getOrderDetail: (obj) => {
    return $http.get('/rest/order/detail', obj)
  },
  // 获取未读消息条数
  messageNumber: () => {
    return $http.get('/rest/inform/total')
  },
  // 获取消息列表
  messageList: (obj) => {
    return $http.get('/rest/inform/list', obj)
  },
  // 删除消息
  deleteMessage: (obj) => {
    return $http.get('/rest/inform/delete', obj)
  },
  // 标记消息已读
  readMessage: () => {
    return $http.get('/rest/inform/read')
  },
  // 添加预约
  addAppointment: (obj) => {
    return $http.post('/rest/appointment/add', obj)
  },
  // 判断是否弹框提示用户预约需要收费
  beforeRebook: (obj) => {
    return $http.get('/rest/appointment/beforeRebook', obj)
  },
  // 重新预约
  appointmentPrepay: (obj) => {
    return $http.post('/rest/pay/appointmentPrepay', obj)
  },
  //  取消预约
  cancelAppointment: (obj) => {
    return $http.get('/rest/appointment/cancel', obj)
  },
  // 获取三级分类项目
  projectByClassify: (obj) => {
    return $http.get('/rest/classify/projects', obj)
  },
  // 获取退款页面信息
  beforeRefund: (obj) => {
    return $http.get('/rest/order/beforeRefund', obj)
  },
  // 提交退款
  submitRefund: (obj) => {
    return $http.post('/rest/order/submitRefund', obj)
  }
}
export default api
