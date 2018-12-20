<template>
  <div class="project">
    <!--头部部分，包含title 设置按钮，分享按钮-->
    <div class="header">
      <img :src="headerImg.settingImg" >
      <p>项目详情</p>
      <img :src="headerImg.shareImg" >
    </div>
    <!--项目名称部分-->
    <div class="project_name">
      <p class="name">{{successObject.name}}</p>
      <p class="describe">{{successObject.description}}</p>
      <div class="price_cycle">
        <p class="price">¥{{successObject.nowPrice}} <span>¥{{successObject.oldPrice}}</span></p>
        <p class="cycle">报告周期：<span>{{successObject.period}}</span></p>
      </div>
    </div>
    <!--医院等级信息-->
    <div class="hospital">
      <p>
        <img :src="qualityAssurance" alt="">
        <span>专业护士</span>
      </p>
      <p>
        <img :src="qualityAssurance" alt="">
        <span>院内陪诊</span>
      </p>
      <p>
        <img :src="qualityAssurance" alt="">
        <span>上门采样</span>
      </p>
      <p>
        <img :src="qualityAssurance" alt="">
        <span>三甲医院</span>
      </p>
      <p>
        <img :src="qualityAssurance" alt="">
        <span>支持7天无理由退款</span>
      </p>
      <p>
        <img :src="qualityAssurance" alt="">
        <span>接单后取消订单收取70%服务费</span>
      </p>
    </div>
    <!--医院名称-->
    <div class="hospital_name">
      <div class="name">
        <img :src="hospitalImg" alt="">
        <p>西安交通大学第一附属医院</p>
      </div>
      <div class="entry_hospital">
        <p>进入医院</p>
        <img :src="blueIcon" alt="">
      </div>
    </div>
    <!--评论区域-->
    <div class="comment">
      <div class="comment_header">
        <p class="comment_header_l">评论(1256)</p>
        <p class="comment_header_r">好评:
          <span>98%</span>
          <img :src="rightIcon" alt="">
        </p>
      </div>
      <div class="comment_slide">
        <swiper :options="swiperCommentOption" ref="CommentSwiper">
          <swiper-slide>
            <div class="swiper_rate">
              <img :src="ballIcon" alt="">
              <p>用户名称</p>
              <div class="rate">
                <img :src="rate" alt="">
                <img :src="rate" alt="">
                <img :src="rate" alt="">
                <img :src="rate" alt="">
                <img :src="rate" alt="">
              </div>
            </div>
            <div class="swiper_comment">
              <p>出报告快</p>
              <p>客服耐心</p>
              <p>方便快捷</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--相关推荐
    <div class="recommend">
      <p class="recommend_tit">相关推荐</p>
      <div class="recommend_slide">
        <swiper :options="swiperRecommendOption" ref="recommendSwiper">
          <swiper-slide>
            <img src="../../../../static/images/20181108155159.png" alt="">
            <div>
              <p>健康体检套餐</p>
              <p>西京医院</p>
              <p>¥128.00</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>-->
    <!--第二个页面，项目介绍，流程服务，注意事项-->
    <div class="tab">
      <p v-for="(item, ind) in tabData" :key="ind" @click="changeTab(ind)" :class="isSelect === ind ? 'active' : ''">{{item}}</p>
    </div>
    <!--当下标不同步时，就隐藏内容-->
    <img :src="item.src" v-for="(item, ind) in tabImgs" :key="ind" :class="[isSelect !== ind ? 'hide' : '', tabImg]">
    <footer>
      <div class="footer_icon" v-for="(item, ind) in footerImg" :key="ind" v-if="item.show" @click="getFollow(ind)">
        <p class="red_point" v-show="item.isShowShopping">{{ shoppingCartTotal }}</p>
        <img :src="item.src" alt="">
        <p>{{item.tit}}</p>
      </div>
      <button class="add_to_cart" @click="handleCartClick">加入购物车</button>
      <button class="buy" @click="buyNow">立即购买</button>
    </footer>
  </div>
</template>

