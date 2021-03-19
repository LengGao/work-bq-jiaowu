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
      <!-- <el-checkbox v-model="checked">显示未归档学生</el-checkbox> -->
      <el-button type="primary" @click="exportTable">导出排课表</el-button>
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
          label="序号"
          show-overflow-tooltip
          min-width="90"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="上课日期"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="week"
          label="星期"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="start_time"
          label="上课时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="classroom_name"
          label="班级名称"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="teacher_name"
          label="上课老师"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="授课方式" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.teaching_type | teaching_type }}
          </template>
        </el-table-column>
        <el-table-column
          prop="schoolroom_name"
          label="上课教室"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="跟班人员"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注信息"
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
                >添加</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="schoolData.total"
          :curpage="page"
          @pageChange="doPageChange"
        />
      </div>
    </div>
    <!--导出提示框-->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>数据导出成功，请点击下载按钮下载Excel表格</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportData">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: 'seaStudent',
  data() {
    return {
      schoolData: [],
      dialogVisible: false,
      page: 1,
      status: 3,
      datas: {},
      checked: '',
      url: '',
    }
  },
  mounted() {
    this.$api.getAllForPageList(this, 'schoolData')
  },
  filters: {
    teaching_type(num) {
      switch (num) {
        case 1:
          return '面授'
          break
        case 2:
          return '直播'
          break
        default:
          return '未知'
      }
    },
  },
  methods: {
    exportTable() {
      this.$api.exportExcelSchedule(this, 'myclient')
    },
    exportData() {
      console.log(this.url)
      window.location.href = this.url
    },
    // exportData: function(val) {
    //   let self = this
    //   self.$message.success('正在导出数据，请勿重复提交！')
    //   location.href = self.$urls + '/arrange/exportExcel'
    //   console.log('点击的次数')
    // },
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
      this.$api.getAllForPageList(this, 'schoolData')
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
