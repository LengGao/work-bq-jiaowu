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
        <el-upload
          name="image"
          :headers="headers"
          :action="uploadImageUrl"
          :show-file-list="false"
          :on-error="() => handleUploadError(index)"
          :on-success="
            (res, file) => handleUploadSuccess(res, file, item.key, index)
          "
          :before-upload="(file) => beforeUpload(file, index)"
        >
          <div v-if="photoData[item.key]" class="imgs">
            <img :src="photoData[item.key]" />
            <i
              class="del el-icon-close"
              @click.stop="hanldeDelete(item.key)"
            ></i>
          </div>
          <i
            v-if="!item.loading && !photoData[item.key]"
            class="el-icon-plus upload-item-icon"
          ></i>
          <i class="el-icon-loading upload-loading" v-if="item.loading"></i>
        </el-upload>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <a ref="a"></a>
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import {
  zipDownload,
  uploadImageUrl,
  modifyCertificate,
  getCertificateInfo,
} from '@/api/educational'
export default {
  name: 'certificates',
  props: {
    uid: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      uploadImageUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      loading: false,
      uploads: [
        {
          loading: false,
          key: 'portrait',
          name: '免冠正面照',
        },
        {
          loading: false,
          key: 'photo_id_card',
          name: '身份证扫描件',
        },
        {
          loading: false,
          key: 'photo_residence_permit',
          name: '社保卡/居住证',
        },
        {
          loading: false,
          key: 'graduation_certificate',
          name: '毕业证扫描件',
        },
        {
          loading: false,
          key: 'photo_commitment',
          name: '工作年限承诺书',
        },
        {
          loading: false,
          key: 'photo_health',
          name: '个人健康承诺书',
        },
      ],
      photoData: {
        portrait: '',
        photo_id_card: '',
        photo_residence_permit: '',
        graduation_certificate: '',
        photo_commitment: '',
        photo_health: '',
      },
      downloadLoading: false,
    }
  },
  created() {
    this.getCertificateInfo()
  },
  methods: {
    handlePreview() {
      const srcs = Object.values(this.photoData).filter((src) => !!src)
      if (!srcs.length) {
        this.$message.warning('暂无图片')
        return
      }
      this.$refs.view.show(srcs)
    },
    // 下载
    download(url) {
      const a = this.$refs.a
      a.href = url
      a.click()
    },
    async zipDownload() {
      const data = {
        uid: this.uid,
      }
      this.downloadLoading = true
      const res = await zipDownload(data).catch(() => {
        this.downloadLoading = false
      })
      if (res.code === 0) {
        this.download(res.data.url)
        setTimeout(() => {
          this.downloadLoading = false
        }, 1000)
      }
    },
    // 修改
    async modifyCertificate() {
      const data = {
        uid: this.uid,
        ...this.photoData,
      }
      const res = await modifyCertificate(data)
      if (res.code === 0) {
        this.$message.success('资料修改成功')
        this.getCertificateInfo()
      }
    },
    // 获取
    async getCertificateInfo() {
      this.loading = true
      const data = {
        uid: this.uid,
      }
      const res = await getCertificateInfo(data).catch(() => {
        this.loading = false
      })
      this.loading = false
      if (res.code === 0) {
        for (const k in this.photoData) {
          this.photoData[k] = res.data[k]
        }
      }
    },

    handleUploadSuccess(res, file, key, index) {
      this.uploads[index].loading = false
      this.photoData[key] = res.data?.data?.url || ''
      this.modifyCertificate()
    },
    handleUploadError(index) {
      this.uploads[index].loading = false
    },
    hanldeDelete(key) {
      this.photoData[key] = ''
      this.modifyCertificate()
    },
    beforeUpload(file, index) {
      const isImg = file.type.indexOf('image') !== -1
      const isLt20M = file.size / 1024 / 1024 < 20

      if (!isImg) {
        this.$message.error('请上传图片')
        return false
      }
      if (!isLt20M) {
        this.$message.error('上传图片大小不能超过 20MB!')
        return false
      }
      this.uploads[index].loading = true
    },
  },
}
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
