<template lang="html">
  <panel title="特检新品">
    <section class="content">
      <div class="item">
        <ul>
          <li>
            <img src="@/assets/home_img/gangong.png">
            <div class="label">
              <h4>肝功九项</h4>
              <p>唐都医院</p>
              <div class="price">
                <span class="per">¥</span>
                <span>128</span>
                <span class="per">.00</span>
              </div>
            </div>
          </li>
          <li>
            <img src="@/assets/home_img/shengong.png">
            <div class="label">
              <h4>肾功六项</h4>
              <p>西京医院</p>
              <div class="price">
                <span class="per">¥</span>
                <span>128</span>
                <span class="per">.00</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="item">
        <img src="@/assets/home_img/xuezhi.png">
        <div class="label">
          <h4>血脂六项</h4>
          <p>西安交通大学第一附属医院</p>
          <div class="price">
            <span class="per">¥</span>
            <span>128</span>
            <span class="per">.00</span>
          </div>
        </div>
      </div>
     </section>
   </panel>
</template>
<script>
import panel from '../../core/panel.vue'
export default {
  name: 'special',
  components: {
    panel
  },
  props: [],
  data () {
    return {

    }
  },
  methods: {

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
          top: 30px;
          left: 32px;
          h4{
            color: #222;
            font-size: 30px;
          }
          p{
            color: #aaa;
            font-size: 24px;
            margin-top: 20px;
          }
          .price{
            margin-top: 20px;
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
