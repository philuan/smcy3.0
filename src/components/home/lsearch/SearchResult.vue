<template>
  <div class="search_result">
    <search-header/>
    <div class="search_criteria">
      <div class="item">价格</div>
      <div class="item">医院</div>
    </div>
    <panel-list :items="searchList"/>
  </div>
</template>
<script>
import SearchHeader from '../../../core/SearchHeader.vue'
import PanelList from '../../../core/PanelList.vue'
export default {
  name: '',
  props: [],
  components: {
    SearchHeader,
    PanelList
  },
  data () {
    return {
      'searchList': [
        {
          'id': '1',
          'h_name': '陕西省人民医院',
          'h_img': 'h1.png',
          'p_img': 'p1.png',
          'p_name': '血常规',
          'price': '128'
        },
        {
          'id': '2',
          'h_name': '陕西省人民医院',
          'h_img': 'h1.png',
          'p_img': 'p1.png',
          'p_name': '血常规',
          'price': '128'
        },
        {
          'id': '3',
          'h_name': '陕西省人民医院',
          'h_img': 'h1.png',
          'p_img': 'p1.png',
          'p_name': '血常规',
          'price': '128'
        },
        {
          'id': '4',
          'h_name': '陕西省人民医院',
          'h_img': 'h1.png',
          'p_img': 'p1.png',
          'p_name': '血常规',
          'price': '128'
        }
      ]
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  @import "../../../css/element.scss";
  .search_result{
    height: calc(100Vh - 100px);
    .search_criteria{
      @include list;
      flex-direction: row;
      line-height: 70px;
      background: #fff;
      .item{
        flex: 1;
      }
    }
  }
</style>
