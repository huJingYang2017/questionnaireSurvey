<template>
  <div class="home">
    <div class="search">
      <div class="search-input">
        <x-input
          placeholder="搜索问卷"
          class="search-input-item"
          @on-enter="getSearchData"
          autofocus
          ref="input"
          :show-clear="true"
          v-model="searchString"
          @on-change="getAllData(searchString)"
          @on-click-clear-icon="clearSearchString"
        ></x-input>
      </div>
      <div class="search-icon" @click="getSearchData">
        <img src="../../assets/images/icon/icon-search.svg" width="24px" />
      </div>
    </div>
    <div class="no-data" v-if="dataList.length === 0">
      <div>
        <img src="../../assets/images/icon/icon-no-data.svg" width="100%" />
        <div class="no-data-prompt">抱歉，当前没有问卷调查</div>
      </div>
    </div>
    <div class="data-list" v-else>
      <mu-paper :z-depth="1" class="demo-loadmore-wrap">
        <mu-container
          ref="container"
          id="scrollTop"
          class="demo-loadmore-content cnmvb"
          @load="load"
          @scroll="scroll"
        >
          <mu-load-more
            @refresh="refresh"
            :refreshing="refreshing"
            :loading="loading"
            @load="load"
            :loaded-all="loadedAll"
          >
            <mu-list>
              <div
                v-for=" (item,index) in dataList"
                :key="index"
                @click="goToSurveyDetailPage(item.id)"
              >
                <div class="list-item">
                  <div class="list-item-title">{{item.title}}</div>
                  <div class="list-item-status">
                    <div
                      class="status-flag"
                      :class="[ item.status ? 'status-flag-true' : 'status-flag-false' ]"
                    ></div>
                    <span>{{item.status ? '已作答':'未作答'}}</span>
                  </div>
                </div>
              </div>
            </mu-list>
          </mu-load-more>
        </mu-container>
      </mu-paper>
    </div>
  </div>
