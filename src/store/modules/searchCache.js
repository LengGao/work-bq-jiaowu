const searchCache = {
    state: {
        cache: new Map()
    },
    mutations: {
        SET_SEARCH_CACHE(state, { routeName, cacheVal }) {
            state.cache.set(routeName, cacheVal)
            console.log(state)
        },
        DEL_SEARCH_CACHE(state, routeName) {
            if (state.cache.has(routeName)) {
                state.cache.delete(routeName)
            }
        },
        CLEAR_SEARCH_CACHE(state) {
            state.cache.clear()
        }
    },
    actions: {
        setSearchCache({ commit }, cacheData) {
            commit('SET_SEARCH_CACHE', cacheData)
        }
    }
}
export default searchCache