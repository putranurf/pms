// store.js

import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import VueAxios from 'vue-axios'
import http from "../http-common";

Vue.use(Vuex)
// Vue.use(VueAxios, http)

const mutations = {
  setCoins(state, payload){
    state.coins = payload
  }
}

const state = {
  coins: []
}

const actions = {
  loadCoins ({ commit }) {
    http
      .get('/getNomorPd')
      .then(r => r.data)
      .then(coins => {
      // console.log(coins)
      })
  }
}

const getters = {
    getCoins: state => {
        return state.coins
    }
}

export default {
    state,
  actions,
  mutations
}
  