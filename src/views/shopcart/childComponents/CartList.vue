<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-item-list v-for="(item, index) in cartList" :key="index" :item-info="item"></cart-item-list>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import { mapGetters } from 'vuex'
  import CartItemList from "./CartItemList";

  export default {
    name: "CartList",
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      CartItemList,
      Scroll
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 44px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>