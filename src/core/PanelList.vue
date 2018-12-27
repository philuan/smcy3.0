<template>
  <div class="panel_list">
    <div class="item" v-for="item in packageList" :key="item.uuid">
      <router-link tag="div" class="hospital" :to="'/hospital/' + item.h_name">
        <img v-lazy="staticUrl + item.hospitalLogo">
        <p>{{ item.hospitalName }}</p>
      </router-link>
      <img class="p_img" v-lazy="staticUrl + item.logo" @click="ToSkipInfo(item)"/>
      <p class="name">{{ item.name }}</p>
      <div class="price">
        <span class="per">¥</span>
        <span>{{ item.nowPrice }}</span>
<!--         <span class="per">.00</span> -->
      </div>
      <div class="cart_wrapper" @click.stop="handleCartClick(item)">
        <div class="cart_btn"></div>
      </div>
    </div>
 </div>
</template>
<script>
import {config} from '../config/config'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'PanelList',
  props: {
    packageList: {
      type: Array
    }
  },
  computed: {
    ...mapState(['unique'])
  },
  data () {
    return {
      staticUrl: config.static_url
    }
  },
  methods: {
    handleCartClick (item) {
      var params = {
        project: item.uuid,
        projectType: item.type
      }
      this.addToCart(params)
    },
    ToSkipInfo (item) {
      this.$router.push({name: 'ProjectDetail', params: { uuid: item.uuid, type: item.type }})
    },
    ...mapActions(['addToCart'])
  }
}
</script>
<style lang="scss" scoped>
.panel_list{
    overflow: hidden;
    padding: 0 30px;
    text-align: left;
    .item{
      position: relative;
      box-sizing: border-box;
      width: 49%;
      border-radius: 10px;
      background-color: rgb(255, 255, 255);
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
      margin: 10px 0;
      &:nth-child(odd){
        float: left;
      }
      &:nth-child(even){
        float: right;
      }
      .hospital{
        width: 100%;
        height: 60px;
        line-height: 60px;
        img{
          float: left;
          width: 40px;
          height: 40px;
          margin: 10px 12px 0 10px;
        }
        p{
          color: #777;
          font-size: 22px;
        }
      }
      .p_img{
        width: 340px;
        height: 300px;
        /*width: 100%;
        padding-bottom: 88%;*/
        margin-bottom: 20px;
      }
      .name{
        color: #444;
        font-size: 30px;
        margin: 0 0 14px 10px;
      }
      .price{
        font-size: 26px;
        color: #FFC000;
        margin: 0 0 26px 10px;
        .per{
          font-size: 24px;
        }
      }
      .cart_wrapper{
        z-index: 2;
        position: absolute;
        bottom: 30px;
        right: 20px;
        .cart_btn{
          width: 50px;
          height: 50px;
          background: url(../assets/home_img/shopping_cart.png) no-repeat;
          background-size: cover;
        }
      }
    }
  }
</style>
