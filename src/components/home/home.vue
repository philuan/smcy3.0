<template>
  <div class="home">
    123
    <p>化验无忧3.0</p>
    <p>ceshi</p>
    <span>{{dateCurrent | dateFormat}}</span>
  </div>
</template>

<script>
import api from '../../utils/api'
import dayjs from 'dayjs'
export default {
  name: 'home',
  data () {
    return {
      reportInfo: {
        'name': 'lili',
        'seeDoctorNo': '1111111111'
      },
      dateCurrent: new Date()
    }
  },
  methods: {
    getReportReminding () {
      console.log(2)
      let params = JSON.stringify(this.reportInfo)
      api.reportReminding(params).then(res => {
        if (res) {
          console.log(res)
        }
      }).catch(res => {
        console.log(res)
      })
      console.log(3)
    }
  },
  filters: {
    dateFormat (value) {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    // this.getReportReminding()
    console.log(this.$store.state.show)
  }
}
</script>

<style scoped lang='scss'>
  *{
    margin: 0;
    padding: 0;
  }
  .home{
    background: aqua;
    width: 100%;
    height: 300px;
    p{
      width: 100%;
      height: 60px;
      text-align: center;
      background: red;
      line-height: 60px;
    }
    span{
      font-size: 18px;
    }
  }
</style>
