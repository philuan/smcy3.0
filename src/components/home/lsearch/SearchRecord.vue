<template>
  <div class="search_record">
    <search-header/>
    <div class="history_search search_com">
      <div class="title">
        <h4>历史搜索</h4>
        <p>清空历史</p>
      </div>
      <div class="content">
        <div class="item" v-for="item in historyList" :key="item.id">{{ item.name }}</div>
      </div>
    </div>
    <div class="hot_search search_com">
      <div class="title">
        <h4>热门搜索</h4>
      </div>
      <div class="content">
        <div class="item" v-for="item in hotList" :key="item.id">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchHeader from '../../../core/SearchHeader.vue'
export default {
  name: '',
  props: [],
  components: {
    SearchHeader
  },
  data () {
    return {
      'historyList': [
        {
          'id': '1',
          'name': '健康体检套餐'
        },
        {
          'id': '2',
          'name': '优生优育套餐'
        },
        {
          'id': '3',
          'name': '优生优育'
        },
        {
          'id': '4',
          'name': '血脂六项'
        },
        {
          'id': '5',
          'name': '肝功九项'
        }
      ],
      'hotList': [
        {
          'id': '6',
          'name': '肺炎支原体抗体测定'
        },
        {
          'id': '7',
          'name': '心脏Holter'
        },
        {
          'id': '8',
          'name': '胃功能'
        }
      ]
    }
  },
  methods: {

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
