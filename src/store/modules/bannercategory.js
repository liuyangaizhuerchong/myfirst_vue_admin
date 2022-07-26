import { listCategoryApi } from '@/api/bannerCategory'

export default {
  namespaced: true,
  state: {
    loading: false,
    data: [],
    total: 0,
    formSearch: {
      name: ''
    }
  },
  mutations: {
    showData(state, payload) {
      state.data = []
      state.loading = true
      state.data = payload.data
      state.total = payload.total
      state.loading = false
    }
  },
  actions: {
    async loadData({ commit, state }, { page }) {
      const res = await listCategoryApi({ page, ...state.formSearch })
      commit('showData', res)
    }
  }
}
