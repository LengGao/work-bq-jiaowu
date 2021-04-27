<template>
  <!-- 案例题 -->
  <div class="case">
    <el-form
      :model="editorForm"
      :rules="editorRules"
      ref="editorRules"
      label-width="100px"
    >
      <el-form-item label="题干内容" prop="text">
        <Editor v-model="editorForm.text" />
      </el-form-item>

      <el-form-item label="案例题目">
        <div
          class="item-input"
          v-for="(item, index) in subjectList"
          :key="item"
        >
          <el-input :value="editorForm['text' + item]" disabled></el-input>
          <el-button @click="handleDeleteInput(index)"
            ><i class="el-icon-delete"></i
          ></el-button>
        </div>
        <el-button @click="handleAddInput">添加题目</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//  <!-- 案例题 -->
import Editor from "./Editor";
export default {
  name: "Case",
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
      eId: 2,
      subjectList: [1, 2],
    };
  },
  methods: {
    // 删除答案输入框
    handleDeleteInput(index) {
      this.subjectList.splice(index, 1);
    },
    // 添加答案输入框
    handleAddInput() {},
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
.case {
  .item-input {
    display: flex;
    margin-bottom: 10px;
    button {
      margin-left: 10px;
    }
  }
  .checkbox {
    margin-left: 30px;
    .desc {
      color: #909399;
    }
  }
}
</style>