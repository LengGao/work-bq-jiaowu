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
        <el-button type="primary" size="small">下载模板</el-button>
        <p class="desc">点击按钮下载模版， 并按照规定格式填写数据</p>
      </div>
      <Title text="上传文件" />
      <el-upload
        :accept="suffix.join(',')"
        :headers="headers"
        :action="uploadUrl"
        :on-error="handleUploadError"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUpload"
        :limit="1"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="desc">
          上传文件格式仅支持{{ suffix.join("、") }}，且文件大小不得超过5M
        </div>
      </el-upload>
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
      <el-form-item label="清除样式" prop="topic_chapter_id">
        <el-radio-group v-model="formData.radio">
          <el-radio :label="3">是</el-radio>
          <el-radio :label="9">否</el-radio>
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
import { getTopicChapterList, moveQuestion } from "@/api/sou";
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
      },
      rules: {
        topic_chapter_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      addLoading: false,
      detaiLoading: false,
      chapterOptions: [],
      uploadUrl: "/",
      headers: {
        token: this.$store.state.user.token,
      },
      suffix: [".doc", ".docx"],
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
      if (res.code === 0) {
        this.$message.success(res.message);
        this.hanldeCancel();
        this.$emit("on-success");
      } else {
        this.$message.error(res.message);
      }
      this.$refs.upload.clearFiles();
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
        id: this.id,
        question_bank_id: this.$route.query.id,
        ...this.formData,
      };
      this.addLoading = true;
      const res = await moveQuestion(data).catch(() => {
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
</style>