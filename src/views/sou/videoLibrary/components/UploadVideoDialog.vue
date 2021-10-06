<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="550px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    append-to-body
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="视频名称" prop="title">
        <el-input
          type="text"
          placeholder="请输入视频名称"
          maxlength="60"
          style="width: 217px"
          v-model="formData.title"
        ></el-input>
      </el-form-item>
      <el-form-item label="分组名称" prop="group_id">
        <el-select v-model="formData.group_id" placeholder="请选择">
          <el-option
            v-for="item in videoGroupOptions"
            :key="item.id"
            :label="item.group_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传视频" prop="video_id">
        <!-- 用来更新验证用 不显示 -->
        <el-input v-show="false" v-model="formData.video_id"></el-input>
        <AliyunUpload
          :disabled="!formData.title"
          :video-name="formData.title"
          ref="aliyunUpload"
          :defaultFiles="defaultFiles"
          :on-success="handleUploadSuccess"
          @on-remove="handleVideoRemove"
        />
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
import AliyunUpload from "@/components/AliyunUpload/index";
import { getVideoGroupSelect, createVideo, updateVideo } from "@/api/sou";
export default {
  components: {
    AliyunUpload,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    videoData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        group_id: "",
        video_id: "",
        title: "",
      },
      rules: {
        group_id: [{ required: true, message: "请选择", trigger: "change" }],
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        video_id: [{ required: true, message: "请上传", trigger: "change" }],
      },
      addLoading: false,
      detaiLoading: false,
      videoGroupOptions: [],
      defaultFiles: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    handleOpen() {
      this.getVideoGroupSelect();
      if (this.videoData.id) {
        this.formData.group_id = this.videoData.group_id;
        this.formData.title = this.videoData.title;
        this.formData.video_id = this.videoData.video_id;
        this.formData.file_name = this.videoData.file_name;
        this.defaultFiles = [
          {
            name: this.videoData.file_name,
            id: this.videoData.video_id,
          },
        ];
      }
    },
    async getVideoGroupSelect() {
      this.detaiLoading = true;
      const res = await getVideoGroupSelect().catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        this.videoGroupOptions = res.data;
      }
    },

    handleUploadSuccess(res) {
      this.formData.video_id = res.videoId;
      this.formData.file_name = res.file.name;
    },

    handleVideoRemove() {
      this.formData.video_id = "";
    },
    async submit() {
      const data = {
        ...this.formData,
      };
      this.addLoading = true;
      if (this.videoData.id) {
        data.id = this.videoData.id;
      }
      const api = this.videoData.id ? updateVideo : createVideo;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-success", {
          id: res.data.video_repository_id,
          title: this.formData.title,
        });
        this.resetForm("formData");
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
      this.defaultFiles = [];
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