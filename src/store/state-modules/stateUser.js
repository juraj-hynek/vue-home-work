const state = {
  user: {},
  users: [],
  selectedUser: {},
  isUserLoggedIn: false,
};

const mutations = {
  setUser(state, { data }) {
    state.user = data;
  },
  // init load load
  setUsers(state, { data = [], error = "" }) {
    state.users = data;
    state.isError = error;
  },

  selectEveryUser(state) {
    state.users = state.users.map((user) => {
      return Object.assign(user, {
        selected: user.selected ? user.selected : true,
      });
    });
  },
  selectSomeUsers(state, user) {
    state.users = state.users.map((userItem) => {
      if (userItem.id === user.id) {
        return Object.assign(userItem, {
          selected: !userItem["selected"],
        });
      } else {
        return userItem;
      }
    });
  },
  updateMultipleUsers(state, updatedUsersProps) {
    state.users = state.users.map((user) => {
      if (user["selected"] === true) {
        return Object.assign(user, updatedUsersProps);
      } else {
        return user;
      }
    });
  },
  selectUser(state, user) {
    state.selectedUser = user;
  },
  deselectUser(state) {
    state.selectedUser = null;
  },
};

function tryMe(fn) {
  return async function (...args) {
    try {
      const result = await fn(...args);
      return result;
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error
      // For example, you can throw the error or return a default value
      throw error;
    }
  };
}
const actions = {
  async getSomeTestData({ commit }) {},
  async userLogIn({ commit }) {},
  async userLogOut({ commit }) {},
  async userFetchUserData({ commit }) {},
  async userUpdateUserData({ commit }) {},
  async userDeleteUserData({ commit }) {},
};

export default {
  state,
  mutations,
  actions,
};
