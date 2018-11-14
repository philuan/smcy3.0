<template>
  <div class="search_list">
    <div class="title">热门商品</div>
    <div class="content">
      <div class="item">血流变</div>
      <div class="item">
        <p>血流变</p>
      </div>
      <div class="item">
        <p>血流变</p>
      </div>
    </div>
</div>
</template>
<script>
export default {
  name: '',
  props: [],
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.search_list{
    background: #fff;
    text-align: left;
    padding: 0 20px;
    .title{
      line-height: 88px;
      border-bottom: 1px solid #f1f1f1;
    }
    .content{
      .item{
        line-height: 86px;
        color: #777;
        border-bottom: 1px solid #f1f1f1;
        background: url("../../../assets/home_img/searchBtn.png")10px 27px no-repeat;
        background-size: 32px;
        text-indent: 70px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
</style>
