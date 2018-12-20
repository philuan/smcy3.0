<template>
  <!--个人信息页面-->
  <div class="personal">
    <Header :headerCon="headerCon"></Header>
    <div class="photo">
       <img src="../../../../static/images/personal_photo.png" alt="">
    </div>
    <div class="nc">
      <p class="tit">昵称</p>
      <p class="name">王某某</p>
    </div>
    <div class="gender">
      <p>
        <img :src="selectImg" v-if="isSelect" @click="changeGender">
        <img :src="notSelectImg" v-if="!isSelect" @click="changeGender">
        <span>男</span>
      </p>
      <p>
        <img :src="selectImg" v-if="!isSelect" @click="changeGender">
        <img :src="notSelectImg" v-if="isSelect" @click="changeGender">
        <span>女</span>
      </p>
    </div>
    <div class="address">
      <p>居住地址</p>
      <p>陕西省西安市XX区XX路</p>
    </div>
    <div class="sign">
      <p class="sign_tit">
        体征
      </p>
      <p>
        <span class="sign_num">0</span>
        <span class="sign_descri">年龄(岁)</span>
      </p>
      <p>
        <span class="sign_num">900</span>
        <span class="sign_descri">体重(kg)</span>
      </p>
      <p>
        <span class="sign_num">0</span>
        <span class="sign_descri">身高(cm)</span>
      </p>
    </div>
    <button class="confirm">确定</button>
  </div>
</template>

<script>
import Header from '../../common/Header'
export default {
  name: 'PersionalInformation',
  components: {
    Header
  },
  data () {
    return {
      isSelect: true,
      headerCon: '个人信息',
      selectImg: require('../../../assets/select_img.png'),
      notSelectImg: require('../../../assets/not_select_img.png')
    }
  },
  methods: {
    changeGender () {
      this.isSelect = !this.isSelect
    }
  }
}
</script>

<style scoped lang="scss">
  .personal{
    width: 100%;
    height: 100vh;
    background: #F1F1F1;
    position: relative;
    .photo{
      margin-top: 2px;
      width: 100%;
      height: 210px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF;
      img{
        width: 154px;
        height: 154px;
      }
    }
    .nc{
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      margin-top: 10px;
      .tit{
        color: #444;
        font-size: $font30;
        margin-left: 109px;
      }
      .name{
        color: #777;
        font-size: $font28;
        margin-left: 55px;
        margin-right: auto;
      }
    }
    .gender{
      width: 100%;
      height: 90px;
      margin-top: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      p{
        height: 90px;
        line-height: 90px;
        display: inline-flex;
        align-items: center;
        img{
          width: 32px;
          height: 32px;
          margin-right: 19px;
        }
        span{
          color: #777;
          font-size: $font28;
        }
      }
      p:first-child{
        margin-right: 127px;
      }
    }
    .address{
      width: 100%;
      height: 90px;
      background: #ffffff;
      display: flex;
      align-items: center;
      margin-top: 2px;
      p:first-child{
        color: #444;
        font-size: $font30;
        margin-left: 49px;
      }
      p:last-child{
        color: #777;
        font-size: $font28;
        margin-left: 55px;
      }
    }
    .sign{
      width: 100%;
      height: 140px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 2px;
      background: #ffffff;
      p{
        width: 100px;
        height: 100px;
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        .sign_num{
          width: 50px;
          height: 44px;
          line-height: 44px;
          background: #F1F1F1;
          margin-bottom: auto;
        }
        .sign_descri{
          color: #777;
          font-size: $font24;
        }
      }
      .sign_tit{
        height: 140px;
        line-height: 140px;
        font-size: $font30;
        font-weight: 500;
        color: #444;
      }
    }
    .confirm{
      position: absolute;
      bottom: 70px;
      left: 125px;
      width: 500px;
      height: 70px;
      background: linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
      opacity: 0.9;
      border-radius: 35px;
      font-size: $font28;
      font-family: SimHei;
      font-weight:  400;
      color: rgba(255,255,255,1);
    }
  }
</style>
