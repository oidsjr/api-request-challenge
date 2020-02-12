// initial state
const initialState = {
  isLoading: false,
};

// getters
const getters = {
  isLoading() {
    return initialState.isLoading;
  },
};

// actions
const actions = {
  setIsLoading({ commit }, isLoading) {
    commit('setIsLoading', isLoading);
  },
};

// mutations
const mutations = {
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
