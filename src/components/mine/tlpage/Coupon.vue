<template>
  <div class="coupon">
    <Header :headerCon="headerCon">
      <img :src="questionImg" class="question_img" @click="getModal">
    </Header>
    <!--<div class="search">-->
      <!--<input type="text" placeholder="请输入兑换券">-->
      <!--<button>兑换</button>-->
    <!--</div>-->
    <!--第二个页面，项目介绍，流程服务，注意事项-->
    <!--<div class="tab">-->
      <!--<p v-for="(item, ind) in tabData" :key="ind" @click="changeTab(ind)" :class="isSelect === ind ? 'active' : ''">{{item}}</p>-->
    <!--</div>-->
    <!--当下标不同步时，就隐藏内容-->
    <!-- <div v-for="(item, ind) in tabList" :key="ind" :class="[isSelect !== ind ? 'hide' : '']" class="tab_list"> -->
    <div class="tab_list">
      <ul>
        <li v-for="item in AvailableCoupons" :key="item.id" @click="goRouter(item)">
          <div class="money">
            <p class="mh">
              <span class="symbol">¥</span>
              <span>{{ item.couponPrice }}</span>
            </p>
            <p class="dyq">抵用券</p>
          </div>
          <div class="qm_yxq">
            <p class="qm">{{item.name}}</p>
            <p class="describe">有效期至{{item.expireTime}}</p>
            <p class="describe">有效期至{{item.yxq}}</p>
          </div>
          <img :src="notSelectImg" class="select_img">
          <p class="syqx">使用期限：<span>{{item.beginTime}} - {{item.expireTime}}</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../../../utils/api'
import Header from '../../common/Header'
// import { mapState, mapMutations } from 'vuex'
import { mapState } from 'vuex'
export default {
  name: 'Coupon',
  components: {
    Header
  },
  computed: {
    ...mapState(['AvailableCoupons'])
  },
  data () {
    return {
      headerCon: '优惠券',
      questionImg: require('../../../assets/question_img.png'),
      selectImg: require('../../../assets/select_img.png'),
      notSelectImg: require('../../../assets/not_select_img.png'),
      isSelect: 0, // tab选项默认值
      tabData: ['可使用', '不可使用'], // tab数组
      params: '' // 调接口需要的参数
      // tabList: [
      //   {
      //     yhqList: []
      //   }
      // ]
    }
  },
  methods: {
    changeTab (ind) {
      this.isSelect = ind
    },
    getModal () {
      alert(1)
    },
    getUseCoupon (params) {
      api.getUseCoupon(params).then(res => {
        if (res.data.code === 200) {
          let { successObject } = res.data
          this.tabList[0].yhqList = successObject
        }
      })
    },
    goRouter (item) {
      // this.common.setStorage('coupon', item.uuid)
      // this.selectCoupon()
      this.$router.push({path: '/orderconfirm', query: { coupon_uuid: item.uuid }})
    }
    // ...mapMutations(['selectCoupon'])
  }
  // mounted () {
  //   this.params = {
  //     'projects': [
  //       {
  //         'uuid': '1', // 项目uuid
  //         'type': '0' // 项目类型(0:单项目 1:组合项目)
  //       },
  //       {
  //         'uuid': '9',
  //         'type': '1'
  //       }
  //     ]
  //   }
  //   this.getUseCoupon(this.params)
  // }
}
</script>

<style scoped lang="scss">
  .question_img{
    width: 44px;
    height: 44px;
    top: 23px;
    left: 676px;
  }
  .coupon{
    width: 100%;
    height: auto;
    min-height: 100vh;
    background: #F1F1F1;
    .search{
      width: 100%;
      height: 80px;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2px;
      input{
        width:502px;
        padding-left: 18px;
        height:60px;
        background:rgba(242,242,242,1);
        border-radius:10px;
        margin-left: 40px;
        font-size: $font24;
        font-weight:400;
        color:rgba(170,170,170,1);
      }
      button{
        width:130px;
        height:50px;
        background:rgba(170,170,170,1);
        border-radius:25px;
        color: #ffffff;
        font-size: $font26;
        margin-right: 30px;
      }
    }
    .tab{
      width: 100%;
      height: 80px;
      display: flex;
      background: #ffffff;
      justify-content: space-around;
      align-items: center;
      margin-top: 10px;
      p{
        height: 75px;
        line-height: 75px;
        font-size: $font28;
        font-weight: 400;
      }
      p.active{
        color: #1FB0E7;
        border-bottom: 5px solid #1FB0E7;/*no*/
      }
    }
    .tab_list{
      width: 100%;
      height: auto;
      ul{
        width: 100%;
        height: auto;
        background: #F1F1F1;
        li{
          position: relative;
          width: 710px;
          height: 200px;
          margin: 20px auto 0;
          background: url("../../../assets/mine_img/integral_bg.png") no-repeat;
          background-size: 100% 100%;
          .money{
            position: absolute;
            width: 140px;
            height: 103px;
            top: 20px;
            left: 30px;
            border-right: 2px solid #F1F1F1;
            p{
              text-align: left;
            }
            .mh{
              height: 76px;
              .symbol{
                font-size: $font30;
              }
              span{
                color: #1FB0E7;
                font-size: $font68;
              }
            }
            .dyq{
              color: #1FB0E7;
              font-size: $font20;
              text-indent: .5em;
            }
          }
          .qm_yxq{
            position: absolute;
            left: 193px;
            top: 20px;
            height: 103px;
            width: 360px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
            p{
              width: 100%;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              text-align: left;
            }
            .qm{
              color: #444;
              font-size: $font26;
            }
            .describe{
              color: #777;
              font-size: $font22;
            }
          }
          .select_img{
            position: absolute;
            display: block;
            width:32px;
            height:32px;
            top: 56px;
            right: 64px;
            color: #ffffff;
            font-size: $font24;
          }
          .syqx{
            position: absolute;
            width: 710px;
            height: 58px;
            left: 0;
            top: 142px;
            line-height: 58px;
            color: #444;
            font-size: $font24;
            span{
              color: #1FB0E7;
            }
          }
        }
      }
    }
    .hide{
      display: none;
    }
  }
</style>
