<template>
  <div class="institution-config">
    <el-form
      label-width="120px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
      class="config-form"
    >
      <el-form-item label="网校LOGO" prop="chapter_name">
        <ImageUpload v-model="formData.logo">
          <p slot="tips">
            最佳尺寸为260x50px，图片大小不超过1M，仅支持jpg、
            png格式，用于H5和后台登录界面
          </p>
        </ImageUpload>
      </el-form-item>
      <el-form-item label="反白LOGO" prop="chapter_name">
        <ImageUpload v-model="formData.logo">
          <p slot="tips">
            最佳尺寸为260x50px，图片大小不超过1M，仅支持jpg、
            png格式，用于后台左上角导航菜单
          </p>
        </ImageUpload>
      </el-form-item>
      <el-form-item label="小程序Appid" prop="chapter_name">
        <el-input
          v-model="formData.chapter_name"
          placeholder="请输入小程序Appid"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="小程序密钥" prop="chapter_name">
        <el-input
          v-model="formData.chapter_name"
          placeholder="请输入小程序密钥"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="小程序授权文件" prop="chapter_name"> </el-form-item>
      <el-form-item label="公众号Appid" prop="chapter_name">
        <el-input
          v-model="formData.chapter_name"
          placeholder="请输入公众号Appid"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="公众号密钥" prop="chapter_name">
        <el-input
          v-model="formData.chapter_name"
          placeholder="请输入公众号密钥"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ImageUpload from "@/components/ImgUpload";
export default {
  name: "institutionConfig",
  components: {
    ImageUpload,
  },
  data() {
    return {
      detaiLoading: false,
      formData: {},
      rules: {
        chapter_name: [{ required: true, message: "请输入", trigger: "blur" }],
        sort: [{ required: true, message: "请输入", trigger: "blur" }],
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
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.institution-config {
  padding: 20px;
  .config-form {
    width: 600px;
  }
}
</style>