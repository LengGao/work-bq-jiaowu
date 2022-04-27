<template>
  <!-- 简答题 -->
  <div class="short-answer">
    <el-form
      :model="editorForm"
      :rules="editorRules"
      ref="editorRules"
      label-width="100px"
    >
      <el-form-item label="题干内容" prop="topic_description">
        <Editor v-model="editorForm.topic_description" :height="editorHeight" />
      </el-form-item>

      <el-form-item label="正确答案" prop="correct">
        <Editor v-model="editorForm.correct" />
      </el-form-item>
      <el-form-item label="清除格式">
        <el-checkbox
          class="checkbox"
          :true-label="1"
          :false-label="0"
          v-model="editorForm.remove_html"
        >
          <span class="desc">（ 只保留文字 ）</span></el-checkbox
        >
      </el-form-item>
      <el-form-item label="答案解析" prop="topic_analysis">
        <Editor v-model="editorForm.topic_analysis" :height="editorHeight" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//  <!-- 简答题 -->
import Editor from "./Editor";
import mixins from "../mixins/index";
export default {
  name: "ShortAnswer",
  mixins: [mixins],
  components: {
    Editor,
  },
  data() {
    return {
      editorForm: {
        topic_description: "",
        correct: "",
        topic_analysis: "",
        remove_html: 1,
      },
      editorRules: {
        topic_analysis: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        topic_description: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        correct: [{ required: true, message: "请输入", trigger: "change" }],
      },
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
          topic_answer: this.editorForm.correct,
          option1: this.editorForm.correct,
          type: 6,
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