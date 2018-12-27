<template>
  <div class="pay_success">
    <div class="success_wrapper">
      <img src="@/assets/shopping_img/success_btn.png">
      <p class="label">{{labelCon}}！</p>
    </div>
    <div class="btn_wrapper">
      <div class="appointment_btn" @click="skipToAppointment" v-show="isShowAppBth">立即预约</div>
      <router-link tag="div" class="back_btn" to="/order">返回</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: [],
  data () {
    return {
      isShowAppBth: true,
      labelCon: '付款成功'
    }
  },
  methods: {
    skipToAppointment () {
      this.$router.push({path: '/immediaterreservation', query: {appointment: this.$route.query.uuid}})
    }
  },
  mounted () {
    if (this.$route.query.appointmentTime && !this.$route.query.update) {
      this.isShowAppBth = false
      this.labelCon = '预约成功'
    }
    if (this.$route.query.appointmentTime && this.$route.query.update) {
      this.isShowAppBth = false
      this.labelCon = '重新预约成功'
    }
  }
}
</script>
<style lang="scss" scoped>
.pay_success{
  height: 100Vh;
  background: #f1f1f1;
  .success_wrapper{
    position: absolute;
    top: 270px;
    left: 0;
    width: 100%;
    text-align: center;
    .time{
      margin-top: 84px;
      font-size: 28px;
      color: #777;
    }
    .label{
      margin-top: 40px;
      font-size: 28px;
      color: #444;
    }
  }
  .btn_wrapper{
    position: fixed;
    bottom: 70px;
    left: 0;
    right: 0;
    text-align: center;
    .appointment_btn{
      margin: 0 auto;
      width: 500px;
      line-height: 70px;
      height: 70px;
      text-align: center;
      color: #fff;
      font-size: 28px;
      background: #36C8FF;
      border-radius: 36px;
      margin-top: 40px;
    }
    .back_btn{
      margin: 0 auto;
      width: 500px;
      box-sizing: border-box;
      line-height: 70px;
      height: 70px;
      text-align: center;
      color: #1FB0E7;
      font-size: 28px;
      border: 1px solid #1FB0E7;
      border-radius: 36px;
      margin-top: 40px;
    }
  }
}
</style>
