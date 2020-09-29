<template>
  <TabBar>
    <TabBarItem path="home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/homeactive.svg" alt="">
      <div slot="item-text">首页</div>
    </TabBarItem>
    <TabBarItem path="category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/categoryactive.svg" alt="">
      <div slot="item-text">分类</div>
    </TabBarItem>
    <TabBarItem path="shopcart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcartactive.svg" alt="">
      <div slot="item-text">购物车</div>
    </TabBarItem>
    <TabBarItem path="profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profileactive.svg" alt="">
      <div slot="item-text">用户</div>
    </TabBarItem>
  </TabBar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
