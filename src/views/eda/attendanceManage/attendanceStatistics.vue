<template>
  <section class="mainwrap">
    <div class="flex">
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <el-button type="primary" @click="exportAttend">导出考勤</el-button>
    </div>
    <div class="headInfo">
      <p>
        上课日期 <span>{{ infoData.date }}</span>
      </p>
      <p>
        上课时间 <span>{{ infoData.period }}</span>
      </p>
      <p class="classroom">
        班级名称
        <span>{{ infoData.classroom }}</span>
      </p>
      <p>
        上课老师 <span>{{ infoData.teacher_name }}</span>
      </p>
      <p>
        授课方式 <span>{{ infoData.teaching_type | teaching_type }}</span>
      </p>
    </div>
    <el-row class="dataPanel" style="">
      <template>
        <el-col :lg="{ span: '4-8' }">
          <div class="timeCard">
            <div>
              <h3>学生人数</h3>
              <div class="time_num">
                {{ infoData.total_people }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="{ span: '4-8' }">
          <div class="timeCard">
            <div>
              <h3>出勤人数</h3>
              <div class="time_num">
                {{ infoData.attendance_num }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="{ span: '4-8' }">
          <div class="timeCard">
            <div>
              <h3>缺勤人数</h3>
              <div class="time_num">
                {{ infoData.absenteeism_num }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="{ span: '4-8' }">
          <div class="timeCard">
            <div>
              <h3>未点名人数</h3>
              <div class="time_num">
                {{ infoData.not_named_num }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="{ span: '4-8' }">
          <div class="timeCard">
            <div>
              <h3>出勤率</h3>
              <div class="time_num">
                {{ infoData.rate }}
              </div>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>

    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column label="序号" min-width="110" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="学生姓名"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="classroom_name"
          label="所属班级"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sign_type"
          label="考勤情况"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div>
              {{ row.sign_type | sign_type }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注信息"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </section>
</template>

<script>
import {
  getClassHourStatistics,
  ClassHourStudentStatistics,
  getcourseallclass,
  classroomSignExportExcel,
} from '@/api/eda'
export default {
  name: '',
  data() {
    return {
      searchOptions: [
        {
          key: 'classroom_id',
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
          key: 'sign_type',
          type: 'select',
          options: [
            { value: 0, lable: '未签到' },
            { value: 1, lable: '缺勤' },
            { value: 2, lable: '已到课' },
          ],
          optionValue: 'value',
          optionLabel: 'lable',
          attrs: {
            placeholder: '考勤情况',
            clearable: true,
          },
        },
        {
          key: 'value',
          attrs: {
            placeholder: '学生姓名/手机号码',
          },
        },
      ],
      listData: [],
      infoData: {},
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        value: '',
        classroom_id: '',
        sign_type: '',
      },
      classroomData: {},
      analysis: {},
      class_hour_id: '',
      arrange_id: '',
    }
  },
  filters: {
    sign_type(val) {
      switch (val) {
        case 0:
          return '未签到'
          break
        case 1:
          return '缺勤'
          break
        case 2:
          return '已到课'
          break
        default:
          return '未知'
      }
    },
    teaching_type(val) {
      switch (val) {
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
  created() {
    this.class_hour_id = this.$route.query.class_hour_id
    this.arrange_id = this.$route.query.arrange_id
    this.getClassHourStatistics()
    this.ClassHourStudentStatistics()
    this.getcourseallclass()
  },
  methods: {
    exportAttend() {
      this.classroomSignExportExcel()
    },
    handlePageChange(val) {
      this.pageNum = val
      this.ClassHourStudentStatistics()
    },
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = {
        ...data,
      }
      this.ClassHourStudentStatistics()
    },
    // 获取班级下拉
    async getcourseallclass() {
      const data = {}
      const res = await getcourseallclass(data)
      if (res.code === 0) {
        this.searchOptions[0].options = res.data
      }
    },
    //导出考勤
    async classroomSignExportExcel() {
      const data = {
        class_hour_id: this.class_hour_id,
        arrange_id: this.arrange_id,
      }
      const res = await classroomSignExportExcel(data)
      if (res.code == 0) {
        this.$message.success(res.message)
        window.location.href = res.data.url
      }
      // this.infoData = res.data
    },

    async getClassHourStatistics() {
      const data = {
        class_hour_id: this.class_hour_id,
        arrange_id: this.arrange_id,
      }
      const res = await getClassHourStatistics(data)
      this.infoData = res.data
    },

    async ClassHourStudentStatistics() {
      const data = {
        class_hour_id: this.class_hour_id,
        arrange_id: this.arrange_id,
        page: this.pageNum,
        ...this.searchData,
      }

      this.listLoading = true
      const res = await ClassHourStudentStatistics(data)
      this.listLoading = false
      this.listData = res.data.list
      // console.log(this.listData)
      this.listTotal = res.data.total
    },
  },
}
</script>

<style lang="scss" scoped>
.userTable {
  margin-top: 20px;
  /deep/.el-table__header th,
  .el-table__header tr {
    background-color: #f8f8f8;
    color: #909399;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.headInfo {
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #999999;
  width: 80%;
  display: flex;
  justify-content: space-between;
  // padding-top: 20px;
  margin-top: 5px;
  span {
    margin-left: 10px;
    color: #666666;
  }
}
.dataPanel {
  margin-top: 20px;
  .timeCard {
    width: 90%;
    height: 90px;
    border: 1px solid #ccc;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px;
    h3 {
      font-weight: 400;
      font-style: normal;
      color: #606266;
      text-align: center;
    }
    .time_num {
      padding-top: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      font-family: 'Microsoft YaHei UI', sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 24px;
      color: #606266;
      text-align: center em {
        font-size: 20px;
      }
    }
  }
}
.el-col-lg-4-8 {
  width: 20%;
}
.classroom {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 500px;
  min-width: 300px;
}
</style>
