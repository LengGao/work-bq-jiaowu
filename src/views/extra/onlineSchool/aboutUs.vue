<template>
  <section class="mainwrap">
    <el-form :model="ruleForm" label-width="80px">
      <el-form-item>
        标题
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item>
        正文
        <kindeditor
          @kindeditorChange="changeParentTitle"
          :content="ruleForm.text"
          height="200px"
          id="caseAnalyse"
        />
      </el-form-item>
      <el-form-item>
        <el-button>取消</el-button>
        <el-button type="primary" @click="saveLink">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'aboutUs',
  data() {
    return {
      ruleForm: {
        title: '',
        text: '',
      },
    }
  },
  mounted() {
    this.$api.getConfigDetail(this)
  },
  methods: {
    changeParentTitle(txt) {
      console.log(txt)
      this.ruleForm.text = txt
    },
    saveLink() {
      console.log(this.ruleForm)
      this.$api.updateConfig(this)
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
</style>
