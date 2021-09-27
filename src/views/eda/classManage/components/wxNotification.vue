<template>
  <div class="class-detail">
    <div class="client_head">
      <!--搜索模块-->
      <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
      <el-button type="primary">添加通知</el-button>
    </div>
    <!--表格-->
    <el-table ref="multipleTable" :data="listData" style="width: 100%;margin-top: 10px;" class="min_table"
      v-loading="listLoading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
      element-loading-background="#fff" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column label="序号" show-overflow-tooltip min-width="60" align="center" prop="Id">
      </el-table-column>
      <el-table-column prop="surname" label="通知标题" min-width="160" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="content" label="通知内容" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="group_id" label="发送状态" min-width="100" align="center" show-overflow-tooltip>
        <!-- <template slot-scope="{ row }">
        <div v-if="row.group_id">
          {{ row.group_id }}
        </div>
        <span v-else>--</span>
      </template> -->
      </el-table-column>
      <el-table-column prop="course_list" label="发送时间" min-width="100" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="question_bank_list" label="发送总数/成功/失败" min-width="120" align="center"
        show-overflow-tooltip>
        <template slot-scope="{ row }">
          <div v-if="row.question_bank_list">
            {{ row.question_bank_list }}
          </div>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" min-width="140">
        <template slot-scope="{ row }">
          <el-button type="text" @click="linkTo(row.uid)">消息详情</el-button>
          <el-button type="text" @click="sendRecord(row.uid)">发送记录</el-button>
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
      <p>学员姓名：张小北</p>
      <p>课程名称：系统集成项目管理工程师</p>
      <p>上课时间：2021-5-18 19：00</p>
      <p>上课地点：微信 “东培学堂” 小程序 — 班级直播</p>
      <p>注意事项：详情请到班群了解</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 发送记录弹窗 -->
    <el-dialog title="发送记录" :visible.sync="dialogVisibleSend" :close-on-click-modal="false" width="1000px">
      <SearchList :options="searchOptionsSend" :data="searchDataSend" @on-search="handleSearch" />
      <el-table :data="gridData" :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }">
        <el-table-column property="date" label="编号" width="120"></el-table-column>
        <el-table-column property="name" label="姓名" width="120"></el-table-column>
        <el-table-column property="mobile" label="手机号码" width="140"></el-table-column>
        <el-table-column property="jg" label="所属机构" width="160"></el-table-column>
        <el-table-column property="zt" label="发送状态" width="120"></el-table-column>
        <el-table-column property="bz" label="备注"></el-table-column>
      </el-table>
      <div class="table_bottom">
        <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" style="margin-left: auto;" />
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { getShortcuts } from "@/utils/date";
  import { getClassList } from "@/api/eda";
  export default {
    name: "wxNotification",

    data() {
      return {
        activeName: "wxNotification",
        dialogTitle: "发送记录",
        dialogVisible: false,
        dialogVisibleSend: false,
        listData: [
          {
            Id: "11",
            surname: "通知标题通知标题",
            content: "2022年系统集成VIP学霸班上课通知",
            group_id: "已发送",
            course_list: "2022-06-17 08:00",
          }
        ],
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          mobile: '13522023030',
          jg: '越潮教育',
          bz: "系统集成VIP学霸班上课通知系统集成VIP学霸班上课通知"
        }, {
          date: '2016-05-04',
          name: '王小虎',
          mobile: '13522023030',
          jg: '北区教育',
          bz: "2022年系统集成VIP学霸班上课通知"
        }, {
          date: '2016-05-01',
          name: '王小虎',
          mobile: '13522023030',
          jg: '北区教育',
          bz: "2022年系统集成VIP学霸班上课通知"
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
            key: "types",
            type: "select",
            width: 120,
            options: [
              {
                value: 0,
                label: "上课通知",
              },
              {
                value: 1,
                label: "考试通知",
              },
              {
                value: 2,
                label: "差生提醒",
              },
            ],
            attrs: {
              clearable: true,
              placeholder: "通知类型",
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
            key: "keyword",
            attrs: {
              placeholder: "学生姓名、手机号码",
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
          // category_id: data.category_id.pop(),
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
      async getClassList() {
        const data = {
          page: this.pageNum,
          limit: this.pageSize,
          ...this.searchData,
        };
        this.listLoading = true;
        const res = await getClassList(data);
        this.listLoading = false;
        this.listData = res.data.list;
        this.listTotal = res.data.total;
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
</style>