<template>
  <div class="mine">
    <div class="header">
      <!--推广和设置图标-->
      <div class="extension_setting">
        <img :src="extensionImg" class="extension" @click="goRouter('Extension')">
        <img :src="settingImg" class="setting" @click="goRouter('Setting')">
      </div>
      <!--名字个人信息头像-->
      <div class="name_img">
        <p>
          <span>张珊珊</span>
          <span @click="goRouter('PersionalInformation')">个人信息>></span>
        </p>
        <img :src="defaultImg" alt="">
      </div>
      <!--积分预约评价优惠券-->
      <div class="header_info">
        <p @click="goRouter('Integral')">
          <span>123</span>
          <span>积分 (分)</span>
        </p>
        <p @click="goRouter('Appointment')">
          <span>2</span>
          <span>预约 (次)</span>
        </p>
        <p @click="goRouter('MyComment')">
          <span>34</span>
          <span>评价 (条)</span>
        </p>
        <p @click="goRouter('Coupon')">
          <span>1</span>
          <span>优惠券 (张)</span>
        </p>
      </div>
    </div>
    <!--header end-->
    <div class="list">
      <div class="red_envelopes">
        <img src="../../../static/images/hongbao1497.png" class="envelopes">
      </div>
      <ul>
        <li v-for="(item, ind) in listData" :key="ind" @click="goRouter(item.rName)">
          <img :src="item.img" alt="">
          <p class="list_title">{{item.title}}</p>
          <p class="arrow"> > </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data () {
    return {
      extensionImg: require('../../assets/mine_img/mine_extension.png'),
      settingImg: require('../../assets/mine_img/mine_setting.png'),
      defaultImg: require('../../assets/mine_img/mine_default_img.png'),
      listData: [
        {
          img: require('../../assets/mine_img/mine_follow.png'),
          title: '我的关注',
          rName: 'MyFollow'
        },
        {
          img: require('../../assets/mine_img/mine_presentation.png'),
          title: '我的报告',
          rName: 'MyReport'
        },
        // {
        //   img: require('../../assets/mine_img/mine_address.png'),
        //   title: '地址管理'
        // },
        {
          img: require('../../assets/mine_img/mine_family.png'),
          title: '就医人管理',
          rName: 'PatientList' // 路由地址
        },
        {
          img: require('../../assets/mine_img/help_feedback.png'),
          title: '帮助与反馈',
          rName: 'Help'
        }
      ]
    }
  },
  methods: {
    goRouter (name) {
      this.$router.push({name: name})
    }
  }
}
</script>

<style scoped lang='scss'>
  #app{
    width: 100%;
    height: 100%;
  }
  .mine{
    width: 100%;
    height: 100vh;
    background: #F1F1F1;
    .header{
      width: 100%;
      height: 330px;
      padding-top: 20px;
      background: url("../../../static/images/minebg20181110150137.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      .extension_setting{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 60px;
        img{
          width: 60px;
          height: 60px;
        }
        .extension{
          margin-left: 30px;
        }
        .setting{
          margin-right: 30px;
        }
      }
      .name_img{
        width: 630px;
        height: 110px;
        margin: 28px auto 0;
        display: flex;
        justify-content: space-between;
        p{
          color: #ffffff;
          width: 300px;
          text-align: left;
          span{
            width: 100%;
            display: inline-block;
          }
          span:first-child{
            font-size: $font44;
            margin-top: 11px;
          }
          span:nth-child(2){
            font-size: $font22;
            margin-top: 13px;
          }
        }
        img{
          width: 96px;
          height: 96px;
        }
      }
      .header_info{
        position: absolute;
        width: 100%;
        height: 100px;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(0, 0, 0, .2);
        p{
          width: 186px;
          height: 70px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          span{
            width: 100%;
            font-size: $font24;
          }
          span:first-child{
            color: #E7CD1F;
          }
          span:nth-child(2){
            color: #ffffff;
          }
        }
        p:nth-child(1),p:nth-child(2),p:nth-child(3){
          border-right: 2px solid #DAE1F7;
        }
      }
    }
    .list{
      padding: 0;
      background: #F1F1F1;
      .red_envelopes{
        width: 100%;
        height: 129px;
        padding-top: 20px;
        padding-bottom: 10px;
        background: #ffffff;
        margin-bottom: 2px;
        .envelopes{
          width: 624px;
          height: 129px;
        }
      }
      width: 100%;
      height: auto;
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 90px;
          background: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img{
            width: 44px;
            height: 44px;
            margin-left: 30px;
          }
          .list_title{
            margin-left: 20px;
            color: #111111;
            font-size: $font32;
          }
          .arrow{
            color: #BFBFBF;
            transform: scaleY(2.5);
            font-size: $font22;
            margin-left: auto;
            margin-right: 30px;
          }
        }
        li:nth-child(2n-1){
          border-bottom: 2px solid #F1F1F1;
        }
        li:nth-child(2n){
          border-bottom: 10px solid #F1F1F1;
        }
        li:last-child{
          border-bottom: none !important;
        }
      }
    }
  }
</style>
