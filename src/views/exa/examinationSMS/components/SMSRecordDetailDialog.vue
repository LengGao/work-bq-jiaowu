<template>
  <el-dialog
    title="消息详情"
    :visible.sync="visible"
    width="1000px"
    :close-on-click-modal="false"
    @closed="onClose"
    @open="onOpen"
  >
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
          prop="user_realname"
          label="姓名"
          show-overflow-tooltip
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="user_nicename"
          label="昵称"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="telphone"
          label="手机号"
          show-overflow-tooltip
          min-width="130"
        ></el-table-column>
        <el-table-column
          prop="result_name"
          label="发生结果"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="reason"
          label="失败原因"
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
              <el-button type="text" @click="resendMessage(row.id)"
                >重发</el-button
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
        @pageChange="handlePageChange"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getExaminationMessageRecordList, resendMessage } from "@/api/exa";
export default {
  name: "SMSRecordDetailDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      listData: [],
      listLoading: false,
      listTotal: 0,
      pageNum: 1,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    // 消息重发
    async resendMessage(id) {
      const data = { id };
      const res = await resendMessage(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getExaminationMessageRecordList();
      }
    },
    onOpen() {
      this.getExaminationMessageRecordList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getExaminationMessageRecordList();
    },
    // 获取列表
    async getExaminationMessageRecordList() {
      const data = {
        page: this.pageNum,
        em_id: this.id,
      };
      this.listLoading = true;
      const res = await getExaminationMessageRecordList(data);
      this.listLoading = false;
      if (res.code === 0) {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
      }
    },
    onClose() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.msg {
  padding: 10px 0;
}
</style>