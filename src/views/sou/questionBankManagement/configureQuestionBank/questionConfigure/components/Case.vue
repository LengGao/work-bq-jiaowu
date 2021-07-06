<template>
  <!-- 案例题 -->
  <div class="case">
    <el-form
      :model="editorForm"
      :rules="editorRules"
      ref="editorRules"
      label-width="100px"
    >
      <el-form-item label="题干内容" prop="topic_description">
        <Editor v-model="editorForm.topic_description" />
      </el-form-item>

      <el-form-item label="案例题目">
        <p class="warning">创建案例题后方可添加子题目</p>
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
          <el-button
            :disabled="!isAddChild"
            slot="reference"
            style="margin-right: 10px"
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
import mixins from "../mixins/index";
export default {
  name: "Case",
  mixins: [mixins],
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
  computed: {
    isAddChild() {
      return !!this.$route.query.pid;
    },
  },
  data() {
    return {
      editorForm: {
        topic_description: "",
      },
      editorRules: {
        topic_description: [
          { required: true, message: "请输入", trigger: "change" },
        ],
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
      this.$refs.editorRules.validate((valid) => {
        cb(valid, {
          ...this.editorForm,
          type: 7,
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
.case {
  .item-input {
    display: flex;
    margin-bottom: 10px;
    .btn-text-content {
      width: 100%;
    }
  }
  .warning {
    color: firebrick;
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