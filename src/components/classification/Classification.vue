<template>
  <div class="classification">
    <header></header>
    <div class="tab">
      <!--子组件列表并监听组件方法changeInd-->
      <Tab-Left :tab_list="tabList" :isSelect="isSelect" @changeInd="changeInd" class="tab_left"></Tab-Left>
      <div class="tab_right">
        <img src="../../../static/images/caceshi.png"  class="showImg">
        <ul>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕头疼/头晕头疼</p>
          </li>
          <li>
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>头疼/头晕</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TabLeft from '../common/Tab_left'
export default {
  name: 'Classification',
  components: {
    TabLeft
  },
  data () {
    return {
      tabList: ['症状', '疾病', '人群', '专业', '套餐'],
      isSelect: 0 // 下标值，通过监听子组件changeInd方法，在父组件中触发
    }
  },
  methods: {
    // 触发子组件的方法
    changeInd (ind) {
      console.log(ind)
      this.isSelect = ind // 接受子组件传递过来的参数
      sessionStorage.setItem('tab_left_ind', ind)
    }
  },
  mounted () {
    if (sessionStorage.getItem('tab_left_ind')) {
      this.isSelect = sessionStorage.getItem('tab_left_ind')
    }
  }
}
</script>

<style scoped lang='scss'>
  #app{
    width: 100%;
    height: 100%;
  }
  .classification{
    width: 100%;
    height: 100%;
    header{
      width: 100%;
      border-bottom: 1px solid #F0F6FA;
      height: 80px;
    }
    .tab{
      width: 100%;
      /*
      *  头部80px 1px底部边框 底部98px 2px的背影
      */
      position: relative;
      height: calc(100vh - 183px);
      .tab_left{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 3;
        height: 100%;
        overflow-y: scroll;
        background: #F0F6FA;
      }
      .tab_right{
        position: absolute;
        left: 142px;
        top: 0;
        width: 608px;
        height: 100%;
        overflow-y: scroll;
        z-index: 2;
        .showImg{
          width: 538px;
          height: 180px;
          margin: 30px auto;
        }
        ul{
          width: 538px;
          height: auto;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          li{
            width: 156px;
            img{
              width: 156px;
              height: 114px;
            }
            p{
              width: 100%;
              height: 60px;
              line-height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: $font24;
            }
          }
        }
      }
    }
  }
</style>
