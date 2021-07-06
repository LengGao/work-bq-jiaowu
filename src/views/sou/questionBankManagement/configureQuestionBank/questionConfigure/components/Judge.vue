<template>
  <!-- 判断题 -->
  <div class="judge">
    <el-form
      :model="editorForm"
      :rules="editorRules"
      ref="editorRules"
      label-width="100px"
    >
      <el-form-item label="题干内容" prop="topic_description">
        <Editor v-model="editorForm.topic_description" />
      </el-form-item>

      <el-form-item label="正确答案" prop="correct">
        <el-button
          :type="editorForm.correct === item.value ? 'primary' : ''"
          v-for="item in answerOptions"
          :key="item.value"
          @click="handleAnswerChange(item.value)"
          >{{ item.name }}</el-button
        >
      </el-form-item>
      <el-form-item label="答案解析" prop="topic_analysis">
        <Editor v-model="editorForm.topic_analysis" height="200" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//  <!-- 判断题 -->
import Editor from "./Editor";
import mixins from "../mixins";
export default {
  name: "Judge",
  components: {
    Editor,
  },
  mixins: [mixins],
  data() {
    return {
      editorForm: {
        topic_description: "",
        correct: "",
        topic_analysis: "",
      },
      editorRules: {
        topic_analysis: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        topic_description: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        correct: [{ required: true, message: "请选择", trigger: "change" }],
      },
      answerOptions: [
        {
          name: "正确",
          value: 1,
        },
        {
          name: "错误",
          value: 2,
        },
      ],
    };
  },
  methods: {
    // 单选
    handleAnswerChange(value) {
      this.editorForm.correct = value;
    },
    validate(cb) {
      this.$refs.editorRules.validate((valid) => {
        cb(valid, {
          ...this.editorForm,
          topic_answer: this.letterMap[this.editorForm.correct + 1],
          option1: "正确",
          option2: "错误",
          type: 3,
        });
      });
    },
    resetFields() {
      for (const k in this.editorForm) {
        this.editorForm[k] = "";
      }
      this.$refs.editorRules.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>