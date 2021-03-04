<template>
  <section class="main">
    <section>
      <div class="left-container">
        <h3 class="staff_box">
          组织架构
          <i class="el-icon-circle-plus-outline" @click="addVideo"></i>
        </h3>
        <div v-for="item in department" :key="item.department_id">
          <div
            class="staff_box"
            style=" cursor: pointer;"
            @click="departClick(item.department_id)"
          >
            <img
              v-if="item.department_id != 1"
              src="@/assets/images/arrowright.png"
              style="width:14px;"
              :class="item.isShow ? 'transf' : ''"
              alt=""
              @click="chapterShow(item)"
            />
            <span> {{ item.department_name }}--({{ item.staff_num }}) </span>
            <template v-if="item.department_id != 1">
              <i
                class="el-icon-delete"
                @click.stop.prevent="sapceDelete(item)"
              ></i>
              <i
                class="el-icon-edit"
                @click.stop.prevent="sapceEditor(item)"
              ></i>
            </template>
          </div>
          <ul v-if="item.isShow">
            <li
              class="staff_box"
              style="padding-left:40px;cursor: pointer;"
              v-for="iv in item.subDepartments"
              :key="iv.department_id"
              @click="departClick(iv.department_id)"
            >
              <span>{{ iv.department_name }}</span>
              <template>
                <i
                  class="el-icon-delete"
                  @click.stop.prevent="sapceDelete(iv)"
                ></i>
                <i
                  class="el-icon-edit"
                  @click.stop.prevent="sapceEditor(iv)"
                ></i>
              </template>
            </li>
          </ul>
        </div>
        <!-- <li
          v-for="(item, index) of department"
          :key="index"
          style=" cursor: pointer;"
          @click="departClick(item.department_id)"
          :class="{ activeColor: colorIndex === index }"
        >
          {{ item.department_name }}--({{ item.staff_num }})
          <template v-if="item.parent_id != 0">
            <i
              class="el-icon-delete"
              @click.stop.prevent="sapceDelete(item)"
            ></i>
            <i class="el-icon-edit" @click.stop.prevent="sapceEditor(item)"></i>
          </template>
        </li> -->
      </div>
    </section>

    <div class="main-right">
      <div class="head">
        <search2
          :contentShow="true"
          inputText="员工姓名,手机号码"
          api="getStaffList"
          @getTable="getTableList"
        ></search2>
        <el-button type="primary" @click="toAddEmployee">添加员工</el-button>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData.list"
          tooltip-effect="light"
          stripe
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <!-- <el-table-column type="selection" width="30"></el-table-column> -->

          <el-table-column
            prop="staff_id"
            label="员工编号"
            min-width="70"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="staff_name"
            label="员工姓名"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="role_name"
            label="角色"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="department_name"
            label="部门"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="mobile_num"
            label="联系方式"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="account_status"
            label="账号状态"
            show-overflow-tooltip
          >
            <template slot-scope="scope" v-if="scope.row.staff_id != 1">
              <el-switch
                v-model="scope.row.account_status"
                :active-value="1"
                :inactive-value="2"
                active-color="#13ce66"
                @change="changeSwitch(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100" fixed="right">
            <template slot-scope="scope" v-if="scope.row.staff_id != 1">
              <el-button type="text" @click="toAddEmployee(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <div class="table_bottom">
            <page :data="total" :curpage="page" @pageChange="doPageChange" />
          </div>
        </div>
      </div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="上级部门" prop="parent_id">
            <el-select
              v-model="ruleForm.parent_id"
              filterable
              placeholder="请选择上级部门"
            >
              <el-option
                v-for="item in department"
                :key="item.department_id"
                :label="item.department_name"
                :value="item.department_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名称" prop="department_name">
            <el-input
              v-model="ruleForm.department_name"
              placeholder="请输入部门名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm('ruleForm')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      colorIndex: -1,
      account_status: 1,
      dialogVisible: false,
      schoolData: [],
      page: 1,
      total: 0,
      datas: {},
      departid: null,

      department: [],
      parent_id: '',
      dialogTitle: '',
      departmentId: '',
      ruleForm: {
        parent_id: '',
        department_name: '',
        department_id: '',
      },
      rules: {
        parent_id: [
          { required: true, message: '请选择上级部门', trigger: 'change' },
        ],
        department_name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.$api.getStaffList(this, 'schoolData')
    this.$api.getfoldList(this, 'department')
    // this.$api.getDepartmentList(this, 'department')
  },
  methods: {
    chapterShow(ab) {
      console.log(ab)
      this.department.forEach((i) => {
        if (i.department_id == ab.department_id) {
          if (ab.department_id == this.departid && i.isShow == true) {
            this.$set(i, 'isShow', false)
          } else {
            this.$set(i, 'isShow', true)
          }
          // i.isShow = true
        } else {
          this.$set(i, 'isShow', false)
        }
      })
      this.departid = ab.department_id
      // this.catalog = data
      // console.log(this.catalog)
    },
    doPageChange(page) {
      this.page = page

      this.$api.getStaffList(this, 'schoolData', this.datas)
    },
    departClick(ab) {
      this.departmentId = ab
      this.$api.getStaffList(this, 'schoolData')
    },
    sapceDelete(zx) {
      this.$confirm(
        '删除后该部门的员工将会转移到上级部门, 是否确认删除该部门?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }
      )
        .then(() => {
          console.log(zx.department_id)
          this.$api.deletePartment(this, zx.department_id)
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!',
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })

      console.log(zx)
    },
    sapceEditor(ab) {
      this.dialogTitle = '编辑部门'
      this.parent_id = ab.parent_id
      this.ruleForm.department_id = ab.department_id
      console.log(ab.parent_id)
      this.dialogVisible = true
      this.$api.getDepartmentInfo(this, ab.department_id)
      console.log(ab)
    },
    handleConfirm(formName) {
      console.log(this.parent_id === '')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.parent_id === '') {
            this.$api.addepartment(this, this.ruleForm)
          } else {
            this.$api.modifyPartment(this, this.ruleForm)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addVideo() {
      this.dialogTitle = '添加部门'
      //重置清空表单
      for (let key in this.ruleForm) {
        this.ruleForm[key] = ''
      }
      this.$nextTick(function() {
        this.$refs['ruleForm'].clearValidate()
      })

      this.dialogVisible = true
    },
    changeSwitch(zx) {
      console.log(this.account_status)
      let statue = ''
      if (zx.account_status == '1') {
        statue = '1'
      } else {
        statue = '2'
      }
      this.$api.changeStatus(this, zx.staff_id, statue)
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
    handleDelete(zx) {
      console.log('我怕')
      this.$confirm('确定要删除当前员工吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteStaff(this, zx.staff_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    toAddEmployee(ab) {
      this.$router.push({
        path: '/smt/addEmployee',
        query: {
          staff_id: ab.staff_id,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.staff_box img {
  cursor: pointer;
  transform: rotate(0deg);
  vertical-align: middle;
}
.staff_box img.transf {
  cursor: pointer;
  transform: rotate(90deg) !important;
}
.left-container {
  width: 287px;
  height: 100%;
  min-height: 500px;
  border: 1px solid rgba(215, 215, 215, 1);
  .activeColor {
    background-color: #f6fbff;
    color: #298adb;
  }
  .staff_box {
    list-style: none;
    height: 48px;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    line-height: 48px;
    padding-left: 20px;
    color: #7f7f7f;
    img {
      float: left;
      margin-top: 16px;
      margin-right: 5px;
    }
    span.staff_span {
      display: inline-block;
      align-items: center !important;
    }
  }
}
.el-icon-delete {
  font-size: 16px;
  float: right;
  line-height: 48px;
  color: #b9bbbd;
  margin-right: 20px;
  margin-left: 10px;
}
.el-icon-edit {
  font-size: 16px;
  float: right;
  color: #bdbebe;
  line-height: 48px;
}
.el-icon-circle-plus-outline {
  font-size: 20px;
  float: right;
  line-height: 48px;
  color: #199fff;
  padding-right: 20px;
  cursor: pointer;
}
.main {
  padding: 30px;

  background: #fff;
  display: flex;
  justify-content: space-between;
}
.structure {
  min-width: 287px;
  h3 {
    display: flex;
    justify-content: center;
    height: 48px;
    background: #199fff;
    font-size: 16px;
    font-weight: 600;
    align-items: center;
    color: #fff;
  }
  .bq_list {
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
    overflow: hidden;
    .bq_head {
      line-height: 48px;
      // display: flex;
      // justify-content: space-between;
      align-items: center;
      padding: 0 10px 0 20px;
      border-bottom: 1px solid #ccc;
      overflow: hidden;
      .head_title {
        font-weight: 700;
        color: #7f7f7f;
      }
      .head_title2 {
        font-weight: 400;
        color: #7f7f7f;
      }
    }
    .bq_head:hover {
      background: #199fff;
      .head_title {
        font-weight: 700;
        color: #fff !important;
      }

      .head_btn2,
      .head_btn {
        color: #fff;
      }
    }
  }
}
.head_btn {
  padding: 0;
  border: 1px solid #199fff;
  font-size: 12px;
  margin-right: 10px;
}
.main-right {
  /deep/.el-table__header th,
  .el-table__header tr {
    background-color: #f8f8f8;
    color: #909399;
  }
  flex: 1;
  width: 0;
  padding-left: 30px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.userTable {
  margin-top: 20px;
}
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
</style>
