<template>
  <!--个人中心预约页面-->
  <div class="appointment">
    <Header :headerCon="headerCon"></Header>
    <div class="list">
      <ul>
        <li v-for="(item, ind) in appointmentList" :key="ind">
          <div class="order_num_time">
            <p class="order_num">订单号：<span>20180723-12326544</span></p>
            <!--<p class="order_time">2018.07.05  14:20:00</p>-->
          </div>
          <div class="visite_items">
            <p class="visite_name">就诊项目：</p>
            <p class="visite_list">
              <span>项目名称</span>
              <span>项目名称</span>
              <span>项目名称</span>
              <span>项目名称</span>
            </p>
          </div>
          <p class="jyr">就医人：<span>某某某</span></p>
          <div class="pending" v-if="item.isPending">
            <div class="pending_l">
              <p>服务护士：李某某 &nbsp;&nbsp;&nbsp;&nbsp;158****8792</p>
              <p>预约时间：<span :class="{isBlue: item.isPending && !item.isComplated}">2018.06.05  14:20:00</span></p>
            </div>
            <!--已经开始预约但是状态还未完成显示-->
            <button class="pending_r" v-show="item.isPending && !item.isComplated">联系护士</button>
          </div>
          <p class="state">状态：<span :class="{completed: !item.isComplated }">{{item.state}}</span></p>
          <!--未完成才显示最后一行按钮-->
          <div class="btns" v-if="!item.isComplated">
            <!--完成以后不显示按钮-->
            <button v-show="!item.isComplated">联系客服</button>
            <!--未完成且预约没有开始才显示按钮-->
            <button class="go_appoint" v-show="!item.isComplated && !item.isPending">去预约</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../../common/Header'
export default {
  name: 'Appointment',
  components: {
    Header
  },
  data () {
    return {
      headerCon: '预约',
      appointmentList: [
        {
          isPending: false, // 判断用户是否已经开始预约，如果已经开始，则显示护士信息
          isComplated: false, // 判断用户是否已经完成，如果未完成预约的话，字体显示橘红色
          state: '待预约'
        },
        {
          isPending: true,
          isComplated: false,
          state: '进行中'
        },
        {
          isPending: true,
          isComplated: true,
          state: '已完成'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .appointment{
    width: 100%;
    height: auto;
    .list{
      width: 100%;
      height: auto;
      ul{
        margin-top: 20px;
        width: 100%;
        height: auto;
        li{
          width: 710px;
          height: auto;
          margin: 0 auto;
          padding-bottom: 15px;
          margin-bottom: 10px;
          background:rgba(255,255,255,1);
          box-shadow:2px 2px 10px 0px rgba(0, 0, 0, 0.2);
          border-radius:10px;
          .order_num_time{
            width: 670px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
            .order_num{
              font-size: $font30;
              color: #444;
              span{
                color: #38BF58;
              }
            }
            .order_time {
              color: #777;
              font-size: $font24;
            }
          }
          .visite_items{
            width: 630px;
            margin: 0 auto;
            display: flex;
            justify-content: left;
            .visite_name{
              text-align: left;
              width: 160px;
              color: #444;
              font-size: $font26;
            }
            .visite_list{
              width: 400px;
              text-align: left;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              span{
                width: 101px;
                font-size: $font26;
                color: #777;
                margin-bottom: 20px;
              }
            }
          }
          .jyr{
            width: 630px;
            margin: 0 auto;
            text-align: left;
            color: #444;
            font-size: $font26;
            span{
              color: #777;
            }
          }
          .pending{
            width: 630px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .pending_l{
              width: 400px;
              height: auto;
              margin-left: 45px;
              p{
                text-align: left;
                color: #444;
                font-size: $font26;
                line-height: 46px;
                .isBlue{
                  color: #1FB0E7;
                }
              }
            }
            .pending_r{
              width: 130px;
              height: 44px;
              border: 2px solid rgba(170,170,170,1);
              border-radius: 22px;
              font-size: $font26;
              color: #aaaaaa;
            }
          }
          .state{
            width: 650px;
            margin: 20px auto 0;
            text-align: left;
            color: #444;
            font-size: $font26;
            .completed{
              color: #E7532B;
            }
          }
          .btns{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: flex-end;
            margin-top: 5px;
            button{
              width: 150px;
              height: 50px;
              border:2px solid rgba(170,170,170,1);
              border-radius:25px;
              color: #aaaaaa;
              margin-right: 20px;
            }
            .go_appoint{
              background:linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
              opacity:0.9;
              border: none;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
</style>
