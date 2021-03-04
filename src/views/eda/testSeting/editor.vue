<template>
  <!-- <el-card class="form-container" shadow="never"> -->
  <section class="home">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
      <el-form-item label="课程分类：">
        <el-select
          v-model="keytype"
          placeholder="请选择课程分类"
          size="medium"
          filterable
        >
          <el-option
            :label="item.category_name"
            :value="item.category_id"
            v-for="(item, index) in selectList.list"
            :key="index"
            @click.native="dealThing()"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程名称：" prop="problem_course_id">
        <el-select
          v-model="brand.problem_course_id"
          placeholder="请选择课程名称"
          size="medium"
          filterable
        >
          <el-option
            :label="item.course_name"
            :value="item.problem_course_id"
            v-for="(item, index) in courseList.list"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总题数：" prop="problem_num">
        <el-input v-model="brand.problem_num"></el-input>
      </el-form-item>
      <el-form-item label="总分数：" prop="problem_score">
        <el-input v-model="brand.problem_score"></el-input>
      </el-form-item>
      <el-form-item label="及格分数：" prop="pass_score">
        <el-input v-model="brand.pass_score"></el-input>
      </el-form-item>
      <el-form-item label="考试时长：" prop="duration">
        <el-input
          v-model="brand.duration"
          placeholder="单位是分钟！！！"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goback">取消</el-button>
        <el-button @click="onSubmit('brandFrom')" type="warning"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <!-- </el-card> -->
  </section>
</template>
<script>
const defaultBrand = {
  problem_num: '',
  problem_score: '',
  pass_score: '',
  duration: '',
  problem_course_id: '',
}
export default {
  name: 'editor',
  data() {
    return {
      selectList: [
        {
          name: '职称类',
          val: 1,
        },
      ],
      courseList: [],
      keytype: '',
      course: '',
      brand: Object.assign({}, defaultBrand),
      rules: {
        problem_course_id: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
        ],
        problem_num: [
          { required: true, message: '请输入总题数', trigger: 'blur' },
        ],
        sort: [{ type: 'number', message: '排序必须为数字' }],
        problem_score: [
          { required: true, message: '请输入总分数', trigger: 'blur' },
        ],
        pass_score: [
          { required: true, message: '请输入及格分数', trigger: 'blur' },
        ],
        duration: [
          { required: true, message: '请输入考试时长', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.$api.getCategoryList(this, 'selectList')
  },
  mounted() {
    if (this.$route.query.id) {
      this.$api.getExamConfigInfo(this)
    } else {
    }
  },
  methods: {
    dealThing() {
      console.log('点击了事件')
      this.$api.getProblemCourseLists(this, 'courseList')
    },
    goback() {
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
            if (this.$route.query.id) {
              this.$api.updateExamConfig(this, 'brand')
            } else {
              this.$api.insertExamConfig(this, 'brand')
            }
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
      this.brand = Object.assign({}, defaultBrand)
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/ .el-input--medium > .el-input__inner {
  width: 240px !important;
}
/deep/ .el-input__inner {
  width: 240px;
}
.home {
  margin-top: 40px;
}
</style>
