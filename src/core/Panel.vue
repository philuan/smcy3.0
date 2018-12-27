<template lang="html">
  <section :class="[panelClass, cname]">
    <div class="title">
      <h4>{{this.moreInfo.name}}</h4>
      <p @click="skipToProjectList">{{more}}<i class="iconfont">&#xe630;</i></p>
    </div>
    <slot/>
  </section>
</template>

<script>
export default {
  props: {
    cname: {
      type: String,
      default: ''
    },
    more: {
      type: String,
      default: '更多'
    },
    moreInfo: {
      type: Object
    }
  },
  data () {
    return {
      panelClass: 'panel'
    }
  },
  methods: {
    skipToProjectList () {
      this.$router.push({name: 'ProjectList',
        params: { id: this.moreInfo.uuid, name: this.moreInfo.name, leaf: this.moreInfo.leaf }
      })
    }
  }
}
</script>

<style lang="scss">
@import "../css/element.scss";
.panel{
  @include panel;
  .iconfont{
    font-size: 28px;
    font-weight: bold;
    color: #aaa;
    position: relative;
    top: 2px;
  }
}
</style>
