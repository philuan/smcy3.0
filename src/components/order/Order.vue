<template>
  <div class="order">
    <div class="tab">
      <p v-for="(item, ind) in tabData" :key="ind" @click="changeTab(ind)" :class="isSelect === ind ? 'active' : ''">{{item}}</p>
    </div>
    <div class="info_list">
      <!--订单号列表-->
      <div v-for="(itemRecords, ind) in records" :key="ind" class="order_num_list"  v-show="isShowList">
        <div class="order_num_container">
          <!--订单号头部信息-->
          <div class="info_header">
            <span class="order_num">订单号：{{itemRecords.order.orderNo}}</span>
            <span :class="state_payment">{{itemRecords.order.payStatus}}</span>
          </div>
          <!--该订单号下边的检查项目列表 {{hospitalList[ind].name}} {{itemInner.hospitalName}}-->
          <ul @click="goOrderDetail(itemRecords.order.uuid, itemRecords.order.orderStatus)">
            <li v-for="(itemInner, ind) in itemRecords.projectList" :key="ind">
              <img v-lazy="staticUrl + itemInner.image" alt="">
              <div class="check">
                <p class="check_name">{{itemInner.name}}</p>
                <p class="check_hospital">{{itemInner.hospitalName}}</p>
              </div>
              <div class="cycle_cost">
                <p class="cycle">周期：<span>{{itemInner.period}}</span></p>
                <p class="cost">¥{{itemInner.nowPrice}}</p>
              </div>
            </li>
          </ul>
          <!--就医人姓名和该订单下的总消费金额 就医人字段{{itemRecords.order.patient}}{{itemRecords.patient.name}}-->
          <div class="order_num_info">
            <p class="jyr">就医人：{{itemRecords.patient.name}}</p>
            <p class="total">共计{{itemRecords.projectList.length}}件商品，总金额&nbsp;<span>¥{{itemRecords.order.price}}</span></p>
          </div>
        </div>
        <div class="del_again_pay" v-show="itemRecords.order.isShowOrderBot">
          <!--<button class="pay_again">再次购买</button>-->
          <button :class="[itemRecords.order.orderStatus === '2' ? 'blue' : '', 'pay_state']" @click="goDetail(itemRecords.order.uuid, itemRecords.order.orderStatus)">{{itemRecords.order.payName}}</button>
        </div>
      </div>
      <!--一个列表完-->
    </div>
  </div>
</template>

<script>
import api from '../../utils/api'
import { config } from '../../config/config'
export default {
  name: 'Order',
  data () {
    return {
      staticUrl: config.static_url, // 配置图片url
      tabData: ['全部', '待付款', '待预约', '进行中', '待评价'],
      isSelect: 0,
      pageSize: 10,
      pageNo: 1,
      pageTotal: 1,
      orderStatus: '',
      state_payment: 'fkq', // 此处分为付款前和付款后，名称用首字母组合
      successObject: {},
      isShowList: false,
      records: [
        {
          projectList: [{hospitalName: ''}],
          order: {
            name: ''
          },
          patient: {
            name: ''
          }
        }
      ],
      hospitalList: this.common.getStorage('hospitalList')
    }
  },
  methods: {
    changeTab (ind) {
      this.isSelect = ind
      if (ind === 0) {
        this.orderStatus = ''
      } else {
        this.orderStatus = String(ind)
      }
      this.getOrderList()
    },
    goOrderDetail (uuid, status) {
      if (status === '1') {
        this.$router.push({path: '/orderdetail', query: { uuid: uuid, status: status }})
      } else {
        this.$router.push({path: '/appointmentconfirm', query: { uuid: uuid, status: status }})
      }
    },
    getOrderList () {
      let params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        orderStatus: this.orderStatus
      }
      api.getOrderList(params).then(res => {
        if (res.data.code === 200) {
          let { successObject } = res.data
          let { records } = successObject
          console.log(records)
          records.forEach(function (value, ind) {
            // isShowOrderBot用来判断是否显示底部按钮
            if (value.order.orderStatus === '1') {
              // 状态为1的时候表示代付款
              value.order['payStatus'] = '待付款'
              value.order.payName = '去付款'
              value.order.isShowOrderBot = true
            } else if (value.order.orderStatus === '2') {
              value.order.payStatus = '待预约'
              value.order.payName = '去预约'
              value.order.isShowOrderBot = true
            } else if (value.order.orderStatus === '3') {
              value.order.payStatus = '进行中'
              value.order.payName = ''
              value.order.isShowOrderBot = false
            } else if (value.order.orderStatus === '4') {
              value.order.payStatus = '待评价'
              value.order.payName = ''
              value.order.isShowOrderBot = false
            }
          })
          this.records = records
          console.log(this.records)
          this.pageTotal = successObject.pages
          this.isShowList = true
          // 处理医院编号对应医院名称
          if (records.length) { // 判断有没有数据，有数据的话再进入循环
            for (let k = 0; k < this.records.length; k++) {
              for (let i = 0; i < this.records[k].projectList.length; i++) {
                for (let j = 0; j < this.hospitalList.length; j++) {
                  if (parseInt(this.records[k].projectList[i].hospital) === parseInt(this.hospitalList[j].uuid)) {
                    this.records[k].projectList[i].hospitalName = this.hospitalList[j].name
                  }
                }
              }
            }
          }
        }
      })
    },
    goDetail (uuid, status) {
      // status是点击时候传过来的 1代表去付款   2代表去预约   其他数字暂时不显示按钮
      if (status === '1') {
        this.getOrderDetail(uuid)
      } else { //  跳转到其他状态 例如预约页面
        this.$router.push({path: '/appointmentconfirm', query: { uuid: uuid, status: status }})
      }
    },
    // 获取订单信息
    getOrderDetail (uuid) {
      let params = {
        uuid: uuid
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
            uuid: res.data.successObject.order.uuid, // 订单uuid
            coupon: res.data.successObject.order.coupon // 优惠券id

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
    }
  },
  mounted () {
    this.getOrderList()
  }
}
</script>

