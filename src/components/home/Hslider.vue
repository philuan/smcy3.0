<template lang="html">
  <div>
      <Slider :items="items" cname="slider"/>
      <section class="list">
        <div class="item" v-for="item in enters" :key="item.img">
            <router-link :to="{name: item.href}">
                <img :src="item.img" :alt="item.title">
                <h4>{{ item.title }}</h4>
                <span>{{ item.label }}</span>
            </router-link>
        </div>
      </section>
  </div>
</template>
<script>
import Slider from '../../core/slider.vue'
export default {
  props: [],
  components: {
    Slider
  },
  data () {
    return {
      items: [
        {
          href: 'g.html',
          src: 'banner1.png'
        },
        {
          href: 'h.html',
          src: 'banner2.png'
        },
        {
          href: 'i.html',
          src: 'banner3.png'
        },
        {
          href: 'f.html',
          src: 'banner4.png'
        }
      ],
      enters: [
        {
          href: 'a.html',
          img: 'static/images/xijing.png',
          title: '西京医院',
          label: ''
        },
        {
          href: 'b.html',
          img: 'static/images/tangdu.png',
          title: '唐都医院',
          label: ''
        },
        {
          href: 'c.html',
          img: 'static/images/xibei.png',
          title: '西北医院',
          label: ''
        },
        {
          href: 'd.html',
          img: 'static/images/ertong.png',
          title: '儿童医院',
          label: ''
        },
        {
          href: 'e.html',
          img: 'static/images/honghui.png',
          title: '西安红十字会医院',
          label: ''
        }
      ]
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
@import "@/css/element.scss";
  .slider{
    img{
      width: 100%;
    }
  }
  .list{
    @include list(row);
    background: #fff;
    padding: 16px 0 26px;
    justify-content: content;
    a{
      text-decoration: none;
    }
    .item{
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
      span{
        font-size: 22px;
        text-align: center;
        display: block;
        color: #FF0000;
        margin-top: 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
</style>
