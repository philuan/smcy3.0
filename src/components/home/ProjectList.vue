<template>
  <div class="project_list">
    <HeaderCom @backPage="back" :title="title"/>
    <div class="query_wrapper">
      <QueryCriteria  @changeCondition="handleChangeCondition" :leaf="leaf" />
    </div>
    <div class="projectWrapper" v-if="projectList.length"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
      <panel-list :packageList="projectList"/>
    </div>
    <div class="no_message" v-else>
      <img src="@/assets/home_img/no_message.png">
      <p>暂无项目信息~</p>
    </div>
    <p v-if="noMore" class="noMore">没有更多数据了~</p>
  </div>
</template>
<script>
import api from '../../utils/api'
import HeaderCom from '../../core/HeaderCom.vue'
import QueryCriteria from '../../core/QueryCriteria.vue'
import PanelList from '../../core/PanelList.vue'
import '@/assets/iconfont/iconfont.js'
export default {
  name: 'package',
  components: {
    QueryCriteria,
    PanelList,
    HeaderCom
  },
  data () {
    return {
      projectList: [],
      order: 'asc',
      hospital: '',
      field: 'now_price',
      type: 0,
      leaf: this.$route.params.leaf,
      pageNo: 0,
      pageSize: 10,
      pageIndex: 1,
      totalPages: '',
      title: this.$route.params.name,
      hospitalList: this.common.getStorage('hospitalList'),
      noMore: 0
    }
  },
  methods: {
    // 返回上一页面
    back () {
      this.$router.go(-1)
    },
    // 获取首页“更多”项目
    getHprojectList () {
      if (this.leaf === 1) {
        this.type = 1
      }
      this.loading = true

      var params = {
        classify: this.$route.params.id, // 分类id
        order: this.order, // 价格排序，asc:正序、desc倒序
        hospital: this.hospital, // 医院id
        field: this.field, // 默认值
        type: this.type, // 项目类别，project：单项目，group：组合项目
        pageNo: this.pageNo, // 当前页
        pageSize: this.pageSize // 每页条目数
      }
      api.moreProjectList(params).then(res => {
        if (res.data.code === 200) {
          this.handleProjectData(res.data.successObject.records)
          this.totalPages = res.data.successObject.pages
        } else if (res.data.code === 204) {
          if (this.pageNo === 1) {
            this.projectList = []
          }
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
      this.projectList = this.projectList.concat(projectList)
      this.loading = false
    },
    // 条件： 价格/项目类型/医院改变时，获取数据
    handleChangeCondition (order, projectType, hospitalId) {
      this.order = order
      this.type = projectType
      this.hospital = hospitalId
      this.projectList = []
      this.getHprojectList()
    },
    loadMore () {
      this.loading = true
      this.pageNo++
      if (this.pageNo === 1) {
        this.getHprojectList()
      } else if (this.pageNo > 1 && this.totalPages >= this.pageNo) {
        this.getHprojectList()
      } else {
        this.noMore = 1
      }
    }
  },
  created () {
    this.loadMore()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../css/element.scss";
  .project_list{
    .no_message{
      width: 500px;
      height: 500px;
      margin: 194px auto 0;
      img{
        width: 100%;
      }
      p{
        margin-top: -26px;
        color: #aaa;
        font-size: 24px;
        width: 100%;
        text-align: center;
      }
    }
    .noMore{
      font-size: 22px;
      color: #aaa;
      margin: 30px auto;
    }
  }
</style>
