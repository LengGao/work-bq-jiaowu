<template>
  <div class="class-detail">
    <div class="client_head">
      <!--搜索模块-->
      <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
      <el-button type="primary" @click="addTemplatebtn">添加通知</el-button>
      <!-- <Addnotification /> -->
    </div>
    <!--表格-->
    <el-table ref="multipleTable" :data="listData" style="width: 100%;margin-top: 10px;" class="min_table"
      v-loading="listLoading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
      element-loading-background="#fff" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column label="序号" show-overflow-tooltip min-width="60" align="center" prop="id">
      </el-table-column>
      <el-table-column prop="title" label="通知标题" min-width="160" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="content" label="通知内容" min-width="200" align="center" class="noticecontent">
        <template slot-scope="{ row }">
          <span>
            {{row.content_data.keyword1}}
            {{row.content_data.keyword4}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="send_status" label="发送状态" min-width="100" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <el-tag size="small" type="text" :style="{ color: statusMap[row.send_status].color }">
            {{ statusMap[row.send_status || 0].text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="send_time" label="发送时间" min-width="100" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <div v-if="row.send_time">
            {{row.send_time}}</div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column prop="success" label="发送总数/成功/失败" min-width="120" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          {{ row.total }} / <span style="color: rgb(0, 173, 0);">{{ row.success }} </span>/ <span
            style="color: orange;">{{ row.fail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" min-width="140">
        <template slot-scope="{row}">
          <div v-if="row.send_status == 2">
            <el-button type="text" @click="linkTo(row)">消息详情</el-button>
            <el-button type="text" @click="sendRecord(row.id)">发送记录</el-button>
          </div>
          <div v-else>
            <el-button type="text" @click="sendOut(row.id)">发送</el-button>
            <el-button type="text" @click="editNotices(row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="table_bottom">
      <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" style="margin-left: auto;" />
    </div>

    <!-- 消息详情弹窗 -->
    <el-dialog title="消息详情" :visible.sync="dialogVisible" width="480px" :before-close="handleClose"
      :close-on-click-modal="false" class="messageDetails">
      <span>【上课提醒】</span>
      <p>通知标题：{{detailData.first}}</p>
      <p>上课时间：{{detailData.keyword1}}</p>
      <p>上课地点：{{detailData.keyword2}}</p>
      <p>上课老师：{{detailData.keyword3}}</p>
      <p>课程名称：{{detailData.keyword4}}</p>
      <p>备注信息：{{detailData.remark}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <addClassiFion v-model="addtempdialog" :id="currentId" :title="dialogTitle" @on-success="getMessageList"
      :contractInfo="contractInfo" />

    <listClassiFion v-model="dialogVisibleSend" :id="id" />
  </div>
</template>

<script>
  import { cloneOptions } from "@/utils/index";
  import { getShortcuts } from "@/utils/date";
  import addClassiFion from './addClassiFion';
  import listClassiFion from './listClassiFion';
  import { getMessageList, deleteMessage, updateMessage, sendMessage, getMessageRecordList } from "@/api/message";
  export default {
    name: "wxNotification",
    components: {
      addClassiFion,
      listClassiFion,
    },
    data() {
      return {
        statusMap: {
          1: {
            text: "待发送",
            color: "#FD6500",
          },
          2: {
            text: "已发送",
            color: "#43D100",
          },
        },
        detailData: {
          first: '',
        },
        contractInfo: {},
        currentId: '',
        id: '',
        dialogTitle: '',
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
          date: '',
          search_box: '',
          send_status: '',
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
            }
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
        formData: {
          name: '',
          content: '',
        },
        formLabelWidth: '100px',
        ruleForm: {
          datatime: '',
          content: '',
        },
      };
    },
    created() {
      this.getMessageList()
      console.log(this.searchData.date);
    },

    methods: {
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
        this.getMessageList();
      },
      // 发送消息接口
      async sendMessage(id) {
        const data = {
          id,
        }
        // console.log(data)
        const res = await sendMessage(data)
        if (res.code == 0) {
          console.log(res)
          this.$message.success(res.message)
        }
        this.getMessageList()
      },
      // 发送消息
      sendOut(id) {
        this.$confirm('此操作将发送该通知, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.sendMessage(id)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发送',
            })
          })

      },
      // 编辑微信消息
      editNotices(row) {
        this.dialogTitle = '编辑消息'
        this.addtempdialog = true
        this.contractInfo = row
        this.id = row.id
        console.log(this.contractInfo)
      },
      handlePageChange(val) {
        this.pageNum = val;
        this.getMessageList();
      },
      // 消息详情
      linkTo(row) {
        this.dialogVisible = true
        this.id = row.id
        console.log(row)
        this.detailData = row.content_data
      },
      handleClose() {
        this.dialogVisible = false
        this.addtempdialog = false
      },
      addTemplatebtn() {
        this.contractInfo = {}
        this.dialogTitle = '添加通知'
        this.addtempdialog = true
        this.currentId = ''
        console.log(this.contractInfo)
      },
      // 查看发送记录按钮
      sendRecord(row) {
        this.id = row
        this.dialogTitle = '发送记录'
        this.dialogVisibleSend = true
        console.log(this.id)
      },

      // 微信通知列表接口
      async getMessageList() {
        const data = {
          page: this.pageNum,
          limit: this.pageSize,
          ...this.searchData,
          classroom_id: this.$route.query.classroom_id,
        };
        console.log(data)
        this.listLoading = true;
        const res = await getMessageList(data);
        this.listLoading = false;
        this.listData = res.data.list;
        this.listTotal = res.data.total;
      },

      handleDelete(id) {
        this.$confirm('此操作将永久删除该通知, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.deleteMessage(id)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      },
      // 删除微信消息
      async deleteMessage(id) {
        const data = {
          id,
        }
        console.log(data)
        const res = await deleteMessage(data)
        if (res.code == 0) {
          console.log(res)
          this.$message.success(res.message)
          this.getMessageList()
          this.dialogVisible = false
        }
        this.getMessageList()
      },
    },

  };
</script>

<style lang='scss' scoped>
  /deep/.el-dialog__title {
    font-size: 16px;
  }

  /deep/.el-dialog__body {
    font-size: 17px;
  }

  /deep/.el-tag {
    background-color: #f7fcff !important;
  }

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

  .dialogVisibleSend {
    width: 1800px;
  }

  .noticecontent {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .details {
    display: none;
  }
</style>