<template>
  <div class="extension">
    <!--个人中心推广页面-->
    <!--头部-->
    <Header :headerCon="headerCon"></Header>
    <!--头部宣传图片-->
    <img src="../../../../static/images/extension.png" class="extension_img">
    <div class="extension_list">
      <ul>
        <li v-for="(item, ind) in extensionList" :key="ind">
          <img :src="item.src" alt="">
          <p>{{item.tit}}</p>
          <button :class="{ is_alread_extension: item.isAlreadExtension }">{{item.btnCon}}</button>
        </li>
      </ul>
    </div>
    <!--推广步骤-->
    <div class="extension_step">
      <p class="step_tit">推广步骤</p>
      <p>1.点击“推广”按钮，生成产品二维码。</p>
      <p>2.分享二维码给朋友或朋友圈。</p>
      <p>3.被推荐人成功在平台注册，使用，下单。</p>
      <p>4.平台获取推荐人使用的二维码给推荐人返利。</p>
    </div>
  </div>
</template>

<script>
import Header from '../../common/Header'
export default {
  name: 'Extension',
  components: {
    Header
  },
  data () {
    return {
      headerCon: '推广',
      extensionList: [
        {
          src: require('../../../assets/mine_img/jywy.png'),
          tit: '就医无忧',
          btnCon: '推广',
          isAlreadExtension: false
        },
        {
          src: require('../../../assets/mine_img/hywy.png'),
          tit: '化验无忧',
          btnCon: '已推广',
          isAlreadExtension: true
        },
        {
          src: require('../../../assets/mine_img/zzdyj.png'),
          tit: '自助打印机',
          btnCon: '推广',
          isAlreadExtension: false
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .extension{
    width: 100%;
    height: 100%;
    background: #F1F1F1;
    .extension_img{
      width: 100%;
      height: 300px;
    }
    .extension_list{
      width: 100%;
      height: auto;
      margin-top: 10px;
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 160px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2px;
          background: #FFFFFF;
          img{
            width: 130px;
            height: 130px;
            margin-left: 35px;
          }
          p{
            margin-left: 32px;
            color: #444;
            font-size: $font34;
            margin-right: auto;
          }
          button{
            width: 110px;
            height: 50px;
            color: #1FB0E7;
            border: 1px solid #1FB0E7;
            border-radius: 8px;
            margin-right: 30px;
          }
          .is_alread_extension{
            color: #AAAAAA;
            border: 1px solid #AAAAAA;
          }
        }
      }
    }
    .extension_step{
      width: 100%;
      height: 285px;
      background: #FFFFFF;
      margin-top: 10px;
      padding-top: 20px;
      p{
        color: #777;
        font-size: $font24;
        width: 100%;
        height: 48px;
        line-height: 48px;
        text-align: center;
      }
      .step_tit{
        height: 64px;
        line-height: 64px;
        color: #1FB0E7;
        font-size: $font34;
      }
    }
  }
</style>
