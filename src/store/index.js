import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sharedData: '',
    taskID: null,
    isEdited: false,
    user: null,
    },
  getters: {
    isAuthenticated: state => !!state.user,    
    StateUser: state => state.user,
  },
  mutations: {
    setSharedData(state, newData) {
      state.sharedData = newData;
    },
    setUser(state, newData) {
      state.user = newData;
    },
    setTaskID(state, newData){
      state.taskID = newData;
    },
    LogOut(state){
      state.user = null
    }
  },
  actions: {
  },
  modules: {
  }
})