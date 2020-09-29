<template>
  <div class="back-top">
    <img src="~assets/img/common/top.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
  .back-top img {
    width: 90px;
    height: 90px;
  }
</style>