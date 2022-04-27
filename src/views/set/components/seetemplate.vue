<template>
  <!-- 查看模板弹窗 -->
  <section>
    <el-dialog @open="handleOpen" title="查看模板" :visible.sync="visible" width="930px" :close-on-click-modal="false" @closed="resetForm('ruleForm')">

      <iframe ref="iframe" :src="template_url" type="application/x-google-chrome-pdf" width="890px" height="650px" border="0" />

    </el-dialog>
  </section>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    template_url: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      visible: this.value,
      currentPage: 0,
      pageCount: 0,
      src: '',
      // template_url: ``,
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
  },
  mounted() {
    this.url = this.template_url
    // console.log(pdf.createLoadingTask(this.template_url))
  },
  methods: {
    resetForm() {
      for (const k in this.formData) {
        this.formData[k] = ''
      }
      this.hanldeCancel()
    },
    hanldeCancel() {
      this.$emit('input', false)
    },
    handleOpen() {},
  },
}
</script>

<style lang="scss" scoped>
.table_bottom {
  text-align: right;
}

/deep/.el-dialog__footer {
  padding: 0 40px 40px 0;
}
/deep/.el-dialog__body {
  padding: 10px 30px 10px 20px;
}
:host ::ng-deep div#content {
  --viewer-pdf-sidenav-width: 100px;
}
</style>