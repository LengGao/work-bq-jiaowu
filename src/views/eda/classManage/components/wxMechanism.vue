<template>
  <div class="class-detail">
    <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <el-button type="primary">添加通知</el-button>
      </div>
       <!--表格-->
    <el-table
    ref="multipleTable"
    :data="listData"
    style="width: 100%;margin-top: 10px;"
    class="min_table"
    v-loading="listLoading"
    element-loading-text="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#fff"
    :header-cell-style="{ 'text-align': 'center' }"
    :cell-style="{ 'text-align': 'center' }"
  >
    <el-table-column
      label="序号"
      show-overflow-tooltip
      min-width="60"
      align="center"
      prop="uid"
    >
    </el-table-column>
    <el-table-column
      prop="surname"
      label="通知标题"
      min-width="80"
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="通知内容"
      min-width="130"
      align="center"
    >
      <template slot-scope="{ row }">
        <PartiallyHidden :value="row.mobile" />
      </template>
    </el-table-column>
    <el-table-column
      prop="group_id"
      label="发送状态"
      min-width="100"
      align="center"
      show-overflow-tooltip
    >
      <template slot-scope="{ row }">
        <div v-if="row.group_id">
          {{ row.group_id }}
        </div>
        <span v-else>--</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="course_list"
      label="发送时间"
      min-width="180"
      align="center"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      prop="question_bank_list"
      label="机构名称"
      min-width="150"
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
      prop="course_list"
      label="已读人数"
      min-width="180"
      align="center"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      label="操作"
      fixed="right"
      align="center"
      min-width="140"
    >
    <template slot-scope="{ row }">
      <el-button
        type="text"
        @click="linkTo('signUp', { aid: row.id, uid: row.uid })"
        >消息详情</el-button
      >
      <el-button type="text" @click="toStudentDetail(row.uid)"
        >发送记录</el-button
      >
    </template>
      <!-- <template slot-scope="{ row }">
        <el-button
          type="text"
          @click="linkTo('signUp', { aid: row.id, uid: row.uid })"
          >报名</el-button
        >
        <el-button type="text" @click="toStudentDetail(row.uid)"
          >学生详情</el-button
        >
      </template> -->
    </el-table-column>
  </el-table>
  <div class="table_bottom">
   <page
     :data="listTotal"
     :curpage="pageNum"
     @pageChange="handlePageChange"
     style="margin-left: auto;"
   />
 </div>

  </div>
</template>

<script>
import { getShortcuts } from "@/utils/date";
export default {
  name: "wxMechanism",
  data() {
    return {
      activeName: "wxMechanism",
      listData:[],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
  
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            value: "",
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        {
          key: "type",
          type: "select",
          width: 120,
          options: [
            {
              value: 0,
              label: "待发送",
            },
            {
              value: 1,
              label: "已发送",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "通知状态",
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "通知标题",
          },
        },
      ],
    };
  },
 
  methods: {
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        category_id: data.category_id.pop(),
      };
      this.getClassList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getClassList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassList();
    },
  },
};
</script>

<style lang='scss' scoped>
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>