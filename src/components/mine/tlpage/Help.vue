<template>
  <div class="help">
    <Header :headerCon="headerCon"></Header>
    <div class="list">
      <ul>
        <li v-for="(item, ind) in list" :key="ind">
          <p>{{item.tit}}</p>
          <img :src="rightIcon" alt="">
        </li>
      </ul>
    </div>
    <div class="text">
      <p>反馈留言</p>
      <textarea name="" id="" cols="30" rows="10" placeholder="例：问题留言问题留言问题留言问题留言问
题留言问题留言问题留言..."></textarea>
      <button>提交</button>
    </div>
    <button class="contact">联系客服</button>
  </div>
</template>

<script>
import Header from '../../common/Header'
export default {
  name: 'Help',
  components: {
    Header
  },
  data () {
    return {
      headerCon: '帮助与反馈',
      list: [
        {
          tit: '退款/退换货'
        },
        {
          tit: '登录报错'
        },
        {
          tit: '新手任务奖励'
        },
        {
          tit: '就医问诊'
        },
        {
          tit: '上门服务'
        },
        {
          tit: '订单问题'
        }
      ],
      rightIcon: require('../../../assets/right_icon.png')
    }
  }
}
</script>

<style scoped lang="scss">
  .help{
    width: 100%;
    height: auto;
    min-height: 100vh;
    background: #F1F1F1;
    .list{
      width: 710px;
      height: auto;
      margin: 0 auto;
      ul{
        width: 100%;
        height: auto;
        background: #F1F1F1;
        li{
          width: 100%;
          height: 80px;
          margin-top: 10px;
          border-radius:10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          p{
            color: #1FB0E7;
            font-size: $font28;
            margin-left: 20px;
          }
          img{
            width: 20px;
            height: 32px;
            margin-right: 20px;
          }
        }
      }
    }
    .text{
      width: 710px;
      height: 200px;
      margin: 0 auto;
      background: #ffffff;
      margin-top: 10px;
      border-radius:10px;
      position: relative;
      p{
        position: absolute;
        width: 140px;
        height: 200px;
        text-align: center;
        left: 0;
        top: 10px;
        font-size: $font28;
        color: #444;
      }
      textarea{
        position: absolute;
        background: none;
        width: 540px;
        height: 126px;
        top: 10px;
        left: 140px;
        font-size: $font24;
        color: #aaaaaa;
      }
      button{
        width:120px;
        height:46px;
        border:2px solid rgba(31,176,231,1);
        border-radius:6px;
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: rgba(31,176,231,1);
      }
    }
    .contact{
      width:500px;
      height:70px;
      background:linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
      opacity:0.9;
      border-radius:35px;
      color: #ffffff;
      margin-top: 50px;
    }
  }
</style>
