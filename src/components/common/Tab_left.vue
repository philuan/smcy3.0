<template>
    <div class="tab_lf">
      <ul>
        <li v-for="(item, ind) in tab_list" :key="ind" :class="isSelect == ind ? 'active' : ''" @click="changeInd(ind)">
          <p>{{item}}</p>
        </li>
      </ul>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Tab_left',
  props: {
    tab_list: {
      type: Array
    },
    isSelect: 0
  },
  methods: {
    changeInd (ind) {
      this.$emit('changeInd', ind)
    }
  }
}
</script>

<style scoped  lang='scss'>
  .tab_lf{
    width: 157px;
    height: auto;
    ul{
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      li{
        width: 141px;
        height: 90px;
        p{
          width: 100px;
          height: 100%;
          margin: 0 auto;
          line-height: 90px;
          color: #777;
          text-align: center;
          font-size: $font28;
          border-bottom: 1px solid rgba(238,238,238,1);
        }
      }
      .active{
        width: 157px;
        background: #32C4FA;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        p{
          font-size: $font34;
          color: #ffffff;
        }
      }
    }
  }
</style>
