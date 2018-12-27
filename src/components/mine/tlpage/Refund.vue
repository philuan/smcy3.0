<template>
  <div class="refund">
    <Header :headerCon="headerCon"></Header>
    <div class="con">
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
    </div>
    <div class="refund_cost">
      <p class="tit">退款金额</p>
      <p class="refund_num">¥ {{successObject.refundPrice}}</p>
    </div>
    <div class="tips">最多 ,优惠券抵用费用不予退还</div>
    <div class="refund_reason">
      <div class="tit">退款原因</div>
      <div class="reason" @click="isShowList">{{defaultReason}}</div>
      <div class="reason_list">
        <p v-for="(item, ind) in refundReason" :key="ind" v-show="isShow" @click="getReason(item)">{{item}}</p>
      </div>
    </div>
    <button @click="submit">确定</button>
  </div>
</template>

<script>
import Header from '../../common/Header'
import { MessageBox, Toast } from 'mint-ui'
import api from '../../../utils/api'
export default {
  name: 'Refund',
  components: {
    Header,
    MessageBox,
    Toast
  },
  data () {
    return {
      headerCon: '申请退款',
      refundReason: ['不想买了', '任性', '就想退'],
      isShow: false, // 开始是隐藏状态
      defaultReason: '请选择',
      successObject: {},
      projectList: [],
      order: {}
    }
  },
  methods: {
    getCon () {
      let params = {
        uuid: this.$route.query.uuid
      }
      api.beforeRefund(params).then(res => {
        if (res.data.code === 200) {
          let { successObject } = res.data
          this.successObject = successObject
        }
      })
    },
    isShowList () {
      this.isShow = true
    },
    getReason (item) {
      this.defaultReason = item
      this.isShow = false
    },
    submit () {
      MessageBox({
        title: '提示',
        message: '确认提交申请',
        showCancelButton: true
      })
      MessageBox.confirm('确认提交申请').then(action => {
        if (this.defaultReason === '请选择') {
          Toast({
            message: '请填写退款理由',
            position: 'bottom',
            duration: 3000
          })
          return false
        }
        let params = {
          uuid: this.$route.query.uuid,
          refundPrice: this.successObject.refundPrice,
          refundCause: this.$refs.reason.value
        }
        console.log(params)
        api.submitRefund(params).then(res => {
          if (res.data.code === 200) {
            Toast({
              message: '退款成功',
              position: 'bottom',
              duration: 3000
            })
          }
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    if (sessionStorage.getItem('refundInfo')) {
      let refundInfo = JSON.parse(sessionStorage.getItem('refundInfo'))
      this.order = refundInfo.order
      this.projectList = refundInfo.projectList
    }
    this.getCon()
  }
}
</script>

<style scoped lang='scss'>
  .refund{
    width: 100%;
    height: auto;
    min-height: 100vh;
    background: #ffffff;
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
    .con{
      width:730px;
      height:352px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius:10px;
      margin: 10px auto;
      overflow-y: scroll;
      max-height: 352px;
      .order_num{
        display: flex;
        height: 32px;
        align-items: center;
        width: 100%;
        justify-content: left;
        margin-top: 30px;
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
    }
    .refund_cost{
      width: 100%;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background:rgba(245,248,255,1);
      p{
        font-size: 30px;
        color: #222;
      }
      .tit{
        margin-left: 31px;
      }
      .refund_num{
        margin-right: 31px;
        color: #FFC000;
        font-size: 32px;
      }
    }
    .tips{
      width: 96%;
      height: 70px;
      padding-right: 4%;
      text-align: right;
      line-height: 70px;
      font-size: 24px;
      color: #777777;
    }
    .refund_reason{
      width: 100%;
      height: 90px;
      position: relative;
      background:rgba(245,248,255,1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 300px;
      .tit{
        margin-left: 31px;
      }
      .reason{
        margin-left: auto;
        margin-right: 40px;
      }
      .reason_list{
        position: absolute;
        left: 0;
        top: 91px;
        width: 100%;
        height: auto;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        z-index: 10;
        p{
          width: 100%;
          height: 90px;
          font-size: 32px;
          text-align: center;
          line-height: 90px;
          border-top: 1px solid #aaaaaa;
        }
      }
    }
    button{
      width:500px;
      height:70px;
      background:linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
      opacity:0.9;
      border-radius:35px;
      color: #ffffff;
      font-size:28px;
    }
  }
</style>
