<template>
  <!--我的报告页面-->
  <div class="report">
    <Header :headerCon="headerCon"></Header>
    <div class="report_list">
      <div class="report_time">
        <p>2018.07.01-</p>
        <img :src="leftIcon" v-show="isSelectDown" class="left_icon">
        <img :src="downIcon" v-show="!isSelectDown" class="down_icon">
      </div>
      <ul>
        <li v-for="(item, ind) in reportList" :key="ind">
          <div class="order_num_time">
            <p class="order_num">订单号：<span>20180723-12326544</span></p>
            <p class="order_time">2018.07.05  14:20:00</p>
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
          <div class="jyr_btn">
            <p class="jyr">就医人：&nbsp;&nbsp;<span>某某某</span></p>
            <button>查看报告1/2</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../../common/Header'
export default {
  name: 'MyReport',
  components: {
    Header
  },
  data () {
    return {
      headerCon: '我的报告',
      leftIcon: require('../../../assets/left_icon.png'),
      downIcon: require('../../../assets/down_img.png'),
      isSelectDown: false, // 显示左箭头还是下拉箭头
      reportList: [
        {},
        {},
        {}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .report{
    width: 100%;
    height: auto;
    .report_list{
      width: 730px;
      height: auto;
      margin: 0 auto;
      border-radius: 10px;
      box-shadow:0px 1px 8px 0px rgba(136,136,136,0.3);
      margin-top: 20px;
      .report_time{
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #ffffff;
        box-shadow:0px 1px 8px 0px rgba(136,136,136,0.3);
        border-top-left-radius:10px;
        border-top-right-radius: 10px;
        p{
          margin-left: 20px;
          color: #444;
          font-size: $font28;
        }
        img{
          margin-right: 20px;
        }
        .left_icon{
          width: 14px;
          height: 26px;
        }
        .down_icon{
          width: 40px;
          height: 26px;
        }
      }
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 270px;
          .order_num_time{
            width: 650px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
            .order_num{
              font-size: $font26;
              color: #444;
              span{
                color: #38BF58;
              }
            }
            .order_time{
              color: #777;
              font-size: $font24;
            }
          }
          .visite_items{
            width: 600px;
            margin: 0 auto;
            display: flex;
            justify-content: left;
            .visite_name{
              text-align: left;
              width: 160px;
              color: #444;
              font-size: $font24;
            }
            .visite_list{
              width: 400px;
              text-align: left;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              span{
                width: 101px;
                font-size: $font24;
                color: #777;
                margin-bottom: 20px;
                margin-right: 10px;
              }
            }
          }
          .jyr_btn{
            width: 650px;
            margin: 0 auto;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .jyr{
              width: 360px;
              text-align: left;
              color: #444;
              font-size: $font26;
              span{
                color: #777;
              }
            }
            button{
              width:180px;
              height:50px;
              background:linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
              border-radius:25px;
              color: #ffffff;
              font-size: $font24;
            }
          }
        }
        li:nth-child(odd){
          background: #F2F5FF;
        }
        li:last-child{
          box-shadow:0px 1px 8px 0px rgba(136,136,136,0.3);
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }
</style>
