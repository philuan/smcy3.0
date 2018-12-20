<template lang="html">
  <div class="hospital_menu">
    <div class="hospital_wrapper">
      <swiper>
        <swiper-slide v-for="(page,index) in pages" :key="index">
          <div class="item" v-for="item in page" :key="item.img">
            <router-link :to="'/hospital/' + item.id">
              <img v-lazy="staticUrl + item.logo" :alt="item.title">
              <h4>{{ item.name }}</h4>
            </router-link>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import {config} from '../../config/config'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    pages () {
      const pages = []
      this.items.forEach((item, index) => {
        const page = Math.floor(index / 5)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
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
  @import "@/css/element.scss";
  .hospital_menu deep .swiper-container{
    width: 100%;
    height: 100%;
  }
  .slider{
    img{
      width: 100%;
    }
  }
  .hospital_menu{
    background: #fff;
    overflow: hidden;
    padding: 16px 0 26px;
    justify-content: content;
    .hospital_wrapper{
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-bottom: 16.2%;
    }
    a{
      text-decoration: none;
    }
    .item{
      float: left;
      text-align: center;
      width: 20%;

      img{
        display: inline-block;
        width: 90px;
        height: 90px;
      }
      h4{
        font-size: 20px;
        color: #666;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
</style>
