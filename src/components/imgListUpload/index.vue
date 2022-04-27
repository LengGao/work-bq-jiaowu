<template>
  <div>
    <el-upload
      class="list-upload"
      :class="size"
      :headers="headers"
      :action="uploadImageUrl"
      :on-remove="handleRemoveImg"
      :before-remove="beforeRemoveImg"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :on-preview="handlePictureCardPreview"
      multiple
      drag
      name="image"
      accept="image/*"
      list-type="picture-card"
      :file-list="value"
    >
      <i class="el-icon-plus" style="font-size: 14px"></i>
    </el-upload>
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import { uploadImageUrl } from "@/api/educational";
export default {
  name: "ImgListUpload",
  props: {
    value: {
      type: Array,
      default: () => [], // 示例： [{name:xxx,url:xxx}]
    },
    size: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
    };
  },
  methods: {
    handleUploadError(response, file, fileList) {
      this.$message.error("上传失败");
    },
    handleUploadSuccess(response, file, fileList) {
      this.$emit("input", fileList);
    },
    handleRemoveImg(file, fileList) {
      this.$emit("input", fileList);
    },
    handlePictureCardPreview(file) {
      this.$refs.view.show(file.url);
    },
    beforeRemoveImg(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style lang="less" scoped>
.list-upload {
  /deep/.el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
  }
  /deep/.el-upload-dragger {
    width: auto;
    height: auto;
  }
  /deep/.el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 80px;
    border: none;
  }
  &.mini {
    /deep/.el-upload-list--picture-card {
      .el-upload-list__item {
        width: 40px;
        height: 40px;
        .el-upload-list__item-actions {
          font-size: 12px;
          span.el-upload-list__item-delete {
            margin-left: 4px;
          }
        }
      }
    }

    /deep/.el-upload-dragger {
      width: auto;
      height: auto;
    }
    /deep/.el-upload--picture-card {
      width: 40px;
      height: 40px;
      line-height: 40px;
      border: none;
    }
  }
}
</style>