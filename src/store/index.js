import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 12138,
    nowTabs: ''
  },
  mutations: {
    addNum(state) {
      state.count++;
    },
    SET_NOWTABS_NAME(state, nowTabsValue) {
      // sessionStorage.setItem("nowTabs",nowTabsValue);
      state.nowTabs = nowTabsValue;
    },

  }
})

export default store
