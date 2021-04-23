<template>
  <el-dialog
    title="批量录入成绩"
    :visible.sync="visible"
    width="400px"
    class="add-class"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <p class="el-upload__title">
      下载模版， 并按照规定格式填写数据。
    </p>
    <Title text="下载模板" />
    <div class="dowload">
      <el-button size="small" type="primary" @click="handleDownload">
        <i class="el-icon-download"></i> 下载模板</el-button
      >
    </div>
    <Title text="上传文件" />
    <div class="file-upload">
      <el-upload
        ref="upload"
        :data="uploadData"
        :headers="headers"
        :action="uploadUrl"
        :on-error="handleUploadError"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUpload"
        :auto-upload="false"
      >
        <el-button size="small" type="primary">
          <i class="el-icon-upload2"></i> 选择文件</el-button
        >
        <div slot="tip" class="el-upload__tip">
          上传文件格式仅支持xlsx， 且文件大小不得超过5M
        </div>
      </el-upload>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button type="primary" @click="submitForm('formData')"
        >提 交</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { importGrade, getImportTemplate } from '@/api/exa'
export default {
  name: 'batchEntry',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    pid: {
      type: [Number, String],
      default: '',
    },
  },
  data() {
    return {
      uploadData: {},
      uploadUrl: importGrade,
      headers: {
        token: this.$store.state.user.token,
      },
      visible: this.value,
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
  },
  methods: {
    submitForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      const uploadFiles = this.$refs?.upload?.uploadFiles || []
      if (!uploadFiles.length) {
        this.$message.warning('请上传文件！')
        return
      }
      if (uploadFiles.length > 1) {
        this.$message.error('只能上传一份文件')
        return
      }
      //   this.uploadData = {
      //     ...this.formData,
      //     category_id: Array.isArray(this.formData.category_id)
      //       ? [...this.formData.category_id].pop()
      //       : this.formData.category_id,
      //     from_organization_id: Array.isArray(
      //       this.formData.from_organization_id
      //     )
      //       ? [...this.formData.from_organization_id].pop()
      //       : this.formData.from_organization_id,
      //   };
      this.$nextTick(() => {
        this.$refs.upload.submit()
      })
      //     }
      //   });
    },
    handleUploadError() {
      this.$message.error('上传失败')
      this.$refs.upload.clearFiles()
      this.uploadLoading = false
    },
    handleUploadSuccess(res) {
      if (res.code === 0) {
        this.$message.success(res.message)
        this.hanldeCancel()
        this.$emit('on-success')
      } else {
        this.$message.error(res.message)
      }
      this.$refs.upload.clearFiles()
      this.uploadLoading = false
    },
    beforeUpload(file) {
      const fileType = file.name.substr(-4)
      const isXls = fileType === 'xlsx'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isXls) {
        this.$message.error('请上.xlsx格式文件')
        return false
      }
      if (!isLt5M) {
        this.$message.error('文件大小不能超过 5MB!')
        return false
      }
      this.uploadLoading = true
    },
    // 下载模板
    handleDownload() {
      //   const a = this.$refs.a
      //   a.download = '订单模板.xlsx'
      //   a.href = this.downloadUrl
      //   a.click()
      this.getImportTemplate()
    },
    async getImportTemplate() {
      const data = { pid: this.pid }
      const res = await getImportTemplate(data)
      if (res.code === 0) {
        this.$message.success(res.message)
      }
    },
    handleOpen() {},
    resetForm(formName) {
      //   this.$refs[formName].resetFields()
      for (const k in this.formData) {
        this.formData[k] = ''
      }
      this.hanldeCancel()
    },
    hanldeCancel() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-upload__title {
  color: #909399;
  font-size: 12px;
  padding-bottom: 20px;
}
.dowload {
  margin-bottom: 20px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
