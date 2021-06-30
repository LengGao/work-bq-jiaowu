<template>
  <!-- 单选题 -->
  <div class="single-choice">
    <el-form
      :model="editorForm"
      :rules="editorRules"
      ref="editorRules"
      label-width="100px"
    >
      <el-form-item label="题干内容" prop="topic_description">
        <Editor v-model="editorForm.topic_description" />
      </el-form-item>
      <el-form-item
        :label="`选项（${letterMap[index + 1]}）`"
        v-for="(id, index) in editorOptions"
        :key="id"
        :prop="`option${id}`"
        :rules="[{ required: true, message: `请输入`, trigger: 'blur' }]"
      >
        <div class="form-item-editor">
          <Editor v-model="editorForm['option' + id]" />
          <el-button
            @click="handleDeleteEditor(index, id)"
            class="editor-delete"
            type="text"
            icon="el-icon-delete"
          ></el-button>
        </div>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="handleAddEditor">添加新选项</el-button>
      </el-form-item>
      <el-form-item label="正确答案" prop="correct">
        <el-button
          :type="editorForm.correct === index ? 'primary' : ''"
          v-for="(item, index) in editorOptions"
          :key="item"
          @click="handleAnswerChange(index)"
          >{{ letterMap[index + 1] }}</el-button
        >
      </el-form-item>
      <el-form-item label="答案解析" prop="topic_analysis">
        <Editor v-model="editorForm.topic_analysis" height="200" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//  <!-- 单选题 -->
import Editor from "./Editor";
import mixins from "../mixins/index";
export default {
  name: "SingleChoice",
  components: {
    Editor,
  },
  mixins: [mixins],
  data() {
    return {
      editorForm: {
        topic_description: "",
        topic_analysis: "",
        correct: "",
      },
      editorRules: {
        topic_analysis: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        topic_description: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        correct: [{ required: true, message: "请选择", trigger: "change" }],
      },
      eId: 4,
      editorOptions: [1, 2, 3, 4],
    };
  },
  methods: {
    // 单选
    handleAnswerChange(index) {
      this.editorForm.correct = index;
    },
    // 删除题目编辑器
    handleDeleteEditor(index, id) {
      // 选中的被删除，需要清空
      if (this.editorForm.correct === index) {
        this.editorForm.correct = "";
      }
      this.editorOptions.splice(index, 1);
      delete this.editorForm[`option${id}`];
    },
    // 添加题目编辑器
    handleAddEditor() {
      const length = this.editorOptions.length;
      const id = ++this.eId;
      if (length >= 10) {
        this.$message.warning("不能在加了！");
        return;
      }
      this.$set(this.editorForm, `option${id}`, "");
      this.editorOptions.push(id);
    },
    validate(cb) {
      this.$refs.editorRules.validate((valid) => {
        cb(valid, {
          ...this.editorForm,
          topic_answer: this.letterMap[this.editorForm.correct + 1],
          type: 1,
        });
      });
    },
    resetFields() {
      this.$refs.editorRules.resetFields();
      for (const k in this.editorForm) {
        this.editorForm[k] = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.single-choice {
  .form-item-editor {
    position: relative;
    .editor-delete {
      position: absolute;
      right: -30px;
      top: 0;
      /deep/i.el-icon-delete {
        font-size: 20px;
        color: #606266;
      }
    }
  }
}
</style>