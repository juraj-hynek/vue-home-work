import { useStore } from "vuex";

export default useStore({
  state: {
    formState: {},
    selectedItems: [],
    pageState: {},
    items: [],
    itemsCopy: [],
    isModalOpen: false,
    isError: false,
    isLoading: false,
    isFabOpen: false,
    isProgressOn: false,
    isUserLogedIn: false,
    isVideoPlaying: false,
    isFormTouched: false,
  },
  mutations: {
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
  },
  actions: {
    addItem({ commit }, newItem) {
      commit("addItem", newItem);
    },
    updateItem({ commit }, updatedItem) {
      commit("updateItem", updatedItem);
    },
    deleteItem({ commit }, itemId) {
      commit("deleteItem", itemId);
    },
  },
  getters: {
    getItemById: (state) => (id) => {
      return state.item.find((item) => item.id === id);
    },
    userEnteredDetailPage: (state) => {
      return Object.keys(state.pageState).length > 0;
    },
  },
});
