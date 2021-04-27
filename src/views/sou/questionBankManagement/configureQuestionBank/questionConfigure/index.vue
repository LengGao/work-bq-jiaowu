<template>
  <div class="question-form">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <div class="question-form-left">
        <div class="flex">
          <el-form-item label="章节名称" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择章节名称">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择题目类型">
              <el-option
                v-for="item in questionOptions"
                :label="item.name"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <component ref="editorForm" :is="getComponent" />
      </div>
      <div class="question-form-right"></div>
    </el-form>
    <div class="question-form-submit">
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "questionConfiguer",
  data() {
    return {
      ruleForm: {
        type: 1,
        region: "",
        desc: "",
      },
      rules: {
        desc: [{ required: true, message: "请输入", trigger: "change" }],
        type: [{ required: true, message: "请选择", trigger: "change" }],
      },
      questionOptions: [
        {
          name: "单选题",
          value: 1,
        },
        {
          name: "多选题",
          value: 2,
        },
        {
          name: "判断题",
          value: 3,
        },
        {
          name: "填空题",
          value: 4,
        },
        {
          name: "简答题",
          value: 5,
        },
        {
          name: "案例题",
          value: 6,
        },
      ],
      componentMaps: {
        1: "SingleChoice",
        2: "MultipleChoice",
        3: "Judge",
        4: "Completion",
        5: "ShortAnswer",
        6: "Case",
      },
    };
  },
  computed: {
    getComponent() {
      if (this.ruleForm.type) {
        return () =>
          import(`./components/${this.componentMaps[this.ruleForm.type]}.vue`);
      }
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
      });
      this.$refs.editorForm.validate((valid) => {
        console.log(valid);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang='scss' scoped>
.w-100 {
  width: 100%;
}
.flex {
  display: flex;
}
.question-form {
  padding: 20px;
  .el-form {
    display: flex;
    .question-form-left {
      width: 50%;
      flex-shrink: 0;
    }
    .question-form-right {
      width: 50%;
      flex-shrink: 0;
    }
  }
}
</style>