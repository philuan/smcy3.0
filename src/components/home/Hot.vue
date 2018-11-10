<template>
  <Panel title="热搜项目">
    <section class="content">
      <div class="item">
        <ul>
          <li>
            <img src="@/assets/home_img/feiyan.png">
            <div class="label">
              <h4>肺炎支原体抗体测定</h4>
              <p>西京医院</p>
              <p class="hot_rate">关注：<span>361</span></p>
            </div>
          </li>
          <li>
            <img src="@/assets/home_img/kangti.png">
            <div class="label">
              <h4>抗环瓜氨酸堕胎抗体</h4>
              <p>唐都医院</p>
              <p class="hot_rate">关注：<span>361</span></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="item">
        <ul>
          <li>
            <img src="@/assets/home_img/weigongneng.png">
            <div class="label">
              <h4>胃功能</h4>
              <p>唐都医院</p>
              <p class="hot_rate">关注：<span>361</span></p>
            </div>
          </li>
          <li>
            <img src="@/assets/home_img/xinzang.png">
            <div class="label">
              <h4>心脏Holter</h4>
              <p class="hot_rate">唐都医院</p>
              <p class="hot_rate">关注：<span>361</span></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="line"></div>
    </section>
  </Panel>
</template>
<script>
import Panel from '../../core/panel.vue'
export default {
  name: 'Hot',
  components: {
    Panel
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
