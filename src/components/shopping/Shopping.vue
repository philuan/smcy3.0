<template>
  <div class="shopping">
    <div class="shopping_list">
      <div class="item" v-for="(item,index) in list" :key="item.id">
        <input class="select" type="checkbox" :value="item.id" v-model="checkBoxModel" @click.stop="checkOne(index),checkPick()">
        <!-- <div class="select" @click="selectProject($event, item)"></div> -->
        <img class="label_img" :src="require(`@/assets/shopping_img/${item.img}`)" alt="">
        <div class="des">
          <div>
            <span class="p_name">{{ item.p_name }}</span>
            <p>
              <span class="cycle_label">周期：</span>
              <span class="cycle">{{ item.cycle }}</span>
            </p>
          </div>
          <div>
            <span class="h_name">{{ item.h_name }}</span>
            <p>
              <span class="price">¥{{ item.price }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="shopping_count">
      <div class="select_box">
        <input class="select" type="checkbox" @click="checkAll(),checkModel()" v-model="allp">
        <!-- <div class="select" @click="selectAll"></div> -->
        <span>全选</span>
      </div>
      <div class="count_box">
        <span class="count_label">合计：</span>
        <span class="count_price">¥{{ totalPrice }}</span>
      </div>
      <div class="checkout_btn">去结算({{ checkBoxModel.length }})</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shopping',
  data () {
    return {
      list: [
        {
          'id': '1',
          'p_name': '血常规',
          'h_name': '西京医院',
          'cycle': '1-2d',
          'price': '212.00',
          'count': 1,
          'isBuy': false,
          'img': 'p_img.png'
        },
        {
          'id': '2',
          'p_name': '尿常规',
          'h_name': '唐都医院',
          'cycle': '1-2d',
          'price': '128.00',
          'count': 1,
          'isBuy': false,
          'img': 'p_img.png'
        },
        {
          'id': '3',
          'p_name': '肝脏五项',
          'h_name': '一附院',
          'cycle': '1-2d',
          'price': '318.00',
          'count': 1,
          'isBuy': false,
          'img': 'p_img.png'
        }
      ],
      checkBoxModel: [],
      allp: false
    }
  },
  computed: {
    totalPrice () {
      var total = 0
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].isBuy) {
          var item = this.list[i]
          total += item.price * item.count
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
    }
  },
  methods: {
    // 单选的实现依靠的是isBuy通过click的切换实现
    checkOne (index) {
      if (this.list[index].isBuy) {
        this.list[index].isBuy = false
      } else {
        this.list[index].isBuy = true
      }
    },
    // 单选商品数量等于商品列表数量时，全选按钮打钩
    checkPick () {
      var _this = this
      var sumPic = 0
      for (var i = 0; i < _this.list.length; i++) {
        if (_this.list[i].isBuy) {
          sumPic++
        }
      }
      if (sumPic === _this.list.length) {
        _this.allp = true
      } else {
        _this.allp = false
      }
    },
    // 全选
    checkAll () {
      var _this = this
      if (_this.allp) {
        _this.checkBoxModel = []
        _this.allp = false
      } else {
        _this.checkBoxModel = []
        _this.list.forEach(function (item) {
          _this.checkBoxModel.push(item.id)
        })
        _this.allp = true
      }
      // 全选的实现通过checkBoxModel的状态
    },
    // 利用checkBoxModel的绑定的状态来分别给每个物品确认isBuy的状态，避免与checkOne的冲突
    checkModel () {
      var _this = this
      var newArr = []
      if (_this.checkBoxModel.length) {
        newArr = _this.checkBoxModel.concat()
        for (let i = 0; i < _this.checkBoxModel.length; i++) {
          var newone = newArr.shift().toString()
          _this.list[newone - 1].isBuy = true
        }
      } else {
        newArr = _this.checkBoxModel.concat()
        for (let i = 0; i < _this.list.length; i++) {
          _this.list[i].isBuy = false
        }
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import "../../css/element.scss";
.shopping{
  height: calc(100Vh - 100px);
  background: #EDF0F2;
  .shopping_list{
    background: #fff;
    @include list(column);
    .item{
      position: relative;
      padding: 20px 40px 20px 30px;
      border-bottom: 2px solid #f1f1f1;
      .select{
        width: 32px;
        height: 32px;
        margin: 50px 30px 80px 0;
        float: left;
      }
      .selected{
        background: url("../../assets/shopping_img/selected.png")no-repeat;
        background-size: cover;
      }
      .label_img{
        width: 182px;
        height: 160px;
        float: left;
      }
      .des{
        float: left;
        position: absolute;
        top: 20px;
        left: 296px;
        right: 40px;
        bottom: 20px;
        .p_name{
          color: #444;
          font-size: 34px;
        }
        .cycle_label{
          color: #777;
          font-size: 24px;
        }
        .cycle{
          color: #ff6136;
          font-size: 24px;
        }
        .h_name{
          color: #aaa;
          font-size: 26px;
        }
        .price{
          color: #ffc000;
          font-sizd: 24px;
        }
        div {
          display: flex;
          justify-content: space-between;
          &:nth-child(1){
           position: absolute;
           top: 20px;
           left: 0;
           right: 0;
          }
          &:nth-child(2){
           position: absolute;
           bottom: 20px;
           left: 0;
           right: 0;
          }
        }
      }
    }
  }
  .shopping_count{
    width: 100%;
    position: fixed;
    background: #fff;
    bottom: 100px;
    @include list(row);
    padding: 16px 18px 16px 30px;
    height: 60px;
    line-height: 60px;
    .select_box{
      margin-right: 145px;
      font-size: 26px;
      color: #777;
      .select{
        vertical-align: middle;
        width: 32px;
        height: 32px;
        margin-right: 16px;
        float: left;
        margin-top: 14px;
      }
      .selected{
        background: url("../../assets/shopping_img/selected.png")no-repeat;
        background-size: cover;
      }
    }
    .count_box{
      margin-right: 34px;
      span{
        display: inline-block;
        height: 60px;
        line-height: 60px;
      }
      .count_label{
        color: #444;
        font-size: 26px;
        margin-right: 20px;
        vertical-align: top;
      }
      .count_price{
        color: #FFC000;
        font-size: 34px;
      }
    }
    .checkout_btn{
      line-height: 60px;
      height: 60px;
      padding: 0 40px 0 36px;
      background: #EA7331;
      color: #fff;
      border-radius: 30px;
      text-align: center;
      font-size: 26px;
    }
  }
}
</style>
