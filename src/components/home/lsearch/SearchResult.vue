<template>
  <div class="search_result">
    <search-header @backPage="back" :keyWords="keyWords" @change="handlekeyWordsChange"></search-header>
    <QueryCriteria @changeCondition="handleChangeCondition" />
    <panel-list v-if="KeywordsResultList.length" :packageList="KeywordsResultList"/>
    <div class="no_message" v-else>
      <img src="@/assets/home_img/no_message.png">
      <p>暂无项目信息~</p>
    </div>
  </div>
</template>
<script>
import api from '../../../utils/api'
import SearchHeader from '../../../core/SearchHeader.vue'
import QueryCriteria from '../../../core/QueryCriteria.vue'
import PanelList from '../../../core/PanelList.vue'
import '@/assets/iconfont/iconfont.js'
export default {
  name: '',
  props: [],
  components: {
    SearchHeader,
    PanelList,
    QueryCriteria
  },
  data () {
    return {
      KeywordsResultList: [],
      order: 'asc',
      hospital: '',
      field: 'now_price',
      type: 0,
      pageNo: 1,
      pageSize: 10,
      keyWords: '',
      classify: '',
      hospitalList: this.common.getStorage('hospitalList')
    }
  },
  methods: {
    // 返回上一页面
    back () {
      this.$router.go(-1)
    },
    getKeywordsResult () {
      let params = {
        keyword: this.keywords,
        order: this.order, // 价格排序，asc:正序、desc倒序
        hospital: this.hospital, // 医院id
        field: this.field, // 默认值
        type: this.type, // 项目类别，0：单项目，1：组合项目
        pageNo: this.pageNo, // 当前页
        pageSize: this.pageSize // 每页条目数
      }
      api.KeywordsResult(params).then(res => {
        if (res.data.code === 200) {
          this.handleKeywordsData(res.data.successObject.records)
        } else if (res.data.code === 204) {
          this.KeywordsResultList = []
        }
      }).catch(res => {
        console.log(res)
      })
    },
    // 条件： 价格/项目类型/医院改变时，获取数据
    handleChangeCondition (order, projectType, hospitalId) {
      this.order = order
      this.type = projectType
      this.hospital = hospitalId
      this.KeywordsResultList = []
      this.pageNo = 1
      if (this.$route.params.from === 'search') {
        this.getKeywordsResult()
      } else if (this.$route.params.from === 'classify') {
        this.getProjectByClassify()
      }
    },
    handlekeyWordsChange (key) {
      this.pageNo = 1
      this.keywords = key
      this.getKeywordsResult()
    },
    getProjectByClassify () {
      let params = {
        classify: this.classify, // 分类uuid
        type: this.type, // 项目类型，0：单项目，1：组合项目
        field: 'now_price', // 固定字段
        order: this.order, // 按价格排序，asc：升序，des：降序
        hospital: this.hospital, // 医院uuid
        pageNo: this.pageNo, // 当前页
        pageSize: this.pageSize // 每页条目数
      }
      api.projectByClassify(params).then(res => {
        if (res.data.code === 200) {
          this.handleKeywordsData(res.data.successObject.records)
        } else if (res.data.code === 204) {
          this.KeywordsResultList = []
        }
      }).catch(res => {
        console.log(res)
      })
    },
    handleClassifyChange (key) {
      this.pageNo = 1
      this.getProjectByClassify()
    },
    handleKeywordsData (projectList) {
      this.KeywordsResultList = []
      // 根据医院id匹配医院名称和logo
      for (let i in projectList) {
        for (let j in this.hospitalList) {
          if (projectList[i].hospital === this.hospitalList[j].uuid) {
            projectList[i].hospitalName = this.hospitalList[j].name
            projectList[i].hospitalLogo = this.hospitalList[j].logo
            break
          }
        }
      }
      this.KeywordsResultList = this.KeywordsResultList.concat(projectList)
      console.log(this.KeywordsResultList)
    }
  },
  created () {
    if (this.$route.params.from === 'search') {
      this.keyWords = this.$route.params.keywords_uuid
      // 获取关键词搜索项目列表
      this.handlekeyWordsChange(this.$route.params.keywords_uuid)
    } else if (this.$route.params.from === 'classify') {
      this.classify = this.$route.params.keywords_uuid
      // 获取三级分类项目列表
      this.handleClassifyChange(this.$route.params.keywords_uuid)
    }
  },
  mounted () {
    var that = this
    // 注册touchmove事件并监听
    window.addEventListener('touchmove', function () {
      console.log(123)
      if (that.pageNo < that.totalPages) {
        that.pageNo++
        console.log(that.pageIndex)
        if (this.$route.params.from === 'search') {
          this.getKeywordsResult()
        } else if (this.$route.params.from === 'classify') {
          this.getProjectByClassify()
        }
      } else {
        //  显示
        that.noData = true
      }
    })
  }
}

</script>
<style lang="scss" scoped>
  @import "../../../css/element.scss";
  .search_result{
    height: calc(100Vh - 100px);
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
