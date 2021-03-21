<template>
  <el-dialog
    title="编辑资料"
    :visible.sync="visible"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @open="getCertificateInfo"
  >
    <div class="uploads">
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  uploadImageUrl,
  modifyCertificate,
  getCertificateInfo,
} from "@/api/educational";
export default {
  name: "AddPhoto",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    uid: {
      type: [String, Number],
      default: "",
    },
  },
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
    // 获取
    async getCertificateInfo() {
      const data = {
        uid: this.uid,
      };
      const res = await getCertificateInfo(data);
      if (res.code === 0) {
        for (const k in this.photoData) {
          this.photoData[k] = res.data[k];
        }
      }
    },
    // 修改
    async modifyCertificate() {
      const data = {
        uid: this.uid,
        ...this.photoData,
      };
      const res = await modifyCertificate(data);
      if (res.code === 0) {
        this.$message.success("资料修改成功");
        this.handleCancel();
        this.$emit("on-success");
      }
    },
    handleAvatarSuccess(res, file, key) {
      this.photoData[key] = res.data?.data?.url || "";
    },
    beforeAvatarUpload(file) {
      const isImg = file.type.indexOf("image") !== -1;
      const isLt20M = file.size / 1024 / 1024 < 20;

      if (!isImg) {
        this.$message.error("请上传图片");
      }
      if (!isLt20M) {
        this.$message.error("上传图片大小不能超过 20MB!");
      }
      return isLt20M && isImg;
    },
    handleOk() {
      // this.$emit("on-ok", ids);
      this.modifyCertificate();
    },
    handleCancel() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.uploads {
  display: flex;
  text-align: center;
  justify-content: space-around;
  flex-wrap: wrap;
  .upload-item {
    position: relative;
    margin: 0 16px 16px 0;
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
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .img {
    padding: 5px;
    width: 130px;
    height: 130px;
    display: block;
  }
}
</style>