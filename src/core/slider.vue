<template lang="html">
  <section :class="cname">
    <swiper :options="options" :not-next-tick="options.notNextTick" v-if='items.length'>
      <swiper-slide v-for="item in items" :key="item.url">
        <!-- <router-link :to="{name: item.url}"> -->
          <img :src="staticUrl + item.image" alt="">
        <!-- </router-link> -->
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-if="options.pagination"></div>
    </swiper>
  </section>
</template>

<script>
import {config} from '../config/config'
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
      default: 'slider'
    },
    options: {
      type: Object,
      default () {
        return {
          autoplay: true, // 自动播放
          loop: true,
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
  },
  data () {
    return {
      staticUrl: config.static_url
    }
  }
}
</script>

<style lang="scss">
</style>
