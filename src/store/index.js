import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import page from './modules/page'
import searchCache from './modules/searchCache'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    searchCache,
  },
  getters,
})

export default store
