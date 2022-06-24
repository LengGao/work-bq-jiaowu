<template>
  <section class="mainwrap">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <div class="demo-ruleForm">
        <div class="emp_form">
          <el-form-item
            prop="teacher_name"
            label="老师姓名"
            style="margin-bottom: 63px"
          >
            <el-input
              placeholder="请输入老师姓名 (必填)"
              v-model="ruleForm.teacher_name"
            ></el-input>
          </el-form-item>
          <el-form-item prop="telephone" label="手机号码">
            <el-input
              v-model="ruleForm.telephone"
              placeholder="请输入手机号码"
              auto-complete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item
            :prop="passYalid == true ? 'password' : ''"
            label="登录密码"
          >
            <el-input
              v-model="ruleForm.password"
              style="width: 250px"
              :type="pwdType"
              :placeholder="
                teacher_id ? '如果想修改之前的密码,请输入' : '请输入登录密码'
              "
              auto-complete="new-password"
            >
              <i slot="suffix" class="el-icon-view" @click="showPwd"></i>
            </el-input>
          </el-form-item>
        </div>
        <div class="emp_upload">
          <el-form-item prop="head_image_id" label="老师头像 (必填)">
            <div v-show="!haschoose" style="display: flex">
              <div class="headPortrait el-icon-plus" @click="addIcon"></div>
              <div style="color: #aaa; padding: 12px 0 0 19px">
                <span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span><br />
                <span> 2. 推荐尺寸200*200px或者1:1</span>
              </div>
            </div>
            <div v-show="haschoose" class="imageBox">
              <i class="iconjia el-icon-plus" @click="addIcon"></i>
              <img
                style="width: 100%; height: 100%; border-radius: 3px"
                :src="url"
                alt=""
              />
            </div>
          </el-form-item>
          <el-form-item prop="email" label="电子邮箱">
            <el-input
              v-model="ruleForm.email"
              placeholder="请输入电子邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="教师类型" prop="cate_id_arr">
            <el-select
              v-model="ruleForm.cate_id_arr"
              class="chapterTag"
              filterable
              multiple
              placeholder="请选择关联类型"
              @change="pushtag"
            >
              <el-option
                v-for="item in categoryData"
                :key="item.category_id"
                :label="item.category_name"
                :value="item.category_id"
              >
              </el-option>
            </el-select>
            <!-- <el-tag
          class="tags"
          v-for="tag in taglist"
          :key="tag.problem_chapter_id"
          v-show="tag == '' ? false : true"
          closable
          @close="handleClose(tag)">
          {{ tag.chapter_name }}
        </el-tag> -->
          </el-form-item>
        </div>
      </div>
      <el-form-item prop="rank" label="老师头衔">
        <el-input
          v-model="ruleForm.rank"
          style="width: 650px"
          placeholder="请输入老师头衔 (必填)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="introduction" label="老师简介">
        <el-input
          type="textarea"
          v-model="ruleForm.introduction"
          style="width: 650px; height: 200px"
          placeholder="请输入老师简介 (必填)"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="preserve('ruleForm')">保存</el-button>
      </el-form-item>
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
  name: "addTeacher",
  data() {
    let validMail = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        callback(new Error("请填写邮箱"));
      } else {
        let reg =
          /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
        if (!reg.test(value)) {
          callback(new Error("邮箱格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      pwdType: "password",
      passShow: true,
      teacher_id: 0,
      getPassword: "",
      categoryData: {},
      passYalid: false,
      pictureVisible: false,
      ruleForm: {
        teacher_name: "",
        email: "",
        account: "",
        telephone: "",
        password: "",
        rank: "",
        introduction: "",
        cate_id_arr: [],
      },
      url: "",
      haschoose: false,
      options: [],
      rules: {
        email: [{ validator: validMail, trigger: "blur", required: true }],
        teacher_name: [
          { required: true, message: "请输入老师名称", trigger: "blur" },
          { min: 2, max: 26, message: "长度在 2 到 26 个字符" },
        ],
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 26, message: "长度在 2 到 26 个字符" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 25, message: "长度在 5 到 25个字符" },
          {
            pattern: /^(\w){5,25}$/,
            message: "只能输入5-25个字母、数字、下划线",
          },
        ],
        rank: [
          { required: true, message: "请输入老师头衔", trigger: "blur" },
          { min: 2, max: 100, message: "长度在 2 到 100 个字符" },
        ],
        introduction: [
          { required: true, message: "请输入老师简介", trigger: "blur" },
          { min: 3, max: 250, message: "长度在 3 到 250 个字符" },
        ],
        telephone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (/^1\d\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  // computed: {
  //   getPassword: function() {
  //     return this.ruleForm.password
  //   },
  // },
  watch: {
    "ruleForm.password": {
      handler(newName, oldName) {
        console.log(newName, oldName);
        if (this.teacher_id != "" || this.teacher_id != undefined) {
          if (
            this.ruleForm.password == "" ||
            this.ruleForm.password == undefined
          ) {
            this.passYalid = false;
          } else {
            this.passYalid = true;
          }
        } else {
          this.passYalid = true;
        }
      },
    },
  },
  created() {
    this.$api.getTeachCateList(this, "categoryData");
  },
  mounted() {
    this.teacher_id = this.$route.query.teacher_id;
    console.log(this.teacher_id);
    if (this.teacher_id != undefined) {
      this.$route.meta.title = "编辑老师";
      this.passShow = false;
      this.$api.getTeacherInfo(this, this.teacher_id);
    } else {
      this.$route.meta.title = "添加老师";
      this.passShow = true;
    }
  },
  // activated: function() {
  //   console.log(JSON.parse(this.$route.query.url))
  //   if (this.$route.query.url != undefined) {
  //     this.url = JSON.parse(this.$route.query.url)
  //     // this.ruleForm.class_icon = JSON.parse(this.$route.query.url)
  //     this.haschoose = true
  //   }
  // },
  methods: {
    pushtag() {},
    cancel() {
      this.$router.back();
    },
    addIcon() {
      this.pictureVisible = true;
    },
    clearUrl() {
      this.pictureVisible = false;
    },
    closeImg(radioUrl) {
      console.log(radioUrl);
      this.pictureVisible = false;
      if (radioUrl != undefined) {
        this.haschoose = true;
        this.url = radioUrl;
        // this.ruleForm.head_photo = radioUrl
      } else {
        this.url = "";
        this.haschoose = false;
        // this.ruleForm.head_photo = ''
      }
    },
    showPwd() {
      this.pwdType === "password"
        ? (this.pwdType = "")
        : (this.pwdType = "password");
      let e = document.getElementsByClassName("el-icon-view")[0];
      this.pwdType == ""
        ? e.setAttribute("style", "color: #409EFF")
        : e.setAttribute("style", "color: #c0c4cc");
    },
    preserve(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(1111);
        if (valid) {
          console.log(this.teacher_id != undefined);
          if (this.teacher_id != undefined) {
            this.$api.modifyTeacher(this, this.ruleForm);
          } else {
            this.$api.addTeacher(this, this.ruleForm);
            // setTimeout(() => {
            //   this.$router.push({
            //     path: '/smt/teachingManage',
            //   })
            // }, 1500)
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.ruleForm);
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
/deep/.el-form-item__content {
  line-height: 25px;
}
/deep/.el-form-item__label {
  padding: 0 30px 0 0;
}
/deep/.el-input__suffix {
  padding-top: 7px;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
// /deep/.el-form-item {
//   margin-bottom: 40px;
// }
.el-select {
  width: 250px;
}
.el-input {
  width: 250px;
}
.demo-ruleForm {
  display: flex;
}
.emp_upload {
  padding-left: 40px;
}
.headPortrait {
  width: 63px;
  height: 63px;
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
  width: 63px;
  height: 63px;
  position: relative;
}
.iconjia {
  font-size: 40px;
  color: #fff;
  display: none;
  position: absolute;
  width: 63px;
  height: 63px;
  line-height: 63px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}
.imageBox:hover i {
  display: block;
}
/deep/.el-textarea__inner {
  height: 120px;
}
</style>
