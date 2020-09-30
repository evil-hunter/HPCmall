<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">分类</div>
    </nav-bar>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import NavBar from "../../components/common/navbar/NavBar";

  export default {
    name: "category",
    data() {
      return {
        scroll: null
      }
    },
    components: {
      NavBar,
      BScroll
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
