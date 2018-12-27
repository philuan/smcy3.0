<template>
  <!--预约确认页面-->
  <div class="appointment_confirm">
    <Header :headerCon="headerCon"></Header>
    <div class="tips"></div>
    <div class="patient">
      <img :src="identifyIcon" class="iden">
      <div class="pa_top">
        <p>{{patient.name}}</p>
        <p>{{patient.phone}}</p>
      </div>
      <div class="pa_bot">
        <p>{{patient.certificatesType}}</p>
        <p>{{patient.certificatesNo}}</p>
      </div>
    </div>
    <div class="info">
      <div class="order_num">
        <p>订单号：</p>
        <p>{{order.orderNo}}</p>
      </div>
      <div class="pro_info">
        <p class="tit">项目信息:</p>
        <p v-for="(item, ind) in projectList" :key="ind" class="pro_list">
          <span>{{item.name}}</span>
          <span>{{item.hospital}}</span>
          <span>周期：{{item.period}}</span>
        </p>
      </div>
      <div class="user_remarks">
        <p class="tit">用户备注:</p>
        <p class="remark_list">
          <span>{{order.userRemark}}</span>
        </p>
      </div>
      <div class="service_position">
        <p class="tit">服务位置:</p>
        <p class="remark_list">
          <span>{{order.address}}</span>
        </p>
      </div>
      <div class="service_position">
        <p class="tit">纸质报告:</p>
        <p class="remark_list">
          <span>{{paperReport}}</span>
        </p>
      </div>
      <div class="service_position">
        <p class="tit yhj">优惠券:</p>
        <p class="remark_list">
          <span>{{order.coupon}}</span>
        </p>
      </div>
      <div class="service_position">
        <p class="tit">注意事项:</p>
        <p class="remark_list">
          <span>{{order.notes}}</span>
        </p>
      </div>
    </div>
    <div class="footer">
      <!--<button class="refund" @click="goRefund" v-show="!isShowBuy">退款</button>-->
      <button class="cancel" @click="cancel" v-show="isShowRefund">申请退款</button>
      <button class="confirm" @click="goAppointment" v-show="isAlreadAppoint">去预约</button>
      <button class="again" @click="again" v-show="!isAlreadAppoint">重新预约</button>
      <img :src="delIcon" class="del_appoint" v-show="isShowBuy">
      <button class="again_buy" v-show="isShowBuy">再次购买</button>
    </div>
  </div>
</template>

<script>
import Header from '../../common/Header'
import { MessageBox, Toast } from 'mint-ui'
import api from '../../../utils/api'
export default {
  name: 'AppointmentConfirm',
  components: {
    Header,
    MessageBox,
    Toast
  },
  data () {
    return {
      headerCon: '订单详情',
      isAlreadAppoint: true, // 判断显示按钮是重新预约还是立即预约
      isShowModal: false, // 重新预约缴费提醒
      isShowBuy: false, // 是否显示再次购买按钮
      isShowRefund: false, // 是否显示申请退款
      delIcon: require('../../../assets/del.png'),
      identifyIcon: require('../../../assets/identity.png'),
      order: {},
      patient: {},
      projectList: {},
      paperReport: '需要', // 需不需要纸质报告，0代表不需要，1代表需要
      hospitalList: this.common.getStorage('hospitalList') // 医院列表
    }
  },
  methods: {
    // 跳转到预约页面
    goAppointment () {
      this.$router.push({path: '/immediaterreservation', query: {uuid: this.$route.query.uuid}})
    },
    // 退款
    goRefund () {
      console.log('敬请期待666')
    },
    // 获取该订单号详情
    getOrderDetail () {
      let params = {
        uuid: this.$route.query.uuid // 299737052268990464
      }
      api.getOrderDetail(params).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          let { order, patient, projectList } = res.data.successObject
          this.order = order
          this.patient = patient
          this.projectList = projectList
          if (order.paperReport === '0') {
            this.paperReport = '不需要'
          } else if (order.paperReport === '1') {
            this.paperReport = '需要'
          }
          console.log(this.hospitalList)
          sessionStorage.setItem('projectList', JSON.stringify(this.projectList))
        }
        console.log(this.order)
      })
    },
    // 弹出取消预约提示框
    cancel () {
      let params = {
        uuid: this.order.appointment
      }
      console.log(params.uuid)
      /* api.isRebook(params).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          if (res.data.successObject.isRebook) {
            // 暂时逻辑都直接跳转页面
            this.isShowModal = true
          } else {
            MessageBox({
              title: '提示',
              message: '确认取消预约？',
              showCancelButton: true
            })
            MessageBox.confirm('确认取消预约？').then(action => {
              this.cancelConfirm()
            }).catch(res => {
              console.log('点击了取消按钮')
            })
          }
        }
      }) */
      // this.isShowModal = true
      let refundInfo = {
        order: this.order,
        projectList: this.projectList
      }
      sessionStorage.setItem('refundInfo', JSON.stringify(refundInfo))
      this.$router.push({path: '/refund', query: {uuid: this.$route.query.uuid}})
    },
    // cancelConfirm 确认取消预约
    cancelConfirm () {
      let params = {
        uuid: this.order.appointment
      }
      console.log(params.uuid)
      api.cancelAppointment(params).then(res => {
        if (res.data.code === 200) {
          console.log(res.data)
          Toast({
            message: '您已取消预约',
            position: 'bottom',
            duration: 3000
          })
          this.isShowBuy = true
        }
      }).catch(res => {
        Toast({
          message: '网络错误，请重试',
          position: 'bottom',
          duration: 3000
        })
      })
    },
    again () {
      let params = {
        uuid: this.$route.query.uuid
      }
      // 暂时逻辑都直接跳转页面
      this.$router.push({path: '/immediaterreservation', query: {uuid: params.uuid, appointmentTime: true}})
    }
  },
  mounted () {
    this.getOrderDetail()
    // 先判断是否存在query.status 目前先处理这两种状态 订单状态（1:待付款 2:待预约 3:进行中 4:已完成 5:已评价 6:待退款 7:已退款）
    let status = this.$route.query.status
    if (parseInt(status) === 2) {
      this.isAlreadAppoint = true
      this.isShowRefund = true
    } else if (parseInt(status) === 3) {
      this.isAlreadAppoint = false
      this.isShowRefund = true
    }
    // 预约成功0，取消预约1，改约成功2
    // let appointStatus = sessionStorage.getItem('appointStatus')
    // if (parseInt(appointStatus) === 0) {
    //   this.isAlreadAppoint = false
    // } else if (parseInt(appointStatus) === 1) {
    //   this.isShowBuy = true
    // } else if (parseInt(appointStatus) === 2) {
    //   this.isAlreadAppoint = false
    // } else {
    //   this.isAlreadAppoint = true
    // }
  }
}
</script>

