import { createStore } from "vuex";

const users = [
  {
    id: 1,
    name: "John",
    surname: "Doe",
    status: "ACTIVE",
    pdfImageLimit: 10,
    "@selected": false,
  },
  {
    id: 2,
    name: "Jane",
    surname: "Smith",
    status: "PAUSED",
    pdfImageLimit: 15,
    "@selected": false,
  },
  {
    id: 3,
    name: "Alice",
    surname: "Johnson",
    status: "BLOCKED",
    pdfImageLimit: 5,
    "@selected": false,
  },
  {
    id: 4,
    name: "Robert",
    surname: "Brown",
    status: "ACTIVE",
    pdfImageLimit: 8,
    "@selected": false,
  },
  {
    id: 5,
    name: "Emily",
    surname: "Williams",
    status: "PAUSED",
    pdfImageLimit: 12,
    "@selected": false,
  },
  {
    id: 6,
    name: "Michael",
    surname: "Jones",
    status: "ACTIVE",
    pdfImageLimit: 7,
    "@selected": false,
  },
  {
    id: 7,
    name: "Jennifer",
    surname: "Davis",
    status: "BLOCKED",
    pdfImageLimit: 6,
    "@selected": false,
  },
  {
    id: 8,
    name: "William",
    surname: "Miller",
    status: "ACTIVE",
    pdfImageLimit: 9,
    "@selected": false,
  },
  {
    id: 9,
    name: "Sophia",
    surname: "Taylor",
    status: "PAUSED",
    pdfImageLimit: 11,
    "@selected": false,
  },
  {
    id: 10,
    name: "Ethan",
    surname: "Anderson",
    status: "BLOCKED",
    pdfImageLimit: 4,
    "@selected": false,
  },
  {
    id: 11,
    name: "John",
    surname: "Doe",
    status: "ACTIVE",
    pdfImageLimit: 10,
    "@selected": false,
  },
  {
    id: 12,
    name: "Jane",
    surname: "Smith",
    status: "PAUSED",
    pdfImageLimit: 15,
    "@selected": false,
  },
  {
    id: 13,
    name: "Alice",
    surname: "Johnson",
    status: "BLOCKED",
    pdfImageLimit: 5,
    "@selected": false,
  },
  {
    id: 14,
    name: "Robert",
    surname: "Brown",
    status: "ACTIVE",
    pdfImageLimit: 8,
    "@selected": false,
  },
  {
    id: 15,
    name: "Emily",
    surname: "Williams",
    status: "PAUSED",
    pdfImageLimit: 12,
    "@selected": false,
  },
  {
    id: 16,
    name: "Michael",
    surname: "Jones",
    status: "ACTIVE",
    pdfImageLimit: 7,
    "@selected": false,
  },
  {
    id: 17,
    name: "Jennifer",
    surname: "Davis",
    status: "BLOCKED",
    pdfImageLimit: 6,
    "@selected": false,
  },
  {
    id: 18,
    name: "William",
    surname: "Miller",
    status: "ACTIVE",
    pdfImageLimit: 9,
    "@selected": false,
  },
  {
    id: 19,
    name: "Sophia",
    surname: "Taylor",
    status: "PAUSED",
    pdfImageLimit: 11,
    "@selected": false,
  },
  {
    id: 20,
    name: "Ethan",
    surname: "Anderson",
    status: "BLOCKED",
    pdfImageLimit: 4,
    "@selected": false,
  },
];

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
      userLoginIn: false,
      // home work
      users: users,
      selectedUser: null,
      selectedUsers: [],
      isModalOpen: false,
      selectedUserProps: null,
    };
  },
  mutations: {
    toggleSelectAllUsers(state, checked) {
      state.users = state.users.map((user) => {
        if (checked) {
          return Object.assign(user, {
            "@selected": true,
          });
        } else {
          return Object.assign(user, {
            "@selected": false,
          });
        }
      });
    },

    selectMultipleUsers(state, user) {
      state.users = state.users.map((userItem) => {
        if (userItem.id === user.id) {
          return Object.assign(userItem, {
            "@selected": !userItem["@selected"],
          });
        } else {
          return userItem;
        }
      });
    },
    updateMultipleusers(state, updatedUsersProps) {
      state.users = state.users.map((user) => {
        if (user["@selected"] === true) {
          return Object.assign(user, updatedUsersProps);
        } else {
          return user;
        }
      });
    },
    increment(state) {
      state.counter++;
    },
    addItem(state, newItem) {
      state.item.push(newItem);
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
    updateUser(state, updatedUser) {
      console.log("updatedUser", updatedUser);
      const index = state.users.findIndex((item) => item.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
  },
  getters: {
    getItemById: (state) => (id) => {
      return state.item.find((item) => item.id === id);
    },
    userEnteredDetailPage: (state) => {
      return Object.keys(state.pageState).length > 0;
    },
    isMultipledBtnLocked(state) {
      return state.users.filter((user) => user["@selected"]).length > 0;
    },
  },
});
