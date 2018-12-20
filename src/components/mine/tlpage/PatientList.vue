<template>
  <!--就医人列表页面-->
  <div class="hospitalized">
    <Header :headerCon="headerCon"></Header>
    <div class="list">
      <ul>
        <li v-for="(item, ind) in hospitalizedList" :key="ind">
          <div class="info" @click="goOrderConfirm(item)">
            <p>
              <span>{{item.name}}</span>
              <span>{{item.sex}}</span>
              <span>{{item.age}}</span>
            </p>
            <p>
              <span>{{item.phone}}</span>
              <span>{{item.certificatesType}}</span>
              <span>{{item.certificatesNo}}</span>
            </p>
          </div>
          <div class="setting">
            <!--<img :src="selectImg" class="select" v-if="item.settingDefault">-->
            <!--<img :src="notSelectImg" class="select" v-if="!item.settingDefault">-->
            <!--<span class="swmr">设为默认</span>-->
            <img :src="delImg" class="del_img" @click="del(item.uuid)">
            <img :src="editImg" class="edit_img" @click="update(item)">
          </div>
        </li>
      </ul>
    </div>
    <button class="add_person" @click="addPatient">添加就医人</button>
  </div>
</template>

<script>
import api from '../../../utils/api'
import Header from '../../common/Header'
import { MessageBox, Toast } from 'mint-ui'
export default {
  name: 'PatientList',
  components: {
    Header,
    Toast,
    MessageBox
  },
  data () {
    return {
      headerCon: '就医人',
      hospitalizedList: [], // 就医人列表
      selectImg: require('../../../assets/select_img.png'),
      notSelectImg: require('../../../assets/not_select_img.png'),
      delImg: require('../../../assets/del.png'),
      editImg: require('../../../assets/edit_img.png')
    }
  },
  methods: {
    addPatient () {
      sessionStorage.removeItem('upDatePatient') // 移除sessionStorage
      this.$router.push('/addpatient')
    },
    // 获取就医人列表
    getPatientList () {
      api.getPatientList().then(res => {
        if (res.data.code === 200) {
          let { successObject } = res.data
          console.log(successObject)
          this.hospitalizedList = successObject.records
        }
      }).catch(res => {
      })
    },
    // 删除一条信息
    del (params) {
      let obj = {
        uuid: params
      }
      MessageBox({
        title: '提示',
        message: '确定要删除该信息吗?',
        showCancelButton: true
      })
      MessageBox.confirm('确定要删除该信息吗?').then(action => {
        api.delPatient(obj).then(res => {
          // 弹出提示语
          console.log(res)
          if (res.data.code === 200) {
            Toast({
              message: '删除成功',
              position: 'bottom',
              duration: 3000
            })
            this.getPatientList()
          } else if (res.data.code === 423) {
            Toast({
              message: '该就医人正在使用中',
              position: 'bottom',
              duration: 3000
            })
          }
        })
      })
    },
    update (params) {
      let upDatePatient = {
        title: '修改就医人信息',
        updateInfo: {
          'uuid': params.uuid,
          'user': params.user, // 用户uuid
          'name': params.name, // 姓名(必填)
          'sex': params.sex, // 性别(必填)
          'age': params.age, // 年龄(必填)
          'phone': params.phone, // 联系方式(必填)
          'certificatesType': params.certificatesType, // 证件类型(必填)
          'certificatesNo': params.certificatesNo, // 证件号码(必填)
          'address': params.address // 家庭住址(必填)
        }
      }
      sessionStorage.setItem('upDatePatient', JSON.stringify(upDatePatient))
      this.$router.push('/addpatient')
    },
    goOrderConfirm (item) {
      this.common.setStorage('patientInfo', item)
      this.$router.push('/orderconfirm')
    }
  },
  mounted () {
    this.getPatientList()
  }
}
</script>

<style scoped lang="scss">
  .hospitalized{
    wdith: 100%;
    height: auto;
    min-height: 100vh;
    background: #F1F1F1;
    .list{
      width: 730px;
      margin: 0 auto;
      height: auto;
      ul{
        width: 100%;
        height: auto;
        padding: 0;
        background: #F1F1F1;
        li{
          background: #ffffff;
          width: 100%;
          height: 200px;
          border-radius:10px;
          margin-top: 10px;
          .info{
            width: 650px;
            height: 108px;
            margin: 0 auto;
            border-bottom: 2px solid #F1F1F1;
            padding-top: 20px;
            p{
              width: 100%;
              height: 50px;
              display: flex;
              justify-content: left;
              align-items: center;
              text-align: left;
              span{
                color: #777;
                font-size: $font26;
              }
              span:nth-child(1){
                width: 150px;
                margin-right: 60px;
              }
              span:nth-child(2){
                width: 86px;
                margin-right: 60px;
              }
            }
            p:first-child{
              span:nth-child(1){
                color: #444;
                font-size: $font34;
              }
            }
          }
          .setting{
            width: 650px;
            height: 70px;
            margin: 0 auto;
            justify-content: space-between;
            align-items: center;
            display: flex;
            img{
              width: 32px;
              height: 32px;
            }
            .swmr{
              margin-right: auto;
              margin-left: 23px;
            }
            .del_img{
              margin-right: 50px;
            }
          }
        }
      }
    }
    .add_person{
      width:500px;
      height:70px;
      background:linear-gradient(-30deg,rgba(31,176,231,1) 0%,rgba(54,200,255,1) 100%);
      opacity:0.9;
      border-radius:35px;
      color: #ffffff;
      margin-top: 100px;
      font-size: $font28;
    }
  }
</style>
