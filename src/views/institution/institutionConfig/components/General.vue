<template>
  <div class="mainwrap">
    <el-form
      label-width="110px"
      :model="formData"
      :rules="rules"
      ref="ruleForm"
      class="class-form"
      :show-message="true"
      label-position="right"
    >
      <el-form-item label="统计数据">
        <el-radio-group v-model="formData.data_source">
          <el-radio label="System">基于全网数据</el-radio>
          <el-radio label="MySelf">基于机构数据</el-radio>
        </el-radio-group>
        <span class="text"
          >*用于对外展示课程题库的购买人数、学习人数等数据</span
        >
      </el-form-item>
      <el-form-item label="审核模式">
        <el-radio-group v-model="formData.debug">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
        <span class="text"
          >*为了小程序顺利上线，请在审核期间开启审核模式，否则有可能会被驳回。新版小程序发布之后，请立即关闭审核模式。</span
        >
      </el-form-item>
      <el-form-item label="网校LOGO" style="margin-bottom: 40px">
        <UploadImg width="280" height="130" v-model="formData.logo">
          <span slot="tips">
            <p>1、支持jpg、 png等格式</p>
            <p>2、推荐尺寸260x50px，用于网校和后台登录界面</p>
          </span>
        </UploadImg>
      </el-form-item>
      <el-form-item label="反白LOGO" style="margin-bottom: 40px">
        <UploadImg width="280" height="130" v-model="formData.logo_other">
          <span slot="tips">
            <p>1、支持jpg、 png等格式</p>
            <p>2、推荐尺寸260x50px，用于后台左上角导航菜单</p>
          </span>
        </UploadImg>
      </el-form-item>

      <el-form-item label="H5广告位" style="margin-bottom: 40px">
        <UploadImg width="280" height="130" v-model="formData.app_banner">
          <span slot="tips">
            <p>1、支持jpg、 png等格式</p>
            <p>2、推荐尺寸690*340px，用于H5首页网校宣传</p>
          </span>
        </UploadImg>
      </el-form-item>
      <div class="qrCode">
        <el-form-item label="公众号二维码" style="margin-bottom: 40px">
          <UploadImg width="120" height="120" v-model="formData.wx_qrcode">
            <span slot="tips"> </span>
          </UploadImg>
        </el-form-item>
        <el-form-item label="客服二维码" style="margin-bottom: 40px">
          <UploadImg width="120" height="120" v-model="formData.service_qrcode">
            <span slot="tips"> </span>
          </UploadImg>
        </el-form-item>
      </div>

      <el-form-item label="用户协议" class="edit">
        <quill-editor
          ref="treatyEditor"
          v-model="formData.treaty"
          :options="editorOption"
        >
        </quill-editor>
        <el-input v-show="false" v-model="formData.treaty" />
      </el-form-item>

      <el-form-item label="关于我们" class="edit">
        <quill-editor
          ref="aboutEditor"
          v-model="formData.about_us"
          :options="editorOption"
        >
        </quill-editor>
        <el-input v-show="false" v-model="formData.about_us" />
      </el-form-item>

      <div class="entybtn">
        <el-button @click="getInstitutionDetail">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保 存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import editorOption from "@/utils/quill-config";
import UploadImg from "@/components/ImgUpload/index.vue";
import {
  getInstitutionDetail,
  modifyInstitutionConfig,
} from "@/api/institution";
export default {
  name: "General",

  data() {
    return {
      radio1: "1",
      radio2: "1",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      formData: {
        data_source: "System",
        debug: 0,
        logo: "",
        logo_other: "",
        app_banner: "",
        wx_qrcode: "",
        service_qrcode: "",
        about_us: "",
        treaty: "",
      },
      rules: {
        data_source: [
          { required: true, message: "请选择统计数据", trigger: "blur" },
        ],
        debug: [{ required: true, message: "请选择审核模式", trigger: "blur" }],
        logo: [{ required: true, message: "请选择", trigger: "blur" }],
        logo_other: [{ required: true, message: "请选择", trigger: "blur" }],
        app_banner: [{ required: true, message: "请选择", trigger: "blur" }],
        wx_qrcode: [{ required: true, message: "请选择", trigger: "blur" }],
        service_qrcode: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        about_us: [
          { required: true, message: "请输入关于我们内容", trigger: "blur" },
        ],
        treaty: [{ required: true, message: "请输入协议", trigger: "blur" }],
      },
      editorOption,
    };
  },
  components: {
    quillEditor,
    UploadImg,
  },
  created() {
    this.getInstitutionDetail();
  },
  mounted() {},
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
      this.$refs.treatyEditor.quill.enable(false);
      this.$refs.aboutEditor.quill.enable(false);
      for (const key in this.formData) {
        this.formData[key] = res.data[key];
      }
      this.$nextTick(() => {
        this.$refs.treatyEditor.quill.enable(true);
        this.$refs.aboutEditor.quill.enable(true);
      });
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
/deep/.el-form-item {
  margin-bottom: 15px;
}
.quill-editor {
  width: 820px;
  /deep/.ql-blank {
    min-height: 180px;
  }
}
.mainwrap {
  .text {
    color: #999;
    margin-left: 30px;
    margin-bottom: 20px;
  }
}

.entybtn {
  margin-left: 110px;
}
.qrCode {
  display: flex;
}
.edit {
  margin-bottom: 120px;
}
</style>
