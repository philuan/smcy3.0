<template lang="html">
  <panel :moreInfo="objInfo">
    <section class="content">
      <div class="item">
        <ul>
          <li v-for="(item, index) in packageList" :key="item.id" v-if="index < 2" @click="ToSkipInfo(item)">
            <img v-lazy="staticUrl + item.logo">
            <div class="label">
              <h4>{{ item.name }}</h4>
              <p>{{ item.hospitalName }}</p>
              <div class="price">
                <span class="per">¥</span>
                <span>{{ item.nowPrice }}</span>
     <!--            <span>{{ item.integerPrice }}</span>
                <span class="per">{{ item.decimalPrice }}</span> -->
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="item" v-for="(item, index) in packageList" :key="item.id" v-if="index === 2" @click="ToSkipInfo(item)">
        <img v-lazy="staticUrl + item.logo">
        <div class="label">
          <h4>{{ item.name }}</h4>
          <p>{{ item.hospitalName }}</p>
          <div class="price">
            <span class="per">¥</span>
            <span>{{ item.nowPrice }}</span>
<!--             <span>{{ item.integerPrice }}</span>
            <span class="per">{{ item.decimalPrice }}</span> -->
          </div>
        </div>
      </div>
     </section>
   </panel>
</template>
<script>
import {config} from '../../config/config'
import panel from '../../core/panel.vue'
export default {
  name: 'special',
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
  // computed: {
  //   list: function () {
  //     var list = []
  //     list = list.concat(this.packageList)
  //     for (let i in list) {
  //       let price = list[i].nowPrice.toString()
  //       if (price.indexOf('.') > -1) {
  //         list[i].integerPrice = price.substring(0, price.indexOf('.'))
  //         if (price.substring(price.indexOf('.')).length === 3) {
  //           list[i].decimalPrice = price.substring(price.indexOf('.'))
  //         } else if (price.substring(price.indexOf('.')).length === 2) {
  //           list[i].decimalPrice = price.substring(price.indexOf('.')) + '0'
  //         } else if (price.substring(price.indexOf('.')).length === 1) {
  //           list[i].decimalPrice = price.substring(price.indexOf('.')) + '00'
  //         }
  //       } else {
  //         list[i].integerPrice = list[i].nowPrice
  //         list[i].decimalPrice = '.00'
  //       }
  //     }
  //     return list
  //   }
  // },
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
      @include list(row);
      overflow: hidden;
      text-align: left;
      .item{
        width: 50%;
        position: relative;
        box-sizing: border-box;
        &:nth-child(1){
          padding-right: 2px;
          ul{
             @include list(cloumn);
             li{
              width: 100%;
              position: relative;
              &:nth-child(1){
                margin-bottom: 2px;
              }
              &:nth-child(2){
                margin-top: 2px;
              }
             }
          }
        }
        &:nth-child(2){
          padding-left: 2px;
        }
        img{
            width: 100%;
            height: 100%;
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
          .price{
            margin-top: 10px;
            color: #FFC000;
            font-size: 24px;
            .per{
              font-size: 20px;
            }
          }
        }
      }
    }
  }
</style>
