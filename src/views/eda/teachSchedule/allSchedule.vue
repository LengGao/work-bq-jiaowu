<template>
  <section class="mainwrap">
    <div class="header">
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <el-button type="primary" @click="exportTable">导出排课表</el-button>
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
          prop="id"
          label="序号"
          show-overflow-tooltip
          min-width="50"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="上课日期"
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="week"
          label="星期"
          min-width="60"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="上课时间" min-width="150" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <div>
              {{ row.period }}
            </div>
          </template>
        </el-table-column>

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
            <div :class="scope.row.teaching_type == 1 ? 'red' : 'blue'">
              {{ scope.row.teaching_type | teaching_type }}
            </div>
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
          prop="classStatus"
          label="上课状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div :class="row.classStatusNum == 1 ? 'red' : 'grey'">
              {{ row.classStatus }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注信息"
          min-width="100"
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
    <!--导出提示框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <span>数据导出成功，请点击下载按钮下载Excel表格</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportData">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import {
  getAllForPageList,
  getcourseallclass,
  getTeacherList,
  getRoomSelect,
} from '@/api/eda'
// import { formatTime2 } from '@/utils/index'

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
          key: 'teacher_id',
          type: 'select',
          options: [],
          optionValue: 'teacher_id',
          optionLabel: 'teacher_name',
          attrs: {
            placeholder: '上课老师',
            clearable: true,
          },
        },
        {
          key: 'teaching_type',
          type: 'select',
          options: [
            { value: 1, name: '面授' },
            { value: 2, name: '直播' },
          ],
          optionValue: 'value',
          optionLabel: 'name',
          attrs: {
            placeholder: '授课方式',
            clearable: true,
          },
        },
        {
          key: 'schoolroom_id',
          type: 'select',
          options: [],
          optionValue: 'id',
          optionLabel: 'room_name',
          attrs: {
            placeholder: '教室',
            clearable: true,
          },
        },
      ],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        classroom_id: '',
        teacher_id: '',
        teaching_type: '',
        schoolroom_id: '',
      },
    }
  },
  mounted() {
    this.getAllForPageList()
    this.getcourseallclass()
    this.getTeacherList()
    this.getRoomSelect()
    // this.$api.getAllForPageList(this, 'schoolData')
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
    // 获取班级下拉
    async getcourseallclass() {
      const data = {}
      const res = await getcourseallclass(data)
      if (res.code === 0) {
        this.classOptions = res.data
        this.searchOptions[1].options = res.data
      }
    },
    handlePageChange(val) {
      this.pageNum = val
      this.getAllForPageList()
    },
    handleSearch(data) {
      console.log(data)
      const times = data.date || ['', '']
      delete data.date
      this.pageNum = 1
      this.searchData = {
        ...data,
        start_time: times[0],
        end_time: times[1],
      }
      this.getAllForPageList()
    },
    // 获取班级老师
    async getTeacherList() {
      const data = {}
      const res = await getTeacherList(data)
      if (res.code === 0) {
        this.classOptions = res.data
        console.log(res.data)
        this.searchOptions[2].options = res.data
      }
    },
    // 获取教室选择列表
    async getRoomSelect() {
      const data = {}
      const res = await getRoomSelect(data)
      if (res.code === 0) {
        this.classOptions = res.data
        console.log(res.data)
        this.searchOptions[4].options = res.data
      }
    },
    //判断多少天后上课
    formatTime2(time, option) {
      time = +time * 1000
      const d = new Date(time)
      const now = Date.now()
      const diff = (d - now) / 1000
      if (diff < 30) {
        return '将上课'
      } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟后上课'
      } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时后上课'
      } else if (diff < 3600 * 24 * 2) {
        return '1天后上课'
      }
      if (option) {
        return parseTime(time, option)
      } else {
        return (
          d.getMonth() +
          1 +
          '月' +
          d.getDate() +
          '日' +
          d.getHours() +
          '时' +
          d.getMinutes() +
          '分' +
          '后上课'
        )
      }
    },
    // 获全部排课列表
    async getAllForPageList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      }
      delete data.date
      this.listLoading = true
      const res = await getAllForPageList(data)
      this.listLoading = false
      var nowday = parseInt(new Date().getTime() / 1000)
      console.log(nowday)

      for (var item of res.data.list) {
        console.log(nowday < item.start_time)
        console.log(item.start_time)
        if (nowday < item.start_time) {
          item.classStatus = this.formatTime2(item.start_time)
        } else if (nowday >= item.start_time && nowday < item.end_time) {
          item.classStatus = '上课中'
          item.classStatusNum = 1
        } else {
          console.log(item.start_time)
          item.classStatus = '已上课'
          item.classStatusNum = 2
        }
        // console.log(item.classStatus)
        // if (item.frist_class_time != 0) {
        //   item.frist_class_time = this.$moment
        //     .unix(item.frist_class_time)
        //     .format('YYYY-MM-DD')
        // } else {
        //   item.frist_class_time = '未确定时间'
        // }
      }
      this.listData = res.data.list

      this.listTotal = res.data.total
    },
    exportTable() {
      this.$api.exportExcelSchedule(this, 'myclient')
    },
    exportData() {
      console.log(this.url)
      window.location.href = this.url
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
.table_bottom {
  text-align: right;
}
.red {
  color: $error_color;
}
.blue {
  color: #199fff;
}
.grey {
  color: #ccc;
}
</style>
