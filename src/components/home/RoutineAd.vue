<template lang="html">
  <panel title="常规检验专区">
    <section class="content">
      <router-link :to="{ name: 'home'}">
        <img src="@/assets/home_img/normal.png" alt="">
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
  .panel{
    @include panel;
    .content{
      img{
        display:block;
        width: 100%;
      }
    }
  }
</style>
