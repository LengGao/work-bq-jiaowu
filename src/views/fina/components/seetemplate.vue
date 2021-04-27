<template>
  <!-- 查看模板弹窗 -->
  <section>
    <el-dialog title="查看合同" :visible.sync="visible" width="900px" @open="handleOpen" :close-on-click-modal="false" @closed="resetForm('ruleForm')">
      <div style="width:800px; height:650px; overflow:hidden; margin-top: 0; ">
        <iframe :src="sign_url" ref="iframe" type="application/x-google-chrome-pdf" width="1200px" height="800px" border="0" style="margin-top:-150px;margin-left:-150px" />

      </div>
    </el-dialog>
  </section>
</template>

<script>
import Header from '../../../components/Header.vue'
export default {
  components: { Header },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    sign_url: {
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
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
  },
  mounted() {
    this.url = this.sign_url
    // console.log(pdf.createLoadingTask(this.template_url))
    console.log(this.$refs.iframe)
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
.ds-signatures-sider__container {
  position: relative;
}
.sin {
  position: absolute;
  width: 100%;
  height: 100%;
}
:host ::ng-deep #sidenav-container {
  width: 100px;
}
</style>