<template lang="html">
  <panel title="广告">
    <section class="content">
      <router-link :to="{ name: 'home'}">
        <img src="@/assets/home_img/love.png" alt="">
      </router-link>
    </section>
  </panel>
</template>
<script>
import panel from '../../core/panel.vue'
export default {
  components: {
    panel
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
