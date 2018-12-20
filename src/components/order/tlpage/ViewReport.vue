<template>
  <!--查看报告页面-->
  <div class="report">
    <Header :headerCon="headerCon"></Header>
    <div class="order_number">
      <p>订单号：<span>2018809-3198809809</span></p>
      <p>状态：<span>已完成</span></p>
    </div>
    <div class="result_list">
      <ul>
        <li>
          <div class="code_num">
            <p>条码号：4387228</p>
            <p>1/2</p>
          </div>
          <p class="result_name">肾功四项+肾功四项</p>
          <img src="../../../../static/images/viewreport_result.png">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../../common/Header'
export default {
  name: 'ViewReport',
  components: {
    Header
  },
  data () {
    return {
      headerCon: '查看报告'
    }
  }
}
</script>

<style scoped lang="scss">
  .report{
    width: 100%;
    height: 100vh;
    .order_number{
      border-top: 1px solid #F1F1F1;
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p{
        color: #444444;
        font-size: $font28;
        span{
          color: #38BF58;
        }
      }
      p:first-child{
        margin-left: 40px;
      }
      p:last-child{
        margin-right: 40px;
      }
    }
    .result_list{
      width: 710px;
      height: 490px;
      margin: 0 auto;
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 490px;
          margin-bottom: 10px;
          background: #F2F5FF;
          .code_num{
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p{
              color: #444444;
              font-size: $font26;
            }
            p:first-child{
              margin-left: 44px;
            }
            p:last-child{
              color: #38BF58;
              margin-right: 44px;
            }
          }
          .result_name{
            width: 100%;
            text-align: center;
            height: $font24;
            line-height: $font24;
            font-size: $font24;
            color: #1FB0E7;
          }
          img{
            width: 483px;
            height: 351px;
            margin: 10px auto;
          }
        }
      }
    }
  }
</style>
