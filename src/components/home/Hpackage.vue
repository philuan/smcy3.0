<template>
  <panel title="组合项目">
    <section class="content">
      <div class="item">
        <img src="@/assets/home_img/examination_package.png">
        <div class="label">
          <h4>健康体检套餐</h4>
          <p>西安交通大学第一附属医院</p>
          <span>去看看</span>
        </div>
      </div>
      <div class="item">
        <ul>
          <li>
            <div class="label">
              <h4>优生女性套餐</h4>
              <p>西京医院</p>
            </div>
            <img src="@/assets/home_img/female_package.png">
          </li>
          <li>
            <div class="label">
              <h4>优生优育全套</h4>
              <p>西京医院（体检二部）</p>
            </div>
            <img src="@/assets/home_img/all_package.png">
          </li>
        </ul>
      </div>
      <div class="line"></div>
    </section>
  </panel>
</template>
<script>
import panel from '../../core/panel.vue'
export default {
  name: 'package',
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
      overflow: hidden;
      text-align: left;
      .item{
        position: relative;
        &:nth-child(1){
          margin-bottom: 4px;
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
          span{
            display: block;
            width: 90px;
            height: 34px;
            line-height: 34px;
            color: #fff;
            background: #36C8FF;
            margin-top: 20px;
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
