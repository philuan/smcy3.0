<template>
  <div class="hospital">
    <div class="title">
      <h4>医院信息</h4>
      <span class="back" @click="back"></span>
    </div>
    <div class="hospital_des">
      <div class="basic_info">
        <img class="logo" src="@/assets/home_img/h_xijing.png">
        <div class="label_box">
          <span>三级甲等</span>
          <span>公立/综合医院</span>
        </div>
      </div>
      <div class="hot_info">
        <p>关注排名：陕西<span>第一名</span></p>
        <p>累计访问：<span>32606</span>万次</p>
        <p>两年好评率：<span>96%</span></p>
      </div>
      <div class="detail_info">
        <div class="item">
          <p class="introduction"><i class="iconfont">&#xe6df;</i>简介：西京医院坐落于美丽的古城西安，为第四军医大学第西京医院坐落于美丽的古城西安，为第四军医大</p>
          <p class="address"><i class="iconfont">&#xe6d1;</i>地址：陕西省西安市长乐西路15号</p>
          <p class="phone"><i class="iconfont">&#xe621;</i>联系方式：029-93215321 029-84774114（总机）
          </p>
        </div>
      </div>
    </div>
    <div class="service_tab">
      <div class="header">
        <span>首页</span>
        <span>科室列表</span>
        <span>推荐专家</span>
        <span>诊后服务星</span>
      </div>
      <div class="content">
        <div class="item">
          <h4>咨询本院大夫</h4>
          <div class="doc_info">
            <div class="online_doc">
              <p>在线大夫：<span>623</span></p>
            </div>
            <div class="com_info">
              <p><span class="online_label">今天在线</span><span>陆美蓉大夫</span><span class="department">妇产科</span></p>
            </div>
          </div>
          <div class="doc_info">
            <div class="online_doc">
              <p>就诊患者：<span>12345</span></p>
            </div>
            <div class="com_info">
              <p><span class="online_label">今天在线</span><span>陆美蓉大夫</span><span class="department">妇产科</span></p>
            </div>
          </div>
        </div>
        <span class="link"></span>
      </div>
      <div class="content">
        <div class="item">
          <h4>咨询本院大夫</h4>
          <div class="doc_info">
            <div class="online_doc">
              <p>在线大夫：<span>623</span></p>
            </div>
            <div class="com_info">
              <p><span class="online_label">今天在线</span><span>陆美蓉大夫</span><span class="department">妇产科</span></p>
            </div>
          </div>
          <div class="doc_info">
            <div class="online_doc">
              <p>就诊患者：<span>12345</span></p>
            </div>
            <div class="com_info">
              <p><span class="online_label">今天在线</span><span>陆美蓉大夫</span><span class="department">妇产科</span></p>
            </div>
          </div>
        </div>
        <span class="link"></span>
      </div>
    </div>
    <div class="project">
      <div class="header">
        <h4>项目列表<span>(183个)</span></h4>
        <p @click="categoryControl">类别
          <i class="iconfont" v-if="show">&#xe600;</i>
          <i class="iconfont" v-else>&#xe633;</i>
        </p>
      </div>
      <div class="category_wrapper" v-show="show">
        <div class="item" :class="{active: index == cNum}" v-for="(item, index) in categoryList" :key="item.id" @click="changeCategory(item.id,  index)">{{ item.name }}</div>
      </div>
      <panel-list :items="routineList"/>
    </div>
  </div>
