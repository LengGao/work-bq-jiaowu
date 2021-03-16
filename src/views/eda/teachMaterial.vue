<template>
  <section class="mainwrap">
    <div class="header">
      <search
        :organHide="false"
        :schoolHide="false"
        :classNameHide="false"
        :dealStatusHide="false"
        :teacherHide="false"
        @getTable="getTableList"
        api="getMyclient"
        :statusNum="3"
      ></search>
      <div>
        <el-checkbox v-model="checked">显示未归档学生</el-checkbox>
        <!-- <el-button type="primary" style="margin-left:20px">批量发放</el-button> -->
      </div>
    </div>

    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        stripe
        style="width: 100%;"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="uid"
          label="学员编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="学生姓名"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="project_name"
          label="所属项目"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="classroom_id"
          label="所属班级"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total_books"
          label="应发教材"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="not_issued"
          label="欠发教材"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="update_time"
          label="最后更新时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          label="操作"
          fixed="right"
          min-width="200"
          max-width="200"
        >
          <template slot-scope="scope">
            <div class="operation_btn">
              <el-button type="text" @click="handleAdd(scope.row)"
                >教材发放</el-button
              >
              <el-button type="text" @click="toMaterialJournal(scope.row)"
                >日志</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="发放教材" :visible.sync="dialogVisible" width="30%">
        <!-- <span>这是一段信息</span> -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="仓库名称" prop="name">
            <el-select v-model="ruleForm.value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发放教材" prop="name">
            <el-table :data="schoolData" style="width: 100%">
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
            </el-table>
            <!-- <el-input v-model="ruleForm.name"></el-input> -->
          </el-form-item>
          <el-form-item label="发放形式" prop="name">
            <el-radio-group v-model="ruleForm.radio">
              <el-radio :label="3">备选项</el-radio>
              <el-radio :label="6">备选项</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注信息" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <div class="table_bottom">
        <page
          :data="schoolData.total"
          :curpage="page"
          @pageChange="doPageChange"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'seaStudent',
  data() {
    return {
      rules: {},
      options: [],
      ruleForm: {},
      dialogVisible: false,
      schoolData: [],
      page: 1,
      status: 3,
      datas: {},
      checked: '',
    }
  },
  mounted() {
    this.$api.dispenseList(this, 'schoolData')
    this.$api.getTeachBooksList(this, 'schoolData')
  },
  methods: {
    toMaterialJournal(ab) {
      console.log(ab)
      this.$router.push({
        path: '/eda/materialJournal',
        query: { id: ab.id },
      })
    },
    handleAdd() {
      this.dialogVisible = true
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
      this.$api.dispenseList(this, 'schoolData')
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
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.userTable {
  margin-top: 20px;
}
/deep/.timeCard {
  color: #666666;
}
/deep/.studentTag ul li {
  color: #666666;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
