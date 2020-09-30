<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">用户</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
export default {
  name: "profile",
  components: {
    NavBar
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
