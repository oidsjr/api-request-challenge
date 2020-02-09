import UserFactory from '@/api/user';

const userFactory = new UserFactory();

// initial state
const state = {
  user: {
    login: null,
    id: 0,
    avatar_url: 'https://github.com/identicons/oidsjr.png',
    html_url: null,
    followers_url: null,
    following_url: null,
    repos_url: null,
    type: 'User',
    name: null,
    location: null,
    email: null,
    hireable: false,
    bio: null,
    public_repos: 0,
    followers: 0,
    following: 0,
  },
};

// getters
const getters = {
  userInfo() {
    return state.user;
  },
};

// actions
const actions = {
  async getUserInfo({ commit }) {
    try {
      const user = await userFactory.getUser();
      commit('setUserInfo', user.data);
    } catch (error) {
      console.error(error);
    }
  },
};

// mutations
const mutations = {
  // eslint-disable-next-line no-shadow
  setUserInfo(state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
