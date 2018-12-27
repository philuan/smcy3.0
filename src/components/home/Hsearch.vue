<template lang="html">
  <div class="search">
    <div class="location">雁塔区</div>
    <div class="seachBox">
      <img src="@/assets/home_img/searchBtn.png">
      <router-link tag="span" to="/lsearch">请输入搜索内容</router-link>
    </div>
    <div class="message">
      <router-link to="/message">
        <img src="@/assets/home_img/message.png">
      </router-link>
      <span v-if="show"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean
    }
  },
  components: {

  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  @import "@/css/element.scss";
  .search{
    @include list(row);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    min-height: 88px;
    width: 100%;
    background: #fff;
    .location{
      position: absolute;
      top: 14px;
      left: 30px;
      line-height: 65px;
      vertical-align: bottom;
      background: url("../../assets/home_img/location.png")no-repeat;
      background-size: 28px 36px;
      background-position: left 12px;
      text-indent: 38px;
      font-size: 28px;
      color: #1FB0E7;
    }
    .seachBox{
      position: absolute;
      top: 14px;
      left: 162px;
      right: 90px;
      bottom: 14px;
      box-sizing: border-box;
      height: 60px;
      line-height: 60px;
      overflow: hidden;
      border-radius: 12px;
      color: #F0F6FA;
      background: #F0F0F0;
      img{
        position: absolute;
        top: 16px;
        left: 22px;
        width: 28px;
        height: 28px;
      }
      span{
        position: absolute;
        top: 0;
        left: 66px;
        bottom: 0;
        right: 12px;
        box-sizing: border-box;
        height: 100%;
        width: auto;
        appearance: none;
        border: none;
        background: #F0F0F0;
        font-size: 24px;
        color: #aaa;
        overflow: hidden;
        text-align: left;
      }
    }
    .message{
      position: absolute;
      top: 14px;
      right: 30px;
      img{
        width: 30px;
        height: 36px;
        margin-top: 12px;
        margin-left: 28px;
      }
      span{
        position: absolute;
        top: 10px;
        right: 0;
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #FF0000;
      }
    }
  }
</style>
