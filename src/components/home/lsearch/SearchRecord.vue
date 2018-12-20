<template>
  <div class="search_record">
    <div class="history_search search_com" v-if="historyList.length">
      <div class="title">
        <h4>历史搜索</h4>
        <p @click="handleClean">清空历史</p>
      </div>
      <div class="content">
        <div class="item" v-for="item in historyList" :key="item.uuid" @click="skipToSearchResult(item)">{{ item.searchName }}</div>
      </div>
    </div>
    <div class="hot_search search_com">
      <div class="title">
        <h4>热门搜索</h4>
      </div>
      <div class="content">
        <div class="item" v-for="item in hotSearchList" :key="item.uuid" @click="skipToSearchResult(item)">{{ item.searchName }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    historyList: {
      type: Array
    },
    hotSearchList: {
      type: Array
    }
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    handleClean () {
      this.$emit('cleanHistoryRecord')
    },
    skipToSearchResult (item) {
      this.$router.push({name: 'SearchResult', params: { keywords_uuid: item.searchName, from: 'search' }})
    }
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
.search_record{
  background: #f1f1f1;
  .header{
    height: 90px;
    border-bottom: 1px solid #f1f1f1;
    background: #fff;
  }
  .search_com{
    background: #fff;
    margin-bottom: 10px;
    .title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px;
      h4{
        color: #444;
        font-size: 30px;
      }
      p{
        color: #aaa;
        font-size: 24px;
        cursor: pointer;
      }
    }
    .content{
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 20px;
      .item{
        text-align: center;
        font-size: 26px;
        color: #777;
        padding: 10px 40px;
        background: #f1f1f1;
        border-radius: 23px;
        margin: 10px;
      }
    }
  }
}
</style>
