<template>
  <div class="footer_nav">
    <div  v-for ="(item, key) in nav" :key="key" @click='selectNav(item.name)' class="footer_column">
      <!-- 其他选项默认全部false 只有购物车选项会根据有没有数据去修改show的值-->
      <p class="red_point" v-show="item.show">{{ shoppingCartTotal }}</p>
      <!--到当前页面-->
      <router-link :to="{name:isSelect}" class="footer_router">
          <!--判断，当isSelect是当前页面的name时图标为active-->
          <img :src= "isSelect == item.name ? item.url_active : item.url">
          <!--判断，当isSelect是当前页面的name时文字添加class=active-->
          <span :class="isSelect == item.name ? 'active' : ''">{{item.title}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Footer',
  props: {
    isSelect: {
      // 在导航守卫中设置了该路由名称，以便初始化
      default: sessionStorage.getItem('smcyPathName')
    }
  },
  computed: {
    ...mapState(['shoppingCartTotal'])
  },
  data () {
    return {
      isShow: true, // 假数据显示购物车红点
      nav: [
        {
          'title': '首页',
          'name': 'Home',
          'url': require('../../assets/footer_img/home.png'),
          'url_active': require('../../assets/footer_img/home_active.png'),
          'show': false
        },
        {
          'title': '分类',
          'name': 'Classification',
          'url': require('../../assets/footer_img/classification.png'),
          'url_active': require('../../assets/footer_img/classification_active.png'),
          'show': false
        },
        {
          'title': '购物车',
          'name': 'ShoppingCart',
          'url': require('../../assets/footer_img/shopping.png'),
          'url_active': require('../../assets/footer_img/shopping_active.png'),
          'show': false
        },
        {
          'title': '订单',
          'name': 'Order',
          'url': require('../../assets/footer_img/order.png'),
          'url_active': require('../../assets/footer_img/order_active.png'),
          'show': false
        },
        {
          'title': '我的',
          'name': 'Mine',
          'url': require('../../assets/footer_img/mine.png'),
          'url_active': require('../../assets/footer_img/mine_active.png'),
          'show': false
        }
      ]
    }
  },
  methods: {
    selectNav (name) {
      // 根据导航守卫获取到的值跳转至对应的路由
      this.$router.push('/' + name.toLowerCase())
      // 将name值传递给父组件 至于显示隐藏放在APP组件中统一处理
      this.$emit('setRouter', name)
    }
  },
  mounted () {
    //  处理购物车有没有红点逻辑
    if (this.isShow) {
      this.nav[2].show = true
    } else {
      this.nav[2].show = false
    }
  }
}
</script>

<style scoped lang='scss'>
  .footer_nav{
    background: #fff;
    width: 100%;
    height: 83px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    padding-top: 15px;
    box-shadow:0px -2px 3px 0px rgba(0, 0, 0, 0.1);
    z-index: 99;
    .footer_column{
      width: 100%;
      height: 100%;
      position: relative;
      .red_point{
        position: absolute;
        width: 24px;
        height: 24px;
        background: red;
        border-radius: 50%;
        right: 30%;
        top: 4px;
        z-index: 5;
        text-align: center;
        line-height: 24px;
        font-size: $font18;
        color: #ffffff;
      }
      .footer_router{
        width: 46px;
        text-align: center;
        img{
          margin-bottom: 10px;
          display: block;
          margin: 0 auto;
          width: 44px;
          height: 44px;
        }
        span{
          font-size: $font22;
          color: #444444;
        }
        .active{
          color: #1FB0E7;
        }
      }
    }
  }
</style>
