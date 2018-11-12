<template>
  <div class="shopping">
    <div class="shopping_list">
      <div class="item" v-for="item in cartList" :key="item.id">
        <div class="select" @click="selectProject($event)"></div>
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
        <div class="select" @click="selectAll"></div>
        <span>全选</span>
      </div>
      <div class="count_box">
        <span class="count_label">合计：</span>
        <span class="count_price">¥212.00</span>
      </div>
      <div class="checkout_btn">去结算(1)</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shopping',
  data () {
    return {
      cartList: [
        {
          'id': '1',
          'p_name': '血常规',
          'h_name': '西京医院',
          'cycle': '1-2d',
          'price': '212.00',
          'img': 'p_img.png'
        },
        {
          'id': '2',
          'p_name': '尿常规',
          'h_name': '唐都医院',
          'cycle': '1-2d',
          'price': '128.00',
          'img': 'p_img.png'
        },
        {
          'id': '3',
          'p_name': '肝脏五香',
          'h_name': '一附院',
          'cycle': '1-2d',
          'price': '318.00',
          'img': 'p_img.png'
        }
      ]
    }
  },
  methods: {
    selectProject (e) {
      if (e.target.className.indexOf('selected') === -1) {
        e.target.className = 'select selected'
      } else {
        e.target.className = 'select'
      }
    },
    selectAll (e) {
      if (e.target.className.indexOf('selected') === -1) {
        e.target.className = 'select selected'
      } else {
        e.target.className = 'select'
      }
    }
  }
}
</script>

<style scoped lang='scss' >
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
        background: url("../../assets/shopping_img/select.png")no-repeat;
        background-size: cover;
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
        background: url("../../assets/shopping_img/select.png")no-repeat;
        background-size: cover;
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
