<template>
  <div class="order_detail">
    <Header :headerCon="headerCon"></Header>
    <!--用户信息部分，包含姓名，身份证号码联系方式等-->
    <div class="tips"></div>
    <!--就医人-->
    <div class="patient">
      <img :src="identifyIcon" class="iden">
      <div class="pa_top">
        <p>{{userInfo.name}}</p>
        <p>{{userInfo.phone}}</p>
      </div>
      <div class="pa_bot">
        <p>{{userInfo.certificatesType}}</p>
        <p>{{userInfo.certificatesNo}}</p>
      </div>
    </div>
    <!--流程到哪一步
    <div class="process">
      <div class="process_group">
        <img src="../../../assets/not_select_img.png">
        <p>未接单</p>
      </div>
      <div class="process_group">
        <img src="../../../assets/not_select_img.png">
        <p>未采样</p>
      </div>
      <div class="process_group">
        <img src="../../../assets/not_select_img.png">
        <p>未送检</p>
      </div>
      <div class="process_group">
        <img src="../../../assets/not_select_img.png">
        <p>等待上传报告</p>
      </div>
    </div>-->
    <!--预约编号-->
    <div class="order_number">
      <label>订单号:</label>
      <span>{{order.orderNo}}</span>
    </div>
    <!--体检项目列表-->
    <div class="list">
      <ul>
        <li v-for="(item, ind) in projectList" :key="ind" v-show="ind >= listLen ? false : true">
          <img src="../../../../static/images/20181108155159.png" alt="">
          <div class="check">
            <p class="check_name">{{item.name}}</p>
            <p class="check_hospital">{{item.hospital}}</p>
          </div>
          <div class="cycle_cost">
            <p class="cycle">周期：<span>{{item.period}}</span></p>
            <p class="cost">¥{{item.nowPrice}}</p>
          </div>
        </li>
      </ul>
      <p class="more" v-show="isShowMore" @click="showMore">查看剩余{{projectList.length - listLen}}个</p>
      <p class="more" @click="hide" v-show="!isShowMore">收起</p>
    </div>
    <div class="coupon">
      <p>优惠券</p>
      <p>{{order.coupon}}</p>
    </div>
    <div class="notes">
      <p>注意事项</p>
      <p>{{order.notes}}</p>
    </div>
    <div class="cost_list">
      <p>
        <span>项目费用(5)</span>
        <span>¥ {{order.projectPrice}}</span>
      </p>
      <p>
        <span>服务费用</span>
        <span>¥ {{order.servicePrice}}</span>
      </p>
      <p>
        <span>邮寄费用</span>
        <span>到付</span>
      </p>
      <p>
        <span>优惠</span>
        <span>-¥ {{order.couponPrice}}</span>
      </p>
    </div>
    <div class="submit">
      <p class="hj">合计:</p>
      <p class="total_price">¥ {{order.price}}</p>
      <button class="cancel_order">取消订单</button>
      <button :class="status === '1' ? 'pay' : ''" @click="goOrderConfirm">支付</button>
    </div>
  </div>
</template>

