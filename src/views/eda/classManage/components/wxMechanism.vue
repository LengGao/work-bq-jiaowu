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
      <el-table-column label="序号" show-overflow-tooltip min-width="60" align="center" prop="uid">
      </el-table-column>
      <el-table-column prop="surname" label="通知标题" min-width="150" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="mobile" label="通知内容" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="group_id" label="发送状态" min-width="100" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <div v-if="row.group_id">
            {{ row.group_id }}
          </div>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="course_list" label="发送时间" min-width="150" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="question_bank_list" label="机构名称" min-width="150" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <div v-if="row.question_bank_list">
            {{ row.question_bank_list }}
          </div>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="course_list" label="已读人数" min-width="140" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" min-width="140">
        <template slot-scope="{ row }">
          <el-button type="text" @click="linkTo(row.uid)">消息详情</el-button>
          <el-button type="text" @click="sendRecord(row.uid)">阅读记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table_bottom">
      <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" style="margin-left: auto;" />
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
      <h6>【2021中级经济师工商面授A+B班】上课通知</h6>
      <div class="noticedata">
        发布时间：<span>2020-06-13 09:30</span>
        发布人：<span>林老师</span>
        已读人数：<span>30/50</span>
      </div>
      <div class="content">
        <p>根据老师课程进度安排，于9月3日（周五）19:00-21:30增加一次工商管理直播课，请大家安排好时间准时参加！<br>

          1、基础上课时间：9月1日（周三）19:00-21:30<br>

          上课内容：第5章 生产要素市场理论<br>

          2、实务上课时间：9月3日（周五）19:00-21:30（加课）

          上课内容：第6章 物流管理<br>

          3、基础上课时间：9月5日（周日）9:30-12:30；14:00-16:00

          （原面授串讲课延后）<br>

          上课内容：第6-9章 就业、失业<br>

          4、基础上课时间：9月6日（周一）19:00-21:30<br>

          上课内容：第9-10章 国际贸易理论和政策<br>

          5、实务上课时间：9月7日（周二）19:00-21:30<br>

          上课内容：第6-7章 技术创新管理<br>

          6、实务上课时间：9月9日（周四）19:00-21:30<br>

          上课内容：第8-9章 技术创新管理</p>
      </div>
    </el-dialog>

    <!-- 阅读记录弹窗 -->
    <el-dialog title="阅读记录" :visible.sync="dialogVisibleSend" :close-on-click-modal="false" width="900px">
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
    </el-dialog>

  </div>
</template>

<script>
  import { getShortcuts } from "@/utils/date";
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  export default {
    name: "wxMechanism",
    components: {
    quillEditor
  },
    data() {
      return {
        activeName: "wxMechanism",
        dialogTitle: "阅读记录",
        dialogVisible: false,
        dialogVisibleSend: false,
        dialogVisibleadd:false,
        editorOption: {
        placeholder: '请输入通知内容',
      },
        ruleForm: {
        datatime: '',
        content: '',
      },
      rules: {
        title: [{ required: true, message: '请输入通知标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入公告摘要', trigger: 'blur' }],
        receiver: [{ required: true, message: '请选择账号身份', trigger: 'blur' }],
      },
        listData: [
          {
            Id: "11",
            surname: "通知标题通知标题",
            content: "2022年系统集成VIP学霸班上课通知",
            group_id: "已发送",
            course_list: "223",
          }
        ],
        gridData: [{
          date: '1',
          name: '王小虎',
          mobile: '13522023030',
          jg: '越潮教育',
          bz: "2022-01-01 09:30"
        }, {
          date: '2',
          name: '王小虎',
          mobile: '13522023030',
          jg: '北区教育',
          bz: "2022-01-01 09:30"
        }, {
          date: '3',
          name: '王小虎',
          mobile: '13522023030',
          jg: '北区教育',
          bz: "2022-01-01 09:30"
        }],
        listLoading: false,
        pageNum: 1,
        listTotal: 0,
        searchData: {},
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
        searchDataSend: {
        },
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
      linkTo() {
        this.dialogVisible = true
      },
      handleClose() {
        this.dialogVisible = false
      },
      sendRecord() {
        this.dialogVisibleSend = true
      },
      addClassiFion() {
      this.dialogTitle = '机构通知'
      this.ruleForm = {
        title: '',
        content: '',
      }
      this.dialogVisibleadd = true
    },
    },
  };
</script>

<style lang='scss' scoped>
  /deep/.el-dialog__title {
    font-size: 16px;
  }
  /deep/.el-dialog__body{
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
  .dialog-footer{
    padding-right: 20px;
  }
</style>