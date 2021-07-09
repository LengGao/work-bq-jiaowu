<template>
  <div class="SMS-record-list">
    <!--搜索模块-->
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
    <!--列表-->
    <div class="userTable">
      <el-table
        :data="listData"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        tooltip-effect="light"
        stripe
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="id"
          label="ID"
          show-overflow-tooltip
          width="90"
        ></el-table-column>
        <el-table-column
          prop="message_title"
          label="消息标题"
          show-overflow-tooltip
          min-width="160"
        ></el-table-column>
        <el-table-column
          prop="total"
          label="发送总数"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="success"
          label="成功"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="fail"
          label="失败"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="发送人"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="发送时间"
          show-overflow-tooltip
          min-width="150"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="140">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button
                type="text"
                @click="openSMSContent(row.message_content)"
                >消息详情</el-button
              >
              <el-button type="text" @click="openSMSdetail(row.id)"
                >记录详情</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table_bottom">
      <page
        :data="listTotal"
        :curpage="pageNum"
        @pageSizeChange="handleSizeChange"
        @pageChange="handlePageChange"
      />
    </div>
    <SMSDetailDialog v-model="dialogVisible" :content="smsContent" />
    <SMSRecordDetailDialog v-model="detailVisible" :id="currentId" />
  </div>
</template>

<script>
import SMSDetailDialog from "./SMSDetailDialog.vue";
import SMSRecordDetailDialog from "./SMSRecordDetailDialog.vue";
import { getExaminationMessageList } from "@/api/exa";
export default {
  name: "SMSRecordList",
  components: {
    SMSDetailDialog,
    SMSRecordDetailDialog,
  },
  data() {
    return {
      searchOptions: [
        {
          key: "search_box",
          attrs: {
            placeholder: "消息标题",
          },
        },
      ],
      searchData: {
        search_box: "",
      },
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      currentId: "",
      smsContent: "",
      dialogVisible: false,
      detailVisible: false,
    };
  },
  created() {
    this.getExaminationMessageList();
  },
  methods: {
    openSMSdetail(id) {
      this.currentId = id;
      this.detailVisible = true;
    },
    openSMSContent(content) {
      this.smsContent = content;
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = { ...data };
      this.getExaminationMessageList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getExaminationMessageList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getExaminationMessageList();
    },
    // 获取列表
    async getExaminationMessageList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        id: this.$route.query.id,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getExaminationMessageList(data);
      this.listLoading = false;
      if (res.code === 0) {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>