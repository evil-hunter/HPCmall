<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-pay-bar></cart-pay-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComponents/CartList";
  import CartPayBar from "./childComponents/CartPayBar";
  import { mapGetters } from 'vuex'

  export default {
  name: "shopcart",
  components: {
    NavBar,
    CartList,
    CartPayBar
  },
  computed: {
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
