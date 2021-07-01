
<template>
  <!-- 不定项选题 -->
  <div class="indefinite-choice">
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
          :type="editorForm.correct.includes(index) ? 'primary' : ''"
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
//  <!-- 多选题 -->
import Editor from "./Editor";
import mixins from "../mixins/index";
export default {
  name: "IndefiniteChoice",
  mixins: [mixins],
  components: {
    Editor,
  },
  data() {
    return {
      editorForm: {
        topic_description: "",
        correct: [],
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
      eId: 4,
      editorOptions: [1, 2, 3, 4],
    };
  },
  methods: {
    // 多选
    handleAnswerChange(value) {
      const index = this.editorForm.correct.indexOf(value);
      if (~index) {
        this.editorForm.correct.splice(index, 1);
      } else {
        this.editorForm.correct.push(value);
      }
    },
    // 删除题目编辑器
    handleDeleteEditor(index, id) {
      // 选中的被删除，需要清空
      const aIndex = this.editorForm.correct.indexOf(index);
      if (~aIndex) {
        this.editorForm.correct.splice(aIndex, 1);
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
          topic_answer: this.editorForm.correct
            .map((item) => this.letterMap[item + 1])
            .join(","),
          type: 4,
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
.indefinite-choice {
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