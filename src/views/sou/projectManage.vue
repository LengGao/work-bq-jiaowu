<template>
  <div>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>
    <section class="mainwrap">
      <div class="head-search">
        <search2
          :courseTypeShow="true"
          :contentShow="true"
          typeTx="punch"
          api="getHomeclassifiList"
          inputText="教材名称"
          @getTable="getTableList"
        ></search2>
        <el-button type="primary" @click="projectDialog">
          添加项目
        </el-button>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData.data"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="项目ID"
            show-overflow-tooltip
            min-width="90"
            prop="project_id"
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="project_price"
            label="价格"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="lowest_price"
            label="最低价格"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="buy_number"
            label="购买人数"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            label="是否上架"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-switch
                active-color="#13ce66"
                v-model="scope.row.project_status"
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
                <el-button type="text" @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div> -->
      </div>
      <!--添加项目弹框-->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <h3 class="project-h3" style="margin-bottom:20px">
            基本信息
          </h3>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="项目名称" prop="project_name">
                <el-input
                  placeholder="请输入项目名称"
                  v-model="ruleForm.project_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="所属分类" prop="category_id">
                <el-input
                  placeholder="请输入分类名称"
                  v-model="ruleForm.category_id"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="项目价格" prop="price">
                <el-input
                  placeholder="请输入项目价格"
                  v-model="ruleForm.price"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="最低价格" prop="lowest_price">
                <el-input
                  placeholder="请输入最低价格"
                  v-model="ruleForm.lowest_price"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="项目周期">
                <el-radio-group
                  v-model="ruleForm.service_type"
                  @change="choseServicetype"
                >
                  <el-radio :label="1">服务时长</el-radio>
                  <el-radio :label="2">有效期限</el-radio>
                </el-radio-group>
                <el-select
                  v-if="ruleForm.service_type == 1"
                  v-model="ruleForm.service_period"
                  placeholder="请选择服务时长"
                >
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <el-date-picker
                  v-if="ruleForm.service_type == 2"
                  v-model="ruleForm.service_effective"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="适用范围">
                <el-radio-group v-model="ruleForm.applay">
                  <el-radio :label="1">当前校区</el-radio>
                  <el-radio :label="2">全部校区</el-radio>
                  <!-- <el-radio :label="3">指定校区</el-radio> -->
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="是否启用">
                <el-radio-group v-model="ruleForm.status">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12"> </el-col>
          </el-row>
        </el-form>
        <h3 class="project-h3" style="margin-bottom:20px">
          项目配置
        </h3>
        <ul class="project-ul" v-for="item in 3" :key="item">
          <li>
            课程
          </li>
          <li style="width:100%;list-style:none;padding-left:20px">
            <el-tag>家</el-tag>
          </li>
          <li>
            选择
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm('ruleForm')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
export default {
  name: 'projectManage',
  data() {
    return {
      dialogTitle: '添加项目',
      ruleForm: {
        project_name: '',
        category_id: '',
        price: '',
        lowest_price: '',
        service_period: '',
        service_type: 1,
        service_effective: '',
        course: [1, 2, 3],
        problem: [1, 2, 3],
        textbooks: [1, 2, 3],
        status: '',
        applay: '',
        school: '',
      },
      rules: {
        project_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        category_id: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
        ],
        price: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        lowest_price: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      },

      timeOptions: [
        {
          id: 1,
          value: '1年',
        },
        {
          id: 2,
          value: '2年',
        },
        {
          id: 3,
          value: '3年',
        },
        {
          id: 4,
          value: '永久',
        },
      ],
      schoolData: [],
      dialogVisible: false,
    }
  },
  created() {
    this.$api.getProjectList(this, 'schoolData')
  },
  methods: {
    choseServicetype(ab) {
      switch (ab) {
        case 1:
          this.ruleForm.service_effective = ''
          break
        case 2:
          this.ruleForm.service_period = ''
          break
      }
    },
    handleEdit(ab) {
      this.ruleForm.project_id = ab.project_id
      this.dialogTitle = '编辑项目'
      this.dialogVisible = true
      this.$api.editProject(this, this.ruleForm, 'GET')
    },
    handleDelete(ab) {
      this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteproject(this, ab.project_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    getTableList() {},
    projectDialog() {
      this.dialogTitle = '添加项目'
      this.dialogVisible = true
      //初始化参数
      this.ruleForm = {
        project_name: '',
        category_id: '',
        price: '',
        lowest_price: '',
        service_period: '',
        service_type: 1,
        service_effective: '',
        course: [],
        problem: [],
        textbooks: [],
        status: '',
        applay: '',
        school: '',
      }
    },
    handleConfirm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.id) {
            this.$api.editProject(this, this.ruleForm, 'POST')
          } else {
            this.$api.createProject(this, this.ruleForm)
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
.input-width {
  width: 240px;
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
.head-search {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.project-h3 {
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.580392156862745);
  line-height: 16px;
  border-left: 3px solid #199fff;
  padding-left: 5px;
}
.project-ul {
  width: 100%;
  border-top: 1px solid rgba(235, 238, 245, 1);
  border-left: 1px solid rgba(235, 238, 245, 1);
  border-right: 1px solid rgba(235, 238, 245, 1);
  display: flex;
  align-items: center;
  height: 45px;

  li:first-child {
    list-style: none;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li:last-child {
    list-style: none;
    height: 45px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid rgba(235, 238, 245, 1);
    color: #199fff;
  }
}
.project-ul:last-child {
  border-bottom: 1px solid rgba(235, 238, 245, 1);
}
</style>
