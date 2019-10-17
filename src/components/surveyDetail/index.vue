<template>
  <div class="survey-detail">
    <div
      class="question-detail-title"
      v-if="(data.questions === undefined || data.questions.length === 0) && (data.id !== undefined)"
    >
      <div class="questionnaire-title">{{data.title}}</div>
      <div class="questionnaire-dateTime">{{data.dateTime}}</div>
      <div class="questionnaire-none">当前问卷还没有问题</div>
    </div>
    <div class="question-survey" v-for="(item,index) in data.questions" :key="index">
      <div v-if="index === 0">
        <div class="questionnaire-title">{{data.title}}</div>
        <div class="questionnaire-dateTime">{{data.dateTime}}</div>
      </div>
      <div class="question-item">
        <mu-container>
          <div v-if="item.type === 'radio'">
            <div class="question-title">
              <span class="question-required">{{item.required ? '&nbsp;*' : '&nbsp;&nbsp;' }}</span>
              {{index + 1}}、{{item.question}}
            </div>
            <div class="select-control-group">
              <mu-flex class="select-control-row" v-for="element in item.content" :key="element.id">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <mu-radio :value="element.id" v-model="item.result" :label="element.text"></mu-radio>
              </mu-flex>
            </div>
          </div>
          <div v-else-if="item.type === 'multiple'">
            <div class="question-title">
              <span class="question-required">{{item.required ? '&nbsp;*' : '&nbsp;&nbsp;' }}</span>
              {{index + 1}}、{{item.question}}
              <span
                style="font-weight:200;color: #b7a9a9;"
              >「多选题」</span>
            </div>
            <div class="select-control-group">
              <!-- Selects: {{checkbox.value1}} -->
              <!-- <mu-flex class="select-control-row">
              <mu-checkbox
                label="全选"
                :input-value="checkAll"
                @change="handleCheckAll"
                :checked-icon="this.checkbox.value1.length < 3 ? 'indeterminate_check_box' : undefined"
              ></mu-checkbox>
              </mu-flex>-->
              <mu-flex class="select-control-row" v-for="element in item.content" :key="element.id">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <mu-checkbox
                  :value="element.id"
                  v-model="item.result"
                  :label="element.text"
                  style="font-size: 16px;"
                ></mu-checkbox>
              </mu-flex>
            </div>
          </div>
          <div v-else-if="item.type === 'shortAnswer'">
            <div class="question-title">
              <span class="question-required">{{item.required ? '&nbsp;*' : '&nbsp;&nbsp;' }}</span>
              {{index + 1}}、{{item.question}}
            </div>
            <mu-text-field
              class="shortAnswer-textArea"
              v-model="item.result"
              placeholder="最多可以输入140个文字"
              multi-line
              full-width
              :rows="3"
              :rows-max="6"
              :max-length="140"
              :solo="true"
            ></mu-text-field>
            <!-- help-text="sadasd" -->
          </div>
        </mu-container>
      </div>

      <div
        v-if="index === (data.questions.length -1)"
        style="padding: 12px 12px 48px 12px;"
        @click="submitQuestion"
      >
        <div>
          <mu-container class="button-wrapper">
            <mu-flex justify-content="center" align-items="center">
              <mu-button full-width color="primary">提交</mu-button>
            </mu-flex>
          </mu-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "api/api-handler";
import { Toast } from "vux";
export default {
  components: { Toast },
  data() {
    return {
      data: {},
      radio: {
        value1: [],
        value2: "heart",
        value3: "disable"
      },
      checkbox: {
        value1: [],
        value2: false,
        value3: false
      },
      value9: ""
    };
  },
  methods: {
    submitQuestion() {
      // console.log(this.data.questions);
      this.data.questions.map(item => {
        console.log(typeof item.result, item.result);
      });
    }
  },
  mounted: function() {
    //保存用户id到 状态管理器 ， 当页面刷新时 自动清除
    // console.log(this.$store.state.userInfo);
    //保存用户id到sessionStorage ， 当用关闭项目后 自动清除
    // console.log(sessionStorage.getItem("userId"));
  },
  created: function() {
    // const id = this.$route.query.id;
    const surveyId = this.$route.params.id;
    api.getSurveyDetail(surveyId).then(response => {
      // const _this = this
      // this.$vux.toast.show({
      //   text: "Hello World",
      //   onShow() {
      //     console.log("Plugin: I'm showing");
      //   },
      //   onHide() {
      //     console.log("Plugin: I'm hiding");
      //     _this.show9 = false;
      //   }
      // });

      this.$vux.toast.show({
        text: "获取数据失败",
        type: "cancel",
        time: 1000,
        isShowMask: true,
        position: "middle"
      });
      console.log(response);
      if (response === undefined) {
        console.log("1d5as1d5");
        return false;
      }

      response.questions.map(item => {
        item.result = [];
      });
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
  background-color: #f4f3f3;
}
.question-detail-title {
  min-height: 100vh;
  background: #fff;
  width: 100%;
  margin-top: 8px;
}

.question-survey {
  background-color: #fff;
  margin-top: 8px;
}
.select-control-row {
  padding: 8px 0;
}
.select-control-group {
  // margin-top: 16px;
  padding-bottom: 8px;
}
.button-wrapper {
  text-align: center;
  .mu-button {
    margin: 8px;
    vertical-align: middle;
  }
  a.mu-button {
    text-decoration: none;
  }
}
.questionnaire-title {
  text-align: center;
  font-size: 18px;
  color: #111;
  font-weight: bolder;
  padding: 12px 0 6px 0;
}
.questionnaire-dateTime {
  text-align: center;
  font-size: 14px;
  color: #7b7b7b;
}

.questionnaire-none {
  text-align: center;
  font-size: 16px;
  color: #7b7b7b;
  margin-top: 8px;
}
.question-required {
  color: red;
}
.question-title {
  color: #3b3b3b;
  font-size: 16px;
  padding: 12px 0;
  font-weight: bolder;
}
.shortAnswer-textArea {
  padding: 14px;
  border: 1px solid #ddd;
  width: 94% !important;
  margin: 14px 3% !important;
  font-size: 14px;
}
</style>

<style lang="less">
.shortAnswer-textArea .mu-input-help {
  padding: 12px 0;
}
</style>
