<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
      <el-form-item label="分类名称：">
        <el-input v-model="brand.category_name"></el-input>
      </el-form-item>
      <el-form-item label="分类描述：">
        <el-input v-model="brand.describe"></el-input>
      </el-form-item>
      <el-form-item label="分类图标：">
        <single-upload
          ref="mychild"
          :icon="icon"
          @imgSuccess="imgSuccess"
        ></single-upload>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input v-model="brand.sort" type="number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!isEdit" @click="goback('brandFrom')">返回</el-button>
        <el-button type="primary" @click="onSubmit('brandFrom')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
const defaultBrand = {}
export default {
  name: 'BrandDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      brand: Object.assign({}, {}),
      icon: '',
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            min: 2,
            max: 140,
            message: '长度在 2 到 140 个字符',
            trigger: 'blur',
          },
        ],
        logo: [{ required: true, message: '请输入分类logo', trigger: 'blur' }],
        sort: [{ required: true, message: '排序必须为数字' }],
      },
    }
  },
  created() {
    console.log(this.$route.query.id, JSON.parse(this.$route.query.url))
    this.icon = this.$route.query.url
    this.url = this.$route.query.url
    this.$api.getCategoryInfo(this, this.$route.query.id)
  },
  methods: {
    imgSuccess(res, file) {
      let url
      if (res != '') {
        console.log(res)
        url = res.data.data.url
      } else {
        console.log(res, '1231')
        url = this.icon
      }
      this.$api.updateCategory(this, url)
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.$refs.mychild.submitUpload('')
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000,
          })
          return false
        }
      })
    },
    goback(formName) {
      this.$router.go(-1)
    },
  },
}
</script>
<style></style>