<script>
import Header from '../../common/Header'
import api from '../../../utils/api'
export default {
  name: 'OrderDetail',
  components: {
    Header
  },
  data () {
    return {
      headerCon: '订单详情',
      userInfo: {},
      projectList: [],
      order: {},
      listLen: 2,
      isShowMore: false,
      status: 1, // 用户从订单列表过来属于哪种状态 待支付 ，去预约等
      btnCon: '支付',
      identifyIcon: require('../../../assets/identity.png'),
      hospitalList: this.common.getStorage('hospitalList')
    }
  },
  methods: {
    // 跳转到订单确认页面
    goOrderConfirm () {
      let params = {
        uuid: this.$route.query.uuid
      }
      api.getOrderDetail(params).then(res => {
        if (res.data.code === 200) {
          let projectList = res.data.successObject.projectList
          // 根据医院id匹配医院名称
          for (let i in projectList) {
            for (let j in this.hospitalList) {
              if (projectList[i].hospital === this.hospitalList[j].uuid) {
                projectList[i].hospitalName = this.hospitalList[j].name
                projectList[i].hospitalLogo = this.hospitalList[j].logo
                break
              }
            }
          }

          let orderInfo = {
            userRemark: res.data.successObject.order.userRemark, // 用户备注
            scope: res.data.successObject.order.scope, // 服务位置 0:三环内, 1:三环外
            reportNeed: res.data.successObject.order.paperReport, // 纸质报告 0:不需要, 1:需要
            notes: res.data.successObject.order.notes, // 注意事项
            serviceCharge: res.data.successObject.order.servicePrice, // 服务费
            couponPrice: res.data.successObject.order.couponPrice, // 优惠金额
            price: res.data.successObject.order.price, // 订单金额
            uuid: res.data.successObject.order.uuid // 订单uuid
          }
          let orderConfirmInfo = {
            'totalPrice': res.data.successObject.order.projectPrice, // 项目金额
            'orderConfirmList': res.data.successObject.projectList, // 项目列表
            'projectNumber': res.data.successObject.order.projectCount, // 项目数量
            'patientInfo': res.data.successObject.patient, // 患者信息
            'orderInfo': orderInfo // 订单信息
          }
          this.common.setStorage('orderConfirmInfo', orderConfirmInfo)
          this.$router.push({ path: '/orderconfirm' })
        }
      }).catch(res => {
        console.log(res)
      })
    },
    getOrderDetail () {
      let obj = this.$route.query
      this.status = obj.status
      if (this.status === '1') {
        this.btnCon = '支付'
      } else {
        this.btnCon = '立即预约'
      }
      api.getOrderDetail(obj).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          let { order, patient, projectList } = res.data.successObject
          this.order = order
          this.userInfo = patient
          this.projectList = projectList
          if (this.projectList.length >= 3) {
            this.isShowMore = true
          }
        }
      })
    },
    goPay () {
      this.$router.push({name: 'OrderConfirm', params: { from: 'order', orderId: this.$route.query.uuid }})
    },
    showMore () {
      this.isShowMore = false
      this.listLen = this.projectList.length
    },
    hide () {
      this.isShowMore = true
      this.listLen = 2
    }
  },
  mounted () {
    this.getOrderDetail()
  }
}
</script>

