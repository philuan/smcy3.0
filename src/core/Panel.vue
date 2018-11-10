<template lang="html">
  <section :class="[panelClass, cname]">
    <div class="title">
      <h4>{{title}}</h4>
      <p>{{more}}</p>
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
    title: {
      type: String,
      default: ''
    },
    more: {
      type: String,
      default: '更多'
    }
  },
  data () {
    return {
      panelClass: 'panel'
    }
  }
}
</script>

<style lang="scss">
@import "../css/element.scss";
.panel{
  @include panel;
}
</style>
