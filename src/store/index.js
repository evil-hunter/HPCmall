import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import getters from "./getters";

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  getters,
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        let product = context.state.cartList.find(item => item.iid === payload.iid)
        if(product) {
          context.commit('addCount', product)
          resolve("当前商品数量加一")
        } else {
          payload.count = 1
          context.commit('addCart', payload)
          resolve("成功添加到购物车")
        }
      })
    }
  },
  mutations: {
    addCount(state, payload) {
      payload.count++
    },
    addCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
  }
})

export default store