<template>
  <div class="home">
    <search/>
    <slider/>
    <hot-ad/>
    <packaged/>
    <hot/>
    <special/>
    <routine-ad/>
    <routine/>
  </div>
</template>

<script>
import api from '../../utils/api'
import dayjs from 'dayjs'
import search from './Hsearch'
import slider from './Hslider'
import packaged from './Hpackage'
import hot from './Hot'
import special from './Special'
import HotAd from './HotAd'
import Routine from './Routine'
import RoutineAd from './RoutineAd'
export default {
  name: 'Home',
  components: {
    search,
    slider,
    HotAd,
    packaged,
    hot,
    special,
    Routine,
    RoutineAd
  },
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
  .home{
<<<<<<< HEAD
    max-width: 1536px;
    margin: 0 auto;
=======
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
      font-size: 18px;/*px*/
    }
>>>>>>> d253f95101e36a742b57b984c32212e8dd28d340
  }
</style>
