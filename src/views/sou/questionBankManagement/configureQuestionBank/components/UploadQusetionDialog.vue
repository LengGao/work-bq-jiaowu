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
      <div>
        <el-button type="primary" size="small">上传文件</el-button>
        <p class="desc">上传文件格式仅支持doc， 且文件大小不得超过5M。</p>
      </div>
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
</style>