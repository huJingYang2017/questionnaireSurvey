import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 12138,
    nowTabs: '',
    token: "",
    userInfo: {},
    indexPageScrollEvent: {
      "scrollTop": 0,//页面滚动的高度
      "mountedEnd": false,//是否为重新加载页面
      "getDataNum": 0,//页面获取的数据数量
      "searchString": ''//用户搜索的文字
    }

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
    },
    SET_INDEX_SCROLL_EVENT_SCROOLTOP(state, scrollTop) {
      state.indexPageScrollEvent.scrollTop = scrollTop;
    },
    SET_INDEX_SCROLL_EVENT_MOUNTEDEND(state, mountedEnd) {
      state.indexPageScrollEvent.mountedEnd = mountedEnd;
    },
    SET_INDEX_SCROLL_EVENT_GETDATANUM(state, getDataNum) {
      state.indexPageScrollEvent.getDataNum = getDataNum;
    },
    SET_INDEX_SCROLL_EVENT_SEARCHSTRING(state, searchString) {
      state.indexPageScrollEvent.searchString = searchString;
    },
  }
})

export default store
