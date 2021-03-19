<template>
  <section class="mainwrap">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="institution_name" label="机构名称">
        <el-input v-model="ruleForm.institution_name"></el-input>
      </el-form-item>
      <el-form-item prop="host_man" label="负责人姓名">
        <el-input
          v-model="ruleForm.host_man"
          placeholder="请输入负责人的姓名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="telephone" label="联系方式">
        <el-input
          v-model="ruleForm.telephone"
          placeholder="请输入联系方式"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item prop="account" label="登入账号">
        <el-input
          v-model="ruleForm.account"
          style="width:250px"
          placeholder="请输入登入账号"
        ></el-input>
      </el-form-item>
      <el-form-item
        :prop="passYalid == true ? 'password' : ''"
        label="登入密码"
      >
        <el-input
          v-model="password"
          type="password"
          style="width:250px"
          placeholder="请输入登入密码"
        ></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="preserve('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'editOrgan',
  data() {
    return {
      institution_id: 0,
      passYalid: false,
      password: '',
      ruleForm: {
        institution_name: '',
        host_man: '',
        telephone: '',
        account: '',
      },
      rules: {
        institution_name: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          {
            min: 2,
            max: 80,
            message: '长度在 1 到 80 个字符',
            trigger: 'blur',
          },
        ],
        host_man: [
          { required: true, message: '请输入负责人的姓名', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur',
          },
        ],
        telephone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error('请输入正确的手机号'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        // account: [
        //   { required: true, message: '请输入用户名', trigger: 'blur' },
        //   { min: 2, max: 36, message: '长度在 2 到 36 个字符' },
        // { pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文' },
        // {
        //   pattern: /^[a-zA-Z]w{1,4}$/,
        //   message: '以字母开头，长度在2-36之间， 只能包含字符、数字和下划线',
        // },
        // ],
        // password: [
        //   { required: true, message: '请输入密码', trigger: 'blur' },
        //   { min: 5, max: 25, message: '长度在 5 到 25个字符' },
        //   {
        //     pattern: /^(\w){5,25}$/,
        //     message: '只能输入5-25个字母、数字、下划线',
        //   },
        // ],
      },
    }
  },
  created() {
    this.list = JSON.parse(localStorage.getItem('schoolData'))
    console.log(this.list, 489666)
  },
  mounted() {
    this.institution_id = this.$route.query.institution_id
    console.log(this.institution_id)
    this.$route.meta.title = '添加机构'
    if (this.institution_id != undefined) {
      this.$route.meta.title = '编辑机构'
      this.$api.organizationDetail(this, this.institution_id)
    }
  },
  // watch: {
  //   password: {
  //     handler(newName, oldName) {
  //       let passwordLength = this.password.length
  //       console.log(this.password.length)
  //       if (passwordLength == 0) {
  //         this.passYalid = false
  //       } else {
  //         this.passYalid = true
  //       }
  //     },
  //     immediate: true,
  //   },
  // },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    preserve(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$confirm('是否提交数据', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning',
          // }).then(() => {
          if (this.institution_id != undefined) {
            this.$api.modifyOrganization(this, this.ruleForm)
          } else {
            this.$api.addorGanization(this, this.ruleForm)
          }
          // })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000,
          })
          return false
        }
      })
      // this.$router.push({
      //   path: '/eda/recommender',
      // })
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
/deep/.el-form-item {
  margin-bottom: 30px;
}
.el-input {
  width: 280px;
}
</style>
