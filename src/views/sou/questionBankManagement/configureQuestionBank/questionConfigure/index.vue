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
        <transition name="el-zoom-in-top">
          <component
            ref="editorForm"
            :is="getComponent"
            @on-change="handleCaseChange"
            :questionOptions="rightQuestionOptions"
            :data="ruleForm.data"
          />
        </transition>
      </div>
      <!-- 案例题时显示右侧 -->
      <div class="question-form-right" v-if="this.ruleForm.type === 6">
        <transition name="el-zoom-in-top">
          <component ref="editorRightForm" :is="getRightComponent" />
        </transition>
        <div class="right-submit" v-if="rightActiveType">
          <el-button @click="handleRightCancel">取消</el-button>
          <el-button type="primary" @click="handleRightSubmit">添加</el-button>
        </div>
        <span v-else class="no-component">请选择案例题目类型</span>
      </div>
    </el-form>
    <div class="question-form-submit question-form-submit--fixed">
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
        data: {
          text: "",
        },
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
      rightActiveType: 0,
      rightQuestionOptions: [
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
      ],
      caseQusetionList: [],
    };
  },
  computed: {
    getRightComponent() {
      if (this.rightActiveType) {
        return () =>
          import(
            `./components/${this.componentMaps[this.rightActiveType]}.vue`
          );
      }
    },
    getComponent() {
      if (this.ruleForm.type) {
        return () =>
          import(`./components/${this.componentMaps[this.ruleForm.type]}.vue`);
      }
    },
  },
  methods: {
    // 右侧取消
    handleRightCancel() {
      this.rightActiveType = 0;
    },
    // 已添加的案例题，点击时改变右侧
    handleCaseChange(type) {
      this.rightActiveType = type;
    },
    // 立即创建
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
      });
      this.$refs.editorForm.validate((valid) => {
        console.log(valid);
      });
    },
    // 案例题的添加
    handleRightSubmit() {
      this.$refs.editorRightForm.validate((valid, data) => {
        console.log(data);
        console.log(valid);
        this.caseQusetionList.push(data);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.editorForm.resetFields();
      console.log(this.ruleForm);
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
  font-size: 14px;
  border-top: 10px solid #f2f6fc;
  .el-form {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    .question-form-left {
      width: 49%;
      flex-shrink: 0;
    }
    .question-form-right {
      width: 49%;
      flex-shrink: 0;
      border-left: 1px solid #e4e7ed;
      height: 750px;
      overflow-y: auto;
      position: relative;
      & > div {
        width: 90%;
      }
      .right-submit {
        text-align: center;
      }
      .no-component {
        color: #c0c4cc;
        position: absolute;
        left: 50%;
        top: 30%;
      }
    }
  }
}
.question-form-submit {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
  text-align: center;
  border-top: 10px solid #f2f6fc;
}
</style>