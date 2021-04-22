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
      <el-form-item label="视频名称" prop="live_video_name">
        <el-input
          v-model="formData.live_video_name"
          placeholder="请输入视频名称"
          maxlength="100"
        />
      </el-form-item>
      <el-form-item label="视频简介" prop="live_video_des">
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10 }"
          v-model="formData.live_video_des"
          placeholder="请输入"
          maxlength="500"
        />
      </el-form-item>
      <el-form-item label="上传视频" prop="video_id">
        <!-- 用来更新验证用 不显示 -->
        <el-input v-show="false" v-model="formData.video_id"></el-input>
        <AliyunUpload
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
import { editlivevideo, addlivevideo, getlivevideoDetail } from "@/api/eda";
import AliyunUpload from "@/components/AliyunUpload/index";
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
    id: {
      type: [String, Number],
      default: "",
    },
  },
  components: {
    AliyunUpload,
  },
  data() {
    return {
      visible: this.value,
      formData: {
        live_video_des: "",
        video_id: "",
        live_video_name: "",
        media_name: "",
        description: "",
      },
      defaultFiles: [],
      rules: {
        live_video_name: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        live_video_des: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        video_id: [{ required: true, message: "请上传", trigger: "change" }],
      },
      chapterOptions: [],
      addLoading: false,
      detaiLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    handleVideoRemove() {
      this.formData.media_name = "";
      this.formData.video_id = "";
    },
    handleOpen() {
      if (this.id) {
        this.getlivevideoDetail();
      }
    },
    handleUploadSuccess(data) {
      const filename = data.file.name;
      this.formData.video_id = data.videoId;
      this.formData.media_name = filename;
      this.formData.description = data.duration;
    },
    //获取详情
    async getlivevideoDetail() {
      const data = {
        live_video_id: this.id,
      };
      this.detaiLoading = true;
      const res = await getlivevideoDetail(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
        const video_id = res.data.media_id;
        this.formData.video_id = video_id;
        this.defaultFiles = [
          {
            name: res.data.media_name,
            id: video_id,
          },
        ];
      }
    },
    async submit() {
      const data = {
        ...this.formData,
      };
      if (this.id) {
        data.live_video_id = this.id;
        data.media_id = this.formData.video_id;
      } else {
        data.course_id = this.$route.query?.course_id || "";
        data.live_id = this.$route.query?.live_id || "";
        data.class_room_id = this.$route.query?.live_class_id || "";
      }
      const api = this.id ? editlivevideo : addlivevideo;
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$emit("on-success");
        this.$message.success(res.message);
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
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.$refs[formName].resetFields();
      this.defaultFiles = [];
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$refs.aliyunUpload.cancelUpload();
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>