const state = {
    isError: false,
    isLoading: false,
    isFabOpen: false,
    isProgressOn: false,
    isUserLoggedIn: false,
    isVideoPlaying: false,
    isFormTouched: false,
    isModalOpen: false,
    toastMessage: '',
    isToastVisible: false
    // Other UI-related state properties...
  };
  
  const mutations = {
    setModal(state, { modalStatus }) {
        state.isModalOpen = modalStatus;
      },
      setToast(state, { toastState, toastMessage }) {
        state.isToastVisible = toastState;
        state.toastMessage = toastMessage;
      },
      setLoading(state, value) {
        state.isLoading = value;
      },
  };
  
  const actions = {
    // Define actions related to UI state...
  };
  
  export default {
    state,
    mutations,
    actions
  };