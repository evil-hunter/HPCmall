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
      let product = context.state.cartList.find(item => item.iid === payload.iid)
      if(product) {
        context.commit('addCount', product)
      } else {
        payload.count = 1
        context.commit('addCart', payload)
      }
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