<template>
  <div class="loading">
    <div class="loading_wrapper">
      <img src="static/images/loading.gif">
      <p>努力加载中...</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: [],
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  .loading{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    .loading_wrapper{
      position: absolute;
      top: 350px;
      left: 50%;
      margin-left: -146px;
      width: 292px;
      height: 264px;
      background: #000;
      opacity: 0.6;
      border-radius: 10px;
      text-align: center;
      img{
        margin-top: 10px;
      }
      p{
        color: #fff;
      }
    }
  }
</style>
