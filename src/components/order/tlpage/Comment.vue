<template>
  <!--评论页面-->
  <div class="comment">
    <Header :headerCon="headerCon"></Header>
    <div class="order_number">
      <p>订单号：<span>2018809-3198809809</span></p>
      <p>状态：<span>已完成</span></p>
    </div>
    <!--项目名称和就医人，服务护士信息部分-->
    <div class="entry_name">
      <div class="entry_name_list">
        <p class="name_list_l">就诊项目：</p>
        <p class="name_list_r">
          <span>项目名称</span>
          <span>项目名称</span>
          <span>项目名称</span>
          <span>项目名称</span>
        </p>
      </div>
      <div class="jyr">
        <p>就医人：</p>
        <p>某某某</p>
      </div>
      <div class="fwhs">
        <p>服务护士：</p>
        <p>某某某</p>
      </div>
    </div>
    <!--星级评分-->
    <div class="rate">
      <p class="rate_name">项目指星</p>
      <p class="rate_img">
        <img src="../../../assets/rate_select.png" alt="">
        <img src="../../../assets/rate_select.png" alt="">
        <img src="../../../assets/rate_select.png" alt="">
        <img src="../../../assets/rate_select.png" alt="">
        <img src="../../../assets/rate_not_select.png" alt="">
      </p>
    </div>
    <!--评论列表-->
    <div class="comment_list">
      <p class="comment_tit">评论留言</p>
      <p class="comment_name">出报告快</p>
      <p class="comment_name">出报告快</p>
      <p class="comment_name">出报告快</p>
      <p class="comment_name comment_active">出报告快</p>
      <p class="comment_name">出报告快</p>
      <p class="comment_name">出报告快</p>
      <p class="comment_name comment_active">出报告快</p>
      <p class="comment_name">出报告快</p>
      <p class="comment_name">出报告快</p>
    </div>
    <button class="submit">提交</button>
  </div>
</template>

<script>
import Header from '../../common/Header'
export default {
  name: 'comment',
  components: {
    Header
  },
  data () {
    return {
      headerCon: '评论'
    }
  }
}
</script>

<style scoped lang="scss">
  .comment{
    width: 100%;
    height: 100vh;
    position: relative;
    background: #EDF0F2;
    .order_number{
      border-top: 1px solid #F1F1F1;
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      margin-bottom: 1px;
      p{
        color: #444444;
        font-size: $font28;
        span{
          color: #38BF58;
        }
      }
      p:first-child{
        margin-left: 40px;
      }
      p:last-child{
        margin-right: 40px;
      }
    }
    .entry_name{
      width: 100%;
      height: 170px;
      padding: 30px 0;
      background: #ffffff;
      margin-bottom: 10px;
      .entry_name_list{
        width: 630px;
        height: 80px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p{
          height: 80px;
          font-size: $font24;
        }
        .name_list_l{
          width: 120px;
          color: #444444;
        }
        .name_list_r{
          width: 480px;
          color: #777777;
          display: flex;
          justify-content: space-between;
          align-items: start;
          flex-wrap: wrap;
          span{
            width: 130px;
          }
        }
      }
      .jyr, .fwhs{
        width: 630px;
        margin: 0 auto;
        display: flex;
        height: 50px;
        line-height: 50px;
        justify-content: left;
        p{
          font-size: $font24;
        }
        p:first-child{
          color: #444;
          margin-right: 30px;
        }
        p:last-child{
          color: #777;
        }
      }
    }
    .rate{
      width: 100%;
      height: 80px;
      margin: 0 auto;
      display: flex;
      justify-content: left;
      align-items: center;
      background: #ffffff;
      .rate_name{
        color: #444;
        font-size: $font26;
        margin-left: 40px;
        margin-right: 60px;
      }
      .rate_img{
        display: inline-flex;
        img{
          width: 28px;
          height: 28px;
          margin-right: 8px;
        }
      }
    }
    .comment_list{
      width: 100%;
      height: 200px;
      padding: 15px 0;
      margin: 1px auto;
      justify-content: left;
      align-items: center;
      flex-wrap: wrap;
      display: flex;
      background: #ffffff;
      p{
        margin-left: 40px;
        font-size: $font26;
      }
      .comment_tit{
        color: #444444;
      }
      .comment_name{
        width:100px;
        height:40px;
        line-height: 40px;
        border-radius:6px;
        color: #aaaaaa;
        font-size: $font22;
        border:2px solid rgba(170,170,170,1);
      }
      .comment_active{
        border: none;
        background: #38BF58;
        color: #ffffff;
      }
      p:nth-child(2){
        margin-left:60px;
      }
      p:nth-child(5n-1){
        margin-left: 73px;
      }
      p:nth-child(5){
        margin-left: 73px;
      }
      p:nth-child(4n){
        margin-right: 40px;
      }
      p:nth-child(6){
        margin-left: 30px;
      }
      p:nth-child(6n+4){
        margin-left: 30px;
      }
    }
    .submit{
      position: absolute;
      bottom: 70px;
      width:500px;
      height:70px;
      background:linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
      opacity:0.9;
      border-radius:35px;
      left: 125px;
      color: #ffffff;
      font-size:$font28;
    }
  }
</style>
