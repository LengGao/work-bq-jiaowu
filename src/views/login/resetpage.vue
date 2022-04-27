<template>
  <div class="wrapper-login">
    <div class="forgetimg">
      <img :src="logologin" alt="" />
    </div>
    <el-card class="login-form-layout">
      <div class="wrapper-img">
        <!-- <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon> -->
        <!-- <img :src="logologin" alt=""> -->
        <p class="forgetPassword">设置新密码</p>
      </div>
      <el-form
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <!-- <h2 class="login-title color-main">beiqu--jiaoyu</h2> -->
        <el-form-item prop="mail">
          <el-input
            type="text"
            v-model="loginForm.mail"
            autoComplete="on"
            placeholder="请输入新密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="code" style="margin-bottom:20px;text-align: center">
          <div style="display:flex;align-items:center">
            <el-input
              name="password"
              v-model="loginForm.code"
              @keyup.enter.native="handleLogin"
              autoComplete="on"
              placeholder="请再次确认新密码"
              type="text"
              style="width:100%"
            >
            </el-input>
          </div>
        </el-form-item>
        <el-form-item
          style="margin-bottom:20px;text-align: center;margin-top:40px;"
        >
          <el-button
            style="width: 45%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
            @keypress.native.enter="handleLogin"
            to="/resetpage"
            >确定</el-button
          >
        </el-form-item>
        <el-form-item style="margin-bottom:48px;text-align: center">
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <img :src="login_center_bg" class="login-center-layout"> -->
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support'
import login_center_bg from '@/assets/images/login-img.jpg'
import logologin from '@/assets/images/logo-login.jpg'
const Base64 = require('js-base64').Base64
export default {
  name: 'resetpage',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    }
    let validMail = (rule, value, callback) => {
      if (value == '' || value == undefined) {
        callback(new Error('请填写密码'))
      } else {
        let reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
        if (!reg.test(value)) {
          callback(new Error('密码格式错误'))
        } else {
          callback()
        }
      }
    }
    return {
      checked: false,
      loginForm: {
        mail: '',
        code: '',
      },
      loginRules: {
        mail: [{ validator: validMail, trigger: 'blur', required: true }],
        code: [{ trigger: 'blur', required: true, message: '请输入确定密码' }],
      },
      loading: false,
      pwdType: 'password',
      login_center_bg,
      logologin,
      dialogVisible: false,
      supportDialogVisible: false,
      verifyCode: '',
    }
  },
  created() {
    this.$api.verifyCode(this)
  },
  methods: {
    change() {
      this.$api.verifyCode(this)
    },
    remember(data, row) {
      console.log(data, row)
      if (data) {
        this.setCookie('account', this.loginForm.username, 30)
        // base64加密密码
        let password = Base64.encode(this.loginForm.password)
        this.setCookie('password', password, 30)
      } else {
        this.setCookie('account', '')
        this.setCookie('password', '')
      }
      this.setCookie('remember', data)
    },
    setCookie: function(cName, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie =
        cName +
        '=' +
        decodeURIComponent(value) +
        (expiredays == null ? '' : ';expires=' + exdate.toGMTString())
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      let that = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          that.$api.sendEmail(that)
        } else {
          console.log('参数验证不合法！')
          return false
        }
      })
    },
    handleTry() {
      this.dialogVisible = true
    },
    dialogConfirm() {
      this.dialogVisible = false
      setSupport(true)
    },
    dialogCancel() {
      this.dialogVisible = false
      setSupport(false)
    },
  },
}
</script>
<style lang="scss" scoped>
.wrapper-login {
  height: 100%;
  width: 100%;
  background: url('../../assets/images/login-img.jpg') no-repeat;
  background-size: cover;
}
.forgetPassword {
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  color: #199fff;
}
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  margin: 140px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
}
.login-title {
  text-align: center;
}
.login-center-layout {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
img {
  width: 261px;
  height: 75px;
  max-width: 100%;
  max-height: 100%;
}
.el-card {
  background-color: rgba(255, 255, 255, 1) !important;
  box-shadow: none;
  padding-top: 28px;
  border-radius: 10px;
}
/deep/ .el-card__body {
  width: 368px !important;
  padding: 0 !important;
}
.wrapper-img {
  width: 100%;
  height: 75px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  left: 0;
}
/deep/ .el-button--primary {
  width: 100% !important;
}
.forgetimg {
  width: 167px;
  height: 48px;
  margin: 20px 0 0 20px;
  position: absolute;
}
</style>
