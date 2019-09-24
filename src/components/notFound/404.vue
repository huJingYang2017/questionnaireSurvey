<template>
  <div class="container">
    <div class="item">
      <img src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" alt />
      <p>抱歉，您访问的页面不存在</p>
      <mu-container class="button-wrapper">
        <mu-button color="primary" @click="back">返回上一页</mu-button>
      </mu-container>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-self: start;
  justify-content: center;
  height: 100vh;
}
.item {
  margin-top: 8vh;
}
.item img {
  width: 90vw;
}
.item p {
  text-align: center;
  margin: 4vh 0;
  font-size: 16px;
}
.button-wrapper {
  text-align: center;
}
</style>

