<template>
  <div class="wrapper-login">
    <el-card class="login-form-layout">
      <div class="wrapper-img">
        <!-- <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon> -->
        <img :src="logologin" alt="" />
      </div>
      <el-form
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <!-- <h2 class="login-title color-main">beiqu--jiaoyu</h2> -->
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model.trim="loginForm.username"
            autoComplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="请输入密码"
          >
            <p slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </p>
            <span slot="suffix" @click="showPwd" style="cursor: pointe">
              <svg-icon
                icon-class="eye"
                class="color-main"
                v-if="pwdType == 'password'"
              ></svg-icon>
              <svg-icon
                v-if="pwdType != 'password'"
                icon-class="eyeopen"
                class="color-main"
              ></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 10px; text-align: center">
          <el-button
            style="width: 45%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
            @keypress.native.enter="handleLogin"
          >
            登 录
          </el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <div style="display: flex; justify-content: space-between">
            <!-- <el-checkbox v-model="checked" @change="remember"
              >忘记密码</el-checkbox
            > -->
            <!-- <router-link to="/forget" style="color: #199fff"
              >忘记密码</router-link
            > -->
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <img :src="login_center_bg" class="login-center-layout" /> -->
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import { setSupport, getSupport, setCookie, getCookie } from "@/utils/support";
import login_center_bg from "@/assets/images/login-img.jpg";
import logologin from "@/assets/images/logo-login.png";
import { resetRouter } from "@/router/index";
const Base64 = require("js-base64").Base64;
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    return {
      checked: false,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
      },
      loading: false,
      pwdType: "password",
      login_center_bg,
      logologin,
      dialogVisible: false,
      supportDialogVisible: false,
    };
  },
  created() {
    resetRouter();
    console.log(getCookie("password"));
    this.loginForm.username = getCookie("username");
    if (getCookie("password"))
      this.loginForm.password = Base64.decode(getCookie("password"));
    console.log(getCookie("remember"));
    this.checked = getCookie("remember") == "true" ? true : false;
    if (
      this.loginForm.username === undefined ||
      this.loginForm.username == null ||
      this.loginForm.username === ""
    ) {
      this.loginForm.username = "";
    }
    if (
      this.loginForm.password === undefined ||
      this.loginForm.password == null
    ) {
      this.loginForm.password = "";
    }
  },
  methods: {
    remember(data, row) {
      console.log(data, row);
      if (data) {
        this.setCookie("account", this.loginForm.username, 30);
        // base64加密密码
        let password = Base64.encode(this.loginForm.password);
        this.setCookie("password", password, 30);
      } else {
        this.setCookie("account", "");
        this.setCookie("password", "");
      }
      this.setCookie("remember", data);
    },
    setCookie: function (cName, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        cName +
        "=" +
        decodeURIComponent(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              // setCookie('username', this.loginForm.username, 15)
              // setCookie('password', this.loginForm.password, 15)
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("参数验证不合法！");
          return false;
        }
      });
    },
    handleTry() {
      this.dialogVisible = true;
    },
    dialogConfirm() {
      this.dialogVisible = false;
      setSupport(true);
    },
    dialogCancel() {
      this.dialogVisible = false;
      setSupport(false);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper-login {
  height: 100%;
  width: 100%;
  background: url("../../assets/images/login-img.jpg") no-repeat;
  background-size: cover;
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
  width: 280px;
  max-width: 100%;
  max-height: 100%;
}
.el-card {
  background-color: rgba(255, 255, 255, 1) !important;
  box-shadow: none;
  padding-top: 60px;
  border-radius: 10px;
}
/deep/ .el-card__body {
  width: 368px !important;
  padding: 0 !important;
}
.wrapper-img {
  width: 100%;
  height: 75px;
  margin-bottom: 45px;
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
.svg-icon {
  vertical-align: -0.18em;
  height: 2.7em;
}
</style>
