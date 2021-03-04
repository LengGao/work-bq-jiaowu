<template>
  <section class="mainwrap">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="emp_form fl">
        <el-form-item prop="staff_name" label="员工姓名">
          <el-input
            v-model="ruleForm.staff_name"
            placeholder="请输入员工姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="mobile_num" label="手机号码">
          <el-input
            v-model="ruleForm.mobile_num"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="mail" label="电子邮箱">
          <el-input
            v-model="ruleForm.mail"
            placeholder="请输入电子邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="department_id" label="所属部门">
          <el-cascader
            v-model="department_idarr"
            :options="department"
            :props="optionProps"
            clearable
            @change="checkDepart"
          ></el-cascader>
          <!-- <el-select
            v-model="ruleForm.department_id"
            filterable
            placeholder="请选择所属部门"
          >
            <el-option
              v-for="item in department"
              :key="item.department_id"
              :label="item.department_name"
              :value="item.department_id"
            >
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item prop="role_ids" label="所属角色">
          <el-select
            v-model="ruleForm.role_ids"
            multiple
            filterable
            placeholder="请选择所属角色"
          >
            <el-option
              v-for="item in roleList.list"
              :key="item.role_id"
              :label="item.role_name"
              :value="item.role_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成为班主任" prop="as_headmaster">
          <el-switch
            v-model="ruleForm.as_headmaster"
            active-value="1"
            inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item prop="account" label="登入账号">
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
            type="password"
            v-model="ruleForm.password"
            style="width:250px"
            :placeholder="
              staff_id ? '如果想修改之前的密码,请输入' : '请输入登入密码'
            "
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="cancel('ruleForm')">取消</el-button>
          <el-button @click="preserve('ruleForm')">保存</el-button>
        </el-form-item>
      </div>
      <div class="emp_upload fl">
        <el-form-item prop="name" label="员工头像">
          <div v-show="!haschoose">
            <div class="headPortrait el-icon-plus" @click="addIcon"></div>
            <div style="color:#aaa;ling-height:20px">
              <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
              <p><span> 2. 推荐尺寸200*200px或者1:1</span></p>
            </div>
          </div>
          <div v-show="haschoose" class=" imageBox ">
            <i class=" iconjia el-icon-plus" @click="addIcon"></i>
            <img
              style="width:100%;height:100%;  border-radius:3px;"
              :src="url"
              alt=""
            />
          </div>
        </el-form-item>
      </div>
    </el-form>
    <imgDialog
      v-if="pictureVisible"
      @closeImg="closeImg"
      @clearUrl="clearUrl"
    ></imgDialog>
  </section>
</template>

<script>
export default {
  name: 'addEmployee',
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      optionProps: {
        label: 'department_name',
        value: 'department_id',
        children: 'subDepartments',
        checkStrictly: true,
      },
      department_idarr: [],
      ruleForm: {
        staff_name: '',
        mobile_num: '',
        mail: '',
        role_ids: [],
        account: '',
        password: '',
        head_photo: '',
        department_id: '',
        as_headmaster: 2,
      },

      pictureVisible: false,

      passYalid: true,
      url: '',
      haschoose: false,
      staff_id: '',
      department: [],
      options: [],
      roleList: [],
      rules: {
        staff_name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur',
          },
        ],
        mobile_num: [
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
        mail: [
          { required: true, message: '请输入邮箱号', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
          // {
          //   validator: function (rule, value, callback) {
          //     if (value === '') {
          //       callback(new Error('请正确填写邮箱'))
          //     } else {
          //       if (value !== '') {
          //         var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          //         if (!reg.test(value)) {
          //           callback(new Error('请输入有效的邮箱'))
          //         }
          //       } else {
          //         callback()
          //       }
          //     }
          //   },
          //   trigger: 'blur',
          // },
        ],
        // department_id: [
        //   { required: true, message: '请选择所属部门', trigger: 'change' },
        // ],
        account: [
          { required: true, message: '请输入登入账号', trigger: 'blur' },
          {
            min: 2,
            max: 26,
            message: '长度在 2 到 26 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 25, message: '长度在 5 到 25个字符' },
          {
            pattern: /^(\w){5,25}$/,
            message: '只能输入5-25个字母、数字、下划线',
          },
        ],
      },
    }
  },
  created() {
    // if (this.$route.query.url != undefined) {
    //   this.url = JSON.parse(this.$route.query.url)
    //   this.haschoose = true
    // }
    console.log(this.passYalid)

    // this.$api.getDepartmentList(this, 'department')
    this.staff_id = this.$route.query.staff_id
    console.log(this.staff_id)
    if (this.staff_id != undefined) {
      this.passYalid = false
      this.$api.getStaffInfo(this, 'roleList')
    }
  },
  mounted() {
    this.$api.getfoldList(this, 'department')
    this.$api.getRoleList(this, 'roleList')
  },
  // activated: function() {
  //   console.log(JSON.parse(this.$route.query.url))
  //   if (this.$route.query.url != undefined) {
  //     this.url = JSON.parse(this.$route.query.url)
  //     // this.ruleForm.class_icon = JSON.parse(this.$route.query.url)
  //     this.haschoose = true
  //   }
  // },
  watch: {
    'ruleForm.password': {
      handler(newName, oldName) {
        if (this.staff_id != '' || this.staff_id != undefined) {
          if (
            this.ruleForm.password == '' ||
            this.ruleForm.password == undefined
          ) {
            this.passYalid = false
          } else {
            this.passYalid = true
          }
        } else {
          this.passYalid = true
        }
      },
    },
  },
  methods: {
    checkDepart(ab) {
      console.log(ab)
      let end = ab[ab.length - 1]
      console.log(end)
      this.ruleForm.department_id = end
    },
    addIcon() {
      this.pictureVisible = true
    },
    clearUrl() {
      // this.url = ''
      // this.haschoose = false
      this.pictureVisible = false
    },
    closeImg(radioUrl) {
      console.log(radioUrl + '我好睡')
      this.pictureVisible = false
      if (radioUrl != undefined) {
        this.haschoose = true
        this.url = radioUrl
        this.ruleForm.head_photo = radioUrl
      } else {
        this.url = ''
        this.haschoose = false
        this.ruleForm.head_photo = ''
      }
    },
    cancel() {
      this.$router.push({
        path: '/smt/staffManage',
        // query: { pathRoute: '/smt/addEmployee' },
      })
    },
    preserve(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.staff_id)
          if (this.staff_id != undefined) {
            this.$api.modifyStaff(this, this.ruleForm)
          } else {
            this.$api.addStaff(this, this.ruleForm)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
/deep/.el-form-item__label {
  padding: 0 30px 0 0;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.headPortrait {
  width: 87px;
  height: 87px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.headPortrait:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}
.imageBox {
  width: 87px;
  height: 87px;
  position: relative;
}

.iconjia {
  font-size: 40px;
  color: #fff;
  display: none;
  position: absolute;
  width: 87px;
  height: 87px;
  line-height: 87px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}
.imageBox:hover {
}
.imageBox:hover i {
  display: block;
}

/deep/.el-form-item {
  margin-bottom: 40px;
}
.el-select {
  width: 250px;
}
.el-input {
  width: 250px;
}
.demo-ruleForm {
  overflow: hidden;
}
.emp_upload {
  padding-left: 40px;
}
</style>
