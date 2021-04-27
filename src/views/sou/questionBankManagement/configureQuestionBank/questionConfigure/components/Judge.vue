<template>
  <!-- 判断题 -->
  <div class="judge">
    <el-form
      :model="editorForm"
      :rules="editorRules"
      ref="editorRules"
      label-width="100px"
    >
      <el-form-item label="题干内容" prop="text">
        <Editor v-model="editorForm.text" />
      </el-form-item>

      <el-form-item label="正确答案" prop="correct">
        <el-button
          :type="editorForm.correct === item.value ? 'primary' : ''"
          v-for="item in editorOptions"
          :key="item.value"
          @click="handleAnswerChange(item.value)"
          >{{ item.name }}</el-button
        >
      </el-form-item>
      <el-form-item label="答案解析" prop="remark">
        <Editor v-model="editorForm.remark" height="200" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//  <!-- 判断题 -->
import Editor from "./Editor";
export default {
  name: "Judge",
  components: {
    Editor,
  },
  data() {
    return {
      editorForm: {
        text: "",
        correct: "",
        remark: "",
      },
      editorRules: {
        remark: [{ required: true, message: "请输入", trigger: "blur" }],
        text: [{ required: true, message: "请输入", trigger: "change" }],
        correct: [{ required: true, message: "请选择", trigger: "change" }],
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
      this.$refs.editorRules.validate(cb);
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