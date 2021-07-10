<template>
  <section class="header" id="header">
    <div
      style="
        margin: 12.5px 0 12.5px 65px;
        width: 139px;
        height: 40px;
        float: left;
      "
    >
      <a href="javascript:void(0);" style="margin-top: 12.5px">
        <img
          src="../assets/images/logo_head.png"
          alt
          class="header_left fl"
          id="nav_img"
        />
      </a>
    </div>
    <el-button>换肤</el-button>
    <el-dropdown
      class="header_right fr"
      @command="clickCommand"
      trigger="click"
    >
      <a href="javascript:void(0);" class="header_ra">
        <img src="../assets/images/user_top.png" alt />
        <!-- {{$root.admin_name}} -->
        总管理员
        <div class="select_com"></div>
      </a>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item command="1">编辑个人资料</el-dropdown-item> -->
        <el-dropdown-item command="2">修改个人密码</el-dropdown-item>
        <!-- <el-dropdown-item command="3">消息管理</el-dropdown-item> -->
        <el-dropdown-item command="4">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <router-link :to="{name:'noticeManage'}" class="header_right fr">
      <img src="../assets/images/news.png" alt />
      消息
    </router-link>-->
    <a href="javascripe:void(0);" class="header_right fr" @click="clearCache">
      <img src="../assets/images/refresh.png" alt />
      清除缓存
    </a>
    <!-- 修改密码 -->
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
        :close-on-click-modal="false"
        width="600px"
        @close="$refs['rulef'].resetFields()"
      >
        <el-form-item label="原密码：" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="passWord"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input v-model="form.newPassword" type="passWord"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="passWord"></el-input>
        </el-form-item>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('rulef')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-form>
  </section>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      dialog: false,
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      ru: {
        oldPassword: [
          { required: true, message: "请填写原密码", trigger: "blur" },
          { min: 6, message: "密码最少6位数", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请填写新密码", trigger: "blur" },
          { min: 6, message: "密码最少6位数", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请填写确认密码", trigger: "blur" },
          { min: 6, message: "密码最少6位数", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    msg: String,
  },
  methods: {
    clickCommand(index) {
      if (index == 4) {
        this.$api.loginOut();
      } else if (index == 2) {
        // 修改密码
        this.dialog = true;
      }
    },
    // 清除缓存
    clearCache() {
      this.$api.clearCache();
    }, // 修改密码
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$cookies.get("organization_id")) {
            this.$api.resetOrgPassword(this);
          } else {
            this.$api.resetAdminPassword(this);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
#header {
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  height: 65px;

  z-index: 9999;
}
// #header::after {
//     content: '';
//     display: block;
//     width:100%;
//     height: 30px;
//     background: #f5f5f5;
//     position: absolute;
//     bottom: -30px;
//     right:0;
// }
</style>
