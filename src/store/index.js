// import Vue from 'vue'
import { createStore } from 'vuex'
import apiClient from '../lib/apiClient'


// Vue.config.devtools = true

export default createStore({
  state: {
    characters: []
  },
  mutations: {
    setCharacters(state, payload) {
      state.characters = payload
    },
  },
  actions: {
    async getCharacters({commit}) {
      try {
        const data = await apiClient({
          url: '/character'
        })
        commit('setCharacters', data);
      } catch (err) {
        console.log('error', err)
      }
    }
    
    
  },
  modules: {
  },
  getters: {
    characters: (state) => state.characters,
  },
})
