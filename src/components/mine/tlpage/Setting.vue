<template>
  <div class="setting">
    <Header :headerCon="headerCon"></Header>
    <div class="list">
      <ul>
        <li v-for="(item, ind) in settingList" :key="ind">
          <p class="setting_tit">{{item.tit}}</p>
          <p class="setting_con" v-if="item.con">{{item.con}}</p>
          <img :src="rightIcon" class="right_icon">
        </li>
      </ul>
    </div>
    <button class="changeIdentity">切换身份信息</button>
  </div>
</template>

<script>
import Header from '../../common/Header'
export default {
  name: 'Setting',
  components: {
    Header
  },
  data () {
    return {
      headerCon: '设置',
      settingList: [
        {
          tit: '个人信息',
          con: '未完善'
        },
        {
          tit: '手机号绑定',
          con: '153****6789'
        },
        // {
        //   tit: '登录密码修改',
        //   con: ''
        // },
        {
          tit: '关于我们',
          con: ''
        },
        {
          tit: '个性化',
          con: ''
        }
      ],
      rightIcon: require('../../../assets/right_icon.png')
    }
  }
}
</script>

<style scoped lang="scss">
  .setting{
    width: 100%;
    height: 100vh;
    position: relative;
    background: #F1F1F1;
    .list{
      width: 100%;
      height: auto;
      margin-top: 2px;
      ul{
        width: 100%;
        height: auto;
        background: #F1F1F1;
        li{
          width: 100%;
          height: 80px;
          margin-bottom: 2px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          .setting_tit{
            margin-left: 30px;
            font-size: $font30;
            color: #444;
          }
          .setting_con{
            margin-right: 34px;
            margin-left: auto;
            color: #777;
            font-size: $font26;
          }
          .right_icon{
            margin-right: 30px;
            width: 13px;
            height: 22px;
          }
        }
        li:nth-child(3){
          margin-bottom: 10px;
        }
      }
    }
    .changeIdentity{
      position: absolute;
      bottom: 70px;
      left: 125px;
      width: 500px;
      height: 70px;
      background: linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
      opacity: 0.9;
      border-radius: 35px;
      font-size: $font28;
      font-family: SimHei;
      font-weight:  400;
      color: rgba(255,255,255,1);
    }
  }
</style>
