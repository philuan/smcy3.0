<template>
  <div class="classification">
    <!--<header></header>-->
    <div class="tab">
      <!--子组件列表并监听组件方法changeInd-->
      <tab-left :tab_list="tabList" :isSelect="isSelect" @changeInd="changeInd" class="tab_left"></tab-left>
      <div class="tab_right">
        <img src="../../../static/images/caceshi.png"  class="showImg">
        <ul>
          <li v-for="item in projectList" :key="item.id" @click="skipToSearchResult(item)">
            <img src="../../../static/images/20181108155159.png" alt="">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../utils/api'
import TabLeft from '../common/Tab_left'
export default {
  name: 'Classification',
  components: {
    TabLeft
  },
  data () {
    return {
      successObject: {},
      tabList: ['症状', '疾病', '人群', '专业', '套餐'],
      isSelect: 0, // 下标值，通过监听子组件changeInd方法，在父组件中触发
      projectList: []
    }
  },
  methods: {
    // 触发子组件的方法
    changeInd (ind) {
      this.isSelect = ind // 接受子组件传递过来的参数
      sessionStorage.setItem('tab_left_ind', ind)
      // 设置键值
      let key = this.tabList[ind]
      // 更新数据
      this.projectList = this.successObject[key]
    },
    getClassify () {
      api.getClassify().then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          let { successObject } = res.data
          this.successObject = successObject
          this.tabList = Object.keys(this.successObject)
          console.log(successObject)
          console.log(this.tabList)
          // 初始化右侧数据
          this.changeInd(this.isSelect)
        }
      })
    },
    skipToSearchResult (item) {
      this.$router.push({name: 'SearchResult', params: { keywords_uuid: item.uuid, from: 'classify' }})
    }
  },
  mounted () {
    this.getClassify()
    // 进入页面的时候判断之前有没有点击过列表，如果点击过，则取之前的数据
    if (sessionStorage.getItem('tab_left_ind')) {
      this.isSelect = sessionStorage.getItem('tab_left_ind')
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
    header{
      width: 100%;
      border-bottom: 1px solid #F0F6FA;
      height: 80px;
    }
    .tab{
      width: 100%;
      /*
      *  头部80px 1px底部边框 底部98px 2px的背影
      */
      position: relative;
      height: calc(100vh - 183px);
      .tab_left{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 3;
        height: 100%;
        overflow-y: scroll;
        background: #F0F6FA;
      }
      .tab_right{
        position: absolute;
        left: 142px;
        top: 0;
        width: 608px;
        height: 100%;
        overflow-y: scroll;
        z-index: 2;
        .showImg{
          width: 538px;
          height: 180px;
          margin: 30px auto;
        }
        ul{
          width: 538px;
          height: auto;
          margin: 0 auto;
          display: flex;
          justify-content: left;
          flex-wrap: wrap;
          li{
            width: 156px;
            margin-right: 35px;
            img{
              width: 156px;
              height: 114px;
            }
            p{
              width: 100%;
              height: 60px;
              line-height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: $font24;
            }
          }
          li:nth-child(3n){
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
