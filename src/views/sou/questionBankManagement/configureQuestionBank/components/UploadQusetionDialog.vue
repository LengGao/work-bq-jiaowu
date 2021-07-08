<template>
  <el-dialog
    title="批量录入"
    :visible.sync="visible"
    width="450px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <Title text="下载模板" />
      <div>
        <a :href="downloadUrl" download="题目模板">
          <el-button type="primary" size="small"> 下载模板</el-button></a
        >
        <p class="desc">点击按钮下载模版， 并按照规定格式填写数据</p>
      </div>
      <Title text="上传文件" />
      <el-form-item prop="url" class="upload-item">
        <el-input v-model="formData.url" style="display: none"></el-input>
        <el-upload
          :accept="suffix.join(',')"
          :headers="headers"
          :action="uploadUrl"
          :on-error="handleUploadError"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :limit="1"
          ref="upload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="desc">
            上传文件格式仅支持{{ suffix.join("、") }}，且文件大小不得超过5M
          </div>
        </el-upload>
      </el-form-item>

      <Title text="数据配置" />
      <el-form-item label="章节名称" prop="topic_chapter_id">
        <el-select v-model="formData.topic_chapter_id" placeholder="请选择">
          <el-option
            v-for="item in chapterOptions"
            :key="item.id"
            :label="item.chapter_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="清除样式" prop="clearStyle">
        <el-radio-group v-model="formData.clearStyle">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { getTopicChapterList, ReadDoc, importQuestionUrl } from "@/api/sou";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    chapterType: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        topic_chapter_id: "",
        url: "",
        clearStyle: 0,
      },
      rules: {
        topic_chapter_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        clearStyle: [{ required: true, message: "请选择", trigger: "change" }],
        url: [{ required: true, message: "请上传", trigger: "change" }],
      },
      addLoading: false,
      detaiLoading: false,
      chapterOptions: [],
      uploadUrl: importQuestionUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      suffix: [".doc", ".docx"],
      downloadUrl:
        "http://edu.com/storage/live_data/20210708/23d7e5efffea593af978fa46f60cafb2.docx",
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    handleOpen() {
      this.getTopicChapterList();
    },
    async getTopicChapterList() {
      const data = {
        question_bank_id: this.$route.query.id,
        chapter_type: this.chapterType,
      };
      this.detaiLoading = true;
      const res = await getTopicChapterList(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        this.chapterOptions = res.data.list;
      }
    },
    handleUploadError() {
      this.$message.error("上传失败");
    },
    handleUploadSuccess(res) {
      console.log(res);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.formData.url = res.data.url;
      } else {
        this.$message.error(res.message);
      }
    },
    handleExceed() {
      this.$message.warning("已上传了一份！");
    },
    handleRemove() {
      this.formData.url = "";
    },
    beforeUpload(file) {
      const fileSuffix = "." + file.name.split(".")[1];
      if (this.suffix.indexOf(fileSuffix) === -1) {
        this.$message.error(`请选择${this.suffix.join("，")}类型的文件！`);
        return false;
      }
    },
    async submit() {
      const data = {
        question_bank_id: this.$route.query.id,
        chapter_type: this.chapterType,
        ...this.formData,
      };
      this.addLoading = true;
      const res = await ReadDoc(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm("formData");
        this.$emit("on-success");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    resetForm(formName) {
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.$refs[formName].resetFields();
      this.$refs.upload.clearFiles();
      this.selection = [];
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.desc {
  font-size: 12px;
  color: #aaa;
  padding: 6px 0 16px 0;
}
.upload-item {
  /deep/.el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>