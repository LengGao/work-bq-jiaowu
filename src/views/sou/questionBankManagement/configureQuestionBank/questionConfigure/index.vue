<template>
  <div class="question-form">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <div class="question-form-left">
        <div class="flex">
          <el-form-item label="章节名称" prop="topic_chapter_id">
            <el-select
              :disabled="!!pid"
              v-model="ruleForm.topic_chapter_id"
              placeholder="请选择章节名称"
            >
              <el-option
                v-for="item in chapterOptions"
                :key="item.id"
                :label="item.chapter_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目类型" prop="topic_type">
            <el-select
              disabled
              v-model="ruleForm.topic_type"
              placeholder="请选择题目类型"
            >
              <el-option
                v-for="item in questionOptions"
                :label="item.name"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <transition name="el-zoom-in-top">
          <component
            ref="editorForm"
            :is="getComponent"
            @on-change="handleCaseChange"
            :questionOptions="rightQuestionOptions"
            :data="detailData"
            @on-case-delete="deleteConfirm"
          />
        </transition>
      </div>
      <!-- 案例题时显示右侧 -->
      <div class="question-form-right" v-if="this.ruleForm.topic_type === 7">
        <div class="question-type">
          <span>题目类型</span>
          <span class="name">{{ questionMap[rightActiveType] }}</span>
        </div>
        <transition name="fade">
          <component
            class="components"
            ref="editorRightForm"
            :data="caseChildData"
            :is="getRightComponent"
          />
        </transition>
        <div class="right-submit" v-if="rightActiveType">
          <el-button @click="handleRightCancel">取消</el-button>
          <el-button
            type="primary"
            :loading="addLoading"
            @click="handleRightSubmit"
            >保存</el-button
          >
        </div>
        <span v-else class="no-component">请选择案例题目类型</span>
      </div>
    </el-form>
    <div class="question-form-submit question-form-submit--fixed" v-if="pid">
      <el-button @click="$router.back()">取消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('ruleForm')"
        >保存</el-button
      >
    </div>
    <div class="question-form-submit question-form-submit--fixed" v-else>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  addQuestion,
  getChapterOptions,
  getQuestionDetail,
  deleteQuestion,
  updateQuestion,
} from "@/api/sou";
export default {
  name: "questionConfiguer",
  data() {
    return {
      ruleForm: {
        topic_type: +this.$route.query?.type || 1,
        topic_chapter_id: "",
      },
      rules: {
        topic_type: [{ required: true, message: "请选择", trigger: "change" }],
        topic_chapter_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      questionMap: {
        1: "单选题",
        2: "多选题",
        3: "判断题",
        4: "不定项题",
        5: "填空题",
        6: "简答题",
      },
      questionOptions: [
        {
          name: "单选题",
          value: 1,
        },
        {
          name: "多选题",
          value: 2,
        },
        {
          name: "判断题",
          value: 3,
        },
        {
          name: "不定项题",
          value: 4,
        },
        {
          name: "填空题",
          value: 5,
        },
        {
          name: "简答题",
          value: 6,
        },
        {
          name: "案例题",
          value: 7,
        },
      ],
      componentMaps: {
        1: "SingleChoice",
        2: "MultipleChoice",
        3: "Judge",
        4: "IndefiniteChoice",
        5: "Completion",
        6: "ShortAnswer",
        7: "Case",
      },
      rightActiveType: 0,
      rightQuestionOptions: [
        {
          name: "单选题",
          value: 1,
        },
        {
          name: "多选题",
          value: 2,
        },
        {
          name: "判断题",
          value: 3,
        },
        {
          name: "不定项题",
          value: 4,
        },
        {
          name: "填空题",
          value: 5,
        },
        {
          name: "简答题",
          value: 6,
        },
      ],
      letterMap: {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
        5: "E",
        6: "F",
        7: "G",
        8: "H",
        9: "I",
        10: "J",
      },
      caseQusetionList: [],
      chapterOptions: [],
      qid: this.$route.query?.qid || "",
      pid: this.$route.query?.pid || "",
      chapterType: this.$route.query?.chapterType || "",
      detailData: {},
      caseChildData: {},
      addLoading: false,
    };
  },
  computed: {
    getRightComponent() {
      if (this.rightActiveType) {
        return () =>
          import(
            `./components/${this.componentMaps[this.rightActiveType]}.vue`
          );
      }
    },
    getComponent() {
      if (this.ruleForm.topic_type) {
        return () =>
          import(
            `./components/${this.componentMaps[this.ruleForm.topic_type]}.vue`
          );
      }
    },
  },
  watch: {
    $route() {
      this.pid = this.$route.query.pid;
      this.getQuestionDetail();
    },
  },
  created() {
    this.getChapterOptions();
    this.pid && this.getQuestionDetail();
  },
  methods: {
    deleteConfirm(id) {
      this.$confirm("确定删除该子题目吗?", "提示", {
        type: "warning",
      }).then(() => {
        this.deleteQuestion(id);
      });
    },
    // 删除题目
    async deleteQuestion(id) {
      const data = {
        id,
      };
      const res = await deleteQuestion(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getQuestionDetail();
      }
    },
    // 题目详情
    async getQuestionDetail() {
      const data = {
        id: this.pid,
      };
      const res = await getQuestionDetail(data);
      if (res.code === 0) {
        this.detailData = res.data;
        this.ruleForm.topic_chapter_id = res.data.topic_chapter_id;
      }
    },
    // 章节选项
    async getChapterOptions() {
      const data = {
        question_bank_id: this.qid,
        chapter_type: this.chapterType,
      };
      const res = await getChapterOptions(data);
      if (res.code === 0) {
        this.chapterOptions = res.data?.list || [];
      }
    },
    // 添加题目
    async addQuestion(qData) {
      const option_arr = [];
      const reg = /^option/;
      let count = 1;
      for (const k in qData) {
        if (reg.test(k)) {
          option_arr.push({
            topic_option: this.letterMap[count],
            topic_option_description: qData[k],
          });
          count++;
        }
      }
      const data = {
        parent_id: qData.parent_id || "",
        question_bank_id: this.qid,
        chapter_type: this.chapterType,
        topic_chapter_id: this.ruleForm.topic_chapter_id,
        topic_type: this.ruleForm.topic_type,
        topic_child_type: qData.type,
        topic_description: qData.topic_description,
        topic_analysis: qData.topic_analysis,
        topic_answer: qData.topic_answer,
        ignore_order: qData.ignore_order || 0,
        option_arr,
      };
      // 有id就是修改
      let api = addQuestion;
      if (qData.id) {
        data.id = qData.id;
        api = updateQuestion;
      }
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        // 案例题添加
        if (this.ruleForm.topic_type === 7) {
          if (this.pid) {
            this.rightActiveType = 0;
            this.getQuestionDetail();
          } else {
            this.$router.replace({
              name: "questionConfigure",
              query: {
                ...this.$route.query,
                pid: res.data.id,
              },
            });
          }
          // 案例题修改
          if (this.ruleForm.topic_type === qData.type && qData.id) {
            this.$router.back();
          }
          return;
        }
        this.$router.back();
      }
    },
    // 右侧取消
    handleRightCancel() {
      this.rightActiveType = 0;
    },
    // 已添加的案例题，点击时改变右侧
    async handleCaseChange({ type, id }) {
      if (type === this.rightActiveType) {
        this.rightActiveType = 0;
        this.$nextTick(() => {
          this.rightActiveType = type;
        });
      } else {
        this.rightActiveType = type;
      }
      // 有id 查详情来展示
      if (id) {
        const data = {
          id,
        };
        const res = await getQuestionDetail(data);
        if (res.code === 0) {
          this.caseChildData = res.data;
        }
      }
    },
    // 立即创建
    submitForm(formName) {
      let data = null;
      let outValid = false;
      // 外层校验
      this.$refs[formName].validate((valid) => {
        outValid = valid;
      });

      // 内层题目校验
      this.$refs.editorForm.validate((valid, formData) => {
        if (valid) {
          data = formData;
        }
      });
      if (outValid && data) {
        this.addQuestion(data);
      }
    },
    // 案例题的添加
    handleRightSubmit() {
      this.$refs.editorRightForm.validate((valid, data) => {
        if (valid) {
          this.addQuestion({
            ...data,
            parent_id: this.pid || "",
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.editorForm.resetFields();
    },
  },
};
</script>

<style lang='scss' scoped>
.w-100 {
  width: 100%;
}
.flex {
  display: flex;
}
.question-form {
  font-size: 14px;
  border-top: 10px solid #f2f6fc;
  .el-form {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    min-height: 750px;
    .question-form-left {
      width: 49%;
      flex-shrink: 0;
    }
    .question-form-right {
      width: 49%;
      flex-shrink: 0;
      border-left: 1px solid #e4e7ed;
      position: relative;
      & > div {
        width: 90%;
      }
      .right-submit {
        text-align: center;
      }
      .no-component {
        color: #c0c4cc;
        position: absolute;
        left: 50%;
        top: 30%;
      }
    }
  }
}
.question-form-submit {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
  text-align: center;
  border-top: 10px solid #f2f6fc;
}
.question-type {
  text-align: center;
  margin-bottom: 16px;
  span {
    margin-left: 16px;
    &.name {
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>