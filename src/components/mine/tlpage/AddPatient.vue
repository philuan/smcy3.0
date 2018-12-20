<template>
  <div class="add_jyr" >
    <Header :headerCon="headerCon"></Header>
    <p class="name">
      <span class="name_tit">姓名</span>
      <input type="text" v-model="addInfo.name" placeholder="请输入您的姓名">
    </p>
    <div class="gender">
      <p>
        <img :src="selectImg" v-if="isSelect" @click="changeGender">
        <img :src="notSelectImg" v-if="!isSelect" @click="changeGender">
        <span>男</span>
      </p>
      <p>
        <img :src="selectImg" v-if="!isSelect" @click="changeGender">
        <img :src="notSelectImg" v-if="isSelect" @click="changeGender">
        <span>女</span>
      </p>
    </div>
    <p class="name">
      <span class="name_tit">年龄</span>
      <input type="text" placeholder="请输入本人年龄" v-model="addInfo.age">
    </p>
    <p>
      <span>联系方式</span>
      <!--<span>158****2882</span>-->
      <input type="text" placeholder="请输入电话号码" v-model="addInfo.phone">
    </p>
    <div class="zjlx" @click="showCerType">
      <span>证件类型</span>
      <span class="select_certi_type">{{selectCertificatesType}}</span>
    </div>
    <p>
      <span>证件号码</span>
      <!--<span>612501195401236581</span>-->
      <input type="text" placeholder="请输入证件号码" v-model="addInfo.certificatesNo">
    </p>
    <p>
      <span>家庭住址</span>
      <!--<span>陕西省西安市高新区科技路**号</span>-->
      <input type="text" placeholder="请输入您的家庭地址" v-model="addInfo.address">
    </p>
    <button @click="addPatient(addInfo)" v-show="!isUpdate">确定</button>
    <button @click="updatePatient(addInfo)" v-show="isUpdate">修改</button>
    <div class="outerPicker" v-show="isShowPicker" @click="hidePicker">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </div>
  </div>
</template>

<script>
import Header from '../../common/Header'
import api from '../../../utils/api'
import { Toast } from 'mint-ui'
export default {
  name: 'AddPatient',
  components: {
    Header
  },
  data () {
    return {
      slots: [
        {
          values: ['身份证', '驾驶证', '护照'],
          textAlign: 'center'
        }
      ],
      isShowPicker: false,
      isSelect: true, // 性别
      isUpdate: false, // 显示按钮为确定还是修改
      headerCon: '',
      selectImg: require('../../../assets/select_img.png'),
      notSelectImg: require('../../../assets/not_select_img.png'),
      selectCertificatesType: '请选择',
      addInfo: {
        name: '', // 姓名(必填)
        sex: '', // 性别(必填)
        age: 0, // 年龄(必填)
        phone: '', // 联系方式(必填)
        certificatesType: '身份证', // 证件类型(必填)
        certificatesNo: '', // 证件号码(必填)
        address: '' // 家庭住址(必填)
      }
    }
  },
  methods: {
    onValuesChange (picker, values) {
      this.selectCertificatesType = values[0]
      console.log(values)
    },
    // 点击选择身份类型
    getCertificatesType (item) {
      this.selectCertificatesType = item
    },
    // 选择性别
    changeGender () {
      this.isSelect = !this.isSelect
      if (this.isSelect) {
        this.addInfo.sex = '男'
      } else {
        this.addInfo.sex = '女'
      }
    },
    // 添加就医人
    addPatient (params) {
      if (this.selectCertificatesType === '请选择') {
        Toast({
          message: '请选择证件类型',
          position: 'bottom',
          duration: 3000
        })
        return false
      } else {
        params.certificatesType = this.selectCertificatesType
        console.log(JSON.stringify(params))
        api.addPatient(JSON.stringify(params)).then(res => {
          if (res.data.code === 200) {
            Toast({
              message: '添加成功',
              position: 'bottom',
              duration: 3000
            })
            this.$router.push('/patientList')
          }
        }).catch(res => {
        })
      }
    },
    // 更新就医人
    updatePatient (params) {
      params.certificatesType = this.selectCertificatesType
      api.updatePatient(JSON.stringify(params)).then(res => {
        if (res.data.code === 200) {
          Toast({
            message: '修改成功',
            position: 'bottom',
            duration: 3000
          })
          this.$router.push('/patientList')
          sessionStorage.removeItem('upDatePatient') // 移除sessionStorage
        }
      }).catch(res => {
      })
    },
    showCerType () {
      this.isShowPicker = true
    },
    hidePicker () {
      this.isShowPicker = false
    }
  },
  mounted () {
    this.selectCertificatesType = '请选择'
    // 如果存在则证明是在就医人列表页面点击了编辑
    let upDatePatient = JSON.parse(sessionStorage.getItem('upDatePatient'))
    if (upDatePatient) {
      this.headerCon = upDatePatient.title
      this.addInfo = upDatePatient.updateInfo
      this.selectCertificatesType = this.addInfo.certificatesType
      this.isUpdate = true
      if (upDatePatient.updateInfo.sex === '男') {
        this.isSelect = true
      } else {
        this.isSelect = false
      }
    } else {
      this.isUpdate = false
      this.headerCon = '添加就医人'
    }
  }
}
</script>

<style scoped lang="scss">
  .add_jyr{
    width: 100%;
    height: auto;
    min-height: 100vh;
    background: #F1F1F1;
    .outerPicker{
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .3);
      z-index: 99000000000;
    }
    p, .zjlx{
      width: 100%;
      height: 90px;
      margin-top: 1px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      span{
        width: auto;
        margin-left: 30px;
        font-size: $font30;
        color: #777;
      }
      input{
        margin-left: 44px;
        color: #777;
        font-size: $font28;
        margin-right: auto;
      }
      .name_tit{
        margin-left: 100px;
      }
    }
    .zjlx{
      position: relative;
      margin-top: 10px;
      .select_certi_type{
        margin-left: 40px;
        margin-right: auto;
      }
    }
    .gender{
      width: 100%;
      height: 90px;
      margin-top: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      p{
        width: auto;
        height: 90px;
        line-height: 90px;
        display: inline-flex;
        align-items: center;
        img{
          width: 32px;
          height: 32px;
          margin-right: 19px;
        }
        span{
          color: #777;
          font-size: $font28;
          margin-left: 0;
        }
      }
      p:first-child{
        margin-right: 127px;
      }
    }
    button{
      width:500px;
      height:70px;
      background:linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
      opacity:0.9;
      border-radius:35px;
      color: #ffffff;
      font-size: $font28;
      font-weight:400;
      position: fixed;
      bottom: 70px;
      left: 125px;
    }
  }
</style>
