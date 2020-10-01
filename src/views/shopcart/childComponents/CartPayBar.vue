<template>
    <div class="pay-bar">
        <div class="pay-content">
            <check-button
                    :is-check="isSelectAll"
                    class="pay-button"
                    @click.native="selectAll"/>
            <span>全选</span>
        </div>
        <div>
            合计:{{totalPrice}}
        </div>
        <div class="calc-pay" @click="calcClick">
            结算:{{checkLength}}
        </div>
    </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  export default {
    name: "CartPayBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.getters.cartList.filter(item => {
            return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if(this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },
    methods: {
      selectAll() {
        if(this.isSelectAll) {
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.isSelectAll) {
          this.$toast.show('尚无选择商品', 1500)
        }
      }
    }
  }
</script>

<style scoped>
    .pay-bar {
        height: 44px;
        background-color: #eee;
        position: relative;
        line-height: 44px;
        display: flex;
    }
    .pay-content {
        width: 80px;
        display: flex;
        align-items: center;
        margin-left: 15px;
        flex: 1;
    }
    .pay-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 10px;
    }
    .calc-pay {
        background-color: var(--color-tint);
        width: 120px;
        color: #fff;
        text-align: center;
        margin-left: 40px;
    }
</style>