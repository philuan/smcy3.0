<template>
  <div class="menu">
    <transition name="fade">
      <div class="menu_list" v-if="show">
        <swiper :options="options">
          <swiper-slide v-for="(item, index) in items" :key="index">
            <router-link tag="div" class="item" :to="{name: item.href}">
              <img :src="require(`@/assets/home_img/${item.img}`)" alt="">
              <p>{{ item.name }}</p>
              <div class="line"></div>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </transition>
    <div @click="menuShow()" class="label_box">
      <div class="label_box_seeMe" v-if="show">
        <span class="iconfont arrow_btn">&#xe648;</span>
        <span class="label">我要去</span>
      </div>
      <div class="label_box_normal" v-else>
        <span class="iconfont arrow_btn">&#xe645;</span>
        <span class="label">发现</span>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'Menu',
  props: [],
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      show: false,
      mWidth: 100,
      options: {
        slidesPerView: 3.7,
        spaceBetween: 20,
        freeMode: true,
        direction: 'vertical',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      items: [
        {
          'name': '护士陪诊',
          'img': 'accompany_img.png',
          'href': '/'
        },
        {
          'name': '预约挂号',
          'img': 'appoint_img.png',
          'href': '/'
        },
        {
          'name': '快速问诊',
          'img': 'accompany_img.png',
          'href': '/'
        },
        {
          'name': '其他服务',
          'img': 'consult_img.png',
          'href': '/'
        },
        {
          'name': '反馈意见',
          'img': 'accompany_img.png',
          'href': '/'
        }
      ]
    }
  },
  methods: {
    menuShow () {
      this.show = !this.show
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../css/element.scss";
  .menu deep .swiper-container{
    background: red;
  }
  .menu{
    height: 532px;
    z-index: 10;
    position: fixed;
    right: 0;
    top: 50%;
    margin-top: -320px;
    padding: 16px 0;
    .label_box{
      position: absolute;
      right: 0;
      bottom: 0;
      .label_box_seeMe{
        width: 136px;
        height: 50px;
        background: url("../../assets/home_img/see_here.png") no-repeat;
        background-size: cover;
      }
      .label_box_normal{
        width: 100px;
        height: 50px;
        background: url("../../assets/home_img/see_here.png") no-repeat;
        background-size: cover;
      }
      .arrow_btn{
        position: absolute;
        top: 14px;
        left: 14px;
        width: 22px;
        height: 22px;
        color: #E7E51F;
        font-size: 24px;
        font-weight: bold;
      }
      .label{
        position: absolute;
        display: inline-block;
        top: 0;
        right: 12px;
        height: 50px;
        line-height: 50px;
        color: #E7E51F;
        font-size: 22px;
        text-align: left;
      }
    }
    .menu_list{
      @include list(column);
      flex-wrap: nowrap;
      width: 112px;
      height: 500px;
      padding: 16px 12px;
      box-sizing: border-box;
      overflow: hidden;
      color: #222;
      background: #fff;
      font-size: 22px;
      text-align: center;
      .item{

        img{
          width: 64px;
          height: 64px;
        }
        p{
           white-space:nowrap;
           margin: 16px auto 10px;
        }
        .line{
          height: 2px;
          width: 70px;
          background: #f1f1f1;
          margin: 0 auto;
        }
      }
    }
  }
</style>
