<template>
  <div class="institution-user-manage">
    <!--搜索模块-->
    <div class="college-student-search">
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
        style="width: 100%"
        class="min_table"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          label="ID"
          show-overflow-tooltip
          min-width="70"
          align="center"
          prop="uid"
        >
        </el-table-column>

        <el-table-column
          prop="nickname"
          label="学生姓名"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toStudentDetail(row.uid)">
              {{ row.nickname }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="140"
          align="center"
        >
          <template slot-scope="{ row }">
            <PartiallyHidden :value="row.mobile" />
          </template>
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="归属人"
          min-width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="注册时间"
          min-width="140"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_list"
          label="课程名称"
          min-width="180"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div v-if="row.course_list">
              {{ row.course_list }}
            </div>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="question_bank_list"
          label="题库名称"
          min-width="180"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div v-if="row.question_bank_list">
              {{ row.question_bank_list }}
            </div>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_pay"
          label="报名状态"
          min-width="140"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag
              size="small"
              type="text"
              :style="{ color: statusMap[row.is_pay].color }"
            >
              {{ statusMap[row.is_pay || 0].text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="160"
        >
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="toStudentDetail(row.uid)"
                >学生详情</el-button
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
    </div>
  </div>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { Organizationstudents } from "@/api/institution";
export default {
  name: "InsitutionStudent",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      statusMap: {
        0: {
          color: "#FD6500",
          text: "未报名",
        },
        1: {
          color: "#43D100",
          text: "已报名",
        },
      },
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        keyword: "",
        admin_id: "",
        date: "",
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
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        // {
        //     key: "is_pay",
        //     type: "select",
        //     width: 120,
        //     options: [
        //       {
        //         value: 0,
        //         label: "未报名",
        //       },
        //       {
        //         value: 1,
        //         label: "已报名",
        //       },
        //     ],
        //     attrs: {
        //       clearable: true,
        //       placeholder: "报名状态",
        //     },
        //   },
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
    };
  },

  created() {
    this.Organizationstudents();
  },
  methods: {
    // toDetails(row) {
    //   this.$router.push({
    //     name: "institutionDetails",
    //     query: {
    //       id: row.id,
    //     },
    //   });
    // },
    handleSearch(data) {
      const times = data.date || ["", ""];
      console.log(times);
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        start_time: times[0],
        end_time: times[1],
      };
      console.log(this.searchData);
      this.Organizationstudents();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.Organizationstudents();
    },
    // 学生列表
    async Organizationstudents() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        org_id: this.$route.query?.institution_id || "",
      };
      this.listLoading = true;
      const res = await Organizationstudents(data);
      this.listLoading = false;
      this.listData = res.data.list;
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
.institution-user-manage {
  padding: 20px;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.institution-user-manage[data-v-53ad5394] {
  padding: 10px 20px 20px 0;
}
</style>
