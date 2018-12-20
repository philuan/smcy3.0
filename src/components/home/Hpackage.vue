<template>
  <panel :moreInfo="objInfo">
    <section class="content">
      <div class="item" v-for="(item, index) in packageList" :key="item.id" v-if="index === 0" @click="ToSkipInfo(item)">
        <img v-lazy="staticUrl + item.logo" />
        <div class="label">
          <h4>{{ item.name }}</h4>
          <p>{{ item.hospitalName }}</p>
          <div>去看看</div>
        </div>
      </div>
      <div class="item">
        <ul>
          <li v-for="(item, index) in packageList" :key="item.id" v-if="index < 3 && index !== 0" @click="ToSkipInfo(item)">
            <div class="label">
              <h4>{{item.name}}</h4>
              <p>{{item.hospitalName}}</p>
            </div>
            <img v-lazy="staticUrl + item.logo" />
          </li>
        </ul>
      </div>
      <div class="line"></div>
    </section>
  </panel>
</template>
<script>
import {config} from '../../config/config'
import panel from '../../core/panel.vue'
export default {
  name: 'package',
  components: {
    panel
  },
  props: {
    packageList: {
      type: Array
    },
    objInfo: {
      type: Object
    }
  },
  computed: {

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
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 0;
        padding-bottom: 37.3%;
        &:nth-child(1){
          margin-bottom: 4px;
        }
        img{
            width: 100%;
            vertical-align: middle;
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
          div{
            width: 90px;
            color: #fff;
            padding: 8px 0;
            background: linear-gradient(left, #36C8FF, #1FB0E7);
            margin-top: 10px;
            font-size: 20px;
            text-align: center;
          }
        }
        ul{
           @include list(row);
           li{
            position: relative;
            width: 50%;
            box-sizing: border-box;
            &:nth-child(1) {
              padding-right: 2px;
            }
            &:nth-child(2){
              padding-left: 2px;
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
