<template>
  <!--添加编辑课时弹窗-->
  <el-dialog
    :title="title"
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
      <el-form-item label="视频排序" prop="sort">
        <el-input
          type="number"
          v-model="formData.sort"
          placeholder="请输入"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item label="选择视频" prop="video_repository_id">
        <!-- 用来更新验证用 不显示 -->
        <el-input
          v-show="false"
          v-model="formData.video_repository_id"
        ></el-input>
        <el-button @click="openVideoListDialog">选择文件</el-button>
        <p>{{ videoTitle }}</p>
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
    <VideoListDialog
      v-model="videoListDialogVisible"
      @on-checked="handleVideoListChecked"
    />
  </el-dialog>
</template>

<script>
import { updateLesson, createLesson } from "@/api/eda";
import VideoListDialog from "./videoListDialog";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    chapterId: {
      type: [String, Number],
      default: "",
    },
    detailData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    VideoListDialog,
  },
  data() {
    return {
      visible: this.value,
      formData: {
        sort: "",
        video_repository_id: "",
      },
      defaultFiles: [],
      rules: {
        sort: [{ required: true, message: "请输入", trigger: "blur" }],
        video_repository_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      addLoading: false,
      detaiLoading: false,
      videoListDialogVisible: false,
      videoTitle: "",
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    openVideoListDialog() {
      this.videoListDialogVisible = true;
    },
    handleVideoListChecked({ id, title }) {
      this.formData.video_repository_id = id;
      this.videoTitle = title;
    },
    handleOpen() {
      if (this.detailData.id) {
        this.formData.video_repository_id = this.detailData.video_repository_id;
        this.formData.sort = this.detailData.sort;
        this.videoTitle = this.detailData.name;
      }
    },
    async submit() {
      const data = {
        chapter_id: this.chapterId,
        ...this.formData,
      };
      if (this.detailData.id) {
        data.id = this.detailData.id;
      }
      const api = this.detailData.id ? updateLesson : createLesson;
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$emit("on-success", this.chapterId);
        this.$message.success(res.message);
        this.hanldeCancel();
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
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.videoTitle = "";
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>