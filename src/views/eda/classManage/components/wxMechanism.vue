<template>
  <div class="class-detail">
    <div class="client_head">
      <!--搜索模块-->
      <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
      <el-button type="primary" @click="addClassiFion">添加通知</el-button>
    </div>
    <!--表格-->
    <el-table ref="multipleTable" :data="listData" style="width: 100%;margin-top: 10px;" class="min_table"
      v-loading="listLoading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
      element-loading-background="#fff" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column label="序号" show-overflow-tooltip min-width="60" align="center" prop="id">
      </el-table-column>
      <el-table-column prop="title" label="通知标题" min-width="150" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="content" label="通知内容" min-width="200" align="center">
        <template slot-scope="scope" class="hiddens">
          <span>
            {{ scope.row.content | removeTag }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="send_status" label="发送状态" min-width="100" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <el-tag size="small" :type="statusMap[row.send_status].type" >
            {{ statusMap[row.send_status || 0].text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="send_time" label="发送时间" min-width="150" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <div v-if="row.send_time">
            {{ row.send_time }}
          </div>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="org_name_str" label="机构名称" min-width="150" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <div v-if="row.org_name_str">
            {{ row.org_name_str }}
          </div>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="course_list" label="已读 / 未读人数" min-width="140" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span style="color: rgb(0, 173, 0);">{{ row.read_count }} </span> / {{ row.unread_count }}</span>
      </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" min-width="140">
        <template slot-scope="{ row }">
          <div v-if="row.send_status == 2">
          <el-button type="text" @click="linkTo(row)">消息详情</el-button>
          <el-button type="text" @click="sendRecord(row.id)">阅读记录</el-button>
        </div>
        <div v-else>
          <el-button type="text" @click="sendOut(row.id)">发送</el-button>
          <el-button type="text" @click="editNotice(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="table_bottom">
      <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" @pageSizeChange="handleSizeChange" style="margin-left: auto;" />
    </div>

    <!-- 添加机构通知弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisibleadd" width="850px" :close-on-click-modal="false">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="通知标题" prop="title">
            <el-input v-model="ruleForm.title" placeholder="请输入通知标题" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="通知内容" prop="title">
          <quill-editor ref="myTextEditor" v-model="ruleForm.content" prop="content" :options="editorOption" style="display:block;height:280px;margin-bottom:80px;margin-top:10px">
          </quill-editor>
        </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleadd = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </span>
    </el-dialog>

    <!-- 消息详情弹窗 -->
    <el-dialog title="消息详情" :visible.sync="dialogVisible" width="800px" :before-close="handleClose"
      :close-on-click-modal="false" class="messageDetails">
      <h6>{{detailData.title}}</h6>
      <div class="noticedata">
        发布时间：<span>{{detailData.create_time}}</span>
        发布人：<span>{{detailData.staff_name}}</span>
        已读人数：<span>{{detailData.read_count}} / {{detailData.unread_count}}</span>
      </div>
      <div class="content" v-html="detailData.content">
      </div>
    </el-dialog>

    <!-- 阅读记录弹窗 -->
    <!-- <el-dialog title="阅读记录" :visible.sync="dialogVisibleSend" :close-on-click-modal="false" width="900px">
      <SearchList :options="searchOptionsSend" :data="searchDataSend" @on-search="handleSearch" />
      <el-table :data="gridData" :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }">
        <el-table-column property="date" label="序号" width="120"></el-table-column>
        <el-table-column property="name" label="用户姓名" width="140"></el-table-column>
        <el-table-column property="jg" label="所属机构" width="160"></el-table-column>
        <el-table-column property="zt" label="阅读状态" width="160"></el-table-column>
        <el-table-column property="bz" label="完成时间"></el-table-column>
      </el-table>
      <div class="table_bottom">
        <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" style="margin-left: auto;" />
      </div>
    </el-dialog> -->

    <listSendRecord v-model="dialogVisibleSend" :id="id" />

  </div>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import {
  getNoticeList,
  createNotice,
  updateNotice,
  deleteNotice,
  sendNotice,
} from "@/api/message";
import listSendRecord from "./listSendRecord";
export default {
  name: "wxMechanism",
  components: {
    listSendRecord,
    quillEditor,
  },
  data() {
    return {
      detailData: {},
      statusMap: {
        1: {
          text: "待发送",
          type: "warning",
        },
        2: {
          text: "已发送",
          type: "success",
        },
      },
      addtempdialog: false,
      contractInfo: {},
      currentId: "",
      id: "",
      dialogTitle: "",
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      activeName: "wxMechanism",
      dialogTitle: "阅读记录",
      dialogVisible: false,
      dialogVisibleSend: false,
      dialogVisibleadd: false,
      editorOption: {
        placeholder: "请输入通知内容",
      },
      ruleForm: {
        title: "",
        content: "",
      },
      rules: {
        title: [{ required: true, message: "请输入通知标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入公告摘要", trigger: "blur" },
        ],
        receiver: [
          { required: true, message: "请选择账号身份", trigger: "blur" },
        ],
      },
      listData: [],
      gridData: [],
      searchData: {
        date: "",
        search_box: "",
        send_status: "",
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
      searchDataSend: {},
      searchOptionsSend: [
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "所属机构",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "type",
          type: "select",
          width: 120,
          options: [
            {
              value: 0,
              label: "未读",
            },
            {
              value: 1,
              label: "已读",
            },
            {
              value: 2,
              label: "已确认",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "阅读状态",
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "搜索用户姓名",
          },
        },
      ],
    };
  },

  created() {
    this.getNoticeList();
    console.log(this.$route.query.classroom_id);
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
      this.getNoticeList();
    },
    // 发送消息
    sendOut(id) {
      // this.sendNotice(id)
      this.$confirm("此操作将发送该通知, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.sendNotice(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发送",
          });
        });
    },
    // 发送消息接口
    async sendNotice(id) {
      const data = {
        id,
      };
      // console.log(data)
      const res = await sendNotice(data);
      if (res.code == 0) {
        console.log(res);
        this.$message.success(res.message);
      }
      this.getNoticeList();
    },
    handleSearch(data) {
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        start_time: times[0],
        end_time: times[1],
      };
      this.getNoticeList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getNoticeList();
    },
    linkTo(row) {
      this.dialogVisible = true;
      this.id = row.id;
      console.log(this.id);
      this.detailData = row;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 查看发送记录按钮
    sendRecord(row) {
      this.dialogTitle = "发送记录";
      this.dialogVisibleSend = true;
      this.id = row;
      console.log(this.id);
    },
    // 机构通知列表
    async getNoticeList() {
      const data = {
        classroom_id: this.$route.query.classroom_id,
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getNoticeList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    // 添加机构通知
    addClassiFion() {
      this.dialogTitle = "添加通知";
      this.ruleForm = {
        title: "",
        content: "",
      };
      this.dialogVisibleadd = true;
    },
    // 编辑通知
    editNotice(row) {
      console.log(row);
      this.dialogTitle = "编辑通知";
      this.ruleForm = row;
      this.dialogVisibleadd = true;
      this.id = row.id;
    },
    // 添加机构通知接口
    async createNotice() {
      const data = {
        classroom_id: this.$route.query.classroom_id,
        title: this.ruleForm.title,
        content: this.ruleForm.content,
      };
      const res = await createNotice(data);
      if (res.code == 0) {
        this.$message.success(res.message);
      }
    },
    // 编辑机构通知接口
    async updateNotice() {
      const data = {
        id: this.ruleForm.id,
        title: this.ruleForm.title,
        content: this.ruleForm.content,
      };
      const res = await updateNotice(data);
      console.log(res.data.list);
      if (res.code == 0) {
        console.log(res);
        this.$message.success(res.message);
        this.getNoticeList();
        this.dialogVisible = false;
      }
    },
    // 删除通知按钮
    handleDelete(row) {
      this.$confirm("此操作将永久删除该通知, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteNotice(row.id);
          this.getNoticeList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //删除通知接口
    async deleteNotice(id) {
      const data = {
        id,
      };
      console.log(data);
      const res = await deleteNotice(data);
      if (res.code == 0) {
        console.log(res);
        this.$message.success(res.message);
        this.noticelist();
        this.dialogVisible = false;
      }
    },

    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.id) {
            //修改
            this.updateNotice();
            this.dialogVisibleadd = false;
            this.getNoticeList();
          } else {
            //添加
            this.createNotice();
            this.dialogVisibleadd = false;
            this.getNoticeList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
/deep/.el-dialog__title {
  font-size: 16px;
}
/deep/.el-dialog__body {
  padding: 30px 40px 30px 30px;
}

.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.messageDetails h6 {
  font-size: 20px;
  font-weight: normal;
}

.noticedata {
  line-height: 50px;
  color: #999;
  font-size: 15px;
}

.noticedata span {
  color: #666;
  margin-right: 40px;
}

.content {
  border: 1px solid rgb(233, 233, 233);
  border-radius: 5px;
  padding: 15px;
  font-size: 15px;
  line-height: 30px;
  margin: 10px 0;
  color: #888;
}
.dialog-footer {
  padding-right: 20px;
}
/deep/.el-table .cell {
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
