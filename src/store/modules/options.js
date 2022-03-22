import { getPlanTypeList } from '@/api/crm'
// 管理常用的选项

const options = {
  state: {
    // 回款费用类型
    expenseType: null
  },
  mutations: {
    SET_EXPENSE_TYPE(state, data) {
      state.expenseType = data
    }
  },
  actions: {
    // 获取费用类型
    async getPlanTypeList({ commit }) {
      const res = await getPlanTypeList();
      if (res.code === 0) {
        commit('SET_EXPENSE_TYPE', res.data)
      }
    },
  },
}

export default options
