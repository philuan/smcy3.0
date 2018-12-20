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
    <mt-datetime-picker
      ref="picker"
      type="date-time"
      :startDate="startDate"
      @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>
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
      startDate: new Date(), // 预约初始化时间定义为当前时间
      projectList: ['项目名称', '项目名称', '项目名称', '项目名称', '项目名称项目名称']
    }
  },
  methods: {
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
        MessageBox({
          title: '是否确认预约',
          message: message,
          showCancelButton: true
        })
        MessageBox.confirm(message).then(action => {
          if (!this.$route.query.appointmentTime) {
            // 不存在代表立即预约
            let params = {
              orderList: this.$route.query.appointment,
              appointmentTime: this.$refs.appointTime.innerHTML
            }
            console.log(params)
            api.addAppointment(params).then(res => {
              console.log(res)
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
          } else { // 代表重新预约
            let params = {
              uuid: this.$route.query.appointment, // 预约号
              appointmentTime: this.$refs.appointTime.innerHTML
            }
            api.updateAppointment(params).then(res => {
              if (res.data.code === 200) {
                // 预约成功0，取消预约1，改约成功2
                // sessionStorage.setItem('appointStatus', 2)
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
        }).catch(res => {
          console.log('网络错误')
        })
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
  }
</style>
