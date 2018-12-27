<template>
  <!--立即预约页面-->
  <div class="imme_reservation">
    <!--头部-->
    <Header :headerCon="headerCon"></Header>
    <img src="../../../../static/images/immediaterreservation.png" class="banner">
    <!--用户选择预约时间 到时候得引入时间组件-->
    <div class="reservation" @click="openPicker">
      <p class="reservation_time">预约时间</p>
      <p class="reservation_select">
        <span v-show="!isShowTimes">{{selectTimeDefault}}</span>
        <span v-show="isShowTimes" class="green" ref="appointTime">{{selectTimeDefault | dateFormat}}</span>
      </p>
      <img :src="rightIcon" alt="">
    </div>
    <div class="appoint_pro_list">
      <div class="pro_list_tit">预约项目:</div>
      <div class="pro_list">
        <p v-for="(item, ind) in projectList" :key="ind">{{item.name}}</p>
      </div>
    </div>
    <div class="notice">
      <img :src="notSelectImg" v-show="!selectNotice" @click="changeSelectImg">
      <img :src="selectImg" v-show="selectNotice" @click="changeSelectImg">
      <p>我同意<span @click="showModal">《服务须知》</span>各项内容</p>
    </div>
    <button class="submit" :class="selectNotice ? 'blue' : ''" @click="submit">确认预约</button>
    <div class="modal" v-show="isShowModal">
      <div class="inner">
        <p class="inner_tit">《服务须知》</p>
        <div class="inner_con">
          <p>1.您好！你说选择的项目中包含您好！你说选择的项目中包含您好！你说选择的项目中包含您好！你说选择的项目中包含您好！你说选择的项目中包含您好！你说选择的项目中包含您好！你说选择的项目中包含您好！你说选择的项目中包含您好！</p>
          <p>2.您好！你说选择的项目中包含你说选择的项目中包含你说选择的项目中包含。</p>
          <p>3.您好！你说选择的项目中包含您好！你说选择的项目中包含您好！你说选择的项目中包含您好！你说选择的项目中包含您好！你说选择的项目中包含您好！你说选择的项目中包含您好！你说选择的项目中包含您好！你说选择的项目中包含您好！</p>
          <p>4.您好！你说选择的项目中包含你说选择的项目中包含你说选择的项目中包含。</p>
        </div>
        <button @click="agreen">我同意</button>
      </div>
    </div>
    <div class="modal2" v-show="isShowModal2">
      <div class="inner">
        <span class="modal_close" @click="closeModal">X</span>
        <p class="inner_tit">确定重新续约？</p>
        <p class="inner_con">您好！由于您已经超过《服务须知》中免费取约规定时间段，所以进行此次操作需要支付额外的违约费用。</p>
        <p class="money">¥ {{serviceRate}}</p>
        <div class="inner_btn">
          <button @click="closeModal">取消</button>
          <button class="again_appoint" @click="again">重新预约</button>
        </div>
      </div>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="date-time"
      :startDate="startDate"
      @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import Header from '../../common/Header'
