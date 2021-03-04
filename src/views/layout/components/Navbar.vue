<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger
      class="hamburger-container"
      :toggleClick="toggleSideBar"
      :isActive="sidebar.opened"
    ></hamburger>
    <breadcrumb></breadcrumb>
    <div class="function-container">
      <div class="top-function-wrapper">
        <!-- <span style="color: #199FFF;" @click="huanfu('theme1')">换肤</span> -->
      </div>
      <!-- 刷新按钮 -->
      <el-row>
    </el-row>
      <div class="top-function-wrapper" @click="clearStorage">
        <svg-icon icon-class="el-icon-refresh"></svg-icon>

      </div>
      <div class="top-function-wrapper" @click="clearStorage">
        <svg-icon icon-class="clearStorage"></svg-icon>
        <span>清除缓存</span>
      </div>
    </div>
    <el-form
      :model="form"
      :rules="ru"
      ref="rulef"
      label-width="95px"
      label-position="left"
    >
      <el-dialog
        title="修改个人密码"
        :visible.sync="dialog"
        :append-to-body="true"
        width="600px"
        @close="$refs['rulef'].resetFields()"
      >
        <el-form-item label="原密码：" prop="origin">
          <el-input v-model="form.origin" type="passWord"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="password">
          <el-input v-model="form.password" type="passWord"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirm">
          <el-input v-model="form.confirm" type="passWord"></el-input>
        </el-form-item>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('rulef')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-form>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar == '' ? touxiang : avatar" />
        <i class="el-icon-caret-bottom" style="margin-top:5px"></i>
        <span>总管理员</span>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item>
          <span @click="modifyPassword"> 修改密码</span>
        </el-dropdown-item>

        <el-dropdown-item divided>
          <span @click="logout" style="display: block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import touxiang from '@/assets/images/touxiang.png'
const $navBar = '#ffffff'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      touxiang,
      dialog: false,
      form: {
        origin: '',
        password: '',
        confirm: '',
      },
      ru: {
        origin: [
          { required: true, message: '请填写原密码', trigger: 'blur' },
          { min: 6, message: '密码最少6位数', trigger: 'blur' },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass },
        ],
        confirm: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
      },
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
  },
  methods: {
    // 刷新按钮
     handclick(){
     console.log('点了我')
     window.location.reload()
    },
    modifyPassword() {
      console.log(111)
      this.dialog = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.resetPassword(this, this.form)
          // if (this.$cookies.get('organization_id')) {
          //   this.$api.resetOrgPassword(this)
          // } else {
          //   this.$api.resetAdminPassword(this)
          // }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    huanfu(theme) {
      window.document.documentElement.setAttribute('data-theme', theme)
    },
    clearStorage() {
      this.$api.clearCache(this)
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 4px 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .function-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 155px;
    display: flex;
    top: 0;
    span {
      position: relative;
      right: -0px;
      top: -15px;
      font-size: 16px;
    }
    .top-function-wrapper {
      cursor: pointer;
      margin: auto;
      margin-right: 80px;
      display: flex;
      align-items: center;
      span {
        position: relative;
        top: 0px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        line-height: 14px;
      }
      .svg-icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
       
      }
    }
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 55px;
    display: flex;
    top: 0;
    span {
      position: relative;
      right: -0px;

      font-size: 16px;
    }
    .avatar-wrapper {
      cursor: pointer;

      position: relative;
      display: flex;
      align-items: center;
      .user-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-right: 10px;
      }
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        line-height: 14px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 15px;
        font-size: 12px;
      }
    }
  }
}
</style>
