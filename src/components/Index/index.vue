<template>
  <div class="home">
    <div class="search">
      <div class="search-input">
        <x-input
          placeholder="搜索问卷"
          class="search-input-item"
          @on-enter="test"
          autofocus
          ref="input"
          v-model="value"
        ></x-input>
      </div>
      <div class="search-test" @click="test">
        <img src="../../assets/images/icon/icon-search.svg" width="24px" />
      </div>
    </div>
    <div class="data-list">
      <mu-paper :z-depth="1" class="demo-loadmore-wrap">
        <mu-container ref="container" class="demo-loadmore-content" @load="load">
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
      value: "",
      dateNum: 15, //一页的数据数量
      dataList: [], //数据列表
      clickLimit: {
        timeout: 300
      }, //加入按钮限制快速点击 函数防抖
      refreshing: false, //是否刷新
      loading: false, //是否加载
      loadedAll: false //是否已加载所有
    };
  },
  methods: {
    test() {
      // this.$refs["input"].focus();
      //函数防抖 *-* 感觉好厉害的样子
      if (this.clickLimit.timer) clearTimeout(this.clickLimit.timer);

      this.clickLimit.timer = setTimeout(() => {
        console.log(this.value);
        console.log(this.dataList);
      }, this.clickLimit.timeout);
    },
    goToSurveyDetailPage(id) {
      if (this.clickLimit.timer) clearTimeout(this.clickLimit.timer);

      this.clickLimit.timer = setTimeout(() => {
        console.log("goToSurveyDetailPage==>", id);
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
    }
  },
  mounted: function() {
    //使搜索input获得焦点
    // this.$refs["input"].focus();
  },
  created: function() {
    //获取的一页数据数量
    const dateNum =
      Math.ceil((document.documentElement.clientHeight - 54) / 58) + 1;
    //获取用户信息，保存到store中
    api.getUserInfo().then(response => {
      this.$store.commit("SET_USERINFO", response);
      //数据请求
      const userId = this.$store.state.userInfo;
      api.getSurveyTitle(userId).then(response => {
        console.log(response);
        this.dataList = response;
      });
    });
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
  height: 54px;
  z-index: 99;
}
.data-list {
  padding-top: 54px;
}
.search-input {
  background-color: #5276b0;
  padding: 12px 0;
  width: 85%;
}

.search-input-item {
  border-radius: 50px;
  background-color: #f6f5fa;
  padding: 4px 12px;
  /* font-size: 15px; */
  color: #656262;
  /* font-weight: bold; */
}
.search-test {
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

  line-height: 48px;
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
