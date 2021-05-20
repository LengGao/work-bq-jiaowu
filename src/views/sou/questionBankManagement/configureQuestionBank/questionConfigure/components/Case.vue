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
          v-for="(item, index) in caseQusetionList"
          :key="index"
        >
          <el-button
            @click="handleQuestionChange(item.type)"
            class="btn-text-content"
            >{{ editorForm["text" + index] }}</el-button
          >
          <el-button @click="handleDeleteInput(index)"
            ><i class="el-icon-delete"></i
          ></el-button>
        </div>
        <el-popover
          placement="bottom"
          popper-class="question-type-popover"
          width="100"
          trigger="hover"
        >
          <el-button slot="reference" style="margin-right: 10px"
            >添加题目</el-button
          >
          <ul class="question-type-list">
            <li
              v-for="item in questionOptions"
              :key="item.value"
              @click="handleQuestionChange(item.value)"
            >
              {{ item.name }}
            </li>
          </ul>
        </el-popover>
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
  props: {
    questionOptions: {
      type: Array,
      default: () => [],
    },
    caseQusetionList: {
      type: Array,
      default: () => [],
    },
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
    };
  },
  methods: {
    handleQuestionChange(val) {
      this.$emit("on-change", val);
    },
    // 删除答案输入框
    handleDeleteInput(index) {
      this.caseQusetionList.splice(index, 1);
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
    .btn-text-content {
      width: 100%;
    }
  }
}
.question-type-popover {
  .question-type-list {
    li {
      padding: 6px;
      cursor: pointer;
      text-align: center;
      &:hover {
        background-color: #ecf5ff;
        color: #199fff;
      }
    }
  }
}
</style>