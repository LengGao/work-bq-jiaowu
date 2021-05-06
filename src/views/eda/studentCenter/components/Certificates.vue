<template>
  <!-- 证件资料 -->
  <div class="certificates" v-loading="loading">
    <div class="certificates-header">
      <el-button @click="handlePreview">查看大图</el-button>
      <el-button :loading="downloadLoading" @click="zipDownload"
        >打包下载</el-button
      >
    </div>
    <div class="certificates-uploads">
      <div class="upload-item" v-for="(item, index) in uploads" :key="index">
        <ImageUpload
          width="300"
          height="180"
          v-model="photoData[item.key]"
          @on-delete="modifyCertificate"
          @on-success="modifyCertificate"
        >
          <p slot="tips">{{ item.name }}</p>
        </ImageUpload>
      </div>
    </div>
    <a ref="a" download="证件资料"></a>
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import {
  zipDownload,
  modifyCertificate,
  getCertificateInfo,
} from "@/api/educational";
import ImageUpload from "@/components/ImgUpload";
export default {
  name: "certificates",
  components: {
    ImageUpload,
  },
  components: {
    ImageUpload,
  },
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      loading: false,
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
      downloadLoading: false,
    };
  },
  created() {
    this.getCertificateInfo();
  },
  methods: {
    handlePreview() {
      const srcs = Object.values(this.photoData).filter((src) => !!src);
      if (!srcs.length) {
        this.$message.warning("暂无图片");
        return;
      }
      this.$refs.view.show(srcs);
    },
    // 下载
    download(url) {
      const a = this.$refs.a;
      a.href = url;
      a.click();
    },
    async zipDownload() {
      const data = {
        uid: this.uid,
      };
      this.downloadLoading = true;
      const res = await zipDownload(data).catch(() => {
        this.downloadLoading = false;
      });
      if (res.code === 0) {
        this.download(res.data.url);
        setTimeout(() => {
          this.downloadLoading = false;
        }, 1000);
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
        this.getCertificateInfo();
      }
    },
    // 获取
    async getCertificateInfo() {
      this.loading = true;
      const data = {
        uid: this.uid,
      };
      const res = await getCertificateInfo(data).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (res.code === 0) {
        for (const k in this.photoData) {
          this.photoData[k] = res.data[k];
        }
      }
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
      margin: 0 40px 26px 0;
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
    .upload-item-icon,
    .upload-loading {
      font-size: 28px;
      color: hsl(215, 8%, 58%);
      width: 300px;
      height: 200px;
      line-height: 200px;
      text-align: center;
    }
    .imgs {
      padding: 5px;
      width: 300px;
      height: 200px;
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
}
</style>
