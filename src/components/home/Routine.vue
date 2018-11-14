<template>
  <div class="routine">
    <panel-list :items="routineList"/>
  </div>
</template>
<script>
import PanelList from '../../core/PanelList.vue'
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
      ]
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
</style>
