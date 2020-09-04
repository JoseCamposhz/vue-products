import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions: {},
  getters: {},
  mutations: {
    setSnack(state, payload) {
      state.snackbar.isOpen = payload.isOpen;
      state.snackbar.text = payload.text;
      state.snackbar.color = payload.color;
    }
  },
  state: {
    snackbar: {
      isOpen: false,
      text: "",
      color: "success"
    }
  }
})

export default store