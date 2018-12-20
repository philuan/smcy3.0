<template>
  <header>
    <img :src="leftIcon" @click="goBack">
    <p>{{headerCon}}</p>
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: ['headerCon'],
  data () {
    return {
      leftIcon: require('../../assets/left_icon.png')
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang='scss'>
  header{
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 90px;
    background: #ffffff;
    position: relative;
    img{
      position: absolute;
      left: 30px;
      top: 25px;
      height: 40px;
      width: 26px;
    }
    p{
      width: 100%;
      height: 100%;
      font-size: $font36;
      color: #141B2B;
      text-align: center;
      line-height: 90px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
    }
  }
</style>
