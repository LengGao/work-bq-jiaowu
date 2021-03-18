<template>
  <section>
    <div class="head_remind">
      *可按照角色权限对员工账号进行分类管理
    </div>

    <div class="staffsearch">
      <search2
        :contentShow="true"
        api="getHomeclassifiList"
        inputText="搜索员工姓名/手机号"
        @getTable="getTableList"
      ></search2>
    </div>
    <div class="mainwrap ">
      <!-- <div class="left-container">
        <div class="enrollment-info">
          <h2>成员信息</h2>
          <ul>
            <li
              v-for="item in enrollData"
              :class="{ tabg: item.id == isTagactive }"
              :key="item.id"
              @click="statusSwitch(item)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="enrollment-info" style="margin-top:20px">
          <h2>部门信息</h2>
          <ul>
            <li
              v-for="item in depaData"
              :class="{ tabg: item.id == isTagactive }"
              :key="item.id"
              @click="depaSwitch(item)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div> -->
      <section class="main-right">
        <div class="client_head">
          <h4>{{ isTagactiveName }}</h4>
          <el-button type="primary" @click="addStaff">添加员工</el-button>
        </div>
        <!--表格-->
        <div class="userTable">
          <el-table
            ref="multipleTable"
            :data="schoolData"
            style="width: 100%"
            class="min_table"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column
              label="员工编号"
              show-overflow-tooltip
              min-width="90"
              prop="staff_id"
            >
            </el-table-column>
            <el-table-column
              label="员工姓名"
              show-overflow-tooltip
              min-width="90"
              prop="staff_name"
            >
            </el-table-column>
            <el-table-column
              label="角色"
              show-overflow-tooltip
              min-width="90"
              prop="role_name"
            >
            </el-table-column>
            <el-table-column
              label="部门"
              show-overflow-tooltip
              min-width="90"
              prop="department_name"
            >
            </el-table-column>
            <el-table-column
              label="联系方式"
              show-overflow-tooltip
              min-width="90"
              prop="mobile_num"
            >
            </el-table-column>

            <el-table-column
              prop="status"
              label="账号状态"
              min-width="150"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-switch
                  active-color="#13ce66"
                  v-model="scope.row.account_status"
                  :active-value="1"
                  :inactive-value="2"
                  @change="changeSwitch(scope.row)"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="200">
              <template slot-scope="scope">
                <div style="display:flex;justify-content:center">
                  <el-button type="text" @click="topayment(scope.row)"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="handleDelete(scope.row)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
    </div>
    <!--弹框-->
    <el-dialog title="添加员工" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="员工头像" prop="name">
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
              style="width:100%;height:100%;border-radius:3px;"
              :src="ruleForm.head_photo"
              alt=""
            />
          </div>
        </el-form-item>
        <el-form-item label="员工姓名" placeholder="请输入员工姓名" prop="name">
          <el-input v-model="ruleForm.name" class="common-width"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile_num">
          <el-input
            v-model="ruleForm.mobile_num"
            placeholder="请输入手机号码"
            class="common-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录账号" prop="account">
          <el-input
            v-model="ruleForm.account"
            placeholder="请输入登录账号"
            class="common-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入登录密码"
            class="common-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="班主任" prop="password">
          <el-radio-group v-model="ruleForm.as_headmaster">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">不是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="超管" prop="password">
          <el-radio-group v-model="ruleForm.is_super">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">不是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属机构" prop="institution_id">
          <el-select
            v-model="ruleForm.institution_id"
            placeholder="请输入所属机构"
            class="common-width"
          >
            <el-option
              v-for="item in instituData"
              :key="item.institution_id"
              :label="item.institution_name"
              :value="item.institution_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属角色" prop="role_ids">
          <el-select
            multiple
            v-model="ruleForm.role_ids"
            placeholder="请输入所属角色"
            class="common-width"
          >
            <el-option
              v-for="item in roleData"
              :key="item.role_id"
              :label="item.role_name"
              :value="item.role_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号权限" prop="identity">
          <el-select
            v-model="ruleForm.identity"
            placeholder="请输入账号权限"
            class="common-width"
          >
            <el-option
              v-for="item in IdentityData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!--图片空间弹框-->
    <imgDialog
      v-if="pictureVisible"
      @closeImg="closeImg"
      @clearUrl="clearUrl"
    ></imgDialog>
  </section>
