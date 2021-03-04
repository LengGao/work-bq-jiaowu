<template>
  <section class="yearTestSeting">
    <!-- <el-card class="form-container" shadow="never"> -->
    <el-form
      :model="option"
      :rules="rules"
      ref="optionFrom"
      label-width="150px"
    >
      <el-form-item label="单选题: ">
        <el-col class="line" :span="2">每题</el-col>
        <el-col :span="6">
          <el-input
            v-model="option.single.topics_score"
            size="small"
            type="number"
          ></el-input>
        </el-col>
        <el-col class="line" :span="1">分</el-col>
      </el-form-item>
      <el-form-item label="多选题: ">
        <el-col class="line" :span="2">每题</el-col>
        <el-col :span="6">
          <el-input
            v-model="option.multiple.topics_score"
            size="small"
            type="number"
          ></el-input>
        </el-col>
        <el-col class="line" :span="1">分</el-col>
      </el-form-item>
      <el-form-item label="判断题: ">
        <el-col class="line" :span="2">每题</el-col>
        <el-col :span="6">
          <el-input
            v-model="option.judge.topics_score"
            size="small"
            type="number"
          ></el-input>
        </el-col>
        <el-col class="line" :span="1">分</el-col>
      </el-form-item>
      <el-form-item label="填空题: ">
        <el-col class="line" :span="2">每题</el-col>
        <el-col :span="6">
          <el-input
            v-model="option.fill_vacancy.topics_score"
            size="small"
            type="number"
          ></el-input>
        </el-col>
        <el-col class="line" :span="1">分</el-col>
      </el-form-item>
      <el-form-item label="简答题: ">
        <el-col class="line" :span="2">每题</el-col>
        <el-col :span="6">
          <el-input
            v-model="option.brief.topics_score"
            size="small"
            type="number"
          ></el-input>
        </el-col>
        <el-col class="line" :span="1">分</el-col>
      </el-form-item>
      <el-form-item label="案例题: ">
        <el-col class="line" :span="2">每题</el-col>
        <el-col :span="6">
          <el-input
            v-model="option.scene.topics_score"
            size="small"
            type="number"
          ></el-input>
        </el-col>
        <el-col class="line" :span="1">分</el-col>
      </el-form-item>
      <el-form-item label="多选题: ">
        <el-col :span="13">
          <el-radio-group v-model="option.multiple_choice_scenario.state">
            <el-radio :label="1">少选不得分</el-radio>
            <el-radio :label="2">少选每个选项扣</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="6" class="line">
          <el-input
            v-model="option.multiple_choice_scenario.deduct_points"
            size="mini"
            type="number"
          ></el-input>
        </el-col>
        <el-col class="line" :span="2">分</el-col>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!isEdit" @click="goback()">返回</el-button>
        <el-button type="primary" @click="onSubmit('optionFrom')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
    <!-- </el-card> -->
  </section>
</template>
<script>
const defaultOption = {
  single: null,
  multiple: null,
  judge: null,
  fill_vacancy: null,
  scene: null,
  multiple_choice_scenario: null,
}
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
      option: Object.assign({}, defaultOption),
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
      id: '',
    }
  },
  created() {
    this.$api.getExamExtendsInfo(this, 1)
    let exam_type = this.$route.query.exam_type
    exam_type == 1
      ? (this.$route.meta.title = '历年真题配置')
      : (this.$route.meta.title = '自主出题设置')
  },
  methods: {
    goback(res, file) {
      this.$router.go(-1)
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.$api.updateExamExtended(this, 'option')
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.option = Object.assign({}, {})
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/ .el-input__inner {
  width: 100px;
}
.yearTestSeting {
  width: 700px;
  margin-top: 40px;
}
</style>
