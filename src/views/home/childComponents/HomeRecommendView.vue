<template>
  <div class="recommends">
    <div v-for="item in recommends" class="recommends-item">
      <a href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommends {
    display: flex;
    width: 100%;;
    text-align: center;
    font-size: 16px;
    padding: 10px 0 10px;
    border-bottom: 10px solid #eee;
  }
  .recommends-item {
    flex: 1;
  }
  .recommends img {
    width: 65px;
    width: 65px;
  }
</style>