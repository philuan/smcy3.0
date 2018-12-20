<template lang="html">
  <panel :moreInfo="objInfo">
  </panel>
</template>
<script>
import panel from '../../core/panel.vue'
export default {
  components: {
    panel
  },
  props: {
    objInfo: {
      type: Object
    }
  },
  mounted () {
    console.log(this.objInfo)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../css/element.scss";
  .panel{
    @include panel;
  }
</style>
