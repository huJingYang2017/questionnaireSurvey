<template>
  <div class="survey-detail">
    <div v-for="(item,index) in data.questions" :key="index">
      <span>{{data.questions.length}}</span>

      <div class="question-item">
        <div v-if="item.type === 'radio'">
          <div class="select-control-group">
            <mu-flex class="select-control-row" v-for="element in item.content" :key="element.id">
              <mu-radio :value="element.id" v-model="radio.value1" :label="element.text"></mu-radio>
            </mu-flex>
          </div>
        </div>
        <div v-else-if="item.type === 'multiple'">multiple</div>
        <div v-else-if="item.type === 'shortAnswer'">shortAnswer</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "api/api-handler";
export default {
  data() {
    return {
      data: {},
      radio: {
        value1: [],
        value2: "heart",
        value3: "disable"
      }
    };
  },
  methods: {},
  mounted: function() {
    //保存用户id到 状态管理器 ， 当页面刷新时 自动清除
    // console.log(this.$store.state.userInfo);
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
.select-control-row {
  padding: 8px 0;
}
.select-control-group {
  margin: 16px 0;
}
</style>
