<template>
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
        v-for="(item, index) in editorOptions"
        :key="item.id"
        :prop="`text${index + 1}`"
        :rules="[
          { required: true, message: `请输入${index + 1}`, trigger: 'change' },
        ]"
      >
        <div class="form-item-editor">
          <Editor v-model="editorForm['text' + (index + 1)]" />
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
    </el-form>
  </div>
</template>

<script>
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
      },
      editorRules: {
        text: [{ required: true, message: "请输入", trigger: "change" }],
      },
      eId: 4,
      editorOptions: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
      ],
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
    // 删除题目编辑器
    handleDeleteEditor(index) {
      this.editorOptions.splice(index, 1);
    },
    // 添加题目编辑器
    handleAddEditor() {
      const length = this.editorOptions.length;
      const id = ++this.eId;
      if (length > 10) {
        this.$message.warning("不能在加了！");
        return;
      }
      this.editorForm["text" + id] = "";
      this.editorOptions.push({
        id,
      });
    },
    validate(cb) {
      this.$refs.editorRules.validate(cb);
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