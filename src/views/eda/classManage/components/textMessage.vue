<template>
  <div class="class-detail">
    <div class="client_head">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <el-popover trigger="click" popper-class="add-msg">
        <div class="btns">
          <el-button @click="openNoticeDialog({}, 1)" size="medium"
            >上课通知</el-button
          >
          <el-button @click="openNoticeDialog({}, 2)" size="medium"
            >考试通知</el-button
          >
          <el-button @click="openNoticeDialog({}, 3)" size="medium"
            >差生提醒</el-button
          >
        </div>
        <el-button slot="reference" icon="el-icon-caret-bottom" type="primary"
          >添加通知</el-button
        >
      </el-popover>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="listData"
      style="width: 100%; margin-top: 10px"
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
        prop="id"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="通知标题 "
        min-width="160"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="type_name"
        label="通知类型 "
        min-width="160"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="content_str"
        label="通知内容"
        min-width="200"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="send_status"
        label="发送状态"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-tag size="small" :type="statusMap[row.send_status].type">
            {{ statusMap[row.send_status].text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="send_time"
        label="发送时间"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <div v-if="row.send_time">
            {{ row.send_time }}
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="success"
        label="发送总数/成功/失败"
        min-width="120"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          {{ row.total }} /
          <span style="color: rgb(0, 173, 0)">{{ row.success }} </span>/
          <span style="color: orange">{{ row.fail }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="140"
      >
        <template slot-scope="{ row }">
          <div v-if="row.send_status == 1">
            <el-button type="text" @click="sendOut(row.id)">发送</el-button>
            <el-button
              type="text"
              @click="
                openNoticeDialog(
                  { ...row.content_data, id: row.id, uid_arr: row.uid_arr },
                  row.type
                )
              "
              >编辑</el-button
            >
            <el-button type="text" @click="handleDelete(row.id)"
              >删除</el-button
            >
          </div>
          <div v-else>
            <el-button type="text" @click="linkTo(row)">消息详情</el-button>
            <el-button type="text" @click="sendRecord(row.id)"
              >发送记录</el-button
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
        @pageSizeChange="handleSizeChange"
        style="margin-left: auto"
      />
    </div>

    <!-- 消息详情弹窗 -->
    <el-dialog
      title="消息详情"
      :visible.sync="dialogVisible"
      width="480px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="messageDetails"
    >
      <p v-html="detailData.content_str"></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>

    <ClassNoticeDialog
      v-model="addtempdialog"
      :data="detailData"
      :title="dialogTitle"
      @on-success="getClassroomMessageList"
    />
    <TestNoticeDialog
      v-model="addTestNoticeDialog"
      :data="detailData"
      :title="dialogTitle"
      @on-success="getClassroomMessageList"
    />
    <PoorStudentNoticeDialog
      v-model="addPoorStudenttNoticeDialog"
      :data="detailData"
      :title="dialogTitle"
      @on-success="getClassroomMessageList"
    />

    <ListClassiFion v-model="dialogVisibleSend" :type="1" :id="currentId" />
  </div>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import ClassNoticeDialog from "./ClassNoticeDialog";
import TestNoticeDialog from "./TestNoticeDialog";
import PoorStudentNoticeDialog from "./PoorStudentNoticeDialog";
import ListClassiFion from "./listClassiFion";
import {
  getClassroomMessageList,
  deleteClassroomMessage,
  sendClassroomMessage,
} from "@/api/message";
export default {
  name: "wxNotification",
  components: {
    ClassNoticeDialog,
    TestNoticeDialog,
    PoorStudentNoticeDialog,
    ListClassiFion,
  },
  data() {
    return {
      statusMap: {
        1: {
          text: "待发送",
          type: "warning",
        },
        2: {
          text: "发送中",
          type: "",
        },
        3: {
          text: "已发送",
          type: "success",
        },
      },
      detailData: {},
      contractInfo: {},
      currentId: "",
      id: "",
      dialogTitle: "",
      addtempdialog: false,
      activeName: "wxNotification",
      dialogVisible: false,
      dialogVisibleSend: false,
      listData: [],
      gridData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        date: "",
        search_box: "",
        send_status: "",
        type: "",
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
          key: "type",
          type: "select",
          width: 120,
          options: [
            {
              value: 1,
              label: "上课通知",
            },
            {
              value: 2,
              label: "考试通知",
            },
            {
              value: 3,
              label: "差生提醒",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "通知类型",
          },
        },
        {
          key: "send_status",
          type: "select",
          width: 120,
          options: [
            {
              value: 1,
              label: "待发送",
            },
            {
              value: 2,
              label: "发送中",
            },
            {
              value: 3,
              label: "已发送",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "通知状态",
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "通知标题",
          },
        },
      ],
      addTestNoticeDialog: false,
      addPoorStudenttNoticeDialog: false,
    };
  },
  created() {
    this.getClassroomMessageList();
    console.log(this.searchData.date);
  },

  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
      this.getClassroomMessageList();
    },
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
      this.getClassroomMessageList();
    },
    // 发送消息接口
    async sendClassroomMessage(id) {
      const data = {
        id,
      };
      const res = await sendClassroomMessage(data);
      if (res.code == 0) {
        this.$message.success(res.message);
      }
      this.getClassroomMessageList();
    },
    // 发送消息
    sendOut(id) {
      this.$confirm("此操作将发送该短信, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.sendClassroomMessage(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发送",
          });
        });
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassroomMessageList();
    },
    // 消息详情
    linkTo(row) {
      this.dialogVisible = true;
      this.detailData = row;
    },
    handleClose() {
      this.dialogVisible = false;
      this.addtempdialog = false;
    },
    openNoticeDialog(data, type) {
      this.detailData = data;
      if (type === 1) {
        this.dialogTitle = "上课通知";
        this.addtempdialog = true;
      }
      if (type === 2) {
        this.dialogTitle = "考试通知";
        this.addTestNoticeDialog = true;
      }
      if (type === 3) {
        this.dialogTitle = "差生提醒";
        this.addPoorStudenttNoticeDialog = true;
      }
    },
    // 查看发送记录按钮
    sendRecord(id) {
      this.currentId = id;
      this.dialogTitle = "发送记录";
      this.dialogVisibleSend = true;
    },

    // 微信通知列表接口
    async getClassroomMessageList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        classroom_id: this.$route.query.id,
      };
      this.listLoading = true;
      const res = await getClassroomMessageList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },

    handleDelete(id) {
      this.$confirm("此操作将永久删除该短信, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteClassroomMessage(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除微信消息
    async deleteClassroomMessage(id) {
      const data = {
        id,
      };
      console.log(data);
      const res = await deleteClassroomMessage(data);
      if (res.code == 0) {
        console.log(res);
        this.$message.success(res.message);
        this.getClassroomMessageList();
        this.dialogVisible = false;
      }
      this.getClassroomMessageList();
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

.messageDetails {
  p {
    padding-top: 15px;
  }
}
</style>
<style lang="less">
.add-msg.el-popover {
  padding: 6px 0;
  .btns {
    display: flex;
    flex-direction: column;
    button {
      width: 100%;
      border: none;
      margin-left: 0;
    }
  }
}
</style>