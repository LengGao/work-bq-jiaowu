<template>
  <!-- 证件资料 -->
  <div class="certificates">
    <div class="certificates-header">
      <el-button>查看大图</el-button>
      <el-button>打包下载</el-button>
    </div>
    <div class="certificates-uploads">
      <div class="upload-item" v-for="(item, index) in uploads" :key="index">
        <el-upload
          name="image"
          :headers="headers"
          :action="uploadImageUrl"
          :show-file-list="false"
          :on-success="(res, file) => handleAvatarSuccess(res, file, item.key)"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="photoData[item.key]"
            :src="photoData[item.key]"
            class="img"
          />
          <i v-else class="el-icon-plus upload-item-icon"></i>
        </el-upload>
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImageUrl } from "@/api/educational";
export default {
  name: "certificates",
  data() {
    return {
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      uploads: [
        {
          key: "portrait",
          name: "免冠正面照",
        },
        {
          key: "photo_id_card",
          name: "身份证扫描件",
        },
        {
          key: "photo_residence_permit",
          name: "社保卡/居住证",
        },
        {
          key: "graduation_certificate",
          name: "毕业证扫描件",
        },
        {
          key: "photo_commitment",
          name: "工作年限承诺书",
        },
        {
          key: "photo_health",
          name: "个人健康承诺书",
        },
      ],
      photoData: {
        portrait: "",
        photo_id_card: "",
        photo_residence_permit: "",
        graduation_certificate: "",
        photo_commitment: "",
        photo_health: "",
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file, key) {
      this.photoData[key] = res.data?.data?.url || "";
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 20;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      return isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
.certificates {
  .certificates-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .certificates-uploads {
    display: flex;
    text-align: center;
    justify-content: space-around;
    flex-wrap: wrap;
    .upload-item {
      position: relative;
      margin: 0 16px 16px 0;
      width: calc(100% / 4);
    }
    .upload-item /deep/.el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .upload-item /deep/.el-upload:hover {
      border-color: #409eff;
    }
    .upload-item-icon {
      font-size: 28px;
      color: hsl(215, 8%, 58%);
      width: 300px;
      height: 200px;
      line-height: 200px;
      text-align: center;
    }
    .img {
      padding: 5px;
      width: 300px;
      height: 200px;
      display: block;
    }
  }
}
</style>