<template>
  <div class="message">
    <HeaderCom @backPage="back" title="消息通知"/>
    <div class="messageList" v-if="messageList.length"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div class="list_wrapper">
        <div class="item_wrapper" v-for="(item, index) in messageList" :key="item.id">
          <!-- <div class="item" @touchstart.capture="showMessageBtn(index)" @touchend.capture="clearLoop(index, item.uuid)"  @click="skipToMessageInfo()"> -->
          <div class="item">
            <h5>{{ item.title }}</h5>
            <p>{{ item.content }}</p>
            <span v-if="item.markRead === '1'"></span>
          </div>
          <div class="item_del" v-if="index === currentIndex" @click="deleteMessage(item.uuid)">删除</div>
        </div>
      </div>
    </div>
    <div class="no_message" v-else>
      <img src="@/assets/home_img/no_message.png">
      <p>您暂时还没有新消息通知哦~</p>
    </div>
    <p v-if="noMore" class="noMore">没有更多数据了~</p>
  </div>
</template>
<script>
import HeaderCom from '../../core/HeaderCom.vue'
import api from '../../utils/api'
export default {
  name: 'message',
  props: [],
  components: {
    HeaderCom
  },
  data () {
    return {
      messageList: [],
      currentIndex: '-1',
      pageNo: 0, // 当前页
      pageSize: 10, // 每页条目数
      totalPages: '', // 总页数
      Loop: '', // 定时器
      noMore: 0 // 没有更多数据标记
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    // 获取消息列表
    getMessageList () {
      this.loading = true
      let params = {
        pageNo: this.pageNo, // 当前页
        pageSize: this.pageSize // 每页条目数
      }

      api.messageList(params).then(res => {
        if (res.data.code === 200) {
          if (this.pageNo === 1) {
            this.projectList = []
          }
          this.messageList = this.messageList.concat(res.data.successObject.records)
          this.totalPages = res.data.successObject.pages
          this.loading = false
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    // 显示删除按钮
    showMessageBtn (index) {
      var That = this
      clearInterval(That.Loop) // 再次清空定时器，防止重复注册定时器
      That.Loop = setTimeout(() => {
        That.currentIndex = index
      }, 1000)
    },
    // 清除定时器
    clearLoop () {
      var That = this
      clearInterval(That.Loop)
    },
    deleteMessage (uuid) {
      var That = this
      let params = {
        uuid: uuid
      }
      api.deleteMessage(params).then(res => {
        if (res.data.code === 200) {
          for (let i in That.messageList) {
            if (uuid === That.messageList[i].uuid) {
              That.messageList.splice(i, 1)
              That.currentIndex = '-1'
              That.common.toast('删除成功')
              return
            }
          }
        } else {
          this.common.toast(res.data.msg)
        }
      }).catch(res => {
        this.common.toast(res)
      })
    },
    loadMore () {
      this.loading = true
      this.pageNo++
      if (this.pageNo === 1) {
        this.getMessageList()
      } else if (this.pageNo > 1 && this.totalPages >= this.pageNo) {
        this.getMessageList()
      } else {
        this.noMore = 1
      }
    },
    // 跳转至对应的消息详情页
    skipToMessageInfo (uuid) {
    }
  },
  created () {
    this.loadMore()
  }
}
</script>
<style lang="scss" scoped>
  .message{
    height: calc(100Vh - 100px);
    background: #f1f1f1;
    .title{
      position: relative;
      background: #fff;
      h4{
        text-align: center;
        font-size: 36px;
        color: #141B2B;
        line-height: 90px;
      }
      .back{
        position: absolute;
        left: 40px;
        content: " ";
        display: inline-block;
        height: 14px;
        width: 14px;
        border-width: 0 0 2px 2px;
        border-color: #777;
        border-style: solid;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -7px;
        right: 15px;
      }
    }
    .messageList{
      margin: 0 20px;
      background: #f1f1f1;
      .item_wrapper{
        position: relative;
        overflow: hidden;
        height: 150px;
        margin-top: 10px;
        .item{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: #fff;
          padding: 36px 22px;
          text-align: left;
          h5{
            color: #444;
            font-size: 30px;
          }
          p{
            margin-top: 30px;
            color: #aaa;
            font-size: 24px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          span{
            position: absolute;
            top: 10px;
            right: 20px;
            background: #FF0000;
            width: 14px;
            height: 14px;
            border-radius: 50%;
          }
        }
        .item_del{
          position: absolute;
          top: 34px;
          right: 10px;
          background: url("../../assets/home_img/delete_bg.png")left center no-repeat;
          width: 140px;
          height: 86px;
          line-height: 66px;
          color: #fff;
          font-size: 28px;
          z-index: 3;
        }
      }
    }
    .no_message{
      width: 500px;
      height: 500px;
      margin: 194px auto 0;
      img{
        width: 100%;
      }
      p{
        margin-top: -26px;
        color: #aaa;
        font-size: 24px;
        width: 100%;
        text-align: center;
      }
    }
    .noMore{
      font-size: 22px;
      color: #aaa;
      margin: 30px auto;
    }
  }
</style>