<style scoped lang="scss">
  .order_detail{
    width: 100%;
    min-height: 100vh;
    height: auto;
    background: #ffffff;
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
    .user_info{
      width: 100%;
      height: 100px;
      padding: 15px 0;
      background:rgba(255,255,255,1);
      display: flex;
      justify-content: left;
      align-items: center;
      flex-wrap: wrap;
      p{
        width: 700px;
        height: $font26;
        display: inline-flex;
        justify-content: left;
        align-items: center;
        margin-left: 50px;
        label,span{
          color: #777777;
          font-size: $font22;
        }
        label{
          margin-right: 70px;
        }
        label.name{
          font-size: $font26;
          color: #444444;
        }
      }
    }
    .process{
      width: 100%;
      height: 180px;
      background: #f1f1f1;
      display: flex;
      align-items: center;
      justify-content: center;
      .process_group{
        width: 175px;
        position: relative;
        height: 80px;
        img{
          position: absolute;
          left: 0;
          height: 0;
          width: 32px;
          height: 32px;
        }
        p{
          color: #777;
          font-size: $font24;
          position: absolute;
          left: 0;
          top: 44px;
          text-indent: -1em;
        }
      }
      .process_group:first-child{
        margin-left: 96px;
      }
      .process_group:after{
        content: '';
        height: 2px;
        display: block;
        position: absolute;
        left: 32px;
        top: 15px;
        background: #aaaaaa;
        width: 143px;
      }
      .process_group:last-child{
        p{
          text-indent: -2.5em;
        }
      }
      .process_group:last-child:after{
        content: '';
        height: 0;
        display: none;
        position: absolute;
        left: 32px;
        top: 15px;
        background: #f1f1f1;
        width: 0;
      }
    }
    .order_number{
      background: #ffffff;
      margin-top: 90px;
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: left;
      align-items: center;
      color: #444444;
      font-size: $font28;
      label{
        margin-left: 30px;
        margin-right: 10px;
      }
      span{
        color: #38BF58;
      }
    }
    .list{
      width: 100%;
      height: auto;
      margin-bottom: 10px;
      background: #ffffff;
      ul{
        li{
          display: flex;
          width: 634px;
          margin: 0 auto;
          border-top: 1px solid #F1F1F1;
          height: 170px;
          justify-content: space-between;
          align-items: center;
          img{
            width: 150px;
            height: 130px;
            margin-top: 16px;
            border: 1px solid #1FB0E7;
          }
          .check{
            width: 200px;
            height: 130px;
            margin-left: 20px;
            display: inline-flex;
            flex-wrap: wrap;
            align-items: center;
            p{
              height: 60px;
              text-align: left;
              width: 200px;
              line-height: 60px;
            }
            .check_name{
              margin-top: 15px;
              color: #222222;
              font-size: $font30;
            }
            .check_hospital{
              margin-bottom: 15px;
              color: #AAAAAA;
              font-size: $font24;
            }
          }
          .cycle_cost{
            height: 130px;
            margin-left: auto;
            p{
              height: 30px;
              line-height: 30px;
            }
            .cycle{
              margin-top: 20px;
              color: #777777;
              font-size: $font22;
              span{
                color: #FF6136;
              }
            }
            .cost{
              margin-top: 50px;
              font-size: $font18;
              color: #777777;
            }
          }
        }
        li:first-child{
          margin-top: -26px;
          border-top: none;
        }
      }
      .more{
        width: 100%;
        height: 70px;
        line-height: 70px;
        text-align: center;
        border-top: 1px solid #F1F1F1;
      }
    }
    .coupon, .notes{
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 10px solid #f1f1f1;
      p{
        font-size: 30px;
        color: #444;
      }
      p:first-child{
        margin-left: 28px;
      }
      p:last-child{
        font-size: 26px;
        margin-right: 28px;
      }
    }
    .notes{
      p:last-child{
        color: #FF6136;
      }
    }
    .cost_list{
      width: 100%;
      height: 215px;
      p{
        width: 100%;
        height: 53.75px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          font-size: 26px;
          margin-left: 54px;
          margin-right: 54px;
          color: #444;
        }
        span:last-child{
          color: #FFC000;
        }
      }
      p:nth-child(3){
        span:last-child{
          color: #777777;
        }
      }
      p:last-child{
        span:last-child{
          color: #E8641B;
        }
      }
    }
    .user_info_list{
      width: 100%;
      height: auto;
      background: #ffffff;
      ul{
        li{
          width: 100%;
          display: flex;
          height: 80px;
          background: #ffffff;
          border-top: 1px solid #F1F1F1;
          justify-content: space-between;
          align-items: center;
          p:first-child{
            width: 140px;
            font-size: $font28;
            color: #444444;
            margin-left: 30px;
            text-align: left;
          }
          p:last-child{
            font-size: $font26;
            color: #777777;
            text-align: center;
            width: 578px;
            margin-right: auto;
            text-indent: -170px;
          }
        }
        li:nth-child(4){
          p:last-child{
            color: #FF6136;
          }
        }
        li:nth-child(7){
          border-top: 10px solid #F1F1F1;
          p:last-child{
            color: #FF6136;
          }
        }
      }
    }
    .submit{
      width: 100%;
      background: #ffffff;
      height: 98px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border-top: 2px solid #F1F1F1;
      .hj{
        font-size: 28px;
        color: #444;
        margin-left: 18px;
      }
      button{
        width: 148px;
        height: 60px;
        background: linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
        border-radius: 30px;
        margin-right: 20px;
        color: #ffffff;
      }
      .cancel_order{
        width: 160px;
        background: none;
        border:1px solid rgba(170,170,170,1);
        opacity:0.9;
        border-radius:30px;
        font-size:26px;
        color:rgba(119,119,119,1);
        margin-right: 40px;
        margin-left: auto;
      }
      .total_price{
        font-size: 32px;
        color: #FFC000;
        margin-left: 20px;
      }
      .pay{
        margin-right: 18px;
        background: linear-gradient(-30deg,rgba(232,100,27,1) 0%,rgba(255,125,53,1) 100%);
      }
    }
  }
</style>
