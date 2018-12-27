<template>
  <div class="lsearch">
    <search-header @change="handleKeywordsChange" @backPage="back"></search-header>
    <search-list v-if="keywords" :keywordsCompleteList="keywordsCompleteList"></search-list>
    <search-record :historyList="historyList" :hotSearchList="hotSearchList" @cleanHistoryRecord="cleanHistoryRecord" v-else></search-record>
  </div>
</template>
<script>
import api from '../../../utils/api'
import SearchHeader from '../../../core/SearchHeader.vue'
import SearchList from './SearchList'
import SearchRecord from './SearchRecord'
export default {
  name: 'lsearch',
  props: [],
  components: {
    SearchHeader,
    SearchList,
    SearchRecord
  },
  data () {
    return {
      show: false,
      keywords: '',
      historyList: [],
      hotSearchList: [],
      keywordsCompleteList: []
    }
  },
  methods: {
    handleKeywordsChange (keywords) {
      this.keywords = keywords
      this.keywordsCompleteList = []
      let params = {
        keyWord: keywords
      }

      api.keywordSearch(params).then(res => {
        if (res.data.code === 200) {
          this.keywordsCompleteList = res.data.successObject
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    back () {
      this.$router.go(-1)
    },
    getHistoryList () {
      api.history().then(res => {
        if (res.data.code === 200) {
          this.historyList = res.data.successObject
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    gethotSearchList () {
      api.hotSearch().then(res => {
        if (res.data.code === 200) {
          this.hotSearchList = res.data.successObject
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    cleanHistoryRecord () {
      api.clearHistory().then(res => {
        if (res.data.code === 200) {
          this.common.toast('删除成功', 'bottom')
          this.historyList = []
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    }
  },
  created () {
    // 获取历史搜索
    this.getHistoryList()
    // 获取热门搜索
    this.gethotSearchList()
  }
}
</script>
<style lang="scss" scoped>
.lsearch{
  height: calc(100Vh - 100px);
}
</style>
