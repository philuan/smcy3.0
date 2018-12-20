<template>
  <!--积分页面-->
  <div class="integral">
    <Header :headerCon="headerCon"></Header>
    <div class="my_integral">
      <p>我的积分</p>
      <span class="integral_num">123</span>
      <span class="extension_integral">推广/分享</span>
      <span class="earn_integral">赚积分</span>
    </div>
    <div class="list">
      <ul>
        <li v-for="(item, ind) in integralList" :key="ind">
          <div class="money">
            <p class="mh">
              <span class="symbol">¥</span>
              <span>20</span>
            </p>
            <p class="jfs">450积分</p>
          </div>
          <div class="qm_yxq">
            <p class="qm">{{item.qm}}</p>
            <p class="yxq">有效期至{{item.yxq}}</p>
          </div>
          <button class="exchange">兑换</button>
          <p class="describe">具体使用说明以购买页的活动规则为准</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../../common/Header'
export default {
  name: 'Integral',
  components: {
    Header
  },
  data () {
    return {
      headerCon: '积分',
      integralList: [
        {
          qm: '化验无忧通用劵',
          yxq: '2018.08.05'
        },
        {
          qm: '西安交通大学第一附属医院劵',
          yxq: '2018.08.05'
        },
        {
          qm: '西京医院劵',
          yxq: '2018.08.05'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .integral{
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    background: #F1F1F1;
    .my_integral{
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      margin-top: 2px;
      p{
        margin-left: 30px;
        color: #444;
        font-size: $font30;
      }
      .integral_num{
        color: #38BF58;
        font-size: $font36;
        margin-left: 30px;
        margin-right: auto;
      }
      .extension_integral, .earn_integral{
        color: #38BF58;
        font-size: $font26;
      }
      .earn_integral{
        margin-right: 30px;
        margin-left: 20px;
      }
    }
    .list{
      width: 100%;
      height: auto;
      ul{
        width: 100%;
        height: auto;
        background: #F1F1F1;
        li{
          position: relative;
          width: 710px;
          height: 200px;
          margin: 20px auto 0;
          background: url("../../../assets/mine_img/integral_bg.png") no-repeat;
          background-size: 100% 100%;
          .money{
            position: absolute;
            width: 140px;
            height: 103px;
            top: 20px;
            left: 30px;
            border-right: 2px solid #F1F1F1;
            p{
              text-align: left;
            }
            .mh{
              height: 76px;
              .symbol{
                font-size: $font30;
              }
              span{
                color: #1FB0E7;
                font-size: $font68;
              }
            }
            .jfs{
              color: #1FB0E7;
              font-size: $font22;
              text-indent: .5em;
            }
          }
          .qm_yxq{
            position: absolute;
            left: 193px;
            top: 20px;
            height: 103px;
            width: 360px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
            p{
              width: 100%;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              text-align: left;
            }
            .qm{
              color: #444;
              font-size: $font26;
            }
            .yxq{
              color: #777;
              font-size: $font22;
            }
          }
          .exchange{
            position: absolute;
            display: block;
            width:130px;
            height:50px;
            line-height: 50px;
            background:linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
            opacity:0.9;
            border-radius:25px;
            top: 55px;
            right: 20px;
            color: #ffffff;
            font-size: $font24;
          }
          .describe{
            position: absolute;
            width: 680px;
            height: 58px;
            left: 30px;
            top: 142px;
            line-height: 58px;
            color: #777;
            font-size: $font22;
            text-align: left;
          }
        }
      }
    }
  }
</style>
