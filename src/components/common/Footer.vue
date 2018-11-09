<template>
  <div class="footer_nav">
    <div  v-for ="(item, key) in nav" :key="key" @click='selectNav(item.name)' class="footer_column">
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
export default {
  name: 'Footer',
  data () {
    return {
      isSelect: sessionStorage.getItem('smcyPathName') || 'Home', // 在导航守卫中设置了该路由名称，以便初始化
      nav: [
        {
          'title': '首页',
          'name': 'Home',
          'url': require('../../assets/footer_img/home.png'),
          'url_active': require('../../assets/footer_img/home_active.png')
        },
        {
          'title': '分类',
          'name': 'Classification',
          'url': require('../../assets/footer_img/classification.png'),
          'url_active': require('../../assets/footer_img/classification_active.png')
        },
        {
          'title': '购物车',
          'name': 'Shopping',
          'url': require('../../assets/footer_img/shopping.png'),
          'url_active': require('../../assets/footer_img/shopping_active.png')
        },
        {
          'title': '订单',
          'name': 'Order',
          'url': require('../../assets/footer_img/order.png'),
          'url_active': require('../../assets/footer_img/order_active.png')
        },
        {
          'title': '我的',
          'name': 'Mine',
          'url': require('../../assets/footer_img/mine.png'),
          'url_active': require('../../assets/footer_img/mine_active.png')
        }
      ]
    }
  },
  methods: {
    selectNav (name) {
      this.isSelect = name // 双重设置，保证isSelect确切有值
      this.$router.push('/' + name.toLowerCase())
    }
  },
  mounted () {
    this.selectNav(this.isSelect)
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
    .footer_column{
      width: 100%;
      height: 100%;
      .footer_router{
        width: 46px;
        text-align: center;
        img{
          margin-bottom: 10px;
          display: block;
          margin: 0 auto;
        }
        span{
          font-size: $font22;
          color: #444444;
        }
        .active{
          color: #1FB0E7;
        }
      }
      .footer_router:nth-child(1){
        img{
          width: 40px;
          height: 36px;
        }
      }
      .footer_router:nth-child(2){
        img{
          width: 40px;
          height: 38px;
        }
      }
      .footer_router:nth-child(3){
        img{
          width: 42px;
          height: 37px;
        }
      }
      .footer_router:nth-child(4){
        img{
          width: 34px;
          height: 40px;
        }
      }
      .footer_router:nth-child(5){
        img{
          width: 35px;
          height: 40px;
        }
      }
    }
  }
</style>
