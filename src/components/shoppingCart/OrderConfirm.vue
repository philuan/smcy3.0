<template>
  <div class="orderconfirm">
    <HeaderCom @backPage="back" title="订单确认"/>
    <router-link tag="div" class="patient_info" v-if="patientInfo" to="/patientlist">
      <p><span class="name">{{ patientInfo.name }}</span>{{ patientInfo.phone }}</p>
      <p><span>证件类型：{{ patientInfo.certificatesType }}</span>{{ patientInfo.certificatesNo }}</p>
      <i class="iconfont skip_btn">&#xe633;</i>
    </router-link>
    <router-link class="patient_add_wrapper" tag="div" v-else to="/AddPatient">
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tianjia"></use>
        </svg>添加就医人</div>
      <i class="iconfont skip_btn">&#xe633;</i>
    </router-link>
    <div class="project_info">
      <h4>项目信息</h4>
      <div class="itemWrapper" :class="regular_height">
        <div class="item" v-for="item in orderConfirmList" :key="item.id">
          <img class="label_img" v-lazy="staticUrl + item.logo" alt="">
          <div class="des">
            <div>
              <span class="p_name">{{ item.name }}</span>
              <p>
                <span class="cycle_label">周期：</span>
                <span class="cycle">{{ item.period }}</span>
              </p>
            </div>
            <div>
              <span class="h_name">{{ item.hospitalName }}</span>
              <p>
                <span class="price">¥{{ item.nowPrice }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <p class="more_info" id="more
      _info" v-show="projectLength > 2" @click="deployableControl" v-text="message"></p>
    </div>
    <div class="service_info">
      <div class="special_info common_info" @click="showSpecailInfo">
        <h4>用户备注</h4>
        <p>
          <span v-show="index<3" v-for="(item, index) in specailRecord" :key="index">{{ item.content }}</span>
          <label v-if="specailRecord.length>3">...</label>
        </p>
        <i class="iconfont">&#xe633;</i>
      </div>
      <div class="location_info">
        <h4>服务位置</h4>
        <div class="content">
          <div class="item" v-for="(item, index) in locationList" :key="index" @click="selectLocation(index, item, 0)">
            <img v-if="location_index===index" src="@/assets/shopping_img/selected.png">
            <img v-else src="@/assets/shopping_img/select.png">
            <label>{{ item.name }}¥{{ item.price }}</label>
          </div>
        </div>
      </div>
      <div class="report_info">
        <h4>纸质报告</h4>
        <div class="content">
          <div class="item" v-for="(item, index) in reportList" :key="index" @click="selectReport(index, item, 0)">
            <img v-if="report_index===index" src="@/assets/shopping_img/selected.png">
            <img v-else src="@/assets/shopping_img/select.png">
            <label>{{ item.name }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="coupon_info common_info">
      <h4>优惠券</h4>
      <router-link tag="p" v-if="AvailableCoupons && couponId" to="/coupon">已使用优惠券</router-link>
      <router-link tag="p" v-else-if="AvailableCoupons && !couponId" to="/coupon">请选择优惠券</router-link>
      <p v-else>无可用优惠券</p>
      <i class="iconfont">&#xe633;</i>
    </div>
    <div class="attention_info common_info">
      <h4>注意事项</h4>
      <p>
        <span v-for="(item, index) in notes" :key="index">{{item}}</span>
      </p>
      <i class="iconfont">&#xe633;</i>
    </div>
    <div class="price_info">
      <p>
        <label>项目金额({{projectNumber}})</label>
        <span>¥{{totalPrice}}</span>
      </p>
      <p>
        <label>上门采样费</label>
        <span>¥{{serviceCharge}}</span>
      </p>
      <p>
        <label>报告邮寄费</label>
        <span>¥0.00</span>
      </p>
      <p>
        <label>优惠金额</label>
        <span class="coupon_price" v-if="couponId">¥{{serviceCharge}}</span>
        <span class="coupon_price" v-else>¥0.00</span>
      </p>
    </div>
    <div class="count_info">
      <p>
        <label>合计：</label>
        <span>¥{{amount}}</span>
      </p>
      <div class="pay_btn" @click="orderPay">支付</div>
    </div>
    <div v-show="specialIsshow" class="special_wrapper">
      <div class="mask_wrapper"></div>
      <div class="special_wrapper">
        <div class="special_box">
          <span :class="item.ischecked ? 'active': ''" v-for="item in remarkList" :key="item.id" @click="selectSpecialInfo(item)">{{ item.content }}</span>
        </div>
        <div class="submit_btn" @click="specialInfoCom">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
import {config} from '../../config/config'
import api from '../../utils/api'
import HeaderCom from '../../core/HeaderCom.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: '',
  props: [],
  computed: {
    ...mapState(['AvailableCoupons']),
    amount: function () {
      if (this.couponId) {
        return this.totalPrice
      } else {
        return this.totalPrice + this.serviceCharge
      }
    }
  },
  components: {
    HeaderCom
  },
  data () {
    return {
      staticUrl: config.static_url,
      totalPrice: 0, // 项目总金额
      orderConfirmList: [], // 项目列表
      projectNumber: 0, // 项目条数
      patientInfo: '',
      locationList: [
        {
          'name': '三环内',
          'price': '138.00',
          'type': '0'
        },
        {
          'name': '三环外',
          'price': '198.00',
          'type': '1'
        }
      ],
      reportList: [
        {
          'type': '1',
          'name': '需要'
        },
        {
          'type': '0',
          'name': '不需要'
        }
      ],
      remarkList: [],
      attentionList: [],
      projectLength: 0, // 项目数量
      deployable: false, // 项目展开折叠控制：默认折叠
      message: '', // 项目展开折叠文字
      regular_height: '',
      location_index: 1,
      report_index: 1,
      specialIsshow: 0, // 特殊情况弹窗显示/影藏
      specailRecord: [], // 特殊情况选择后呈现
      serviceCharge: 198.00,
      scope: '1', // 服务位置 0:三环内, 1:三环外
      reportNeed: '0', // 纸质报告 0:不需要, 1:需要
      projects: [], // 项目数据处理结果
      notes: [], // 注意事项
      uuid: '', // 订单uuid
      OrderUuidChange: '', // 生成订单后返回的uuid
      hospitalList: this.common.getStorage('hospitalList'),
      patientlist: [], // 就医人列表数据
      pageNo: 1, // 当前页
      pageSize: 10000, // 每页条目数
      couponId: '' // 优惠券id
    }
  },
  methods: {
    // 返回
    back () {
      this.$router.go(-1)
    },
    // 项目信息初始状态
    deployableInit () {
      this.projectLength = this.orderConfirmList.length
      if (this.projectLength > 2) {
        this.regular_height = 'regular_height'
      }
      this.message = `查看剩余` + (this.projectLength - 2) + `个`
    },
    // 项目信息展开/折叠切换
    deployableControl () {
      if (!this.deployable) {
        this.deployable = true
        this.message = '折叠'
        this.regular_height = ''
      } else {
        this.deployable = false
        this.message = `查看剩余` + (this.projectLength - 2) + `个`
        this.regular_height = 'regular_height'
      }
    },
    // 选择服务位置
    selectLocation (index, item, type) {
      this.location_index = index
      this.serviceCharge = item.price * 1
      this.scope = item.type
      if (type === 0) {
        this.setData()
      }
    },
    // 选择是否需要纸质报告
    selectReport (index, item, type) {
      this.report_index = index
      this.reportNeed = item.type
      if (type === 0) {
        this.setData()
      }
    },
    // 特殊情况弹窗显示/隐藏
    showSpecailInfo () {
      this.specialIsshow = !this.specialIsshow
    },
    // 选择特殊情况
    selectSpecialInfo (item) {
      this.ischecked = !item.ischecked
      for (let i in this.remarkList) {
        if (item.id === this.remarkList[i].id) {
          this.remarkList[i].ischecked = !this.remarkList[i].ischecked
        }
      }
    },
    // 特殊情况确认
    specialInfoCom () {
      this.specailRecord = []
      for (let i in this.remarkList) {
        if (this.remarkList[i].ischecked) {
          this.specailRecord.push(this.remarkList[i])
        }
      }
      this.specialIsshow = !this.specialIsshow
      // 本地存储数据
      this.setData()
    },
    setData () {
      if (this.common.getStorage('orderConfirmInfo')) {
        var orderConfirmData = this.common.getStorage('orderConfirmInfo')
      }

      orderConfirmData.orderInfo = {
        userRemark: [], // 用户备注
        scope: this.scope, // 服务位置 0:三环内, 1:三环外
        reportNeed: this.reportNeed, // 纸质报告 0:不需要, 1:需要
        notes: [], // 注意事项
        serviceCharge: this.serviceCharge, // 服务费
        couponPrice: 0, // 优惠金额
        price: this.amount, // 订单金额
        uuid: this.uuid, // 订单uuid
        couponId: this.couponId // 优惠券uuid
      }

      orderConfirmData.orderInfo.userRemark = this.specailRecord.concat()
      orderConfirmData.orderInfo.notes = this.notes.concat()
      this.common.setStorage('orderConfirmInfo', orderConfirmData)
    },
    // 获取用户备注
    getRemarkList () {
      api.remark().then(res => {
        if (res.data.code === 200) {
          let list = res.data.successObject
          for (let i in list) {
            list[i].ischecked = false
          }
          this.remarkList = this.remarkList.concat(list)
          this.handleOrderConfirmData()
          this.deployableInit()
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    // 获取注意事项
    getNotes (params) {
      api.notes(JSON.stringify(params)).then(res => {
        if (res.data.code === 200) {
          this.common.toast(res.data.msg)
        } else {
          console.log('请稍后重试')
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    // 数据处理
    handleOrderConfirmData () {
      if (this.common.getStorage('orderConfirmInfo')) {
        let orderConfirmInfo = this.common.getStorage('orderConfirmInfo')
        this.orderConfirmList = orderConfirmInfo.orderConfirmList
        this.totalPrice = orderConfirmInfo.totalPrice
        this.projectNumber = orderConfirmInfo.projectNumber

        this.getCouponList()

        if (this.$route.query.coupon_uuid) {
          this.couponId = this.$route.query.coupon_uuid
          this.setData()
        } else if (orderConfirmInfo.orderInfo) {
          this.couponId = orderConfirmInfo.orderInfo.coupon
          this.setData()
        }

        if (orderConfirmInfo.orderInfo) {
          let userRemark = orderConfirmInfo.orderInfo.userRemark // 用户备注
          this.scope = orderConfirmInfo.orderInfo.scope // 服务位置 0:三环内, 1:三环外
          this.reportNeed = orderConfirmInfo.orderInfo.reportNeed // 纸质报告 0:不需要, 1:需要
          this.serviceCharge = orderConfirmInfo.orderInfo.serviceCharge // 服务费用
          this.notes = orderConfirmInfo.orderInfo.notes // 注意事项
          this.uuid = orderConfirmInfo.orderInfo.uuid // 订单uuid

          this.handleUserRemark(userRemark)

          // 根据scope回显服务位置
          if (this.scope === '0') {
            let currentLocation = {
              'name': '三环内',
              'price': '138.00',
              'type': '0'
            }
            this.selectLocation(0, currentLocation, 1)
          }

          // 根据reportNeed回显是否需要纸质报告
          if (this.reportNeed === '1') {
            let currentReport = {
              'type': '1',
              'name': '需要'
            }
            this.selectReport(0, currentReport, 1)
          }
        }

        if (orderConfirmInfo.patientInfo) {
          this.patientInfo = orderConfirmInfo.patientInfo

          // localstorage存储就医人信息和就医人列表对比
          this.handlePatientInfo(orderConfirmInfo.patientInfo)
        } else {
          if (this.common.getStorage('patientInfo')) {
            let patientInfo = this.common.getStorage('patientInfo')
            this.handlePatientInfo(patientInfo)
          }
        }

        if (this.orderConfirmList.length > 1) {
          let uuids = []
          let type
          for (let i in this.orderConfirmList) {
            uuids.push(this.orderConfirmList[i]['uuid'])
            type = this.orderConfirmList[i]['type']
          }
          let params = {
            uuids: uuids,
            type: type
          }
          // 根据uuid和type获取注意事项
          this.getNotes(params)
        } else if (this.orderConfirmList.length === 1) {
          this.notes[0] = this.orderConfirmList[0].notes
        }
      } else {

      }
    },

    // 获取优惠券列表
    getCouponList () {
      let projectList = []
      for (let i in this.orderConfirmList) {
        let info = {
          'uuid': this.orderConfirmList[i].uuid,
          'type': this.orderConfirmList[i].type
        }
        projectList.push(info)
      }

      let params = {
        'projects': projectList
      }

      this.getAvailableCoupons(JSON.stringify(params))
    },
    // 处理用户备注
    handleUserRemark (userRemark) {
      // 当用户备注为字符串时，转换为 数组
      if (Array.isArray(userRemark)) {
        this.specailRecord = []
        this.specailRecord = this.specailRecord.concat(userRemark)
      } else {
        this.specailRecord = []
        if (userRemark) {
          let userRemarkList = userRemark.split(',')
          for (let i in userRemarkList) {
            for (let j in this.remarkList) {
              if (userRemarkList[i] === this.remarkList[j].content) {
                this.remarkList[j].ischecked = true
                break
              }
            }
          }
          for (let k in this.remarkList) {
            if (this.remarkList[k].ischecked) {
              this.specailRecord.push(this.remarkList[k])
            }
          }
        }
      }
    },
    // 就医人数据对比
    handlePatientInfo (patientInfo) {
      var flag = 0
      if (!this.patientlist.length) {
        this.patientInfo = ''
      } else {
        if (!patientInfo) {
          this.patientInfo = this.patientlist[0]
        } else {
          for (let i in this.patientlist) {
            if (patientInfo.uuid === this.patientlist[i].uuid) {
              this.patientInfo = patientInfo
              flag = 1
              return
            }
          }
          if (flag === 0) {
            this.patientInfo = this.patientlist[0]
          }
        }
      }
    },
    // 获取就医人列表
    getPatientList () {
      let params = {
        pageNo: this.pageNo, // 当前页
        pageSize: this.pageSize // 每页条目数
      }
      api.patient(params).then(res => {
        if (res.data.code === 200) {
          // 获取用户备注列表
          this.getRemarkList()
          if (res.data.successObject.records.length > 0) {
            this.patientlist = res.data.successObject.records
          } else {
            this.patientlist = []
          }
        } else {
          console.log('接口错误，请稍后重试')
        }
      })
    },
    // 提交订单
    orderPay () {
      var projects = []
      for (let i in this.orderConfirmList) {
        let info = {
          uuid: this.orderConfirmList[i].uuid,
          type: this.orderConfirmList[i].type
        }
        projects.push(info)
      }
      let userRemark = []

      for (let i in this.specailRecord) {
        userRemark.push(this.specailRecord[i].content)
      }
      userRemark = userRemark.join()
      // 当订单uuid存在时调用“更新订单信息”接口，uuid不存在时调用“提交订单”接口
      if (!this.uuid) {
        let couponPrice = 0
        if (this.couponId) {
          couponPrice = this.serviceCharge
        }
        let params = {
          projects: projects, // 项目列表
          projectCount: projects.length, // 项目数量
          patient: this.patientInfo.uuid, // 就医人id
          scope: this.scope, // 服务位置：三环内、三环外
          userRemark: userRemark, // 用户备注
          coupon: this.couponId, // 优惠券id
          projectPrice: this.totalPrice, // 项目金额
          servicePrice: this.serviceCharge, // 服务金额
          couponPrice: couponPrice, // 优惠金额
          price: this.amount, // 订单金额
          paperReport: this.reportNeed // 纸质报告
        }
        api.orderPay(JSON.stringify(params)).then(res => {
          if (res.data.code === 200) {
            let params = {
              orderUuid: res.data.successObject.uuid
            }
            this.OrderUuidChange = res.data.successObject.uuid
            this.getShoppingCartTotal()
            this.getPrePay(params)
          } else {
            this.common.toast(res.data.msg)
          }
        }).catch(res => {
          this.common.toast(res)
        })
      } else {
        let couponPrice = 0
        if (this.couponId) {
          couponPrice = this.serviceCharge
        }
        let params = {
          uuid: this.uuid,
          patient: this.patientInfo.uuid, // 就医人id
          scope: this.scope, // 服务位置：三环内、三环外
          userRemark: userRemark, // 用户备注
          coupon: this.couponId, // 优惠券id
          projectPrice: this.totalPrice, // 项目金额
          servicePrice: this.serviceCharge, // 服务金额
          couponPrice: couponPrice, // 优惠金额
          price: this.amount, // 订单金额
          paperReport: this.reportNeed // 纸质报告
        }
        api.orderUpdate(JSON.stringify(params)).then(res => {
          if (res.data.code === 200) {
            let params = {
              orderUuid: res.data.successObject.uuid
            }
            this.OrderUuidChange = res.data.successObject.uuid
            this.getPrePay(params)
          } else {
            this.common.toast(res.data.msg)
          }
        }).catch(res => {
          console.log(res)
        })
      }
    },
    // 获取预支付信息
    getPrePay (params) {
      api.prepay(params).then(res => {
        if (res.data.code === 200) {
          this.wxPay(res.data.successObject)
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    // 调用微信支付
    wxPay (obj) {
      var That = this
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: obj.appId, // 必填，公众号的唯一标识
        timestamp: obj.timeStamp, // 必填，生成签名的时间戳
        nonceStr: obj.nonceStr, // 必填，生成签名的随机串
        signature: obj.signType, // 必填，签名
        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.chooseWXPay({
          timestamp: obj.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: obj.nonceStr, // 支付签名随机串，不长于 32 位
          package: obj.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: obj.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: obj.paySign, // 支付签名
          success: function (res) {
            console.log(res)
            if (res.errMsg === 'chooseWXPay:ok') {
              That.orderStatusUpdate()
              // 支付成功后清楚订单、就医人信息
              this.common.removeStorage('orderConfirmInfo')
              this.common.removeStorage('patientInfo')
            }
          }
        })
      })
    },
    // 支付成功后更新订单状态
    orderStatusUpdate (res) {
      let params = {
        uuid: this.OrderUuidChange
      }
      console.log(params)
      api.orderStatusUpdate(params).then(res => {
        if (res.data.code === 200) {
          this.$router.push({path: '/paysuccess', query: { uuid: this.OrderUuidChange }})
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    ...mapActions(['getShoppingCartTotal', 'getAvailableCoupons'])
  },
  created () {
    // 获取就医人列表
    this.getPatientList()
  }
}
</script>
<style lang="scss" scoped>
@import "../../css/element.scss";
  .orderconfirm{
    background: #f1f1f1;
    h4{
      color: #444;
      font-size: 30px;
      text-align: left;
    }
    i{
      font-size: 26px;
      font-weight: bold;
    }
    .common_info{
      line-height: 90px;
      height: 90px;
      @include list(row);
      justify-content: space-between;
      flex-wrap: nowrap;
      padding: 0 30px;
      background: #fff;
      margin-bottom: 10px;
      p{
        flex: 1;
        overflow: hidden;
        text-align: right;
        span{
          font-size: 26px;
          margin-right: 40px;
          &:nth-child(3){
            margin-right: 0;
          }
        }
      }
      i{
        padding-left: 22px;
      }
    }
    .patient_info{
      position: relative;
      padding: 26px 30px;
      background: #F5F8FF;
      text-align: left;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 10px;
      p{
        text-indent: 26px;
        color: #777;
        font-size: 24px;
        .name{
          color: #444;
          font-size: 28px;
        }
        &:nth-child(1){
          margin-bottom: 30px;
        }
        span{
          margin-right: 70px;
        }
      }
      .skip_btn{
        margin-left: 12px;
        position: absolute;
        top: 50%;
        margin-top: -13px;
        right: 30px;
      }
    }
    .patient_add_wrapper{
      position: relative;
      padding: 52px 30px;
      background: #F5F8FF;
      text-align: center;
      color: #1FB0E7;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 10px;
      .skip_btn{
        margin-left: 12px;
        position: absolute;
        top: 50%;
        margin-top: -13px;
        right: 30px;
      }
    }
    .project_info{
      padding: 0 30px;
      background: #fff;
      margin-bottom: 10px;
      h4{
        line-height: 80px;
        border-bottom: 1px solid #f1f1f1;
      }
      .itemWrapper{
        @include list(column);
        height: auto;
        &.regular_height{
          height: 340px;
        }
        flex-wrap: nowrap;
        overflow: hidden;
        .item{
          position: relative;
          padding: 22px 20px 20px 30px;
          border-bottom: 2px solid #f1f1f1;
          .label_img{
            width: 150px;
            height: 130px;
            float: left;
          }
          .des{
            float: left;
            position: absolute;
            top: 20px;
            left: 230px;
            right: 0px;
            bottom: 20px;
            .p_name{
              color: #444;
              font-size: 32px;
            }
            .cycle_label{
              color: #777;
              font-size: 24px;
            }
            .cycle{
              color: #ff6136;
              font-size: 24px;
            }
            .h_name{
              color: #aaa;
              font-size: 26px;
            }
            .price{
              color: #ffc000;
              font-sizd: 24px;
            }
            div {
              display: flex;
              justify-content: space-between;
              &:nth-child(1){
               position: absolute;
               top: 10px;
               left: 0;
               right: 0;
              }
              &:nth-child(2){
               position: absolute;
               bottom: 10px;
               left: 0;
               right: 0;
              }
            }
          }
        }
      }
      .more_info{
        line-height: 70px;
        border-top: 1px solid #f1f1f1;
        text-align: center;
        color: #444;
        font-size: 22px;
      }
    }
    .service_info{
      background: #F5F8FF;
      padding: 0 30px;
      margin-bottom: 10px;
      .location_info, .report_info{
        padding: 30px 0;
        border-bottom: 1px solid #f1f1f1;
        .content{
          margin-top: 30px;
          overflow: hidden;
          padding: 0 44px 0 32px;
          .item{
            font-size: 26px;
            color: #777;
            width: 220px;
            float: left;
            float: left;
            text-align: left;
            img{
              width: 32px;
              height: 32px;
              vertical-align: top;
            }
            &:nth-child(1){
              margin-right: 114px;
            }
          }
        }
      }
      .special_info{
        padding: 0;
        background: #F5F8FF;
        border-bottom: 1px solid #f1f1f1;
      }
    }
    .coupon_info{
      background: #fff;
      p{
        color: #444;
      }
    }
    .attention_info{
      background: #fff;
      padding: 0 30px;
      p{
        color: #FF6136;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        span:nth-child(3){
          margin-right: 40px;
        }
      }
    }
    .price_info{
      padding: 20px 60px;
      color: #444;
      font-size: 26px;
      background: #fff;
      p{
        @include list(row);
        justify-content: space-between;
        margin-top: 28px;
        &:nth-child(1){
          margin-top: 0;
        }
        span{
          color: #FFC000;
          &.coupon_price{
            color: #E8641B;
          }
        }
      }
    }
    .count_info{
      padding: 0 30px;
      line-height: 100px;
      border-top: 1px solid #f1f1f1;
      background: #fff;
      @include list(row);
      justify-content: space-between;
      align-items: center;
      p{
        color: #444;
        font-size: 28px;
        span{
          color: #FFC000;
          font-size: 32px;
        }
      }
      .pay_btn{
        width: 200px;
        line-height: 60px;
        height: 60px;
        background: #FF7D35;
        color: #fff;
        font-size: 26px;
        border-radius: 30px;
      }
    }
    .special_wrapper{
      border-radius: 10px 10px 0 0;
      padding: 30px 30px 0 30px;
      z-index: 2;
      .mask_wrapper{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        opacity: 0.6;
      }
      .special_wrapper{
        background: #fff;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        .special_box{
        @include list(row);
        justify-content: space-between;
        span{
          padding: 10px 20px;
          border: 1px solid #aaa;
          border-radius: 6px;
          margin: 15px 8px 15px;
          font-size: 24px;
          color: #777;
          &.active{
            color: #fff;
            background: #38BF58;
            border-color: #38BF58;
          }
        }
      }
      }
      .submit_btn{
        width: 500px;
        line-height: 70px;
        color: #fff;
        background: #36C8FF;
        margin: 70px auto;
        border-radius: 36px;
      }
    }
  }
</style>