</template>
<script>
import { XInput } from "vux";
import api from "api/api-handler";
export default {
  components: { XInput },
  name: "Home",
  data() {
    return {
      searchString: "",
      dateNum: 15, //一页的数据数量
      dataList: [], //数据列表
      clickLimit: {
        timeout: 300
      }, //加入按钮限制快速点击 函数防抖
      refreshing: false, //是否刷新
      loading: false, //是否加载
      loadedAll: false, //是否已加载所有
      scrollTop: 0 //当前页面滚动条位置
    };
  },
  methods: {
    scroll(event) {
      this.scrollTop = event.target.scrollTop;
    },
    getSearchData() {
      //函数防抖 *-* 感觉好厉害的样子
      if (this.clickLimit.timer) clearTimeout(this.clickLimit.timer);

      this.clickLimit.timer = setTimeout(() => {
        console.log(this.searchString);
        this.$store.commit(
          "SET_INDEX_SCROLL_EVENT_SEARCHSTRING",
          this.searchString
        );
      }, this.clickLimit.timeout);
    },
    getAllData(searchString) {
      if (this.searchString === "") {
        this.$store.commit(
          "SET_INDEX_SCROLL_EVENT_SEARCHSTRING",
          this.searchString
        );
      }
    },
    clearSearchString() {
      this.searchString = "";
    },
    goToSurveyDetailPage(id) {
      if (this.clickLimit.timer) clearTimeout(this.clickLimit.timer);

      this.clickLimit.timer = setTimeout(() => {
        // console.log("goToSurveyDetailPage==>", id);
        // this.$router.push({
        //   path: "/surveyDetail",
        //   query: {
        //     id
        //   }
        // });
        this.$router.push({
          name: "surveyDetail",
          params: {
            id: id
          }
        });
      }, this.clickLimit.timeout);
    },
    refresh() {
      console.log(this.$refs.container.scrollTop);
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        //数据请求
        api.getSurveyTitle().then(response => {
          console.log(response);
          this.dataList = response;
        });
      }, 800);
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.dataList.push({
          id: "1209",
          title: "本次版本更新大调查",
          status: true
        });
      }, 800);
    },
    //获取页面数据
    getPageDataList() {
      /**
       * 销毁页面前先获取用户当前状态获取多少条数据、页面滚动在哪，
       * 当用户离开这个页面后再次进入这个页面后，按照之前的状态重新加载页面
       * 现在的问题是获取不到滚动的位置？？？？？？？？？？？
       * */

      //获取的一页数据数量 比较这两个数字，获取较大的那个
      const dateNum = Math.max(
        Math.ceil((document.documentElement.clientHeight - 60) / 56) + 2,
        this.$store.state.indexPageScrollEvent.getDataNum
      );
      const searchString = this.searchString;

      //获取用户信息，保存到store中
      api.getUserInfo().then(response => {
        this.$store.commit("SET_USERINFO", response);
        //数据请求
        const userId = this.$store.state.userInfo;
        api.getSurveyTitle(userId).then(response => {
          if (response !== undefined || response.length) {
            this.dataList = response;
          }
        });
      });
    }
  },
  mounted: function() {
    // 隐藏 toast
    this.$vux.toast.hide();
    //使搜索input获得焦点
    // this.$refs["input"].focus();
    //设置页面当前状态为重新加载
    this.$store.commit("SET_INDEX_SCROLL_EVENT_MOUNTEDEND", true);
    //
  },
  created: function() {
    this.getPageDataList();
  },
  updated: function() {
    this.$nextTick(function() {
      //在下次 DOM 更新循环结束之后执行这个回调。在修改数据之后立即使用这个方法，获取更新后的DOM.
      if (this.$store.state.indexPageScrollEvent.mountedEnd) {
        this.$store.commit("SET_INDEX_SCROLL_EVENT_MOUNTEDEND", false);
        document.getElementById(
          "scrollTop"
        ).scrollTop = this.$store.state.indexPageScrollEvent.scrollTop;
        //为搜索框赋值
        this.searchString = this.$store.state.indexPageScrollEvent.searchString;
      }
    });
  },
  beforeDestroy: function() {
    //设置当前用户已经获取的数据数量，用户当用户从下级页面返回时，还原离开页面的状态
    this.$store.commit(
      "SET_INDEX_SCROLL_EVENT_GETDATANUM",
      this.dataList.length
    );
    this.$store.commit("SET_INDEX_SCROLL_EVENT_SCROOLTOP", this.scrollTop);
    this.$store.commit(
      "SET_INDEX_SCROLL_EVENT_SEARCHSTRING",
      this.searchString
    );
  }
};
</script>

<style scoped lang="less">
.home {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f5fa;
}
.search {
  display: flex;
  align-items: center;
  background: #5276b0;
  padding-left: 12px;
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 99;
}
.data-list,
.no-data {
  padding-top: 60px;
}

.no-data {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-data-prompt {
  margin-top: 16px;
  font-size: 16px;
  font-weight: bolder;
}
.search-input {
  background-color: #5276b0;
  // padding: 12px 0;
  width: 85%;
}

.search-input-item {
  border-radius: 50px;
  background-color: #f6f5fa;
  padding: 6px 12px;
  max-height: 33px;
  display: flex;

  align-items: center;
  /* font-size: 15px; */
  color: #656262;
  /* font-weight: bold; */
}
.search-icon {
  text-align: center;
  width: 15%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.list-item {
  background-color: #fff;
  margin-top: 8px;
  padding: 0 16px;
  display: flex;
  // line-height: 48px;
  line-height: 56px;
}
.list-item-title {
  width: 70%;
  font-weight: bolder;
  font-size: 15px;
  color: #464141;
}
.list-item-status {
  width: 30%;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #6f6b6b;
}

.status-flag {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}
.status-flag-true {
  background-color: #bcbcbc;
}
.status-flag-false {
  background-color: #5276b0;
}
.demo-loadmore-wrap {
  width: 100%;
  height: calc(100vh - 54px);
  // height: 420px;
  display: flex;
  flex-direction: column;
  background-color: #f6f5fa;
  .mu-appbar {
    width: 100%;
  }
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
}
</style>

<style lang="less">
.home .weui-input {
  height: auto !important;
  line-height: auto !important;
}
.home .weui-icon-clear {
  padding: 30%;
}
</style>
