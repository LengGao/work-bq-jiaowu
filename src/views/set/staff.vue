<template>
  <section>
    <div class="head_remind">
      *可按照角色权限对员工账号进行分类管理
    </div>

    <div class="mainwrap">
      <section class="main-right">
        <div class="client_head">
          <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
          <el-button type="primary" @click="addStaff">添加员工</el-button>
        </div>
        <!--表格-->
        <div class="userTable">
          <el-table ref="multipleTable" :data="listData" style="width: 100%" class="min_table" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
            <el-table-column label="员工编号" show-overflow-tooltip min-width="90" prop="staff_id">
            </el-table-column>
            <el-table-column label="员工姓名" show-overflow-tooltip min-width="100" prop="staff_name">
            </el-table-column>
            <el-table-column label="账号" show-overflow-tooltip min-width="90" prop="account">
            </el-table-column>
            <el-table-column label="身份" show-overflow-tooltip min-width="90" prop="identity">
            </el-table-column>
            <el-table-column label="角色" show-overflow-tooltip min-width="90">
              <template slot-scope="{ row }">
                <div v-if="row.role_name">
                  {{ row.role_name }}
                </div>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column label="机构" show-overflow-tooltip min-width="150" prop="institution_name">
            </el-table-column>
            <el-table-column label="账号状态" min-width="90" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-switch active-color="#13ce66" v-model="scope.row.account_status" :active-value="1" :inactive-value="2" @change="accountSwitch(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="是否为超管" min-width="90" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-switch active-color="#13ce66" v-model="scope.row.is_super" :active-value="1" :inactive-value="0" @change="adminSwitch(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="班主任" min-width="90" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-switch active-color="#13ce66" v-model="scope.row.as_headmaster" :active-value="1" :inactive-value="2" @change="headSwitch(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="200">
              <template slot-scope="scope">
                <div style="display:flex;justify-content:center">
                  <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="table_bottom">
            <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" />
          </div>
        </div>
      </section>
    </div>
    <!--弹框-->
    <el-dialog title="添加员工" :visible.sync="dialogVisible" width="820px" :close-on-click-modal="false" @open="handleOpen">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="staffBox">
          <el-form-item label="员工姓名" placeholder="请输入员工姓名" prop="staff_name">
            <el-input v-model="ruleForm.staff_name" class="common-width"></el-input>
          </el-form-item>
          <el-form-item label="员工头像">
            <div v-show="!haschoose" style="display:flex;">
              <div class="headPortrait el-icon-plus" @click="addIcon"></div>
              <div class="headImage-title">
                <div class="headImage">
                  <p>
                    1.支持jpg、png、格式；
                  </p>
                  <p>
                    2.推荐尺寸200*200px
                  </p>
                </div>
              </div>
            </div>
            <div v-show="haschoose" class=" imageBox ">
              <i class=" iconjia el-icon-plus" @click="addIcon"></i>
              <img style="width:100%;height:100%;border-radius:3px;" :src="ruleForm.head_photo" alt="" />
            </div>
          </el-form-item>
          <el-form-item label="手机号码" prop="account">
            <el-input v-model="ruleForm.account" placeholder="请输入手机号码" class="common-width"></el-input>
          </el-form-item>
          <!-- <el-form-item label="登录账号" prop="account">
            <el-input v-model="ruleForm.account" placeholder="请输入登录账号" class="common-width"></el-input>
          </el-form-item> -->
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入登录密码" class="common-width"></el-input>
          </el-form-item>
          <!-- <el-form-item label="班主任" prop="password">
            <el-radio-group v-model="ruleForm.as_headmaster">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">不是</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <!-- <el-form-item label="超管" prop="password">
            <el-radio-group v-model="ruleForm.is_super">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">不是</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="所属机构" prop="institution_id">
            <el-select v-model="ruleForm.institution_id" placeholder="请输入所属机构" class="common-width" filterable @change="handleInstitution">
              <el-option v-for="item in instituData" :key="item.institution_id" :label="item.institution_name" :value="item.institution_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属校区" prop="school_id">
            <el-select v-model="ruleForm.school_id" placeholder="请输入所属校区" class="common-width" filterable @change="handleInstitution">
              <el-option v-for="item in schoolData" :key="item.institution_id" :label="item.institution_name" :value="item.institution_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号身份" prop="identity">
            <el-select v-model="ruleForm.identity" placeholder="请输入账号权限" class="common-width">
              <el-option v-for="item in IdentityData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属角色" prop="role_ids">
            <el-select multiple v-model="ruleForm.role_ids" placeholder="请输入所属角色" class="common-width">
              <el-option v-for="item in roleData" :key="item.role_id" :label="item.role_name" :value="item.role_id">
              </el-option>
            </el-select>
          </el-form-item>

        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--图片空间弹框-->
    <imgDialog v-if="pictureVisible" @closeImg="closeImg" @clearUrl="clearUrl"></imgDialog>
  </section>
