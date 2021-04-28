<template>
  <!-- 单选题 -->
  <div class="single-choice">
    <el-form
      :model="editorForm"
      :rules="editorRules"
      ref="editorRules"
      label-width="100px"
    >
      <el-form-item label="题干内容" prop="text">
        <Editor v-model="editorForm.text" />
      </el-form-item>
      <el-form-item
        :label="`选项（${idMaps[index + 1]}）`"
        v-for="(id, index) in editorOptions"
        :key="id"
        :prop="`text${id}`"
        :rules="[{ required: true, message: `请输入`, trigger: 'blur' }]"
      >
        <div class="form-item-editor">
          <Editor v-model="editorForm['text' + id]" />
          <el-button
            @click="handleDeleteEditor(index)"
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
          >{{ idMaps[index + 1] }}</el-button
        >
      </el-form-item>
      <el-form-item label="答案解析" prop="remark">
        <Editor v-model="editorForm.remark" height="200" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//  <!-- 单选题 -->
import Editor from "./Editor";
export default {
  name: "SingleChoice",
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
      editorOptions: [1, 2, 3, 4],
      idMaps: {
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
    };
  },
  methods: {
    // 单选
    handleAnswerChange(index) {
      this.editorForm.correct = index;
    },
    // 删除题目编辑器
    handleDeleteEditor(index) {
      // 选中的被删除，需要清空
      if (this.editorForm.correct === index) {
        this.editorForm.correct = "";
      }
      this.editorOptions.splice(index, 1);
    },
    // 添加题目编辑器
    handleAddEditor() {
      const length = this.editorOptions.length;
      const id = ++this.eId;
      if (length >= 10) {
        this.$message.warning("不能在加了！");
        return;
      }
      this.$set(this.editorForm, `text${id}`, "");
      this.editorOptions.push(id);
    },
    validate(cb) {
      this.$refs.editorRules.validate((valid) => {
        cb(valid, { ...this.editorForm, type: 1 });
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