<template lang="html">
  <div class="search">
      <div class="location">雁塔区</div>
      <div class="seachBox">
        <img src="@/assets/home_img/searchBtn.png">
        <input type="text" placeholder="请输入搜索内容">
      </div>
      <div class="message">
        <img src="@/assets/home_img/message.png">
        <p></p>
      </div>
  </div>
</template>
<script>
export default {
  props: [],
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
    position: relative;
    min-height: 44px; /*no*/
    width: 100%;
    background: #fff;
    .location{
      position: absolute;
      top: 7px; /*no*/
      left: 15px; /*no*/
      height: 30px; /*no*/
      line-height: 30px; /*no*/
      background: url("../../assets/home_img/location.png")no-repeat;
      background-size: 14px 18px; /*no*/
      background-position: left 6px; /*no*/
      text-indent: 19px; /*no*/
      font-size: 14px; /*no*/
      color: #1FB0E7;
    }
    .seachBox{
      position: absolute;
      top: 7px; /*no*/
      left: 81px; /*no*/
      right: 45px; /*no*/
      bottom: 7px; /*no*/
      box-sizing: border-box;
      height: 30px; /*no*/
      overflow: hidden;
      border-radius: 6px;
      color: #F0F6FA;
      background: #F0F0F0;
      img{
        position: absolute;
        top: 8px; /*no*/
        left: 11px; /*no*/
        width: 14px; /*no*/
        height: 14px; /*no*/
      }
      input{
        position: absolute;
        top: 0; /*no*/
        left: 33px; /*no*/
        bottom: 0; /*no*/
        right: 6px; /*no*/
        box-sizing: border-box;
        height: 100%;
        width: auto;
        appearance: none;
        border: none;
        background: #F0F0F0;
        font-size: 12px; /*no*/
        color: #aaa;
        overflow: hidden;
      }
      input::-webkit-input-placeholder {
        color: #aaa;
      }
    }
    .message{
      position: absolute;
      top: 7px; /*no*/
      right: 15px; /*no*/
      img{
        width: 15px; /*no*/
        height: 18px; /*no*/
        margin-top: 6px; /*no*/
        margin-left: 14px;
      }
    }
  }
</style>
