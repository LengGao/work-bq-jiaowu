<template>
  <section>
    <div class="head_remind">
      *本模块主要用于学生的排班上课，同时配置上课老师和教室。
    </div>
    <section class="mainwrap">
      <div class="head-search">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary" @click="toAddSchedule">
            添加排课
          </el-button>
          <el-button type="primary" @click="toAllSchedule">
            查看全部排课
          </el-button>
        </div>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="序号"
            show-overflow-tooltip
            min-width="90"
            prop="project_id"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.$index + 1 }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="classroom_name"
            label="班级名称"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div
                class="classroom_name"
                @click="toClassDetail(row.classroom_id)"
              >
                {{ row.classroom_name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div v-if="row.category_name">
                {{ row.category_name }}
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="学生数" min-width="110" show-overflow-tooltip>
            <template slot-scope="{ row }">
              <div class="studentNumber" @click="showStudent(row.classroom_id)">
                {{ row.total_people }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="frist_class_time"
            label="开课日期"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="last_class_time"
            label="结束日期"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="statue_name"
            label="开课状态"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div
                :class="{
                  green: scope.row[scope.column.property] === '开课中',
                  red: scope.row[scope.column.property] === '已结束',
                }"
              >
                {{ scope.row.statue_name }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="toTimetablePreview(scope.row)"
                  >课表预览</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
        <StudentDialog v-model="studentdialogShow" :class_id="class_id" />
      </div>
    </section>
  </section>
</template>

<script>
import StudentDialog from "./teachSchedule/components/studentDialog";
import { getTimetableList, getCateList } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
import { getcourseallclass } from "@/api/eda";
export default {
  name: "teachSchedule",
  components: {
    StudentDialog,
  },
  data() {
    return {
      listData: [],

      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      class_id: "",
      searchData: {
        category_id: [],
        keyword: "",
        classroom_id: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
          },
        },
        {
          key: "category_id",
          type: "cascader",
          width: 120,
          attrs: {
            placeholder: "所属分类",
            clearable: true,
            options: [],
          },
        },
        // {
        //   key: 'classroom_id',
        //   type: 'select',
        //   options: [],
        //   optionValue: 'classroom_id',
        //   optionLabel: 'classroom_name',
        //   attrs: {
        //     placeholder: '所属班级',
        //     clearable: true,
        //   },
        // },
        {
          key: "keyword",
          attrs: {
            placeholder: "请输入所属班级",
          },
        },
      ],
      schoolData: [],
      cateOptions: [],

      page: 1,
      studentdialogShow: false,
    };
  },
  created() {
    this.getcourseallclass();
    this.getCateList();
    this.getTimetableList();
    // this.$api.getTimetableList(this, 'schoolData')
  },
  methods: {
    // 获取班级下拉
    async getcourseallclass() {
      const data = {};
      const res = await getcourseallclass(data);
      if (res.code === 0) {
        this.classOptions = res.data;
        this.searchOptions[2].options = res.data;
      }
    },
    showStudent(classroom_id) {
      this.studentdialogShow = true;
      this.class_id = classroom_id;
      console.log(this.class_id);
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getTimetableList();
    },
    handleSearch(data) {
      console.log(data);
      const times = data.date || ["", ""];
      console.log(times);
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        start_time: times[0],
        end_time: times[1],

        category_id: data.category_id ? data.category_id.pop() : "",
      };
      this.getTimetableList();
    },
    // 获取所属分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = this.cateOptions = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    async getTimetableList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        // category_id: this.searchData.category_id.pop(),
      };
      this.listLoading = true;
      const res = await getTimetableList(data);
      this.listLoading = false;
      for (var item of res.data.list) {
        if (item.frist_class_time != 0) {
          item.frist_class_time = this.$moment
            .unix(item.frist_class_time)
            .format("YYYY-MM-DD");
        } else {
          item.frist_class_time = "未确定时间";
        }
        if (item.last_class_time != 0) {
          item.last_class_time = this.$moment
            .unix(item.last_class_time)
            .format("YYYY-MM-DD");
        } else {
          item.last_class_time = "未确定时间";
        }
      }
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },

    toTimetablePreview(ab) {
      console.log(ab);

      this.$router.push({
        path: "/eda/timetablePreview",
        query: {
          param: JSON.stringify(ab),
        },
      });
    },

    toAllSchedule() {
      this.$router.push({
        path: "/eda/allSchedule",
      });
    },
    toAddSchedule() {
      this.$router.push({
        path: "/eda/addSchedule",
      });
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
.studentNumber {
  color: #199fff;
  cursor: pointer;
}
.table_bottom {
  text-align: right;
}
.classroom_name {
  color: #199fff;
  cursor: pointer;
}
.green {
  color: #43d100;
}
.unqualified {
  color: #fd6500;
}
.red {
  color: $error_color;
}
.blue {
  color: #199fff;
}
</style>
