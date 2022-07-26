import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import banner from './modules/banner'
import bannercategory from './modules/bannercategory'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    banner,
    bannercategory
  },
  getters
})

export default store
