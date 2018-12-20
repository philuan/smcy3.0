<template>
  <!--就医人列表页面-->
  <div class="my_comment">
    <Header :headerCon="headerCon"></Header>
    <div class="comment_list">
      <ul>
        <li v-for="(item, ind) in commentList" :key="ind">
          <div class="order_num_time">
            <p class="order_num">订单号：<span>20180723-12326544</span></p>
            <p class="order_time">2018.07.05  14:20:00</p>
          </div>
          <div class="visite_items">
            <p class="visite_name">就诊项目：</p>
            <p class="visite_list">
              <span>项目名称</span>
              <span>项目名称</span>
              <span>项目名称</span>
              <span>项目名称</span>
            </p>
          </div>
          <p class="jyr">服务护士：&nbsp;&nbsp;<span>某某某</span></p>
          <div class="go_comment" v-if="item.showWhich">
            <p class="state">状态：<span>待评论</span></p>
            <button>去评论</button>
          </div>
          <div class="see_comment" v-if="!item.showWhich">
            <div class="rate">
              <p class="rate_tit">项目指星</p>
              <!--星级评分组件-->
            </div>
            <div class="comment_message">
              <p>评论留言</p>
              <p>
                <span>出报告快</span>
                <span>出报告快</span>
                <span>出报告快</span>
              </p>
            </div>
            <div class="img_list" v-if="item.length">
              <img src="" >
              <img src="" >
              <img src="" >
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../../common/Header'
export default {
  name: 'MyComment',
  components: {
    Header
  },
  data () {
    return {
      headerCon: '评论',
      commentList: [
        {
          showWhich: true,
          length: 0
        },
        {
          showWhich: false,
          length: 3
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .my_comment{
    width: 100%;
    height: auto;
    .comment_list{
      width: 100%;
      height: auto;
      ul{
        width: 100%;
        height: auto;
        li{
          width: 710px;
          height: auto;
          margin: 0 auto 10px;
          padding-bottom: 15px;
          border-radius:10px;
          background: #F2F5FF;
          .order_num_time{
            width: 650px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
            .order_num{
              font-size: $font26;
              color: #444;
              span{
                color: #38BF58;
              }
            }
            .order_time{
              color: #777;
              font-size: $font24;
            }
          }
          .visite_items{
            width: 560px;
            margin: 0 auto;
            display: flex;
            justify-content: left;
            .visite_name{
              text-align: left;
              width: 160px;
              color: #444;
              font-size: $font24;
            }
            .visite_list{
              width: 400px;
              text-align: left;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              span{
                width: 101px;
                font-size: $font24;
                color: #777;
                margin-bottom: 20px;
              }
            }
          }
          .jyr{
            width: 560px;
            margin: 0 auto;
            text-align: left;
            color: #444;
            font-size: $font24;
            span{
              color: #777;
            }
          }
          .go_comment{
            width: 650px;
            margin: 0 auto;
            .state{
              width: 650px;
              margin: 20px auto 0;
              text-align: left;
              color: #444;
              font-size: $font26;
              span{
                color: #E7532B;
              }
            }
            button{
              width:500px;
              height:70px;
              margin: 30px auto 0;
              background:linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
              opacity:0.9;
              border-radius:35px;
              color: #ffffff;
              font-size: $font28;
            }
          }
          .see_comment{
            width: 710px;
            height: auto;
            margin: 0 auto;
            .rate, .comment_message{
              width: 650px;
              height: 60px;
              display: flex;
              margin: 0 auto;
              justify-content: left;
              align-items: center;
              .rate_tit{
                color: #444;
                font-size: $font26;
              }
            }
            .comment_message{
              p{
                color: #444;
                font-size: $font26;
                display: inline-flex;
                justify-content: left;
                align-items: center;
                margin-right: 50px;
                span{
                  width: 130px;
                  height: 46px;
                  line-height: 46px;
                  text-align: center;
                  border: 2px solid rgba(56,191,88,1);
                  color: rgba(56,191,88,1);
                  border-radius:10px;
                  font-size: $font24;
                  margin-right: 40px;
                }
                span:last-child{
                  margin-right: 0;
                }
              }
              p:last-child{
                margin-right: 0;
              }
            }
            .img_list{
              width: 610px;
              height: 120px;
              margin: 10px auto 0;
              padding-left: 100px;
              img{
                width: 180px;
                height: 120px;
                border-radius:10px;
                /*margin-right: 10px;*/
              }
            }
          }
        }
      }
    }
  }
</style>
