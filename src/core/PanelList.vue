<template>
  <div  class="panel_list">
    <div class="item" v-for="item in items" :key="item.id">
      <div class="hospital">
        <img :src="require(`@/assets/home_img/${item.h_img}`)">
        <p>{{ item.h_name }}</p>
      </div>
      <img class="p_img" :src="require(`@/assets/home_img/${item.p_img}`)">
      <p class="name">{{ item.p_name }}</p>
      <div class="price">
        <span class="per">¥</span>
        <span>{{ item.price }}</span>
        <span class="per">.00</span>
      </div>
    </div>
 </div>
</template>
<script>
export default {
  name: 'PanelList',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.panel_list{
    overflow: hidden;
    padding: 10px 30px;
    margin-bottom: 100px;
    text-align: left;
    .item{
      float: left;
      box-sizing: border-box;
      width: 50%;
      &:nth-child(even){
        padding-left: 5px;
      }
      &:nth-child(odd){
        padding-right: 5px;
      }
      .hospital{
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: #F2F4F4;
        border-radius: 10px 10px 0 0;
        img{
          float: left;
          width: 40px;
          height: 40px;
          margin: 10px 12px 0 10px;
        }
        p{
          color: #777;
          font-size: 22px;
        }
      }
      .p_img{
        width: 100%;
        margin-bottom: 20px;
      }
      .name{
        color: #111;
        font-size: 30px;
        margin-bottom: 14px;
      }
      .price{
        font-size: 26px;
        color: #FFC000;
        margin-bottom: 30px;
        .per{
          font-size: 24px;
        }
      }
    }
  }
</style>
