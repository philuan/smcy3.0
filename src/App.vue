<template>
  <div id="app">
    <keep-alive>
     <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Footer v-show="isShowFooter" :isSelect="isSelect" @setRouter="getRouter"></Footer>
  </div>
</template>

<script>
import Footer from '@/components/common/Footer'
export default {
  name: 'App',
  components: {
    Footer
  },
  data () {
    return {
      isShowFooter: true,
      isSelect: sessionStorage.getItem('smcyPathName') || ''
    }
  },
  methods: {
    // 可以进入这个函数，肯定是因为点击底部导航组件，因此肯定是一级页面，也就一定存在sessionStorage
    getRouter (name) {
      this.isShowFooter = true
      sessionStorage.setItem('smcyPathName', name)
      this.isSelect = name
    }
  },
  updated () { // 监听如果用户直接从url中修改参数路由变化
    // 直接监听sessionStorage是因为this.isSelect此时并未修改所以有可能存在sessionStorage已经改变但isSelect依然为空
    if (!sessionStorage.getItem('smcyPathName')) {
      this.isShowFooter = false
    } else {
      this.isShowFooter = true
      this.isSelect = sessionStorage.getItem('smcyPathName')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
</style>
