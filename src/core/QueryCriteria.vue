<template>
  <div class="query_criteria">
    <div class="query_criteria_wrapper">
      <div class="item" :class="{active: index == num}" v-for="(item, index) in searchCondition" :key="item.type" @click="changeSearchCondition(item.type, index)">
        {{ item.name }}
        <svg class="icon" aria-hidden="true">
          <use v-if="item.type==='price' && order==='desc'" xlink:href="#icon-updown-up"></use>
          <use v-else-if="item.type==='price' && order==='asc'" xlink:href="#icon-shangxiajiantouhover"></use>
        </svg>
        <i v-if="item.type ==='project'" class="iconfont iconfont_selected">&#xe600;</i>
      </div>
    </div>
    <div class="project_type_wrapper" v-show="pShow">
      <div class="project_type_list">
        <div class="item" @click="changeProjectType()">{{ projectObj.name }}</div>
      </div>
    </div>
    <div class="hospital_wrapper" v-show="hShow">
      <div class="hospital_list">
        <div class="item" :class="{active: index == hNum}" v-for="(item, index) in currentHospitalList" :key="item.id" @click="changeHosipital(index, item)">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    leaf: {
      type: [String, Number]
    }
  },
  computed: {
    currentHospitalList () {
      let AllHospitalList = []
      const hospital = [
        {
          'id': '-1',
          'uuid': '',
          'name': '全部'
        }
      ]
      AllHospitalList = hospital.concat(this.hospitalList)
      return AllHospitalList
    }
  },
  data () {
    return {
      searchCondition: [
        {
          'name': '价格',
          'type': 'price'
        },
        {
          'name': '单项目',
          'type': 'project'
        },
        {
          'name': '医院',
          'type': 'hospital'
        }
      ],
      projectObj: {
        'name': '组合项目',
        'type': 1
      },
      hShow: false, // 医院面板展开/折叠控制
      pShow: false, // 项目类型展开/折叠控制
      num: '-1',
      hNum: '',
      order: 'asc', // 价格排序，正序：asc,倒序：desc，默认‘asc’
      projectType: 0, // 项目类型，单项目：0，组合项目：1，默认‘0’
      hospitalId: '', // 医院id
      flag: 2,
      hospitalList: this.common.getStorage('hospitalList')
    }
  },
  methods: {
    // 搜索条件
    changeSearchCondition (type, index) {
      this.num = index
      if (type === 'hospital') {
        this.hShow = !this.hShow
      } else if (type === 'project') {
        this.pShow = !this.pShow
      } else {
        if (this.order === 'desc') {
          this.order = 'asc'
        } else {
          this.order = 'desc'
        }
        this.$emit('changeCondition', this.order, this.projectType, this.hospitalId)
      }
    },
    // 选择医院
    changeHosipital (index, item) {
      this.hNum = index
      this.hShow = false
      this.searchCondition.splice(this.flag, 1, {'name': item.name, 'type': 'hospital'})
      this.$emit('changeCondition', this.order, this.projectType, item.uuid)
    },
    // 选择项目类型
    changeProjectType () {
      if (this.projectType === 0) {
        this.projectType = 1
        this.projectObj.name = '单项目'
        this.projectObj.type = 0
        this.searchCondition.splice(1, 1, {'name': '组合项目', 'type': 'project'})
      } else {
        this.projectType = 0
        this.projectObj.name = '组合项目'
        this.projectObj.type = 1
        this.searchCondition.splice(1, 1, {'name': '单项目', 'type': 'project'})
      }
      console.log(this.projectObj)
      this.pShow = !this.pShow
      this.$emit('changeCondition', this.order, this.projectType, this.hospitalId)
    }
  },
  created () {
    if (this.leaf === 0 || this.leaf === 1) {
      this.searchCondition.splice(1, 1)
      this.flag = 1
    }
  }
}
</script>
<style lang="scss" scoped>
 @import "../css/element.scss";
  .query_criteria{
    .query_criteria_wrapper{
      @include list;
      flex-direction: row;
      line-height: 70px;
      background: #fff;
      .item{
        flex: 1;
        color: #777;
        font-size: 26px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        .sort_btn{
          font-size: 24px;
          color: #777;
        }
        &.active{
          color: #1FB0E7;
        }
        .iconfont_selected{
          color: #1FB0E7;
          font-size: 22px;
        }
        .iconfont_reSelected{
          color: #777;
          font-size: 22px;
        }
      }
    }
    .project_type_wrapper{
      position: fixed;
      top: 160px;
      left: 33.333333%;
      z-index: 10;
      width: 250px;
      border-top: 1px solid #f1f1f1;
      background: #fff;
      border-radius: 0 0 10px 10px;
      .item{
        line-height: 80px;
      }
    }
    .hospital_wrapper{
      position: fixed;
      top: 160px;
      z-index: 10;
      border-top: 1px solid #f1f1f1;
      width: 100%;
      background: #fff;
      color: #444;
      .hospital_list{
        @include list(row);
        padding: 30px 0 40px;
        .item{
          width: 33.33%;
          font-size: 22px;
          margin-top: 40px;
          &.item:nth-child(1), &.item:nth-child(2), &.item:nth-child(3){
            margin-top: 0;
          }
          &.active{
            color: #1FB0E7;
          }
        }
      }
    }
  }
</style>
