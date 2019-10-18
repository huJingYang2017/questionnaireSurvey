<template>
  <div class="survey-detail" v-scroll="scroll">
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
      <div style="padding-bottom: 8px;">
        <mu-container style="padding-top: 8px;">
          <!-- :id=`questio${data.dateTime}` -->
          <div
            v-if="item.type === 'radio'"
            :id="gernerateId(item.id)"
            class="question-item"
            @click="setRequiredOption(item.id)"
          >
            <div
              :class="(item.achieve === undefined || item.achieve) ? '':'question-required-border'"
            >
              <div class="question-title">
                <span class="question-required">{{item.required ? '&nbsp;*' : '&nbsp;&nbsp;' }}</span>
                {{index + 1}}、{{item.question}}
              </div>
              <div class="select-control-group">
                <mu-flex
                  class="select-control-row"
                  v-for="element in item.content"
                  :key="element.id"
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <mu-radio
                    :value="element.id"
                    v-model="item.result"
                    :label="element.text"
                    class="radio-color"
                  ></mu-radio>
                </mu-flex>
              </div>
            </div>
            <div
              v-if="!(item.achieve === undefined || item.achieve)"
              class="question-required-prompt"
            >请选择选项</div>
          </div>

          <div
            v-else-if="item.type === 'multiple'"
            :id="gernerateId(item.id)"
            class="question-item"
            @click="setRequiredOption(item.id)"
          >
            <div
              :class="(item.achieve === undefined || item.achieve) ? '':'question-required-border'"
            >
              <div class="question-title">
                <span class="question-required">{{item.required ? '&nbsp;*' : '&nbsp;&nbsp;' }}</span>
                {{index + 1}}、{{item.question}}
                <span class="multiple-prompt">「多选题」</span>
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
                <mu-flex
                  class="select-control-row"
                  v-for="element in item.content"
                  :key="element.id"
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <mu-checkbox
                    :value="element.id"
                    v-model="item.result"
                    :label="element.text"
                    class="checkbox-color"
                  ></mu-checkbox>
                </mu-flex>
              </div>
            </div>
            <div
              v-if="!(item.achieve === undefined || item.achieve)"
              class="question-required-prompt"
            >请选择选项</div>
          </div>
          <div
            v-else-if="item.type === 'shortAnswer'"
            :id="gernerateId(item.id)"
            class="question-item"
            @click="setRequiredOption(item.id)"
          >
            <div
              :class="(item.achieve === undefined || item.achieve) ? '':'question-required-border'"
            >
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
            </div>
            <div
              v-if="!(item.achieve === undefined || item.achieve)"
              class="question-required-prompt"
            >请填写内容</div>
          </div>
        </mu-container>
      </div>

      <div v-if="index === (data.questions.length -1)" class="bottom-btn" @click="submitQuestion">
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
      data: {}
    };
  },
  methods: {
    submitQuestion() {
      this.data.questions.map(item => {
        if (item.required && !item.result.length) {
          item.achieve = false;
          item.question = item.question + " ";
          // document.documentElement.scrollTop =
          //   document.getElementById(`question${item.id}`).offsetTop -
          //   document.getElementById(`question${item.id}`).offsetHeight;
          // document
          //   .getElementById(`question${item.id}`)
          //   .scrollIntoView(true, { behavior: "smooth", block: "center" });
          // throw new Error("有必答题没有作答");
        } else {
          item.achieve = true;
          item.question = item.question.trim();
        }
      });

      try {
        this.data.questions.map(item => {
          if (item.required && !item.result.length) {
            // PC使用这一行
            document.documentElement.scrollTop =
              document.getElementById(`question${item.id}`).offsetTop -
              document.getElementById(`question${item.id}`).offsetHeight;
            //移动端使用这行代码
            document.body.scrollTop =
              document.getElementById(`question${item.id}`).offsetTop -
              document.getElementById(`question${item.id}`).offsetHeight;
            throw new Error("有必答题没有作答");
          }
        });
      } catch (error) {
        // console.log("hah ");
      }
    },
    scroll() {
      // console.log(window.scrollY,"测试");
    },
    //id拼接函数
    gernerateId(id) {
      return `question${id}`;
    },
    //设置必填选项 ，根据用户的点击事件，判断当前题目是否为必填题目及是否已经被填写
    setRequiredOption(id) {
      try {
        this.data.questions.map(item => {
          if (item.id === id && item.required && item.result.length) {
            item.achieve = true;
            throw new Error("当前项已被填写");
          } else if (
            item.id === id &&
            item.required &&
            item.type === "shortAnswer"
          ) {
            item.achieve = true;
            throw new Error("当前项已被填写");
          }
        });
      } catch (error) {}
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
      // console.log(response);
      if (response === undefined) {
        this.$vux.toast.show({
          text: "获取数据失败",
          type: "cancel",
          time: 60000,
          isShowMask: true,
          position: "middle"
        });
        return false;
      }

      response.questions.map(item => {
        item.result = [];
      });
      this.data = response;
      // console.log(this.data);
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
.question-required-border {
  border: 1px dotted #f00;
}
.select-control-group {
  // margin-top: 16px;
  // padding-bottom: 8px;
  color: #93919252;
}
.checkbox-color {
  font-size: 16px;
  color: #93919252;
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
.question-required-prompt {
  color: red;
  padding: 8px 0 0 22px;
  font-size: 16px;
}

.question-title {
  color: #3b3b3b;
  font-size: 16px;
  padding-top: 8px;
  font-weight: bolder;
}
.shortAnswer-textArea {
  padding: 14px;
  border: 1px solid #ddd;
  width: 94% !important;
  margin: 14px 3% !important;
  font-size: 14px;
}
.multiple-prompt {
  font-weight: 200;
  color: #b7a9a9;
}
.bottom-btn {
  padding: 12px 12px 48px 12px;
}
.bottom-btn .mu-button {
  height: 3em;
  font-size: 16px;
}
</style>

<style lang="less">
.shortAnswer-textArea .mu-input-help {
  padding: 12px 0;
}
.select-control-group .mu-checkbox-checked {
  color: #5276b0 !important;
}
</style>
