<template lang="html">
  <div class="search">
    <i class="iconfont back" @click="back">&#xe61c;</i>
    <div class="seachBox">
      <i class="iconfont search_lable_btn">&#xe6a8;</i>
      <input type="text" placeholder="请输入项目名称/医院名称" id="keywords" v-model="key" v-on="{compositionstart: start, compositionend: end, input: input }">
      <i class="iconfont del_btn" v-show="show" @click="deleteKeywords">&#xe611;</i>
    </div>
    <div class="search_btn" @click="search">搜索</div>
  </div>
</template>
<script>
export default {
  props: {
    keyWords: {
      type: String
    }
  },
  data () {
    return {
      show: false,
      key: this.keyWords,
      cpLock: false
    }
  },
  methods: {
    search () {
      if (this.key) {
        this.$emit('change', this.key)
      }
    },
    start () {
      this.cpLock = true
    },
    end () {
      this.cpLock = false
    },
    input () {
      if (!this.cpLock) {
        if (this.key) {
          this.show = true
          this.$emit('change', this.key)
        } else {
          this.show = false
        }
      }
    },
    back () {
      this.$emit('backPage')
    },
    deleteKeywords () {
      this.key = ''
      this.show = false
      this.$emit('change', this.key)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/css/element.scss";
  .search{
    @include list(row);
    position: relative;
    min-height: 88px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    .back{
      position: absolute;
      left: 25px;
      right: 15px;
      top: 22px;
      font-size: 36px;
      width: 36px;
      height: 36px;
      color: #777;
      font-weight: 600;
    }
    .seachBox{
      position: absolute;
      top: 14px;
      left: 80px;
      right: 150px;
      bottom: 7px;
      box-sizing: border-box;
      height: 60px;
      overflow: hidden;
      border-radius: 6px;
      color: #F0F6FA;
      background: #F0F6FA;
      .search_lable_btn{
        position: absolute;
        top: 8px;
        left: 22px;
        color: #aaa;
        font-size: 40px;
      }
      input{
        position: absolute;
        top: 0;
        left: 66px;
        bottom: 0;
        right: 12px;
        box-sizing: border-box;
        height: 100%;
        width: auto;
        appearance: none;
        border: none;
        background: #F0F6FA;
        font-size: 24px;
        color: #aaa;
        overflow: hidden;
        width: calc(100% - 110px);
      }
      input::-webkit-input-placeholder {
        color: #aaa;
      }
      .del_btn{
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 25px;
        color: #aaa;
        font-weight: 600;
      }
    }
    .search_btn{
      position: absolute;
      top: 20px;
      right: 30px;
      width: 100px;
      line-height: 50px;
      text-align: center;
      background: #3ABCED;
      border-radius: 10px;
      color: #fff;
    }
  }
</style>
