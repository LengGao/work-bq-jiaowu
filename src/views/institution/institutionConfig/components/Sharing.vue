<template>
  <div class="mainwrap">
    <div class="shareLeft">
      <el-form
        label-width="100px"
        :model="formData"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="分享标题" prop="share_title">
          <el-input
            style="width: 400px"
            v-model="formData.share_title"
            placeholder="请输入分享标题"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="分享描述"
          prop="share_description"
          style="width: 100%"
        >
          <el-input
            type="textarea"
            style="width: 400px"
            v-model="formData.share_description"
            placeholder="请输入分享描述"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="分享图片"
          prop="share_img"
          style="margin-bottom: 40px"
        >
          <UploadImg width="120" height="120" v-model="formData.share_img">
            <span slot="tips">
              <p>1. 支持jpg、jpeg、png、gif、bmp格式；</p>
              <p>2. 推荐尺寸200*200px或者1:1</p>
            </span>
          </UploadImg>
        </el-form-item>
      </el-form>

      <span class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保 存</el-button
        >
      </span>
    </div>
    <div class="shareRight">
      <span>样式预览：</span>
      <img src="../../../../assets/images/u5129.jpg" />
    </div>
  </div>
</template>

<script>
import {
  getInstitutionDetail,
  modifyInstitutionConfig,
} from "@/api/institution";
import UploadImg from "@/components/ImgUpload/index.vue";
export default {
  name: "Sharing",
  components: {
    UploadImg,
  },
  data() {
    return {
      formData: {
        share_title: "",
        share_img: "",
        share_description: "",
      },
      rules: {
        share_img: [{ required: true, message: "请上传", trigger: "blur" }],
        share_title: [
          { required: true, message: "请输入分享标题", trigger: "blur" },
        ],
        share_description: [
          { required: true, message: "请输入分享描述", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getInstitutionDetail();
  },
  methods: {
    async modifyInstitutionConfig() {
      const data = {
        institution_id: this.$route.query.institution_id,
        ...this.formData,
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
        this.formData[key] = res.data[key] || "";
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
.mainwrap {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
  .shareLeft {
    width: 680px;
  }
}
.headPortrait {
  width: 87px;
  height: 87px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.headPortrait:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}
.dialog-footer {
  margin: 0 0 0 100px;
}
.shareRight {
  span {
    font-size: 14px;
    color: #666;
    margin-right: 5px;
  }
  img {
    width: 230px;
    vertical-align: top;
  }
}
</style>
