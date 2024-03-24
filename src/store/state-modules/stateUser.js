class User {
  constructor({ username, passwod, email }) {
    this.username = username;
    this.passwod = passwod;
    this.email = email;
  }
}

const state = {
  user: {},
  users: [],
  selectedUser: {},
  isUserLoggedIn: false,
  sessionId: null,
  path: "/",
};

const URL_BASE = `http://localhost:3000`;
const headers = {
  "Content-Type": "application/json",
};

const mutations = {
  setPath(state, path = "") {
    state.path = path;
  },
  setUserLogginState(state, { loginState, sessionId }) {
    state.isUserLoggedIn = loginState;
    state.sessionId = sessionId;
  },
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
  async loginWithNameAndPassword({ commit }, formState) {
    try {
      const response = await fetch(`${URL_BASE}/login`, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        // If response is not ok, throw an error with a meaningful message
        throw new Error(
          "Failed to log in. Please check your credentials and try again."
        );
      }

      const data = await response.json();

      // Update user data in the store upon successful login
      commit("setUser", {
        data: data.user || {},
      });

      // Return data upon successful login
      return data;
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error logging in:", error.message);
      // Re-throw the error for catching in another async function
      throw error;
    }
  },
  async fetchUserDataAfterLogin({ commit }) {
    try {
      const response = await fetch(`${URL_BASE}/users`, {
        headers: headers,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataJson = await response.json();
      commit("setUsers", { data: dataJson.data });
      commit("setPath", dataJson.user.isAdmin ? '/admin-dashboard' : '/user-dashboard');

      return dataJson;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      commit("setUsers", { data: [], error: error.message });
      throw error; // Re-throw the error for catching in another async function
    }
  },
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
