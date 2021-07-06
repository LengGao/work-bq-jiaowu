<template>
  <!-- 填空题 -->
  <div class="completion">
    <el-form
      :model="editorForm"
      :rules="editorRules"
      ref="editorRules"
      label-width="100px"
    >
      <el-form-item label="题干内容" prop="topic_description">
        <Editor v-model="editorForm.topic_description" />
      </el-form-item>

      <div class="options">
        <div class="options-title">
          <span>正确答案</span>
          <p style="color: #c0c4cc; font-size: 12px">
            如果一个空有多个正确答案，可以用分号分隔，答案匹配任意一个都算正确
          </p>
        </div>
        <el-form-item
          v-for="(id, index) in editorOptions"
          :key="id"
          :rules="[{ required: true, message: `请输入`, trigger: 'blur' }]"
          :prop="`option${id}`"
        >
          <div class="item-input">
            <el-input
              v-model="editorForm['option' + id]"
              :placeholder="`请输入第${index + 1}空答案`"
              ><template slot="prepend">{{ index + 1 }}</template></el-input
            >
            <el-button @click="handleDeleteInput(index, id)"
              ><i class="el-icon-delete"></i
            ></el-button>
          </div>
        </el-form-item>
        <div class="options-footer">
          <el-button @click="handleAddInput" class="add-btn"
            >添加填空题答案</el-button
          >
          <el-checkbox class="checkbox" v-model="editorForm.checked"
            >乱序匹配答案
            <span class="desc"
              >（只需匹配答案的对错，而对答案的顺序不做要求）</span
            ></el-checkbox
          >
        </div>
      </div>
      <el-form-item label="答案解析" prop="topic_analysis">
        <Editor v-model="editorForm.topic_analysis" height="200" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//  <!-- 填空题 -->
import Editor from "./Editor";
import mixins from "../mixins/index";
export default {
  name: "Completion",
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
        checked: false,
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
      eId: 1,
      editorOptions: [1],
    };
  },
  methods: {
    // 删除答案输入框
    handleDeleteInput(index, id) {
      this.editorOptions.splice(index, 1);
      delete this.editorForm[`option${id}`];
    },
    // 添加答案输入框
    handleAddInput() {
      if (this.editorOptions.length >= 10) {
        this.$message.warning("不能在加了！");
        return;
      }
      const item = ++this.eId;
      this.$set(this.editorForm, "option" + item, "");
      this.editorOptions.push(item);
    },
    validate(cb) {
      this.$refs.editorRules.validate((valid) => {
        const answerArr = [];
        for (const k in this.editorForm) {
          if (~k.indexOf("option")) {
            answerArr.push(this.editorForm[k]);
          }
        }
        cb(valid, {
          ...this.editorForm,
          topic_answer: answerArr.join(","),
          ignore_order: +this.editorForm.checked,
          type: 5,
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
.completion {
  .options {
    &-title {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      span {
        width: 100px;
        text-align: right;
        padding-right: 12px;
        color: #606266;
      }
    }
    &-footer {
      padding-left: 100px;
      margin-bottom: 16px;
      .add-btn {
        margin-bottom: 16px;
      }
    }
  }
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