<style scoped lang='scss'>
  #app{
    width: 100%;
    height: 100%;
  }
  .fkq{
    color: #FF6136 !important;
  }
  .fkh{
    color: #444444;
  }
  .order{
    width: 100%;
    height: calc(100Vh - 100px);
    background: #EDF0F2;
    .tab{
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #FFFFFF;
      p{
        height: 78px;
        line-height: 78px;
        font-size: $font24;
        text-align: center;
      }
      p.active{
        color: #1FB0E7;
        font-size: $font26;
        border-bottom: 2px solid #1FB0E7;/*no*/
      }
    }
    .info_list{
      width: 100%;
      margin-top: 10px;
      margin-bottom: 90px;
      height: auto;
      .order_num_list{
        margin: 0 auto 10px;
        background: #ffffff;
        .order_num_container{
          width: 690px;
          margin: 0 auto;
          .info_header{
            width: 100%;
            height: 89px;
            border-bottom: 1px solid #EDF0F2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .order_num{
              font-size: $font28;
              color: #444444;
            }
          }
          ul{
            width: 100%;
            li{
              display: flex;
              width: 100%;
              height: 170px;
              justify-content: space-between;
              align-items: center;
              img{
                width: 150px;
                height: 130px;
                margin-left: 30px;
                margin-top: 20px;
                border: 1px solid #1FB0E7;
              }
              .check{
                width: 260px;
                height: 130px;
                margin-left: 20px;
                display: inline-flex;
                flex-wrap: wrap;
                align-items: center;
                p{
                  height: 60px;
                  text-align: left;
                  width: 260px;
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
                margin-right: 20px;
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
                  margin-top: 40px;
                  font-size: $font24;
                  color: #FFC000;
                }
              }
            }
          }
          .order_num_info{
            width: 100%;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #EDF0F2;/*no*/
            p{
              font-size: $font24;
              margin: 0 20px;
            }
            .total{
              span{
                color: #FFC000;
              }
            }
          }
        }
      }
      .del_again_pay{
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          width: 36px;
          height: 36px;
          margin-left: 30px;
          margin-right: auto;
        }
        button{
          width: 160px;
          height: 50px;
          border: 1px solid #777777;
          border-radius: 30px;
          font-size: $font22;
        }
        .pay_again{
          margin-right: 20px;
          color: #777777;
        }
        .pay_state{
          margin-left: auto;
          margin-right: 30px;
          background: #FC9968;
          border: none;
          color: #ffffff;
        }
        .blue{
          background:linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
        }
      }
    }
  }
</style>
