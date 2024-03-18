import { createStore } from "vuex";
// const users = [
//   {
//     id: 1,
//     username: "John",
//     surname: "Doe",
//     status: "ACTIVE",
//     pdfImageLimit: 10,

//     isAdmin: true,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 2,
//     username: "Jane",
//     surname: "Smith",
//     status: "ACTIVE",
//     pdfImageLimit: 15,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 3,
//     username: "Alice",
//     surname: "Johnson",
//     status: "ACTIVE",
//     pdfImageLimit: 5,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 4,
//     username: "Robert",
//     surname: "Brown",
//     status: "ACTIVE",
//     pdfImageLimit: 8,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 5,
//     username: "Emily",
//     surname: "Williams",
//     status: "ACTIVE",
//     pdfImageLimit: 12,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 6,
//     username: "Michael",
//     surname: "Jones",
//     status: "ACTIVE",
//     pdfImageLimit: 7,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 7,
//     username: "Jennifer",
//     surname: "Davis",
//     status: "ACTIVE",
//     pdfImageLimit: 6,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 8,
//     username: "William",
//     surname: "Miller",
//     status: "ACTIVE",
//     pdfImageLimit: 9,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 9,
//     username: "Sophia",
//     surname: "Taylor",
//     status: "ACTIVE",
//     pdfImageLimit: 11,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 10,
//     username: "Ethan",
//     surname: "Anderson",
//     status: "ACTIVE",
//     pdfImageLimit: 4,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 11,
//     username: "John",
//     surname: "Doe",
//     status: "ACTIVE",
//     pdfImageLimit: 10,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 12,
//     username: "Jane",
//     surname: "Smith",
//     status: "ACTIVE",
//     pdfImageLimit: 15,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 13,
//     username: "Alice",
//     surname: "Johnson",
//     status: "ACTIVE",
//     pdfImageLimit: 5,
//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 14,
//     username: "Robert",
//     surname: "Brown",
//     status: "ACTIVE",
//     pdfImageLimit: 8,
//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 15,
//     username: "Emily",
//     surname: "Williams",
//     status: "ACTIVE",
//     pdfImageLimit: 12,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 16,
//     username: "Michael",
//     surname: "Jones",
//     status: "ACTIVE",
//     pdfImageLimit: 7,
//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 17,
//     username: "Jennifer",
//     surname: "Davis",
//     status: "ACTIVE",
//     pdfImageLimit: 6,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 18,
//     username: "William",
//     surname: "Miller",
//     status: "ACTIVE",
//     pdfImageLimit: 9,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 19,
//     username: "Sophia",
//     surname: "Taylor",
//     status: "ACTIVE",
//     pdfImageLimit: 11,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
//   {
//     id: 20,
//     username: "Ethan",
//     surname: "Anderson",
//     status: "ACTIVE",
//     pdfImageLimit: 4,

//     isAdmin: false,
//     password: "123321",
//     selected: false,
//   },
// ];

export default createStore({
  state() {
    return {
      counter: 0,
      formState: {},
      selectedItems: [],
      pageState: {},
      items: [],
      itemsCopy: [],

      isError: false,
      isLoading: false,
      isFabOpen: false,
      isProgressOn: false,
      isUserLogedIn: false,
      isVideoPlaying: false,
      isFormTouched: false,
      userLoggedIn: false,
      // home work
      users: [],
      user: {},
      selectedUser: null,
      selectedUsers: [],
      isModalOpen: false,
      selectedUserProps: null,
      serverStatus: null,
      isMultipleEditModalOpen: false,
      isUserAdmin: false,
    };
  },

  actions: {},
  mutations: {

    setLoading(state, value) {
      state.isLoading = value;
    },

    setUser(state, { data }) {
      state.user = data;
    },
    // init load load
    setUsers(state, { data = [], error = "" }) {
      state.users = data;
      state.isError = error;
    },

    selectAllUsers(state) {
      state.users = state.users.map((user) => {
        return Object.assign(user, {
          selected: !user.selected,
        });
      });
    },
    selectMultipleUsers(state, user) {
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
    addItem(state, newItem) {
      state.items.push(newItem);
    },
    updateItem(state, updatedItem) {
      const index = state.items.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        state.items.splice(index, 1, updatedItem);
      }
    },
    deleteItem(state, itemId) {
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    selectUser(state, user) {
      state.selectedUser = user;
    },
    deselectUser(state) {
      state.selectedUser = null;
    },
  },

  getters: {},
});
