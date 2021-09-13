<template>
  <div class="institution-config">
    <el-form
      label-width="120px"
      :model="formData"
      :rules="rules"
      ref="ruleForm"
      v-loading="detaiLoading"
      class="config-form"
    >
      <el-form-item label="网校LOGO" prop="logo">
        <ImageUpload v-model="formData.logo">
          <p slot="tips">
            最佳尺寸为260x50px，图片大小不超过1M，仅支持jpg、
            png格式，用于H5和后台登录界面
          </p>
        </ImageUpload>
      </el-form-item>
      <el-form-item label="反白LOGO" prop="logo_other">
        <ImageUpload v-model="formData.logo_other">
          <p slot="tips">
            最佳尺寸为260x50px，图片大小不超过1M，仅支持jpg、
            png格式，用于后台左上角导航菜单
          </p>
        </ImageUpload>
      </el-form-item>
      <el-form-item label="小程序Appid" prop="appId">
        <el-input
          v-model="formData.appId"
          placeholder="请输入小程序Appid"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="小程序密钥" prop="appSecret">
        <el-input
          v-model="formData.appSecret"
          placeholder="请输入小程序密钥"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="小程序授权文件" prop="app_author_path">
        <el-input
          v-model="formData.app_author_path"
          placeholder="请输入授权文件内容"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="公众号Appid" prop="wx_app_id">
        <el-input
          v-model="formData.wx_app_id"
          placeholder="请输入公众号Appid"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="公众号密钥" prop="wx_app_secret">
        <el-input
          v-model="formData.wx_app_secret"
          placeholder="请输入公众号密钥"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="公众号授权文件" prop="author_path">
        <el-input
          v-model="formData.author_path"
          placeholder="请输入授权文件内容"
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
import {
  modifyInstitutionConfig,
  getInstitutionDetail,
} from "@/api/institution";
export default {
  name: "institutionConfig",
  components: {
    ImageUpload,
  },
  data() {
    return {
      detaiLoading: false,
      formData: {
        logo: "",
        logo_other: "",
        appId: "",
        appSecret: "",
        wx_app_id: "",
        wx_app_secret: "",
        app_author_path: "",
        author_path: "",
      },
      rules: {
        logo: [{ required: true, message: "请选择", trigger: "change" }],
        logo_other: [{ required: true, message: "请选择", trigger: "change" }],
        appId: [{ required: true, message: "请输入", trigger: "blur" }],
        appSecret: [{ required: true, message: "请输入", trigger: "blur" }],
        app_author_path: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        wx_app_id: [{ required: true, message: "请输入", trigger: "blur" }],
        wx_app_secret: [{ required: true, message: "请输入", trigger: "blur" }],
        author_path: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getInstitutionDetail();
  },
  methods: {
    // 获取配置详情
    async getInstitutionDetail() {
      const data = {
        institution_id: this.$route.query.institution_id,
      };
      const res = await getInstitutionDetail(data);
      if (res.code === 0) {
        for (const key in this.formData) {
          this.formData[key] = res.data[key] || "";
        }
        this.formData.appId = res.data.small_program_appId || "";
        this.formData.appSecret = res.data.small_program_appSecret || "";
      }
    },
    // 修改配置
    async modifyInstitutionConfig() {
      const data = {
        institution_id: this.$route.query.institution_id,
        ...this.formData,
      };
      const res = await modifyInstitutionConfig(data);
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.modifyInstitutionConfig();
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