</template>
<script>
import { getStaffList, getIdentitySelect, getOrganizationSelect, getSchoolSelect } from '@/api/set'
export default {
  name: 'staff',
  data() {
    return {
      searchOptions: [
        {
          key: 'identity',
          type: 'select',
          options: [],
          optionValue: 'id',
          optionLabel: 'name',
          attrs: {
            placeholder: '员工身份',
            clearable: true,
          },
        },
        {
          key: 'is_super',
          type: 'select',
          options: [
            { value: 1, label: '是' },
            { value: 2, label: '不是' },
          ],
          optionValue: 'value',
          optionLabel: 'label',
          attrs: {
            placeholder: '超级管理员',
            clearable: true,
          },
        },
        {
          key: 'as_headmaster',
          type: 'select',
          options: [
            { value: 1, label: '是' },
            { value: 2, label: '不是' },
          ],
          optionValue: 'value',
          optionLabel: 'label',
          attrs: {
            placeholder: '班主任',
            clearable: true,
          },
        },
        {
          key: 'account_status',
          type: 'select',
          options: [
            { value: 1, label: '启用' },
            { value: 2, label: '停用' },
          ],
          optionValue: 'value',
          optionLabel: 'label',
          attrs: {
            placeholder: '账号状态',
            clearable: true,
          },
        },

        {
          key: 'name_mobile',
          attrs: {
            placeholder: '员工姓名/手机号码',
          },
        },
      ],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        name_mobile: '',
        account_status: '',
        is_super: '',
        as_headmaster: '',
        identity: '',
      },
      page: 1,
      schoolData: [],
      // schoolData: [],
      haschoose: false,
      roleData: [],
      IdentityData: [],
      instituData: [],
      isTagactive: 1,
      ruleForm: {
        staff_name: '',
        mobile_num: '',
        account: '',
        password: '',
        head_photo: '',
        role_ids: '',
        as_headmaster: '',
        is_super: '',
        school_id: '',
        institution_id: '',
        identity: '',
      },
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
        staff_name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
        institution_id: [{ required: true, message: '请输入所选机构', trigger: 'blur' }],
        identity: [{ required: true, message: '请输入账号权限', trigger: 'blur' }],
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
        sources: [{ required: true, message: '请填写渠道来源', trigger: 'change' }],
      },
    }
  },
  created() {
    this.getStaffList()
    this.getIdentitySelect()
    // this.$api.getStaffList(this, 'schoolData')
    this.$api.getRoleSelectData(this, 'roleData') //所属角色列表
    // this.$api.getIdentitySelect(this, 'IdentityData') //所属角色列表
    // this.$api.getInstitutionSelectData(this, 'instituData') //所属角色列表
  },
  methods: {
    handleInstitution(val) {
      console.log(val)
      this.getSchoolSelect(val)
    },
    handleOpen() {
      this.getOrganizationSelect()
    },
    handlePageChange(val) {
      this.pageNum = val
      this.getStaffList()
    },
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = {
        ...data,
      }
      this.getStaffList()
    },
    // 获取机构下拉列表
    async getOrganizationSelect() {
      const data = {
        limit: 99999,
      }
      const res = await getOrganizationSelect(data)
      if (res.code === 0) {
        this.instituData = res.data
      }
    },
    // 获取校区
    async getSchoolSelect(institution_id) {
      const data = {
        institution_id: institution_id,
        limit: 99999,
      }
      const res = await getSchoolSelect(data)
      if (res.code === 0) {
        this.schoolData = res.data
      }
    },
    // 获取身份下拉
    async getIdentitySelect(category_id) {
      const data = { category_id }
      const res = await getIdentitySelect(data)
      if (res.code === 0) {
        this.searchOptions[0].options = this.IdentityData = res.data
      }
    },
    // 获学员列表
    async getStaffList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      }
      delete data.date
      this.listLoading = true
      const res = await getStaffList(data)
      this.listLoading = false
      this.listData = res.data.list
      this.listTotal = res.data.total
    },
    handleEdit(ab) {
      console.log(ab)
      // this.ruleForm.id = ab.staff_id
      this.dialogVisible = true
      this.$api.getStaffInfo(this, ab.staff_id)
    },
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    doPageChange(page) {
      this.page = page
      this.$api.getStaffList(this, 'schoolData')
    },
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
          console.log(this.ruleForm)
          if (this.ruleForm.id) {
            //修改员工
            this.$api.modifyStaff(this, this.ruleForm)
          } else {
            //添加员工
            this.$api.addStaff(this, this.ruleForm)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
      console.log(this.ruleForm)
    },
    accountSwitch(ab) {
      this.$api.ajaxStatusStaff(this, ab.staff_id, ab.account_status)
    },
    adminSwitch(ab) {
      this.$api.updateSuperStaff(this, ab.staff_id, ab.is_super)
    },
    headSwitch(ab) {
      this.$api.updateMasterStaff(this, ab.staff_id, ab.as_headmaster)
    },
    depaSwitch(cd) {
      this.isTagactive = cd.id
      this.isTagactiveName = cd.name
    },
    addStaff() {
      // this.ruleForm = {
      //   staff_name: '',
      //   mobile_num: '',
      //   account: '',
      //   password: '',
      //   head_photo: '',
      //   role_ids: '',
      //   as_headmaster: '',
      //   is_super: '',

      //   institution_id: '',
      //   identity: '',
      // }
      for (var item in this.ruleForm) {
        this.ruleForm[item] = ''
      }
      this.haschoose = false
      // this.ruleForm.head_photo = ''
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
/deep/.el-form-item {
  width: 340px;
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
.table_bottom {
  text-align: right;
}
.staffBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.headImage {
  margin-left: 10px;
  font-size: 12px;
  color: #ccc;
  p {
    line-height: 20px;
  }
}
.headImage-title {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
/deep/.el-dialog__body {
  padding: 30px 50px 20px 20px;
}
</style>
