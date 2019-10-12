<template>
  <div class="survey-detail">
    <div v-for="(item,index) in data.questions" :key="index">
      <h2>{{index}}</h2>
    </div>
  </div>
</template>

<script>
import api from "api/api-handler";
export default {
  data() {
    return {
      data: {}
    };
  },
  methods: {},
  mounted: function() {
    //保存用户id到 状态管理器 ， 当页面刷新时 自动清除
    console.log(this.$store.state.userInfo);
    //保存用户id到sessionStorage ， 当用关闭项目后 自动清除
    console.log(sessionStorage.getItem("userId"));
  },
  created: function() {
    // const id = this.$route.query.id;
    const surveyId = this.$route.params.id;
    api.getSurveyDetail(surveyId).then(response => {
      this.data = response;
      console.log(this.data);
    });
  }
};
</script>

<style scoped lang="less">
.survey-detail {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f5fa;
}
</style>
