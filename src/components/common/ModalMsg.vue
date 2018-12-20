<template>
  <div class="modal">
    <div class="innerBox">
      <p class="tips">{{tips}}</p>
      <slot></slot>
      <div class="btnList">
        <button v-for="(item, ind) in btnWords" :key="ind" :class="ind === 1 ? 'btnBg' : ''">{{item}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalMsg',
  props: {
    btnWords: {
      type: Array
    },
    tips: {
      type: String
    }
  }
}
</script>

<style scoped lang='scss'>
  .modal{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #000000;
    opacity: .3;
    z-index: 6;
    border-radius:10px;
    .innerBox{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 460px;
      height: 230px;
      padding-top: 60px;
      background: white;
      transform: translate(-50%, -50%);
      .tips{
        width: 100%;
        height: $font28;
        line-height: $font28;
        font-size: $font28;
        color: #444;
        margin-bottom: 34px;
      }
      .btnList{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 40px;
        button{
          width:180px;
          height:60px;
          border:2px solid rgba(31,176,231,1);
          border-radius:30px;
          font-size: $font28;
          color: #1FB0E7;
        }
        .btnBg{
          border: none;
          background:linear-gradient(-20deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
          color: #ffffff;
        }
      }
    }
  }
</style>
