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
        >
          <span
            slot="label"
            style="padding-right:10px;display:block;height: 1.41176471em;"
            class="iconfont icon-suosou"
            @click="test"
          />
        </x-input>
      </div>
      <div class="search-test" @click="test">
        <img src="../../assets/images/icon/icon-search.svg" width="24px" />
      </div>
    </div>
  </div>
</template>

<script>
import { XInput } from "vux";
export default {
  components: { XInput },
  name: "Home",
  data() {
    return {
      value: "",
      results: [],
      clickLimit: {
        timeout: 300
      } //加入按钮限制快速点击 函数防抖
    };
  },
  methods: {
    test() {
      // this.$refs["input"].focus();
      //函数防抖 *-* 感觉好厉害的样子
      if (this.clickLimit.timer) clearTimeout(this.clickLimit.timer);

      this.clickLimit.timer = setTimeout(() => {
        console.log(this.value);
      }, this.clickLimit.timeout);
    }
  },
  mounted: function() {
    this.$refs["input"].focus();
  }
};
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-color: #f6f5fa;
}
.search {
  display: flex;
  align-items: center;
  background: #5276b0;
  padding-left: 12px;
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
  font-size: 15px;
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
</style>
