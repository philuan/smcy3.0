<template>
  <div class="project_list">
    <HeaderCom @backPage="back" :title="title"/>
    <div class="query_wrapper">
      <QueryCriteria  @changeCondition="handleChangeCondition" :leaf="leaf" />
    </div>
    <panel-list v-if="projectList.length" :packageList="projectList"/>
    <div class="no_message" v-else>
      <img src="@/assets/home_img/no_message.png">
      <p>暂无项目信息~</p>
    </div>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
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
  // computed: {
  //   ...mapState(['hospitalList'])
  // },
  data () {
    return {
      projectList: [],
      order: 'asc',
      hospital: '',
      field: 'now_price',
      type: 0,
      leaf: this.$route.params.leaf,
      pageNo: 1,
      pageSize: 10,
      pageIndex: 1,
      totalPages: '',
      title: this.$route.params.name,
      hospitalList: this.common.getStorage('hospitalList')
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
          this.projectList = []
        }
      }).catch(res => {
        console.log(res)
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
    },
    // 条件： 价格/项目类型/医院改变时，获取数据
    handleChangeCondition (order, projectType, hospitalId) {
      this.order = order
      this.type = projectType
      this.hospital = hospitalId
      this.projectList = []
      this.getHprojectList()
    }
  },
  created () {
    // 获取“首页更多”/“搜索关键词”项目列表
    this.getHprojectList()
  },
  mounted () {
    var that = this
    // 注册touchmove事件并监听
    window.addEventListener('touchmove', function () {
      if (that.pageNo < that.totalPages) {
        that.pageNo++
        console.log(that.pageIndex)
        that.getHprojectList()
      } else {
        //  显示
        that.noData = true
      }
    })
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
  }
</style>
