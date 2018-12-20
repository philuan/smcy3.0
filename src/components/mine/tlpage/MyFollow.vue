<template>
  <div class="follow">
    <Header :headerCon="headerCon"></Header>
    <div class="list">
      <ul>
        <li v-for="(item, ind) in followList" :key="ind">
          <img src="../../../../static/images/20181108155159.png" alt="">
          <div class="con">
            <p class="name">项目名称</p>
            <p class="describe">
              蛋白+蛋白s(fzfczxc )各大热个人二陪儿童可肉片儿童怕热呕吐我热捧
            </p>
            <p class="hos_info">
              <span>医院名称</span>
              <span class="yj">¥152</span>
              <span class="xj">¥132</span>
            </p>
          </div>
          <button class="discount">优惠</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../../common/Header'
export default {
  name: 'MyFollow',
  components: {
    Header
  },
  data () {
    return {
      headerCon: '我的关注',
      followList: [
        {
          showWhich: true,
          length: 0
        },
        {
          showWhich: false,
          length: 3
        },
        {}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .follow{
    width: 100%;
    height: auto;
    min-height: 100vh;
    background: #F1F1F1;
    .list{
      margin-top: 2px;
      width: 100%;
      height: auto;
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 180px;
          background: #ffffff;
          margin-bottom: 2px;
          position: relative;
          .discount{
            width:80px;
            height:30px;
            background:rgba(255,144,89,1);
            border-radius:6px;
            font-size: $font24;
            font-family:SimHei;
            font-weight:400;
            color:rgba(255,255,255,1);
            position: absolute;
            right: 30px;
            top: 30px;
          }
          img{
            position: absolute;
            left: 30px;
            top: 20px;
            width: 140px;
            height: 140px;
          }
          .con{
            position: absolute;
            left: 188px;
            top: 20px;
            width: 505px;
            height: 140px;
            p{
              text-align: left;
            }
            .name{
              width: 100%;
              height: 46px;
              line-height: 46px;
              color: #111;
              font-size: $font28;
            }
            .describe{
              width: 100%;
              height: 54px;
              font-size: $font22;
              font-family: Adobe Heiti Std R;
              font-weight: normal;
              color: rgba(119,119,119,1);
              line-height: 34px;
            }
            .hos_info{
              width: 100%;
              height: 40px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              span{
                color: #777;
                font-size: $font22;
              }
              .yj{
                width: 50px;
                height: 30px;
                line-height: 30px;
                position: relative;
                font-size: $font18;
                margin-left: auto;
                margin-right: 30px;
              }
              .yj:after{
                position: absolute;
                height: 0;
                content: '';
                width: 50px;
                left: -3px;
                top: 14px;
                border-bottom: 2px solid #7D7D7D;
              }
              .xj{
                font-size: $font22;
                color: #1FB0E7;
              }
            }
          }
        }
      }
    }
  }
</style>
