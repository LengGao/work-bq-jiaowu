<template>
  <div class="institution-account">
    <div class="head_remind">*管理第三方入驻机构的账号信息</div>
    <div class="container">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary">添加机构</el-button>
        </div>
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
            label="机构ID"
            show-overflow-tooltip
            min-width="70"
            align="center"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            label="机构名称"
            show-overflow-tooltip
            min-width="70"
            align="center"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            prop="user_realname"
            label="负责人"
            min-width="160"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toStudentDetail(row.uid)">
                {{ row.user_realname }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号码"
            min-width="140"
            align="center"
          >
            <template slot-scope="{ row }">
              <PartiallyHidden :value="row.telphone" />
            </template>
          </el-table-column>
          <el-table-column
            prop="classroom_name"
            label="开通小程序"
            min-width="140"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="first_time"
            label="开通H5"
            min-width="140"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="last_time"
            label="账户余额"
            align="center"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="duration"
            label="入驻时间"
            align="center"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="机构状态"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.is_publish"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="2"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            min-width="160"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toDetails(row)"
                >机构详情</el-button
              >
              <el-button type="text" @click="toDetails(row)">充值</el-button>
              <el-button type="text" @click="toDetails(row)">删除</el-button>
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
  </div>
</template>

<script>
import { courseUserVideoStatisticsList } from "@/api/sou";
import { getShortcuts } from "@/utils/date";
import PartiallyHidden from "@/components/PartiallyHidden/index";
export default {
  name: "studentList",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        search_box: "",
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
        {
          key: "search_box",
          attrs: {
            placeholder: "机构名称/负责人/手机号码",
          },
        },
      ],
      exportLoading: false,
    };
  },

  created() {
    this.courseUserVideoStatisticsList();
  },
  methods: {
    toDetails(row) {
      this.$router.push({
        name: "institutionDetails",
        query: {
          id: row.id,
        },
      });
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.courseUserVideoStatisticsList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.courseUserVideoStatisticsList();
    },
    async courseUserVideoStatisticsList() {
      const data = {
        page: this.pageNum,
        course_id: 144,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await courseUserVideoStatisticsList(data);
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
.container {
  padding: 20px;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>
