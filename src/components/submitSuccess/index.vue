<template>
  <div class="container">
    <div class="item">
      <img src="../../assets/images/icon/ionc-submit-success.svg" alt width="50%" />
      <p>问卷提交成功</p>
      <mu-container class="button-wrapper">
        <mu-button color="primary" @click="back" class="button-back">返回列表</mu-button>
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
  margin-top: 30vh;
  text-align: center;
}
.item img {
  width: 16vw;
}
.item p {
  text-align: center;
  margin: 4vh 0;
  font-size: 16px;
  font-weight: bolder;
}
.button-wrapper {
  text-align: center;
  height: 50px;
  margin-top: 20vh;
}
.button-back {
  width: 50vw;
  height: 48px;
  border-radius: 8px;
}
</style>

