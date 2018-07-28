<template lang="pug">
  #app
    router-view
    el-footer.guahsu(v-if="showFooter")
      | Create By GuaHsu
      br
      | (
      a(href="https://github.com/guahsu/TheF2E", target="_blank") https://github.com/guahsu/TheF2E
      | )
</template>

<script>
export default {
  name: 'App',
  computed: {
    showFooter() {
      return !this.$route.path.match(/parallax_scrolling/)
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0 0 150px 0;
  width: 100%;
  color: #2c3e50;
  text-align: center;
  * {
    box-sizing: border-box;
  }
  // Footer
  .guahsu {
    position: absolute;
    width: 90%;
    bottom: 0;
    padding: 30px 0 100px 0 !important;
    border-top: 1px solid #00cd98;
    text-align: center;
    font-weight: 900;
    a {
      color: #00cd98;
      text-decoration: none;
    }
  }
}
</style>
