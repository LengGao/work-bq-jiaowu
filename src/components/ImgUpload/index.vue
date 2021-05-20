<template>
  <div class="upload-image">
    <el-upload
      class="upload-button"
      name="image"
      accept="image/*"
      :headers="headers"
      :action="uploadImageUrl"
      :show-file-list="false"
      :on-error="handleUploadError"
      :on-success="handleUploadSuccess"
      :before-upload="beforeUpload"
    >
      <div
        v-if="uploadImg"
        class="imgs"
        :style="{
          width: width + 'px',
          height: height + 'px',
        }"
      >
        <img :src="uploadImg" />
        <i class="del el-icon-close" @click.stop="hanldeDelete"></i>
      </div>
      <i
        v-if="!uploadLoading && !uploadImg"
        class="el-icon-plus upload-button-icon"
        :style="{
          width: width + 'px',
          height: height + 'px',
          'line-height': height + 'px',
        }"
      ></i>
      <i
        class="el-icon-loading upload-loading"
        :style="{
          width: width + 'px',
          height: height + 'px',
          'line-height': height + 'px',
        }"
        v-if="uploadLoading"
      ></i>
    </el-upload>
    <div class="upload-tips">
      <slot name="tips">
        <p>1. 支持jpg、jpeg、png、gif、bmp格式；</p>
        <p>2. 推荐尺寸750*422px或者16:9</p>
      </slot>
    </div>
  </div>
</template>

<script>
import { uploadImageUrl } from "@/api/educational";
export default {
  name: "ImgUpload",
  props: {
    value: {
      type: String,
      default: "",
    },
    width: {
      type: [String, Number],
      default: 220,
    },
    height: {
      type: [String, Number],
      default: 120,
    },
  },
  data() {
    return {
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      uploadLoading: false,
      uploadImg: this.value,
    };
  },
  watch: {
    value(val) {
      this.uploadImg = val;
    },
  },
  methods: {
    handleEmit() {
      this.$emit("input", this.uploadImg);
    },
    handleUploadSuccess(res) {
      console.log(res);
      this.uploadImg = res.data?.data?.url || "";
      this.uploadLoading = false;
      this.handleEmit();
      this.$emit("on-success");
    },
    handleUploadError() {
      this.uploadImg = "";
      this.uploadLoading = false;
      this.handleEmit();
    },
    hanldeDelete() {
      this.uploadImg = "";
      this.handleEmit();
      this.$emit("on-delete");
    },
    beforeUpload(file) {
      const isImg = file.type.indexOf("image") !== -1;
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isImg) {
        this.$message.error("请上传图片");
        return false;
      }
      if (!isLt20M) {
        this.$message.error("上传图片大小不能超过 20MB!");
        return false;
      }
      this.uploadLoading = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-image {
  .upload-tips {
    p {
      line-height: 1.5;
      font-size: 12px;
      color: #909399;
    }
  }
  .upload-button {
    position: relative;
  }
  .upload-button /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .upload-button /deep/.el-upload:hover {
    border-color: #409eff;
  }
  .upload-button-icon,
  .upload-loading {
    font-size: 28px;
    color: hsl(215, 8%, 58%);
    text-align: center;
  }
  .imgs {
    padding: 5px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .del {
      display: none;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 20px;
    }
    &:hover {
      .del {
        color: #333;
        display: block;
      }
    }
  }
}
</style>