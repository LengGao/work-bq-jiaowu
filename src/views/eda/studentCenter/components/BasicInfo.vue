<template>
  <!-- 基本信息 -->
  <div class="basic-info">
    <div class="info-header">
      <el-button v-show="isEdit === false" @click="isEdit = true"
        >编辑</el-button
      >
      <el-button v-show="isEdit === true" @click="resetForm('ruleForm')"
        >取消</el-button
      >
      <el-button
        v-show="isEdit === true"
        type="primary"
        @click="submitForm('ruleForm')"
        >保存</el-button
      >
    </div>
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="info-form"
      >
        <el-form-item label="客户姓名" prop="name">
          <el-input
            v-if="isEdit"
            v-model="ruleForm.name"
            placeholder="请输入"
          ></el-input>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="ruleForm.name"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="备用号码">
          <el-input
            v-model="ruleForm.name"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="ruleForm.name"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="微信">
          <el-input
            v-model="ruleForm.name"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="学员性别">
          <el-radio-group
            v-if="isEdit"
            v-model="ruleForm.resource"
            class="w-100"
          >
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-if="isEdit"
            class="w-100"
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
          ></el-date-picker>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input
            v-model="ruleForm.name"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input
            v-model="ruleForm.name"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else></span>
        </el-form-item>

        <el-form-item label="文化程度">
          <el-select
            v-if="isEdit"
            v-model="ruleForm.region"
            placeholder="请选择文化程度"
            class="w-100"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-select
            v-if="isEdit"
            v-model="ruleForm.region"
            placeholder="请选择活籍贯"
            class="w-100"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="常驻地">
          <el-select
            v-if="isEdit"
            v-model="ruleForm.region"
            placeholder="请选择活籍贯"
            class="w-100"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="渠道来源">
          <el-select
            v-if="isEdit"
            v-model="ruleForm.region"
            placeholder="请选择活籍贯"
            class="w-100"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-select
            v-if="isEdit"
            v-model="ruleForm.region"
            placeholder="请选择活籍贯"
            class="w-100"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <span v-else></span>
        </el-form-item>
        <el-form-item label="所属老师">
          <el-input
            v-model="ruleForm.name"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else></span>
        </el-form-item>

        <el-form-item label="备注信息" class="desc">
          <el-input
            v-if="isEdit"
            type="textarea"
            placeholder="请输入"
            v-model="ruleForm.desc"
          ></el-input>
          <span v-else></span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "basicInfo",
  data() {
    return {
      isEdit: false,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.isEdit = false;
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-info {
  .info-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
  .w-100 {
    width: 100%;
  }
  .info-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 400px;
    }
    .desc {
      width: 600px;
    }
  }
}
</style>