</template>
<script>
import PanelList from '../../../core/PanelList.vue'
export default {
  name: '',
  props: [],
  components: {
    PanelList
  },
  data () {
    return {
      'routineList': [
        {
          'id': '1',
          'h_name': '陕西省人民医院',
          'h_img': 'h1.png',
          'p_img': 'p1.png',
          'p_name': '血常规',
          'price': '128'
        },
        {
          'id': '2',
          'h_name': '陕西省人民医院',
          'h_img': 'h1.png',
          'p_img': 'p1.png',
          'p_name': '血常规',
          'price': '128'
        },
        {
          'id': '3',
          'h_name': '陕西省人民医院',
          'h_img': 'h1.png',
          'p_img': 'p1.png',
          'p_name': '血常规',
          'price': '128'
        },
        {
          'id': '4',
          'h_name': '陕西省人民医院',
          'h_img': 'h1.png',
          'p_img': 'p1.png',
          'p_name': '血常规',
          'price': '128'
        }
      ],
      'categoryList': [
        {
          'id': 1,
          'name': '全部'
        },
        {
          'id': 2,
          'name': '类别一'
        },
        {
          'id': 3,
          'name': '类别二'
        },
        {
          'id': 4,
          'name': '类别三'
        }
      ],
      show: false,
      cNum: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    categoryControl () {
      this.show = !this.show
    },
    changeCategory (id, index) {
      this.show = false
      this.cNum = index
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/css/element.scss";
  .hospital{
      height: calc(100Vh - 100px);
      background: #f1f1f1;
      .title{
        position: relative;
        background: #fff;
        border-bottom: 1px solid #f1f1f1;
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
      .hospital_des{
        padding: 24px 40px 36px;
        background: #fff;
        @include list(row);
        justify-content: space-between;
        .basic_info{
          .logo{
            width: 288px;
            height: 104px;
          }
          .label_box{
            span{
              display: inline-block;
              color: #FF6D3A;
              background: #FFD8BE;
              font-size: 18px;
              margin-right: 20px;
              line-height: 30px;
              padding: 6px 12px;
              border-radius: 6px;

            }
          }
        }
        .hot_info{
          color: #444;
          font-size: 20px;
          padding-top: 8px;
          p{
            margin-top: 18px;
            text-align: left;
            letter-spacing: 3px;
          }
          span{
            color: #FF682F;
          }
        }
        .detail_info{
          width: 100%;
          margin-top: 19px;
          text-align: left;
          color: #777;
          font-size: 24px;
          i{
              margin-right: 22px;
              font-size: 30px;
              color: #2c3e50;
            }
          p{
            line-height: 62px;
          }
        }
      }
      .service_tab{
        margin-top: 10px;
        .header{
          background: #fff;
          @include list(row);
          flex-wrap: nowrap;
          line-height: 80px;
          font-size: 26px;
          color: #777;
          span{
            flex: 1;
          }
        }
        .content{
          margin: 10px 20px;
          position: relative;
          .item{
            background: #fff;
            border-radius: 10px;
            padding: 24px 30px 26px;
            text-align: left;
            h4{
              color: #444;
              font-size: 32px;
            }
            .doc_info{
              @include list(row);
              justify-content: space-between;
              margin-right: 134px;
              margin-top: 20px;
              font-size: 24px;
              color: #777;
              .department{
                color: #FF6D3A;
              }
              .online_label{
                color: #21AC1E;
              }
              color{
                color: #FF753F;
              }
              .com_info{
                p{
                  span:nth-child(2){
                    margin: 0 4px;
                  }
                }
              }
            }
          }
          .link{
            position: absolute;
            content: " ";
            top: 50%;
            margin-top: -20px;
            right: 40px;
            display: inline-block;
            height: 14px;
            width: 14px;
            border-width: 2px 2px 0 0;
            border-color: #aaa;
            border-style: solid;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          }
        }
      }
      .project{
        position: relative;
        background: #fff;
        .header{
          position: relative;
          height: 80px;
          line-height: 80px;
          padding: 0 50px 0 32px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          text-align: left;
          color: #444;
          font-size: 32px;
          @include flex(row);
          justify-content: space-between;
          span{
            font-size: 24px;
          }
          p{
            color: #aaa;
            font-size: 28px;
            i{
              margin-left: 12px;
              font-size: 26px;
              font-weight: bold;
            }
          }
        }
        .category_wrapper{
          position: absolute;
          top: 80px;
          right: 20px;
          z-index: 10;
          width: 140px;
          background: #fff;
          border-radius: 0 0 6px 6px;
          .item{
            line-height: 74px;
            text-align: center;
            color: #777;
            font-size: 26px;
            &.active{
              color: #1FB0E7;
            }
          }
        }
      }
  }
</style>
