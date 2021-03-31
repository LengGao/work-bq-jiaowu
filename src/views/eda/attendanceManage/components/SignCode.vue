<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="false"
    width="700px"
    @open="handleOpen"
    custom-class="preview-dialog"
    @closed="resetUrl"
  >
    <div v-loading="listLoading"></div>
    <img width="100%" :src="img_url" alt="" />
  </el-dialog>
</template>

<script>
import { createQrcode } from '@/api/eda'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    arrange_id: {
      type: [Number, String],
      default: 0,
    },
    class_hour_id: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      listLoading: false,
      img_url: '',
      visible: this.value,
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
  },
  methods: {
    //生成签到二维码
    async createQrcode() {
      const data = {
        arrange_id: this.arrange_id,
        class_hour_id: this.class_hour_id,
      }
      this.listLoading = true
      const res = await createQrcode(data)
      this.listLoading = false
      if (res.code === 0) {
        console.log(res.data.img_url)
        this.img_url = res.data.img_url
      }
    },
    handleOpen() {
      this.createQrcode()
    },
    resetUrl() {
      this.img_url = ''
      this.hanldeCancel()
    },
    hanldeCancel() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog .el-dialog__header {
  background-color: #fff;
}
/deep/.preview-dialog {
  .el-dialog__body {
    text-align: center;
  }
}
</style>
