import { listProductApi, oneProductIdApi } from '@/api/banner'

import { listCategoryApi } from '@/api/bannerCategory'
export default {
  namespaced: true,
  state: {
    loading: false,
    list: [],
    total: 0,
    categories: [],
    formSearch: {
      name: '',
      category: ''
    },
    ruleForm: {
      name: '',
      desc: '',
      coverImage: ''
    }
  },
  mutations: {
    showData(state, payload) {
      state.list = []
      state.loading = true
      state.list = payload.data
      state.total = payload.total
      state.loading = false
    },
    showCategory(state, payload) {
      state.categories = payload.data
    },
    showOneDetail(state, payload) {
      state.ruleForm = payload.data
    }
  },
  actions: {
    async loadData({ commit, state, dispatch }, { page }) {
      const res = await listProductApi({ page, ...state.formSearch })
      commit('showData', res)
      dispatch('loadCategory')
    },
    async loadCategory({ commit }) {
      const resCategory = await listCategoryApi()
      commit('showCategory', resCategory)
    },
    async loadOneDetail({ commit }, { id }) {
      const res = await oneProductIdApi(id)
      commit('showOneDetail', res)
      console.log(res)
    }
  }
}
