<template>
  <div>
    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <el-button type="primary" @click="createReturnVisit"
          >添加回访记录</el-button
        >
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
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="序号" width="50" type="index">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="回访时间"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="follow_user_name"
            label="回访人"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="state_rate"
            label="回访数量"
            min-width="110"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="update_time"
            label="最后更新时间"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="toReturnVisitDetail(row.id)"
                  >查看详情</el-button
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
    </section>
  </div>
</template>

<script>
import { getReturnVisit, createReturnVisit } from "@/api/eda";
export default {
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        date: "",
        staff_name: "",
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
          },
        },
        {
          key: "staff_name",
          attrs: {
            placeholder: "回访人姓名",
          },
        },
      ],

      currentId: "",
      dialogTitle: "添加班级",
      dialogVisible: false,
      typeOptions: [],
    };
  },

  created() {
    this.getReturnVisit();
  },

  methods: {
    async createReturnVisit() {
      const data = {
        class_id: this.$route.query?.id || "",
      };
      const res = await createReturnVisit(data);
      if (res.code === 0) {
        this.toReturnVisitDetail(res.data?.id || "", 1);
      }
    },
    handleSearch(data) {
      const times = data.date || ["", ""];
      this.pageNum = 1;
      this.searchData = {
        ...data,
        start_time: times[0],
        end_time: times[1],
      };
      this.getReturnVisit();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getReturnVisit();
    },
    async getReturnVisit() {
      const data = {
        class_id: this.$route.query?.id || "",
        page: this.pageNum,
        ...this.searchData,
      };
      delete data.date;
      this.listLoading = true;
      const res = await getReturnVisit(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    toReturnVisitDetail(id, isAdd) {
      this.$router.push({
        name: "returnVisitDetail",
        query: {
          class_id: this.$route.query?.id || "",
          id,
          isAdd,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>
