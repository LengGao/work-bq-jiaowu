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
        <Editor v-model="editorForm.topic_description" />
      </el-form-item>

      <el-form-item label="正确答案" prop="correct">
        <Editor v-model="editorForm.correct" />
      </el-form-item>
      <el-form-item label="答案解析" prop="topic_analysis">
        <Editor v-model="editorForm.topic_analysis" height="200" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//  <!-- 简答题 -->
import Editor from "./Editor";
export default {
  name: "ShortAnswer",
  components: {
    Editor,
  },
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
        correct: [{ required: true, message: "请输入", trigger: "change" }],
      },
      eId: 4,
      editorOptions: [
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