<script>
import api from '../../../utils/api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { config } from '../../../config/config'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ProjectDetail',
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper () {
      return this.$refs.commentSwiper.swiper && this.$refs.recommendSwiper.swiper
    },
    ...mapState(['shoppingCartTotal'])
  },
  data () {
    return {
      swiperCommentOption: { // swiper3
        autoplay: false,
        initialSlide: 0,
        slidesPerView: 1.4,
        speed: 1000
      },
      swiperRecommendOption: { // swiper3
        autoplay: false,
        initialSlide: 0,
        slidesPerView: 2.8,
        speed: 1000
      },
      staticUrl: config.static_url,
      tabData: ['项目介绍', '流程服务', '注意事项'], // tab数组
      successObject: {}, // 从后台传过来的数据
      tabImgs: [
        {
          src: '../../../../static/images/xmjs.png'
        },
        {
          src: '../../../../static/images/fflc.png'
        },
        {
          src: '../../../../static/images/zysx.png'
        }
      ],
      isSelect: 0, // tab选项默认值
      tabImg: 'tabImg', // 设置类名
      headerImg: {
        settingImg: require('@/assets/classification/setting.png'),
        shareImg: require('@/assets/classification/share.png')
      },
      // 底部四个图标未关注 已关注 客服 购物车第一项第二项只显示一个
      footerImg: [
        {
          src: require('@/assets/classification/unfollow.png'),
          tit: '未关注',
          show: false,
          isShowShopping: false // 购物车小红点显不显示
        },
        {
          src: require('@/assets/classification/follow.png'),
          tit: '已关注',
          show: true,
          isShowShopping: false // 购物车小红点显不显示
        },
        {
          src: require('@/assets/classification/custom_service.png'),
          tit: '客服',
          show: true,
          isShowShopping: false // 购物车小红点显不显示
        },
        {
          src: require('@/assets/classification/shopping_cat.png'),
          tit: '购物车',
          show: true,
          isShowShopping: false // 购物车小红点显不显示
        }
      ],
      qualityAssurance: require('@/assets/classification/quality_assurance.png'),
      hospitalImg: require('@/assets/classification/xajtyy.png'),
      blueIcon: require('@/assets/classification/buleicon.png'),
      rightIcon: require('@/assets/right_icon.png'),
      ballIcon: require('../../../assets/classification/201811211209.png'),
      rate: require('../../../assets/rate_select.png'),
      items: [
        {
        },
        {
        },
        {}
      ],
      project: '',
      uuid: this.$route.params.uuid,
      orderConfirmList: []
    }
  },
  methods: {
    changeTab (ind) {
      this.isSelect = ind
    },
    getProjectDetail () {
      let obj = this.$route.params
      console.log(obj)
      api.getProjectDetail(obj).then(res => {
        if (res.data.code === 200) {
          let { successObject } = res.data
          console.log(successObject)
          this.successObject = successObject
          if (successObject.concern) {
            // 显示已关注
            this.footerImg[0].show = false
            this.footerImg[1].show = true
          } else {
            this.footerImg[0].show = true
            this.footerImg[1].show = false
          }
          this.tabImgs[0].src = this.staticUrl + successObject.image1
          this.tabImgs[1].src = this.staticUrl + successObject.image2
          this.tabImgs[2].src = this.staticUrl + successObject.image3
        }
      }).catch(res => {
      })
    },
    getFollow (ind) {
      // 前两项是未关注和已关注（false隐藏  true显示），后边两项永久为true
      if (ind === 0 || ind === 1) {
        this.footerImg[0].show = !this.footerImg[0].show
        this.footerImg[1].show = !this.footerImg[1].show
      } else {
        this.$router.push({name: 'ShoppingCart'})
      }
    },
    handleCartClick () {
      var params = {
        project: this.$route.params.uuid,
        projectType: this.$route.params.type
      }
      this.addToCart(params)
    },
    buyNow () {
      this.orderConfirmList = []
      this.successObject.isBuy = true
      this.orderConfirmList.push(this.successObject)
      var orderConfirmInfo = {
        'totalPrice': this.successObject.nowPrice,
        'orderConfirmList': this.orderConfirmList,
        'projectNumber': 1
      }
      this.common.setStorage('orderConfirmInfo', orderConfirmInfo)
      this.$router.push({ path: '/orderconfirm' })
    },
    ...mapActions(['addToCart'])
  },
  mounted () {
    this.project = JSON.parse(localStorage.getItem('project'))
    console.log(localStorage.getItem('project'))
    this.getProjectDetail()
    // 判断购物车小红点业务逻辑，if判断条件需要根据实际情况重写，这里只为测试
    if (this.uuid) {
      this.footerImg[3].isShowShopping = true
    } else {
      this.footerImg[3].isShowShopping = false
    }
  }
}
</script>

