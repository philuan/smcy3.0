<template>
  <div class="classification">
    <header></header>
    <div class="tab">
      <!--子组件列表并监听组件方法changeInd-->
      <Tab-Left :tab_list="tabList" :isSelect="isSelect" @changeInd="changeInd" ></Tab-Left>
      <!--<component :is="tabView"></component>-->
    </div>
  </div>
</template>

<script>
import TabLeft from '../common/Tab_left'
import TabView from '../classification/TabView'
export default {
  name: 'Classification',
  components: {
    TabLeft,
    TabView
  },
  data () {
    return {
      tabList: ['症状', '疾病', '人群', '专业', '套餐'],
      isSelect: 0, // 下标值，通过监听子组件changeInd方法，在父组件中触发
      tabView: TabView
    }
  },
  methods: {
    // 触发子组件的方法
    changeInd (ind) {
      this.isSelect = ind // 接受子组件传递过来的参数
    }
  }
}
</script>

<style scoped lang='scss'>
  #app{
    width: 100%;
    height: 100%;
  }
  .classification{
    width: 100%;
    height: 100%;
    background: #F0F6FA;
    header{
      width: 100%;
      margin-bottom: 1px;
      height: 80px;
    }
    .tab{
      width: 100%;
      /*
      *  头部80px 1px底部边框 底部98px 2px的背影
      */
      height: calc(100vh - 183px);
      .content{
        width: 100%;
        height: 1500px;
      }
    }
  }
</style>
