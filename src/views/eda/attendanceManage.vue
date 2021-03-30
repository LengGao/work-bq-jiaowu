<template>
  <section>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>
    <section class="mainwrap">
      <div class="header">
        <!-- <el-checkbox v-model="checked">显示未归档学生</el-checkbox> -->
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
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
            prop="telphone"
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
            prop="class_list"
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
          <el-table-column
            prop="teaching_type"
            label="授课方式"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="">
              <div></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="schoolroom_name"
            label="上课教室"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="staff_list"
            label="跟班人员"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="class_list"
            label="课节数量"
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
                <!-- <el-button type="text" @click="dialoShow">排班详情</el-button> -->
                <div>
                  <el-button type="text" @click="callinClass(scope.row)"
                    >上课点名</el-button
                  >
                  <el-button type="text" @click="handleAdd(scope.row)"
                    >签到码</el-button
                  >
                  <el-button type="text" @click="handleAdd(scope.row)"
                    >考勤统计</el-button
                  >
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="提示" :visible.sync="detailVisible" width="40%">
        <!-- <span>这是一段信息</span> -->
        <el-table
          ref="multipleTable"
          :data="schoolData"
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
          ></el-table-column>
          <el-table-column
            prop="user_realname"
            label="上课日期"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="user_realname"
            label="上课时间"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="user_realname"
            label="状态"
            min-width="110"
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
                <el-button type="text" @click="dialoShow">排班详情</el-button>
                <div>
                  <el-button type="text" @click="toCallinClass(scope.row)"
                    >上课点名</el-button
                  >
                  <el-button type="text" @click="toSinCode(scope.row)"
                    >签到码</el-button
                  >
                  <el-button
                    type="text"
                    @click="toAttendanceStatistics(scope.row)"
                    >考勤统计</el-button
                  >
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" style="display:flex;justify-content:center">
          <el-button @click="detailVisible = false" type="primary"
            >关 闭</el-button
          >
          <!-- <el-button type="primary" @click="detailVisible = false"
            >确 定</el-button
          > -->
        </span>
      </el-dialog>
    </section>
  </section>
</template>

<script>
import { getWorkPageList } from '@/api/eda'
export default {
  name: 'attendanceManage',
  data() {
    return {
      searchOptions: [
        {
          key: 'date',
          type: 'datePicker',
          attrs: {
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            'value-format': 'yyyy-MM-dd',
          },
        },

        {
          key: 'cate_id',
          type: 'cascader',
          events: {
            change: this.handleTypeChange,
          },
          attrs: {
            placeholder: '所属分类',
            clearable: true,
            options: [],
          },
        },
        {
          key: 'project_id',
          type: 'select',
          options: [],
          optionValue: 'project_id',
          optionLabel: 'project_name',
          attrs: {
            placeholder: '所属项目',
            clearable: true,
          },
        },
        {
          key: 'class_id',
          type: 'select',
          options: [],
          optionValue: 'classroom_id',
          optionLabel: 'classroom_name',
          attrs: {
            placeholder: '所属班级',
            clearable: true,
          },
        },
        {
          key: 'foid',
          type: 'cascader',
          attrs: {
            placeholder: '推荐机构',
            clearable: true,
            options: [],
          },
        },

        {
          key: 'search_box',
          attrs: {
            placeholder: '学生姓名/手机号码',
          },
        },
      ],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        type: 0,
        date: '',
        cate_id: '',
        project_id: '',
        class_id: '',
        foid: [],
        search_box: '',
      },
    }
  },
  mounted() {
    this.getWorkPageList()
  },
  methods: {
    // 获学员列表
    async getWorkPageList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      }
      delete data.date
      this.listLoading = true
      const res = await getWorkPageList(data)
      this.listLoading = false
      this.listData = res.data.list
      this.listTotal = res.data.total
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
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
