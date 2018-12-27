<template>
  <div class="home">
    <search :show="messageShow"/>
    <slider :items="sliderList" cname="slider"/>
    <hospital-menu :items="hospitalList"/>
    <hot-ad :item="advObj"/>
    <packaged :packageList="packageList" :objInfo="packageInfo"/>
    <hot :packageList="hotList" :objInfo="hotInfo"/>
    <special :packageList="specialList" :objInfo="specialInfo"/>
    <routine-ad :objInfo="routine" />
    <routine :packageList="routineList"/>
    <Menu/>
  </div>
</template>

<script>
import api from '../../utils/api'
import search from './Hsearch'
import slider from '../../core/slider.vue'
import HospitalMenu from './HospitalMenu'
import packaged from './Hpackage'
import hot from './Hot'
import special from './Special'
import HotAd from './HotAd'
import Routine from '../../core/PanelList.vue'
import RoutineAd from './RoutineAd'
import Menu from './Menu'
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
    search,
    slider,
    HospitalMenu,
    HotAd,
    packaged,
    hot,
    special,
    Routine,
    RoutineAd,
    Menu
  },
  data () {
    return {
      sliderList: [], // 轮播图
      advObj: {}, // 广告
      packageList: [], // 项目类别一
      packageInfo: {}, // 项目类别一
      hotList: [],
      hotInfo: {}, // 项目类别二
      specialList: [], // 项目类别三
      specialInfo: {}, // 项目类别三
      routineList: [], // 项目类别四
      routineInfo: {}, // 项目类别四
      routine: {},
      messageShow: false,
      hospitalList: [] // 医院列表
    }
  },
  methods: {
    getSlider () {
      api.hSlider().then(res => {
        if (res.data.code === 200) {
          this.sliderList = res.data.successObject.records
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    getHospitalList () {
      api.hospitalList().then(res => {
        if (res.data.code === 200) {
          this.hospitalList = res.data.successObject.records
          this.common.setStorage('hospitalList', res.data.successObject.records)
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    getAdv () {
      api.adv().then(res => {
        if (res.data.code === 200) {
          this.advObj = res.data.successObject
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    getHprojectList () {
      api.hProjectList().then(res => {
        if (res.data.code === 200) {
          let list = res.data.successObject
          for (let i in list) {
            this.handleProjectData(list[i].projectList)
          }
          this.packageList = list[0].projectList
          this.packageInfo = list[0].classifyHome
          this.hotList = list[1].projectList
          this.hotInfo = list[1].classifyHome
          this.specialList = list[2].projectList
          this.specialInfo = list[2].classifyHome
          this.routineList = list[3].projectList
          this.routine = list[3].classifyHome
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    // 匹配医院名称、logo
    handleProjectData (projectList) {
      for (let i in projectList) {
        for (let j in this.hospitalList) {
          if (projectList[i].hospital === this.hospitalList[j].uuid) {
            projectList[i].hospitalName = this.hospitalList[j].name
            projectList[i].hospitalLogo = this.hospitalList[j].logo
            break
          }
        }
      }
    },
    // 获取未读消息条数
    getMessageNumber () {
      api.messageNumber().then(res => {
        if (res.data.code === 200) {
          if (res.data.successObject > 0) {
            this.messageShow = true
          }
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    // 获取购物车商品数量
    ...mapActions(['getShoppingCartTotal'])
  },
  created () {
    // 获取轮播图信息
    this.getSlider()
    // 获取医院列表
    this.getHospitalList()
    // 获取广告信息
    this.getAdv()
    // 获取首页项目
    this.getHprojectList()
    // 获取未读消息条数
    this.getMessageNumber()
    // 获取购物车商品数量
    this.getShoppingCartTotal()
  }
}
</script>

<style scoped lang='scss'>
  .home /deep/ .cart_wrapper{
    display: none;
  }
  .home /deep/ .swiper-pagination-bullet{
    width: 14px;
    height: 14px;
    margin: 0 10px;
  }

  .home /deep/ .swiper-pagination-bullet-active{
    background: #0068B6;
  }
  .home{
    background: #fff;
    .slider{
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-bottom: 34.6%;
      margin-top: 88px;
    }
    .panel_list{
      margin-bottom: 110px;
    }
  }
</style>
