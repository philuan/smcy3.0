<template>
  <div class="lsearch">
    <search-record/>
    <search-list/>
  </div>
</template>
<script>
import SearchList from './SearchList'
import SearchRecord from './SearchRecord'
export default {
  name: '',
  props: [],
  components: {
    SearchList,
    SearchRecord
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.lsearch{
  height: calc(100Vh - 100px);
}
</style>