import { DatetimePicker, MessageBox, Toast } from 'mint-ui'
import dayjs from 'dayjs'
import Vue from 'vue'
import api from '../../../utils/api'
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
  name: 'ImmediaterReservation',
  components: {
    Header,
    MessageBox,
    DatetimePicker,
    Toast
  },
  data () {
    return {
      btnWords: ['确定', '取消'],
      tips: '是否确认预约？',
      isShowTimes: false, // 选择时间
      selectTimeDefault: '请选择', // 选择时间前的默认值
      rightIcon: require('../../../assets/right_icon.png'),
      selectImg: require('../../../assets/select_img.png'),
      notSelectImg: require('../../../assets/not_select_img.png'),
      selectNotice: false, // 用来判断对号是否勾选
      headerCon: '服务预约',
      isShowModal: false, // 是否显示服务须知模态框
      isShowModal2: false, // 改约模态框
      startDate: new Date(), // 预约初始化时间定义为当前时间
      serviceRate: 0, // 服务费
      successObject: {
        appId: 'wx478166d8b34fa488',
        timeStamp: '1545796521',
        nonceStr: '1545796521106',
        packageValue: 'prepay_id=wx26115520307594cd3d9fef911488749011',
        signType: 'MD5',
        paySign: '198C348339A339D1A1C2E66100BADF29'
      },
      projectList: ['项目名称', '项目名称', '项目名称', '项目名称', '项目名称项目名称']
    }
  },
  methods: {
    again () {
      this.isShowModal2 = false
      let params = {
        uuid: this.$route.query.uuid,
        rescheduleTime: this.$refs.appointTime.innerHTML,
        reschedulePrice: this.serviceRate
      }
      this.updateAppointment(params)
    },
    // 调用微信支付
    wxPay () {
      var That = this
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: That.successObject.appId, // 必填，公众号的唯一标识
        timestamp: That.successObject.timeStamp, // 必填，生成签名的时间戳
        nonceStr: That.successObject.nonceStr, // 必填，生成签名的随机串
        signature: That.successObject.signType, // 必填，签名
        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.chooseWXPay({
          timestamp: That.successObject.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: That.successObject.nonceStr, // 支付签名随机串，不长于 32 位
          package: That.successObject.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: That.successObject.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: That.successObject.paySign, // 支付签名
          success: function (res) {
            if (res.errMsg === 'chooseWXPay:ok') {
              // 支付成功后清楚订单、就医人信息
              // this.common.removeStorage('orderConfirmInfo')
              // this.common.removeStorage('patientInfo')
              That.$router.push({path: '/paysuccess', query: { appointmentTime: this.$refs.appointTime.innerHTML, update: true }})
            }
          }
        })
      })
    },
    openPicker () {
      this.$refs.picker.open()
    },
    handleConfirm (picker, value) {
      this.selectTimeDefault = picker
      this.isShowTimes = true
    },
    changeSelectImg () {
      this.selectNotice = !this.selectNotice
    },
    submit () {
      if (this.selectNotice) {
        if (!this.isShowTimes) {
          Toast({
            message: '请选择预约时间',
            position: 'bottom',
            duration: 3000
          })
          return false
        }
        let message = '预约时间：' + this.$refs.appointTime.innerHTML
        if (!this.$route.query.appointmentTime) {
          MessageBox({
            title: '是否确认预约',
            message: message,
            showCancelButton: true
          })
          MessageBox.confirm(message).then(action => {
            if (!this.$route.query.appointmentTime) {
              // 不存在代表立即预约
              let params = {
                orderList: this.$route.query.uuid,
                appointmentTime: this.$refs.appointTime.innerHTML
              }
              api.addAppointment(params).then(res => {
                if (res.data.code === 200) {
                  // 预约成功0，取消预约1，改约成功2
                  sessionStorage.setItem('appointStatus', 0)
                  this.$router.push({path: '/paysuccess', query: { appointmentTime: this.$refs.appointTime.innerHTML }})
                } else {
                  Toast({
                    message: res.data.msg,
                    position: 'bottom',
                    duration: 3000
                  })
                }
              })
            }
          })
        } else { // 代表重新预约
          // 先判断是否需要弹框
          api.beforeRebook({uuid: this.$route.query.uuid}).then(res => {
            if (res.data.code === 200) {
              let { successObject } = res.data
              console.log(successObject)
              // 如果isRebook为true则证明需要弹框
              if (successObject.isRebook) {
                this.serviceRate = successObject.extraPrice
                this.isShowModal2 = true
              } else {
                MessageBox({
                  title: '是否重新预约',
                  message: message,
                  showCancelButton: true
                })
                MessageBox.confirm(message).then(action => { // 代表不需要服务费的重新预约
                  let params = {
                    uuid: this.$route.query.uuid, // 预约号
                    rescheduleTime: this.$refs.appointTime.innerHTML
                  }
                  this.updateAppointment(params)
                }).catch(res => {
                  console.log('网络错误')
                })
              }
            }
          })
        }
      } else {
        Toast({
          message: '您暂时还未同意该服务',
          position: 'bottom',
          duration: 3000
        })
      }
    },
    // 显示服务须知模态框
    showModal () {
      this.isShowModal = true
    },
    // 同意服务
    agreen () {
      this.isShowModal = false
      this.selectNotice = true
    },
    updateAppointment (params) {
      let jsonParams = JSON.stringify(params)
      api.appointmentPrepay(jsonParams).then(res => {
        if (res.data.code === 200) {
          // 预约成功0，取消预约1，改约成功2
          // sessionStorage.setItem('appointStatus', 2)
          this.successObject = res.data.successObject
          if (res.data.successObject.paySign) { // 需要先走微信接口
            console.log(this.successObject)
            this.wxPay()
          } else { // 代表不走微信支付
            this.$router.push({path: '/paysuccess', query: { appointmentTime: this.$refs.appointTime.innerHTML, update: true }})
          }
        } else {
          Toast({
            message: res.data.msg,
            position: 'bottom',
            duration: 3000
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    closeModal () {
      this.isShowModal2 = false
    }
  },
  mounted () {
    this.projectList = JSON.parse(sessionStorage.getItem('projectList'))
  },
  filters: {
    dateFormat (value) {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped lang='scss'>
  .imme_reservation{
    width: 100%;
    height: auto;
    min-height: 100vh;
    /*background: #F1F1F1;*/
    .banner{
      width: 100%;
      height: 426px;
    }
    .reservation{
      width:730px;
      height:120px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius:10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px auto;
      p{
        font-size:26px;
        font-family:SourceHanSansCN-Normal;
        font-weight:400;
        color:rgba(170,170,170,1);
      }
      .reservation_select{
        margin-right: 70px;
        width: 50%;
        .green{
          color: #38BF58;
        }
      }
      .reservation_time{
        font-size: 30px;
        color: rgba(68,68,68,1);
        margin-left: 20px;
      }
      img{
        margin-right: 30px;
        width: 20px;
        height: 30px;
      }
    }
    .appoint_pro_list{
      width: 100%;
      height: auto;
      margin-top: 36px;
      display: flex;
      justify-content: left;
      .pro_list_tit{
        margin-left: 30px;
        margin-right: 50px;
        font-size: 30px;
        font-weight: 400;
        color: rgba(68,68,68,1);
      }
      .pro_list{
        display: inline-flex;
        width: 460px;
        flex-wrap: wrap;
        p{
          margin-left: 46px;
          margin-bottom: 29px;
          font-size: 24px;
          font-weight: 400;
          color: rgba(68,68,68,1);
        }
      }
    }
    .notice{
      margin-top: 178px;
      width: 100%;
      height: 98px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
        width: 32px;
        height: 32px;
        margin-left: auto;
        margin-right: 19px;
      }
      p{
        width:340px;
        font-size: 26px;
        font-weight: 400;
        color: rgba(68,68,68,1);
        margin-right: auto;
        span{
          color: #38BF58;
        }
      }
    }
    .submit{
      width:500px;
      height:70px;
      background:rgba(170,170,170,1);
      font-size:28px;
      color: #FFFFFF;
      opacity:0.9;
      border-radius:35px;
    }
    .blue{
      background:linear-gradient(-34deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
    }
    .modal{
      position: fixed;
      z-index: 999;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .5);
      .inner{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width:600px;
        height:1000px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        .inner_tit{
          margin: 60px auto 50px;
          font-size: 36px;
          width: 100%;
          color: #444;
        }
        .inner_con{
          width: 480px;
          height: 653px;
          overflow-y: scroll;
          margin: 0 auto;
          p{
            text-align: left;
            line-height: 40px;
            color: #777;
            font-size: 24px;
          }
        }
        button{
          width:300px;
          height:60px;
          border:2px solid rgba(15,176,231,1);
          font-size:28px;
          color: rgba(15,176,231,1);
          opacity:0.9;
          border-radius:30px;
          margin: 73px auto 0;
        }
      }
    }
    .modal2{
      position: fixed;
      z-index: 999;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .5);
      .inner{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width:460px;
        height:460px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        .modal_close{
          position: absolute;
          font-size: 24px;
          right: 20px;
          top: 20px;
        }
        .inner_tit{
          margin-top: 50px;
          width:100%;
          font-size:28px;
          line-height: 36px;
          font-weight:400;
          color:rgba(119,119,119,1);
        }
        .inner_con{
          width: 370px;
          margin: 20px auto;
          line-height: 40px;
          font-size: 24px;
          color: #777;
          text-align: left;
        }
        .money{
          width: 100%;
          font-size:32px;
          font-family:SourceHanSansCN-Medium;
          font-weight:500;
          color:rgba(255,192,0,1);
        }
        .inner_btn{
          width: 100%;
          height: 60px;
          display: flex;
          margin-top: 39px;
          justify-content: space-around;
          align-items: center;
          button{
            width:150px;
            height:60px;
            border:2px solid rgba(170,170,170,1);
            opacity:0.9;
            border-radius:30px;
            font-size:26px;
            color:rgba(119,119,119,1);
          }
          .again_appoint{
            border:2px solid rgba(31,176,231,1);
            color:rgba(31,176,231,1);
          }
        }
      }
    }
  }
</style>
