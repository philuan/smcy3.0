<template>
  <panel :moreInfo="objInfo">
    <section class="content">
      <div class="item">
        <ul>
          <li v-for="(item, index) in packageList" :key="item.id" v-if="index < 2" @click="ToSkipInfo(item)">
            <img v-lazy="staticUrl + item.logo">
            <div class="label">
              <h4>{{ item.name }}</h4>
              <p>{{ item.hospitalName }}</p>
 <!--              <p class="hot_rate">关注：<span>{{ item.hot_rate }}</span></p> -->
            </div>
          </li>
        </ul>
      </div>
      <div class="item">
        <ul>
          <li v-for="(item, index) in packageList" :key="item.id" v-if="index > 1 && index <4" @click="ToSkipInfo(item)">
            <img v-lazy="staticUrl + item.logo">
            <div class="label">
              <h4>{{ item.name }}</h4>
              <p>{{ item.hospitalName }}</p>
<!--               <p class="hot_rate">关注：<span>{{ item.hot_rate }}</span></p> -->
            </div>
          </li>
        </ul>
      </div>
      <div class="line"></div>
    </section>
</panel>
</template>
<script>
import {config} from '../../config/config'
import Panel from '../../core/panel.vue'
export default {
  name: 'Hot',
  components: {
    Panel
  },
  props: {
    packageList: {
      type: Array
    },
    objInfo: {
      type: Object
    }
  },
  data () {
    return {
      staticUrl: config.static_url
    }
  },
  methods: {
    ToSkipInfo (item) {
      this.$router.push({name: 'ProjectDetail', params: { uuid: item.uuid, type: item.type }})
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../css/element.scss";
  .panel{
    @include panel;
    >h4{
      border-bottom: 1px solid #ddd;
    }
    .content{
      overflow: hidden;
      text-align: left;
      .item{
        ul{
          @include list(row);
          li{
            position: relative;
            img{
              width: 100%;
              height: 100%;
              vertical-align: middle;
            }
            box-sizing: border-box;
            &:nth-child(1) {
              padding-right: 2px;
            }
            &:nth-child(2){
              padding-left: 2px;
            }
          }
        }
        &:nth-child(1){
          margin-bottom: 4px;
          li{
            width: 50%;
           }
        }
        &:nth-child(2){
          li{
            &:nth-child(1){
              width: 40%;
            }
            &:nth-child(2){
              width: 60%;
            }
           }
        }
        .label{
          position: absolute;
          top: 20px;
          left: 32px;
          h4{
            color: #222;
            font-size: 30px;
          }
          p{
            color: #aaa;
            font-size: 24px;
            margin-top: 10px;
          }
          .hot_rate{
            color: #444;
            font-size: 20px;
            span{
              color: #ff6136;
            }
          }
        }
      }
      .line{
        height: 10px;
        background: #f1f1f1;
      }
    }
  }
</style>
