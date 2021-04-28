<template>
  <!-- 填空题 -->
  <div class="completion">
    <el-form
      :model="editorForm"
      :rules="editorRules"
      ref="editorRules"
      label-width="100px"
    >
      <el-form-item label="题干内容" prop="text">
        <Editor v-model="editorForm.text" />
      </el-form-item>

      <el-form-item label="正确答案">
        <p style="color: #c0c4cc; font-size: 12px">
          如果一个空有多个正确答案，可以用分号分隔，答案匹配任意一个都算正确
        </p>
        <div
          class="item-input"
          v-for="(item, index) in inputOptins"
          :key="item"
        >
          <el-input
            v-model="editorForm['text' + item]"
            :placeholder="`请输入第${index + 1}空答案`"
            ><template slot="prepend">{{ index + 1 }}</template></el-input
          >
          <el-button @click="handleDeleteInput(index)"
            ><i class="el-icon-delete"></i
          ></el-button>
        </div>
        <el-button @click="handleAddInput">添加填空题答案</el-button>
        <el-checkbox class="checkbox" v-model="editorForm.checked"
          >乱序匹配答案
          <span class="desc"
            >（只需匹配答案的对错，而对答案的顺序不做要求）</span
          ></el-checkbox
        >
      </el-form-item>
      <el-form-item label="答案解析" prop="remark">
        <Editor v-model="editorForm.remark" height="200" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//  <!-- 填空题 -->
import Editor from "./Editor";
export default {
  name: "Completion",
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
      inputOptins: [1, 2],
    };
  },
  methods: {
    // 删除答案输入框
    handleDeleteInput(index) {
      this.inputOptins.splice(index, 1);
    },
    // 添加答案输入框
    handleAddInput() {
      if (this.inputOptins.length >= 10) {
        this.$message.warning("不能在加了！");
        return;
      }
      const item = ++this.eId;
      this.$set(this.editorForm, "text" + item, "");
      this.inputOptins.push(item);
    },
    validate(cb) {
      this.$refs.editorRules.validate((valid) => {
        cb(valid, { ...this.editorForm, type: 4 });
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