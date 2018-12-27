<template>
  <div class="shopping">
    <div class="shopping_cart_wrapper" v-if="list.length">
      <div class="shopping_list">
        <div class="item_wrapper" v-for="(item,index) in list" :key="item.id" data-type="0">
          <div class="item" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip(item)">
            <span class="select" :class="item.isBuy ? 'selected' : ''" :key="item.id"
             @click.stop="checkOne(index),checkPick()"></span>
            <img class="label_img" v-lazy="staticUrl + item.logo" alt="">
            <div class="des">
              <div>
                <span class="p_name">{{ item.name }}</span>
                <p>
                  <span class="cycle_label">周期：</span>
                  <span class="cycle">{{ item.period }}</span>
                </p>
              </div>
              <div>
                <span class="h_name">{{ item.hospitalName }}</span>
                <p>
                  <span class="price">¥{{ item.nowPrice }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="btn_box" ref="btn_box">
            <div class="cancel_btn btn" @click="cancel">取消</div>
            <div class="delete_btn btn" @click="deleteProject(item.uuid)">删除</div>
          </div>
        </div>
      </div>
      <div class="shopping_count">
        <div class="select_box">
          <span class="select" :class="allp ? 'selected' : ''" @click="checkAll(),checkModel()"></span>
          <span>全选</span>
        </div>
        <div class="count_box">
          <span class="count_label">合计：</span>
          <span class="count_price">¥{{ totalPrice }}</span>
        </div>
        <div class="checkout_btn" :class="checkBoxModel.length > 0 ? 'checked' : ''" @click="goHandleClick">去结算({{ checkBoxModel.length }})</div>
      </div>
    </div>
    <div class="no_message" v-else>
      <img src="@/assets/shopping_img/no_project.png">
      <p>您的购物车暂时还是空的哦~</p>
      <router-link tag="div" class="go_btn" to="/home">去逛逛</router-link>
    </div>
  </div>
</template>

<script>
import {config} from '../../config/config'
import appConfig from '../../utils/appConfig'
import api from '../../utils/api'
import { mapActions } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'ShoppingCart',
  data () {
    return {
      startX: 0,
      endX: 0,
      checkBoxModel: [],
      allp: false,
      confirmInfo: {},
      list: [],
      totalPrice: 0,
      orderConfirmList: [],
      staticUrl: config.static_url,
      hospitalList: this.common.getStorage('hospitalList')
    }
  },
  methods: {
    // 跳转
    skip (item) {
      if (this.checkSlide()) {
        this.restSlide()
      } else {
        this.$router.push({name: 'ProjectDetail', params: { uuid: item.uuid, type: item.type }})
      }
    },
    // 取消
    cancel () {
      this.restSlide()
    },
    // 删除
    deleteProject (uuid) {
      let params = {
        uuid: uuid
      }
      api.deleteFromCart(params).then(res => {
        if (res.data.code === 200) {
          this.getShoppingCartTotal()
          for (let i in this.list) {
            if (uuid === this.list[i].uuid) {
              this.list.splice(i, 1)
              return
            }
          }
        } else {
          Toast({
            message: '删除失败，请稍后重试',
            position: 'bottom',
            duration: 2000
          })
        }
      }).catch(res => {
        console.log(res)
      })
      // this.deleteFromCart(params)
    },
    // 滑动开始
    touchStart (e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX
    },
    // 滑动结束
    touchEnd (e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX
      // 左滑
      if (parentElement.dataset.type === '0' && this.startX - this.endX > 50) {
        this.restSlide()
        parentElement.dataset.type = 1
      }
      // 右滑
      if (parentElement.dataset.type === '1' && this.startX - this.endX < -50) {
        this.restSlide()
        parentElement.dataset.type = 0
      }
      this.startX = 0
      this.endX = 0
    },
    // 判断当前是否有滑块处于滑动状态
    checkSlide () {
      let listItems = document.querySelectorAll('.item_wrapper')
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type === '1') {
          return true
        }
      }
      return false
    },
    // 复位滑动状态
    restSlide () {
      let listItems = document.querySelectorAll('.item_wrapper')
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0
      }
    },
    // 单选的实现依靠的是isBuy通过click的切换实现
    checkOne (index) {
      if (this.list[index].isBuy) {
        this.list[index].isBuy = false
      } else {
        this.list[index].isBuy = true
      }
      this.computedTotalPrice()
    },
    // 单选商品数量等于商品列表数量时，全选按钮打钩
    checkPick () {
      var _this = this
      _this.checkBoxModel = []
      for (let i in _this.list) {
        if (_this.list[i].isBuy) {
          _this.checkBoxModel.push(_this.list[i].id)
        }
      }
      if (_this.checkBoxModel.length === _this.list.length) {
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
      let _this = this
      let newArr = []

      if (_this.checkBoxModel.length) {
        newArr = _this.checkBoxModel.concat()
        for (let i in newArr) {
          for (let j in _this.list) {
            if (newArr[i] === _this.list[j].id) {
              _this.list[j].isBuy = true
              break
            }
          }
        }
      } else {
        newArr = _this.checkBoxModel.concat()
        for (let i = 0; i < _this.list.length; i++) {
          _this.list[i].isBuy = false
        }
      }

      _this.checkedList = []
      _this.checkedList = _this.list.concat()
      this.computedTotalPrice()
    },
    goHandleClick () {
      if (this.checkBoxModel.length === 0) {
        console.log('请选择项目')
        return
      }
      this.orderConfirmList = []
      for (let i in this.list) {
        if (this.list[i].isBuy === true) {
          this.orderConfirmList.push(this.list[i])
        }
      }

      var orderConfirmInfo = {
        'totalPrice': this.totalPrice,
        'orderConfirmList': this.orderConfirmList,
        'projectNumber': this.checkBoxModel.length
      }

      this.common.setStorage('orderConfirmInfo', orderConfirmInfo)
      this.$router.push({ path: '/orderconfirm' })
    },
    getShoppingCartList () {
      let params = {
        pageNo: 1,
        pageSize: 10000
      }
      api.shoppingCart(params).then(res => {
        if (res.data.code === 200) {
          // 购物车列表数据处理
          this.handleShoppingCartList(res.data.successObject.projectList)
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    handleShoppingCartList (projectList) {
      for (let i in projectList) {
        for (let j in this.hospitalList) {
          if (projectList[i].hospital === this.hospitalList[j].uuid) {
            projectList[i].hospitalName = this.hospitalList[j].name
            projectList[i].hospitalLogo = this.hospitalList[j].logo
            break
          }
        }
      }
      for (let i in projectList) {
        projectList[i].isBuy = false
      }
      this.list = []
      this.list = this.list.concat(projectList)
      console.log(this.list)
    },
    computedTotalPrice () {
      this.totalPrice = 0
      for (let i in this.list) {
        if (this.list[i].isBuy) {
          let item = this.list[i]
          this.totalPrice += item.nowPrice
        }
      }
    },
    ...mapActions(['getShoppingCartTotal'])
  },
  created () {
    this.getShoppingCartList()
    appConfig.init()
  }
}
</script>

<style scoped lang='scss'>
@import "../../css/element.scss";
.shopping{
  height: 100Vh;
  background: #f1f1f1;
  display: block;
  .shopping_list{
    background: #fff;
    margin-bottom: 200px;
    .item_wrapper{
      position: relative;
      height: 200px;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
      .item{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 20px 40px 20px 30px;
        border-bottom: 2px solid #f1f1f1;
        overflow: hidden;
        .select{
          width: 32px;
          height: 32px;
          margin: 50px 25px 80px 0;
          float: left;
          background: url("../../assets/shopping_img/select.png") no-repeat;
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
          left: 290px;
          right: 40px;
          bottom: 20px;
          .p_name{
            color: #444;
            font-size: 34px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          p{
            line-height: 45px;
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
             line-height: 45px;
             font-size: 26px;
            }
          }
        }
      }
      .btn_box{
        position: absolute;
        top: 0;
        right: -200px;
        bottom: 100px;
        width: 200px;
        height: 100%;
        @include list(row);
        align-items: center;
        color: #fff;
        font-size: 30px;
        .btn{
          flex: 1;
          line-height: 199px;
          height: 199px;
        }
        .cancel_btn{
          background: #ccc;
        }
        .delete_btn{
          background: #FF4E4E;
        }
      }
    }
    .item_wrapper[data-type="0"]{
      transform: translate3d(0,0,0);
    }
    .item_wrapper[data-type="1"]{
      transform: translate3d(-200px,0,0);
    }
  }
  .item_wrapper[data-type="0"]{
    transform: translate3d(0,0,0);
    overflow: hidden;
  }
  .item_wrapper[data-type="1"]{
    transform: translate3d(-200,0,0);
    overflow: visible;
  }
  .shopping_count{
    width: 100%;
    position: fixed;
    background: #fff;
    bottom: 100px;
    @include list(row);
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 15px 30px;
    line-height: 60px;
    box-sizing: border-box;
    .select_box{
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
      /*margin-right: 34px;*/
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
      background: #AAA;
      color: #fff;
      border-radius: 30px;
      text-align: center;
      font-size: 26px;
      &.checked {
        background: #EA7331;
      }
    }
  }
  .no_message{
      width: 500px;
      height: 500px;
      margin: 0 auto;
      text-align: center;
      img{
        margin-top: 194px;
        width: 100%;
      }
      p{
        margin-top: -26px;
        color: #aaa;
        font-size: 24px;
        width: 100%;
        text-align: center;
      }
      .go_btn{
        width: 300px;
        line-height: 70px;
        color: #fff;
        font-size: 28px;
        background: #36C8FF;
        border-radius: 36px;
        margin: 156px auto 0;
      }
    }
}
</style>
