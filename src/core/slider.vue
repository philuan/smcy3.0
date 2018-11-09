<template lang="html">
  <section :class="cname">
    <swiper :options="options" :not-next-tick="options.notNextTick">
      <swiper-slide v-for="item in items" :key="item.href">
        <router-link :to="{name: item.href}">
          <!-- <img :src="item.src" alt=""> -->
          <img :src="require(`@/assets/home_img/${item.src}`)" alt="">
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-if="options.pagination"></div>
    </swiper>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'slider',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    cname: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default () {
        return {
          autoplay: true, // 自动播放
          loop: true, // 是否循环
          pagination: {
            el: '.swiper-pagination'
          },
          notNextTick: false
        }
      }
    },
    items: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss">

</style>
