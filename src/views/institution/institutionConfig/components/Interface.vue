<template>
  <div class="mainwrap">
    <el-form
      :label-position="labelPosition"
      label-width="130px"
      :model="formData"
      ref="ruleForm"
    >
      <el-form-item label="业务域名">
        <el-input
          v-model="formData.url"
          disabled
          placeholder="业务域名"
        ></el-input>
      </el-form-item>
      <el-form-item label="合法域名">
        <el-input
          v-model="formData.url"
          disabled
          placeholder="合法域名"
        ></el-input>
      </el-form-item>
      <el-form-item label="小程序Appid">
        <el-input
          v-model="formData.appId"
          placeholder="小程序开发者ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="小程序密钥">
        <el-input
          v-model="formData.appSecret"
          placeholder="小程序开发者密钥"
        ></el-input>
      </el-form-item>
      <el-form-item label="小程序原始ID">
        <el-input
          v-model="formData.applet_origin_id"
          placeholder="小程序原始ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="小程序授权文件">
        <el-upload
          accept="text/plain"
          class="upload-demo"
          :on-success="uploadSuccess"
          :action="uploadLocal"
          :headers="headers"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">小程序授权文件上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="公众号Appid">
        <el-input
          v-model="formData.wx_app_id"
          placeholder="公众号开发者ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="公众号密钥">
        <el-input
          v-model="formData.wx_app_secret"
          placeholder="公众号开发者密钥"
        ></el-input>
      </el-form-item>
      <el-form-item label="公众号原始ID">
        <el-input
          v-model="formData.wx_origin_id"
          placeholder="公众号原始ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="微信授权文文件">
        <el-upload
          accept="text/plain"
          class="upload-demo"
          :on-success="uploadSuccess"
          :action="uploadLocal"
          :headers="headers"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">微信授权文文件上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item size="large">
        <el-button @click="getInstitutionDetail">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保 存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getInstitutionDetail,
  modifyInstitutionConfig,
  uploadLocal,
} from "@/api/institution";
export default {
  name: "Interface",
  data() {
    return {
      labelPosition: "right",
      uploadLocal,
      headers: {
        autograph: this.$store.getters.token,
        "account-id": this.$store.getters.account_id,
      },
      formData: {
        url: "",
        appId: "",
        appSecret: "",
        applet_origin_id: "",
        wx_app_id: "",
        wx_app_secret: "",
        wx_origin_id: "",
      },
    };
  },
  created() {
    this.getInstitutionDetail();
  },
  methods: {
    uploadSuccess(res) {
      console.log(res);
      if (res.code === 0) {
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
    },
    async modifyInstitutionConfig() {
      const { url, ...rest } = this.formData;
      const data = {
        institution_id: this.$route.query.institution_id,
        ...rest,
      };
      const res = await modifyInstitutionConfig(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getInstitutionDetail();
      }
    },
    async getInstitutionDetail() {
      const data = {
        institution_id: this.$route.query.institution_id,
      };
      const res = await getInstitutionDetail(data);
      for (const key in this.formData) {
        this.formData[key] = res.data[key];
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.modifyInstitutionConfig();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-input__inner {
  width: 400px;
}
/deep/.el-form-item__label {
  margin: 0 0 10px 0;
}
/deep/.el-form-item {
  margin-bottom: 15px;
}
.mainwrap {
  margin: 10px 0 0 0;
}
</style>
