<template>
  <div class="order">
    <div class="tab">
      <p v-for="(item, ind) in tabData" :key="ind" @click="changeTab(ind)" :class="isSelect === ind ? 'active' : ''">{{item}}</p>
    </div>
    <div class="info_list">
      <!--订单号列表-->
      <div v-for="(itemOuter, ind) in outerData" :key="ind" class="order_num_list">
        <div class="order_num_container">
          <!--订单号头部信息-->
          <div class="info_header">
            <span class="order_num">订单号：20180723-12326544</span>
            <span :class="state_payment">代付款</span>
          </div>
          <!--该订单号下边的检查项目列表-->
          <ul>
            <li v-for="(itemInner, ind) in itemOuter.innerData" :key="ind">
              <img src="../../../static/images/20181108155159.png" alt="">
              <div class="check">
                <p class="check_name">血常规</p>
                <p class="check_hospital">西京医院</p>
              </div>
              <div class="cycle_cost">
                <p class="cycle">周期：<span>1-2d</span></p>
                <p class="cost">¥212.00</p>
              </div>
            </li>
          </ul>
          <!--就医人姓名和该订单下的总消费金额-->
          <div class="order_num_info">
            <p class="jyr">就医人：张某某</p>
            <p class="total">共计2件商品，总金额<span>¥424.00</span></p>
          </div>
        </div>
        <div class="del_again_pay">
          <img :src="delIcin" >
          <button class="pay_again">再次购买</button>
          <button class="pay_state">去付款</button>
        </div>
      </div>
      <!--一个列表完-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      tabData: ['全部', '代付款', '待预约', '进行中', '已完成', '待评价'],
      isSelect: 0,
      state_payment: 'fkq', // 此处分为付款前和付款后，名称用首字母组合
      outerData: [
        {
          innerData: [
            {
              'key': 1
            },
            {
              'key': 2
            }
          ]
        },
        {
          innerData: {
            'key': 2
          }
        }
      ],
      delIcin: require('../../assets/del.png')
    }
  },
  methods: {
    changeTab (ind) {
      this.isSelect = ind
    }
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
      }
      p.active{
        color: #1FB0E7;
        border-bottom: 2px solid #1FB0E7;/*no*/
      }
    }
    .info_list{
      width: 100%;
      margin-top: 10px;
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
                  margin-top: 50px;
                  font-size: $font18;
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
          margin-right: 30px;
          background: #FC9968;
          border: none;
          color: #ffffff;
        }
      }
    }
  }
</style>
