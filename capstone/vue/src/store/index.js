import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
/*
 * The authorization header is set for axios when you login but what happens when you come back or
 * the page is refreshed. When that happens you need to check for the token in local storage and if it
 * exists you should set the header so that it will be attached to each request
 */
const currentToken = localStorage.getItem('token')
const currentUser = JSON.parse(localStorage.getItem('user'));

if(currentToken != null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

export default new Vuex.Store({
  state: {
    gameId: {},
    reviewerId: {},
    reviewEdited: false,
    reviewAdded: false,
    gameDeleted: false,
    gameEdited: false,
    gameAdded: false,
    token: currentToken || '',
    user: currentUser || {},
  },
  mutations: {
    SEND_REVIEWER_ID(state,payload){
      state.reviewerId = payload;
    },
    SEND_GAME_ID(state,payload){
      state.gameId = payload;
    },
    REVIEW_EDITED(state,payload){
      state.reviewEdited = payload;
    },
    REVIEW_ADDED(state,payload){
      state.reviewAdded = payload;
    },
    GAME_DELETED(state,payload){
      state.gameDeleted = payload;
    },
    GAME_ADDED(state, payload) {
      state.gameAdded = payload;
    },
    GAME_EDITED(state,payload) {
      state.gameEdited = payload;
    },
    SET_AUTH_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user',JSON.stringify(user));
    },
   
    LOGOUT(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = '';
      state.user = {};
      axios.defaults.headers.common = {};
    }
  }
})