<style scoped lang="scss">
  .project{
    width: 100%;
    height: auto;
    background: #F1F1F1;
    .header{
      width: 100%;
      height: 440px;
      background: url("../../../../static/images/106-b.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      align-items: start;
      img{
        width: 60px;
        height: 60px;
        margin-top: 15px;
      }
      img:first-child{
        margin-left: 30px;
      }
      img:last-child{
        margin-right: 30px;
      }
      p{
        line-height: 60px;
        color: #FFFFFF;
        font-size: $font36;
        margin: 15px auto;
      }
    }
    .project_name{
      width: 100%;
      height: 200px;
      padding: 10px 0;
      margin-bottom: 10px;
      background: #ffffff;
      .name{
        text-align: left;
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: $font34;
        color: #444444;
        text-indent: 30px;
      }
      .describe{
        width: 690px;
        margin: 0 auto;
        height: 80px;
        line-height: 40px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        color: #AAAAAA;
        font-size: $font26;
        text-align: left;
      }
      .price_cycle{
        width: 690px;
        height: 60px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price{
          color: #FFC000;
          font-size: $font30;
          span{
            width: 100px;
            height: 30px;
            color: #777777;
            font-size: $font24;
            position: relative;
          }
          span:after{
            content: '';
            height: 0;
            border: 1px solid #444444;/*no*/
            transform: scaleY(.6);
            position: absolute;
            left: 0;
            width: 90px;
            top: 16px;
          }
        }
        .cycle{
          color: #444444;
          font-size: $font26;
          span{
            font-size: $font22;
            color: #FFC000;
          }
        }
      }
    }
    .hospital{
      width: 690px;
      padding: 15px 30px;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      background: rgba(242,245,255,1);
      p{
        img{
          width: 20px;
          height: 20px;
        }
        span{
          font-size: $font26;
          color:rgba(56,191,88,1);
        }
      }
    }
    .hospital_name{
      width: 690px;
      padding: 10px 30px;
      height: 80px;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px auto;
      .name{
        width: 430px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img{
          width: 60px;
          height: 60px;
        }
        p{
          color: #444444;
          font-size: $font28;
        }
      }
      .entry_hospital{
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{
          color: #1FB0E7;
          font-size: $font26;
        }
        img{
          width: 12px;
          height: 18px;
          margin-left: 10px;
        }
      }
    }
    .comment{
      width: 100%;
      height: 250px;
      padding: 15px 0;
      background: #ffffff;
      .comment_header{
        width: 690px;
        height: 60px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .comment_header_l{
          color: #444444;
          font-size: $font28;
        }
        .comment_header_r{
          color: #444444;
          font-size: $font24;
          span{
            color: #FF762B;
          }
          img{
            width: 12px;
            height: 20px;
          }
        }
      }
      .comment_slide{
        width: 720px;
        margin-left: 30px;
        .swiper-slide{
          width: 520px;
          height: 180px;
          margin-right: 20px;
          .swiper_rate{
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            img{
              width: 60px;
              height: 60px;
            }
            p{
              color: #444444;
              font-size: $font26;
            }
            .rate{
              img{
                width: 28px;
                height: 28px;
              }
            }
          }
          .swiper_comment{
            display: flex;
            justify-content: space-between;
            align-items: center;
            p{
              color: #38BF58;
              font-size: $font22;
              width: 100px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              border: 2px solid #38BF58;
              border-radius: 4px;
            }
            p:first-child{
              margin-left: 70px;
            }
            p:last-child{
              margin-right: 30px;
            }
          }
        }
        .swiper-slide-active{
          background: #F1F1F1;
        }
      }
    }
    .recommend{
      margin-top: 10px;
      width: 100%;
      height: 400px;
      background: #ffffff;
      .recommend_tit{
        width: 100%;
        height: 75px;
        line-height: 75px;
        text-align: center;
        color: #444444;
        font-weight: bold;
        font-size: $font28;
      }
      .recommend_slide{
        width: 720px;
        margin-left: 30px;
        .swiper-slide{
          width: 240px;
          height: 300px;
          background: #F3F3F3;
          margin-right: 10px;
          border-radius: 10px;
          img{
            width: 100%;
            height: 140px;
            margin: 32px auto 10px;
          }
          p{
            width: 100%;
            height: 32px;
            color: #444444;
            font-size: $font26;
            line-height: 32px;
            text-align: center;
          }
          p:nth-child(2){
            font-size: $font24;
            color: #777777;
          }
          p:nth-child(3){
            font-size: $font24;
            color: #FFC000;
          }
        }
      }
    }
    .tab{
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      p{
        height: 68px;
        line-height: 68px;
        font-size: $font24;
      }
      p.active{
        color: #1FB0E7;
        border-bottom: 2px solid #1FB0E7;/*no*/
      }
    }
    .tabImg{
      width: 750px !important;
      margin-bottom: 100px;
    }
    .hide{
      display: none;
    }
    footer{
      width: 100%;
      height: 98px;
      background: #ffffff;
      position: fixed;
      z-index: 6;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .footer_icon{
        p{
          font-size: $font22;
          color: #777;
        }
      }
      .footer_icon:first-child{
        img{
          width: 34px;
          height: 30px;
        }
      }
      .footer_icon:nth-child(2){
        img{
          width: 32px;
          height: 34px;
        }
      }
      .footer_icon:nth-child(3){
        position: relative;
        .red_point{
          position: absolute;
          width: 24px;
          height: 24px;
          background: red;
          border-radius: 50%;
          right: 10%;
          top: -4px;
          z-index: 5;
          text-align: center;
          line-height: 24px;
          font-size: $font18;
          color: #ffffff;
        }
        img{
          width: 36px;
          height: 31px;
        }
      }
      button{
        width:200px;
        height:60px;
        border-radius: 30px;
        color: #ffffff;
        font-size: $font26;
      }
      .add_to_cart{
        background: #FFBB44;
      }
      .buy{
        background: #EF7837;
      }
    }
  }
</style>
