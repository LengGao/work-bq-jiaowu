<template>
  <section>
    <div class="head_remind">*本模块用于学生的上课点名签到和考勤统计管理。</div>
    <section class="mainwrap">
      <div class="header">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          tooltip-effect="light"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          stripe
          style="width: 100%"
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
          >
            <template slot-scope="{ row }">
              <div>
                {{ row.start_time | weekType }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="start_time"
            label="上课时间"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>
                {{ row.start_time + " ~ " + row.end_time }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="class_list"
            label="班级名称"
            min-width="300"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button
                type="text"
                @click="toClassDetail(id)"
                v-for="(id, index) in row.class_id_list"
                :key="index"
                >{{ getClassRoomName(row.class_list, index) }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="teacher_name"
            label="上课老师"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="授课方式"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div>
                {{ row.teaching_type | teaching_type }}
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
            prop="staff_list"
            label="跟班人员"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="状态" min-width="100" show-overflow-tooltip>
            <template slot-scope="{ row }">
              <div :style="row.state == 1 ? 'color:#43d100' : 'color:#fd6500'">
                {{ row.state | state }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="people_number"
            label="学生人数"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="class_hour_number"
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
            <template slot-scope="{ row }">
              <div class="operation_btn">
                <el-button
                  type="text"
                  @click="scheduleShow(row)"
                  v-if="row.class_hour_number > 1"
                  >排班详情</el-button
                >
                <div v-if="row.class_hour_number == 1">
                  <el-button type="text" @click="callinClass(row)"
                    >上课点名</el-button
                  >
                  <el-button type="text" @click="signShow(row)"
                    >签到码</el-button
                  >
                  <el-button type="text" @click="toStatistics(row)"
                    >考勤统计</el-button
                  >
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageSizeChange="handleSizeChange"
            @pageChange="handlePageChange"
          />
        </div>
        <ScheduleDialog
          v-model="scheduleVisible"
          :arrange_id="arrange_id"
          :classDate="classDate"
          :classInfoData="classInfoData"
        />
        <SignCode
          v-model="signVisible"
          :arrange_id="arrange_id"
          :class_hour_id="class_hour_id"
        />
      </div>
    </section>
  </section>
</template>

<script>
import { getWorkPageList, getTeacherList, getcourseallclass } from "@/api/eda";
import { getweek, timestampToTime } from "@/utils/index";
import ScheduleDialog from "./attendanceManage/components/ScheduleDialog";
import SignCode from "./attendanceManage/components/SignCode";
export default {
  name: "attendanceManage",
  components: {
    ScheduleDialog,
    SignCode,
  },
  data() {
    return {
      signVisible: false,
      schoolData: [],
      scheduleVisible: false,
      classDate: "",
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            "value-format": "yyyy-MM-dd",
          },
        },

        {
          key: "classroom_id",
          type: "select",
          options: [],
          optionValue: "classroom_id",
          optionLabel: "classroom_name",
          attrs: {
            placeholder: "所属班级",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "teacher_id",
          type: "select",
          options: [],
          optionValue: "teacher_id",
          optionLabel: "teacher_name",
          attrs: {
            placeholder: "上课老师",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "teacher_type",
          type: "select",
          options: [
            { value: 1, lable: "面授" },
            { value: 2, lable: "直播" },
          ],
          optionValue: "value",
          optionLabel: "lable",
          attrs: {
            placeholder: "授课方式",
            clearable: true,
            filterable: true,
          },
        },
        // {
        //   key: 'teacher_type',
        //   type: 'select',
        //   options: [
        //     { value: 0, lable: '未签到' },
        //     { value: 1, lable: '缺勤' },
        //     { value: 2, lable: '已到课' },
        //   ],
        //   optionValue: 'value',
        //   optionLabel: 'lable',
        //   attrs: {
        //     placeholder: '状态',
        //     clearable: true,
        //   },
        // },

        // {
        //   key: 'search_box',
        //   attrs: {
        //     placeholder: '学生姓名/手机号码',
        //   },
        // },
      ],
      arrange_id: "",
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      class_hour_id: "",
      searchData: {
        teacher_id: "",
        teacher_type: "",
        date: "",
        classroom_id: "",
      },
      classInfoData: {},
    };
  },
  filters: {
    teaching_type(val) {
      switch (val) {
        case 1:
          return "面授";
          break;
        case 2:
          return "直播";
          break;
        default:
          return "未知";
      }
    },
    start_time(val) {
      if (!val) return "--";
      return val.substr(11, 5);
    },
    weekType(val) {
      return getweek(val);
    },
    state(val) {
      switch (val) {
        case 0:
          return "未上课";
          break;
        case 1:
          return "已上课";
          break;

        default:
          return "未知";
      }
    },
  },
  mounted() {
    this.getcourseallclass();
    this.getTeacherList();
    this.getWorkPageList();
  },
  methods: {
    getClassRoomName(str, index) {
      if (!str) return "";
      const arr = str.split(",");
      return arr[index];
    },
    toStatistics(row) {
      this.$router.push({
        path: "/eda/attendanceStatistics",
        query: {
          class_hour_id: row.class_hour_list[0],
          arrange_id: row.id,
        },
      });
    },
    signShow(row) {
      console.log();
      this.arrange_id = row.id;
      this.class_hour_id = row.class_hour_list[0];
      this.signVisible = true;
    },
    callinClass(row) {
      let obj = {
        date: row.date,
        start_time: row.start_time,
        classroom_name: row.classroom_name,
        people_number: row.people_number,
      };
      this.$router.push({
        path: "/eda/callinClass",
        query: {
          class_hour_id: row.class_hour_list[0],
          arrange_id: row.id,
          param: JSON.stringify(obj),
        },
      });
    },
    //打开排课详情弹框
    scheduleShow(row) {
      let obj = {
        date: row.date,
        start_time: row.start_time,
        classroom_name: row.classroom_name,
        people_number: row.people_number,
      };

      this.classInfoData = obj;
      console.log(this.classInfoData);
      this.arrange_id = row.id;
      this.classDate = row.date;
      this.scheduleVisible = true;
    },
    // 获取班级下拉
    async getcourseallclass() {
      const data = {};
      const res = await getcourseallclass(data);
      if (res.code === 0) {
        this.classOptions = res.data;
        this.searchOptions[1].options = res.data;
      }
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getWorkPageList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getWorkPageList();
    },
    handleSearch(data) {
      // console.log(data)
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        start_date: times[0].split("-").join(""),
        end_date: times[1].split("-").join(""),
      };
      this.getWorkPageList();
    },
    // 获取班级老师
    async getTeacherList() {
      const data = {};
      const res = await getTeacherList(data);
      if (res.code === 0) {
        this.classOptions = res.data;
        console.log(res.data);
        this.searchOptions[2].options = res.data;
      }
    },
    // 获学员列表
    async getWorkPageList() {
      const data = {
        limit: this.pageSize,
        page: this.pageNum,
        ...this.searchData,
      };
      delete data.date;
      this.listLoading = true;
      const res = await getWorkPageList(data);
      this.listLoading = false;
      for (var item of res.data.list) {
        item.date = timestampToTime(item.date);
        // console.log(item)
        item.start_time &&
          (item.start_time = this.$moment.unix(item.start_time).format("LT"));
        item.end_time &&
          (item.end_time = this.$moment.unix(item.end_time).format("LT"));
      }
      this.listData = res.data.list;

      // console.log(this.listData)
      this.listTotal = res.data.total;
    },
  },
};
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
.table_bottom {
  text-align: right;
}
.class_list {
  color: #199fff;
  cursor: pointer;
}
</style>
