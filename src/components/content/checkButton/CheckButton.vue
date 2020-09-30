<template>
    <div class="check-button" :class="{check: isCheck}">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isCheck: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
   .check-button {
       border-radius: 50%;
       border: 2px solid var(--color-tint);
   }
    .check {
        border-color: var(--color-tint);
        background-color: var(--color-tint);
    }
</style>