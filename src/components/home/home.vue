<template>
  <div class="home">启动项目</div>
</template>

<script>
export default {
  name: 'home',
  mounted () {
    console.log(this.$store.state.show)
  }
}
</script>

<style scoped>

</style>
