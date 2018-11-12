<template>
<div id="a" class="container">
<table class="table table-hover" v-if="list.length">
  <thead>
      <tr>
          <th><input type="checkbox" id="box" @click="checkAll" v-model="checkall" /></th>
          <th>图片</th>
          <th>商品名</th>
          <th>数量</th>
          <th>单价</th>
          <th>总金额</th>
          <th>加入时间</th>
          <th>删除</th>
      </tr>
  </thead>

  <tbody>
      <tr v-for="(dateil,index) in list" :key="index">
          <td><input type="checkbox" class="checkbox" v-model="checked"    @click="select(dateil.detailId,dateil.detailProductprice,dateil.detailProductnum)" :value="dateil.detailId" /></td>
          <td><a @click="goShop(dateil.detailProductId)" style="cursor: pointer;"><img v-bind:src="web_server_static+dateil.product.productPhoto"></a></td>
          <td><a @click="goShop(dateil.detailProductId)" style="cursor: pointer;">{{dateil.product.productName}}</a></td>
          <td>{{dateil.detailProductnum}}</td>
          <td>{{dateil.detailProductprice}}</td>
          <td>{{dateil.detailProductprice*dateil.detailProductnum}}</td>
          <td>{{dateil.detailDatetime}}</td>
          <td>
              <button type="button" id="but" @click="del(dateil.detailId)" class="btn btn-danger">删除</button>
          </td>
      </tr>

  </tbody>

</table>
<div v-else style="font-size: 25px;text-align: center; margin-top: 300px;height: 100px;">购物车空空如也，请先去购买商品~</div>
<div id="label_btn">
  <span><label>已选商品<a>{{count}}</a>件，共</a>￥{{price}}</a>元 数组{{checked}}</label>

  </span>
  <span><button type="button" id="btn-close" @click="jiesuan()" class="btn btn-danger">结算</button></span>
</div>
<!--结算按钮-->

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

</style>