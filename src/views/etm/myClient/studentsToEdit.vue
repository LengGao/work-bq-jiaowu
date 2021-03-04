<template>
  <section class="mainwrap">
    <!--表单部分-->
    <el-form
      label-width="150px"
      class="demo-ruleForm"
      :show-message="true"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
    >
      <el-row>
        <el-row>
          <el-col :sm="8">
            <el-form-item label="用户姓名">
              <el-input
                v-model="ruleForm.user_realname"
                placeholder="请输入学员姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="用户密码">
              <el-input
                v-model="ruleForm.user_pass"
                placeholder="如非必要,请勿修改用户密码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="性别">
              <el-input v-model="ruleForm.sex" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="用户昵称">
              <el-input
                v-model="ruleForm.user_nicename"
                placeholder="请输入用户昵称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="邮箱">
              <el-input
                placeholder="请输入邮箱号"
                v-model="ruleForm.user_email"
                :disabled="ruleForm.intent_id ? true : false"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="最后登录时间">
              <el-input v-model="ruleForm.last_login_time" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="手机号">
              <el-input v-model="ruleForm.telphone" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :sm="8">
            <el-form-item label="所属机构">
              <el-select
                filterable
                v-model="ruleForm.from_organization_id"
                placeholder="请选择所属机构"
                @change="campusShow"
              >
                <el-option
                  v-for="item in organData.list"
                  :key="item.institution_id"
                  :label="item.institution_name"
                  :value="item.institution_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :sm="8">
            <el-form-item label="所属校区">
              <el-select
                filterable
                placeholder="请选择所属校区"
                v-model="ruleForm.school_id"
              >
                <el-option
                  v-for="item in campusData.list"
                  :key="item.institution_id"
                  :label="item.institution_name"
                  :value="item.institution_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="小程序管理员" class="special">
              <el-select
                filterable
                placeholder="是否是小程序管理员"
                v-model="ruleForm.is_admin"
              >
                <el-option
                  v-for="item in applet.list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="学员头像" class="visibility">
          <div v-show="!haschoose">
            <div class="headPortrait el-icon-plus" @click="addIcon"></div>
            <div style="color:#aaa;ling-height:20px">
              <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
              <p><span> 2. 推荐尺寸200*200px或者1:1</span></p>
            </div>
          </div>
          <div v-show="haschoose" class=" imageBox ">
            <i class=" iconjia el-icon-plus" @click="addIcon"></i>
            <img style="width:100%;height:100%;" :src="url" alt="" />
          </div>
        </el-form-item>
      </el-row>
      <div class="entybtn">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveLink('ruleForm')">保存</el-button>
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
  name: 'studentsToEdit',
  data() {
    return {
      rules: {},
      haschoose: false,
      page: 1,
      pictureVisible: false,
      url: '',
      ruleForm: {
        uid: '', //get或post都必选
        school_id: '', //校区id
        from_organization_id: '', //机构id
        organization_id: '',
        user_pass: '', //用户密码
        user_nicename: '', //用户昵称
        user_realname: '', //用户真实姓名
        user_email: '', //邮件
        user_img: '', //用户头像
        is_admin: '', //是否是小程序管理员,0不是，1是
      },
      organData: [],
      campusData: [],
      applet: {
        list: [
          {
            id: 0,
            name: '否',
          },
          {
            id: 1,
            name: '是',
          },
        ],
      },
    }
  },
  created() {
    this.ruleForm.uid = this.$route.query.uid
    //推荐机构列表
    this.$api.getRecommender(this, 'organData')
    //获取信息
    this.$api.editstudentuser('GET', this)
  },
  mounted() {},

  methods: {
    //保存
    saveLink() {
      //保存信息
      this.$api.editstudentuser('post', this)
    },
    campusShow() {
      if (this.ruleForm.from_organization_id != '') {
        this.ruleForm.school_id = ''
        this.ruleForm.organization_id = this.ruleForm.from_organization_id
        this.$api.getSubBlock(this, 'campusData')
      }
    },
    addIcon() {
      this.pictureVisible = true
    },
    clearUrl() {
      this.pictureVisible = false
    },
    closeImg(radioUrl) {
      // console.log(radioUrl + '我好睡')
      this.pictureVisible = false
      if (radioUrl != undefined) {
        this.haschoose = true
        this.url = radioUrl
        this.ruleForm.user_img = radioUrl
      } else {
        this.url = ''
        this.haschoose = false
        this.ruleForm.user_img = ''
      }
    },
    //取消
    cancel() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__label {
  padding: 0 30px 0 0;
}

.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}

.breadcrumb {
  display: flex !important;
  justify-content: flex-start;
}

.el-input {
  width: 238px;
}

.el-select {
  width: 238px;
}

.entybtn {
  display: flex;
  justify-content: flex-start;
  padding-left: 90px;
}

.el-textarea {
  max-width: 850px;
  min-width: 400px;
}

.imgBox {
  width: 87px;
  height: 87px;
  border: 1px solid rgba(220, 223, 230, 1);
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #aaa;
  border-radius: 4px;
  cursor: pointer;
}

.imgBox_warn {
  line-height: 30px;
  padding-top: 10px;
  color: #aaa;
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

.imageBox:hover i {
  display: block;
}

/deep/ .special {
  .el-form-item__label {
    line-height: 20px;
  }
}
</style>
