import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 12138,
    nowTabs: '',
    token: "",
    userInfo: {}
  },
  mutations: {
    addNum(state) {
      state.count++;
    },
    SET_NOWTABS_NAME(state, nowTabsValue) {
      // sessionStorage.setItem("nowTabs",nowTabsValue);
      state.nowTabs = nowTabsValue;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USERINFO(state, userInfo) {
      sessionStorage.setItem("userId", userInfo.id);
      state.userInfo = userInfo;
    }
  }
})

export default store
