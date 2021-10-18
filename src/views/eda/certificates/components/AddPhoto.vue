<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="1000px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @open="getCertificateInfo"
  >
    <div class="uploads" v-loading="detailLoading">
      <div class="upload-item" v-for="(item, index) in uploads" :key="index">
        <ImageUpload drag v-model="photoData[item.key]">
          <p slot="tips">{{ item.name }}</p>
        </ImageUpload>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" :loading="btnLoading" @click="handleOk"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { modifyCertificate, getCertificateInfo } from "@/api/educational";
import ImageUpload from "@/components/ImgUpload";
export default {
  name: "AddPhoto",
  components: {
    ImageUpload,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    uid: {
      type: [String, Number],
      default: "",
    },
    title: {
      type: String,
      default: "编辑资料",
    },
  },
  data() {
    return {
      uploads: [
        {
          key: "portrait",
          name: "免冠正面照",
        },
        {
          key: "photo_id_card_emblem",
          name: "身份证国徽面",
        },
        {
          key: "photo_id_card",
          name: "身份证人像面",
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
        photo_id_card_emblem: "",
        photo_residence_permit: "",
        graduation_certificate: "",
        photo_commitment: "",
        photo_health: "",
      },
      detailLoading: false,
      btnLoading: false,
    };
  },
  methods: {
    // 获取
    async getCertificateInfo() {
      const data = {
        uid: this.uid,
      };
      this.detailLoading = true;
      const res = await getCertificateInfo(data).catch(() => {
        this.detailLoading = false;
      });
      this.detailLoading = false;
      if (res.code === 0) {
        for (const k in this.photoData) {
          this.photoData[k] = res.data[k] || "";
        }
      }
    },
    // 修改
    async modifyCertificate() {
      const data = {
        uid: this.uid,
        ...this.photoData,
      };
      this.btnLoading = true;
      const res = await modifyCertificate(data).catch(() => {
        this.btnLoading = false;
      });

      if (res.code === 0) {
        // 补齐资料
        if (this.title === "补齐资料") {
          setTimeout(() => {
            this.btnLoading = false;
            this.$message.success("资料编辑成功");
            this.handleCancel();
            this.$emit("on-success");
          }, 2000);
        } else {
          this.btnLoading = false;
          this.$message.success("资料编辑成功");
          this.handleCancel();
          this.$emit("on-success");
        }
      }
    },
    handleOk() {
      this.modifyCertificate();
    },
    handleCancel() {
      for (const k in this.photoData) {
        this.photoData[k] = "";
      }
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.uploads {
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  .upload-item {
    position: relative;
    margin: 0 22px 16px 0;
    &:nth-of-type(4n) {
      margin-right: 0;
    }
  }
}
</style>