<style scoped lang="scss">
  .appointment_confirm{
    width: 100%;
    min-height: 100vh;
    height: auto;
    background: #F1F1F1;
    position: relative;
    .tips{
      width:750px;
      height:190px;
      background:linear-gradient(-32deg,rgba(31,176,231,1) 0%,rgba(74,205,255,1) 100%);
    }
    .patient{
      position: absolute;
      width:690px;
      height:160px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius:10px;
      z-index: 2;
      left: 30px;
      top: 206px;
      .iden{
        position: absolute;
        width: 90px;
        height: 60px;
        left: 20px;
        top: 50px;
      }
      .pa_top, .pa_bot{
        position: absolute;
        width: 520px;
        height: auto;
        left: 150px;
        display: flex;
        justify-content: left;
        align-items: center;
        p{
          text-align: left;
        }
      }
      .pa_top{
        top: 34px;
        p{
          font-size: 32px;
          font-weight: 500;
          color: #444;
        }
        p:first-child{
          width: 140px;
          margin-right: 26px;
        }
      }
      .pa_bot{
        bottom: 34px;
        p{
          font-size: 24px;
          color: #777;
        }
        p:first-child{
          width: 140px;
          margin-right: 26px;
        }
      }
    }
    .info{
      width: 100%;
      height: 900px;
      max-height: 900px;
      overflow-y: scroll;
      background: #ffffff;
      border-radius:10px;
      margin-bottom: 118px;
      .order_num{
        display: flex;
        height: 32px;
        align-items: center;
        width: 100%;
        justify-content: left;
        margin-top: 120px;
        p{
          font-size:30px;
          color:rgba(68,68,68,1);
        }
        p:first-child{
          margin-left: 31px;
        }
        p:last-child{
          color: #38BF58;
        }
      }
      .pro_info, .user_remarks, .service_position{
        width: 675px;
        margin-left: 45px;
        margin-top: 30px;
        margin-right: 30px;
        p{
          text-align: left;
          color: #444444;
        }
        .tit{
          font-size: 26px;
          margin-bottom: 15px;
        }
        .pro_list{
          width: 635px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          height: 54px;
          font-size: 24px;
          justify-content: space-between;
          flex-wrap: wrap;
        }
      }
      .user_remarks, .service_position{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .tit{
          width: 120px;
        }
        .yhj{
          width: 110px;
          text-align: right;
        }
        .remark_list{
          margin-left: 50px;
          margin-right: auto;
          width: 484px;
          span{
            font-size: 24px;
            line-height: 40px;
          }
        }
      }
    }
    .footer{
      width: 100%;
      height: 98px;
      position: fixed;
      background: #ffffff;
      z-index: 5;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: right;
      button{
        font-size:26px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(119,119,119,1);
        margin-right: 40px;
      }
      .del_appoint{
        margin-left: auto;
        margin-right: 40px;
        width: 36px;
        height: 36px;
      }
      .refund{
        width:110px;
        height:60px;
        border:1px solid rgba(170,170,170,1);
        opacity:0.9;
        border-radius:30px;
        margin-left: auto;
      }
      .confirm{
        width:175px;
        height:60px;
        background:linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
        opacity:0.9;
        border-radius:30px;
        color:rgba(255,255,255,1);
        margin-right: 20px;
      }
      .cancel, .again, .again_buy{
        width:160px;
        height:60px;
        border:1px solid rgba(170,170,170,1);
        border-radius:30px;
      }
      .again, .again_buy{
        margin-right: 20px;
      }
      .cancel{
        margin-left: auto;
      }
    }
  }
</style>