</template>
<script>
export default {
  name: 'staff',
  data() {
    return {
      schoolData: [],
      haschoose: false,
      roleData: [],
      IdentityData: [],
      instituData: [],
      isTagactive: 1,
      ruleForm: {},
      pictureVisible: false,
      dialogVisible: false,
      isTagactiveName: '全部成员',
      enrollData: [
        { id: 1, name: '全部成员' },
        { id: 2, name: '未分配成员' },
        { id: 3, name: '已禁用成员' },
      ],
      depaData: [
        { id: 4, name: '总经办' },
        { id: 5, name: '岗顶-教务部' },
        { id: 6, name: '岗顶-技术部' },
      ],
      rules: {
        surname: [
          { required: true, message: '请填写学生姓名', trigger: 'blur' },
        ],
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        // mail: [{ validator: validMail, trigger: 'blur', required: true }],
        // mobile_num: [
        //   { required: true, message: '请输入手机号码', trigger: 'blur' },
        //   {
        //     validator: function(rule, value, callback) {
        //       if (/^1\d\d{9}$/.test(value) == false) {
        //         callback(new Error('请输入正确的手机号'))
        //       } else {
        //         callback()
        //       }
        //     },
        //     trigger: 'blur',
        //   },
        // ],

        sources: [
          { required: true, message: '请填写渠道来源', trigger: 'change' },
        ],
      },
    }
  },
  created() {
    this.$api.getStaffList(this, 'schoolData')
    this.$api.getRoleSelectData(this, 'roleData') //所属角色列表
    this.$api.getIdentitySelect(this, 'IdentityData') //所属角色列表
    this.$api.getInstitutionSelectData(this, 'instituData') //所属角色列表
  },
  methods: {
    getTableList() {},
    handleDelete(ab) {
      this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteStaff(this, ab.staff_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addStaff(this, this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
      console.log(this.ruleForm)
    },
    statusSwitch(ab) {
      this.isTagactive = ab.id
      this.isTagactiveName = ab.name
    },
    depaSwitch(cd) {
      this.isTagactive = cd.id
      this.isTagactiveName = cd.name
    },
    addStaff() {
      this.dialogVisible = true
    },
    clearUrl() {
      // this.url = ''
      // this.haschoose = false
      this.pictureVisible = false
    },
    closeImg(radioUrl) {
      // console.log(radioUrl + '我好睡')
      this.pictureVisible = false
      if (radioUrl != undefined) {
        this.haschoose = true
        this.ruleForm.head_photo = radioUrl
      } else {
        this.ruleForm.head_photo = ''
        this.haschoose = false
      }
    },
    addIcon() {
      this.pictureVisible = true
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
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.main {
  display: flex;
  justify-content: center;

  .left-container {
    width: 250px;
    margin-right: 20px;
  }
  .main-right {
    flex: 1;
    width: 0;
  }
}
.tabg {
  background: rgba(236, 245, 255, 1) !important;
  //   color: #2798ee !important;
  //   border-bottom: 2px solid #199fff !important;
}
.enrollment-info {
  border: 1px solid rgba(220, 223, 230, 1);
  h2 {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;

    letter-spacing: normal;
    color: #333333;
    width: 100%;
    padding: 12px 0 12px 20px;
    border-bottom: 1px solid rgba(220, 223, 230, 1);
  }
  ul {
    font-size: 14px;
    color: #606266;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    li {
      padding: 12px 0 12px 20px;
    }
    li:hover {
      background: rgba(236, 245, 255, 1);
    }
  }
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    color: #333333;
    font-size: 20px;
  }
}
.userTable {
  margin-top: 20px;
}
.staffsearch {
  margin: 20px 20px 0 20px;
  background: #fdfdfd;
  padding: 10px;
  border-bottom: 1px solid #eee;
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
</style>
