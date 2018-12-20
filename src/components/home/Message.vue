<template>
  <div class="message">
    <HeaderCom @backPage="back" title="消息通知"/>
    <div class="messageList" v-if="messageList.length">
      <div class="item" v-for="item in messageList" :key="item.id">
        <h5>{{ item.title }}</h5>
        <p>{{ item.content }}</p>
        <span v-if="item.markRead === '1'"></span>
      </div>
    </div>
    <div class="no_message" v-else>
      <img src="@/assets/home_img/no_message.png">
      <p>您暂时还没有新消息通知哦~</p>
    </div>
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
      messageList: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getMessageList () {
      api.messageList().then(res => {
        if (res.data.code === 200) {
          this.messageList = res.data.successObject.records
        }
      }).catch(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.getMessageList()
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
      margin: 0 20px 100px;
      background: #f1f1f1;
      .item{
        position: relative;
        background: #fff;
        margin-top: 10px;
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
  }
</style>
