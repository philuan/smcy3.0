<template>
  <div class="header">
    <div class="title">
        <h4>{{ title }}</h4>
        <span class="back" @click="back"></span>
      </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    back () {
      this.$emit('backPage')
    }
  }
}
</script>
<style lang="scss" scoped>
  .title{
    position: relative;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    h4{
      text-align: center;
      font-size: 36px;
      color: #141B2B;
      line-height: 90px;
    }
    .back{
      position: absolute;
      left: 40px;
      content: " ";
      display: inline-block;
      height: 14px;
      width: 14px;
      border-width: 0 0 2px 2px;
      border-color: #777;
      border-style: solid;
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      position: absolute;
      top: 50%;
      margin-top: -7px;
      right: 15px;
    }
  }
</style>
