<template lang="html">
  <panel :moreInfo="moreInfo">
    <section class="content">
      <img v-lazy="staticUrl + item.image" alt="" />
    </section>
  </panel>
</template>
<script>
import {config} from '../../config/config'
import panel from '../../core/panel.vue'
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    panel
  },
  data () {
    return {
      staticUrl: config.static_url,
      moreInfo: {
        classifyHome: {
          'name': '广告',
          'uuid': '-1'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../css/element.scss";
  .panel /deep/ .title{
    display: none;
  }
  .panel{
    @include panel;
    .content{
      padding: 10px 0;
      background: #f1f1f1;
      img{
        display:block;
        width: 100%;
      }
    }
  }
</style>
