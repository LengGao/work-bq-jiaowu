<template>
  <section class="mainwrap">
    <div class="header">
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <!-- <el-checkbox v-model="checked">显示未归档学生</el-checkbox> -->
    </div>

    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="light"
        stripe
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="uid"
          label="学生编号"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="realname"
          label="学员姓名"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>
              {{ row.mobile | filterPhone }}
            </span>
            <i
              class="el-icon-document-copy copy-number"
              @click="handleCopy(row.mobile)"
              title="复制"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="注册时间"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="课程类型"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="classroom_name"
          label="所属班级"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div v-if="row.classroom_name">
              {{ row.classroom_name }}
            </div>
            <span v-else> -- </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="institution_name"
          label="所属机构"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="schoole_name"
          label="所属校区"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div v-if="row.schoole_name">
              {{ row.schoole_name }}
            </div>
            <span v-else> -- </span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="100">
          <template slot-scope="scope">
            <div class="operation_btn">
              <span v-if="scope.row.aid > 0">已归档</span>
              <el-button type="text" @click="handleAdd(scope.row)" v-else
                >添加</el-button
              >
              <!-- <el-button type="text" @click="handleAdd(scope.row)"
                >添加</el-button
              > -->
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
    <AddLearner
      :learnVisible="learnVisible"
      :userInfo="userInfo"
      :field_content="field_content"
      :institutionOption="institutionOption"
      @on-success="onlineUserList"
      v-on:innerDialog="getInnerStatus($event)"
    />
  </section>
</template>

<script>
import { onlineUserList, getCourseSelect } from "@/api/etm";
import { cloneOptions } from "@/utils/index";
import { getcourseallclass } from "@/api/eda";
import { getCateList, getInstitutionSelectData } from "@/api/sou";
import AddLearner from "./components/AddLearner";
export default {
  name: "seaStudent",
  components: {
    AddLearner,
  },
  data() {
    return {
      learnVisible: false,
      userInfo: {},
      pageNum: 1,
      listTotal: 0,
      listLoading: false,
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            clearable: true,
          },
        },
        {
          key: "course_category_id",
          type: "cascader",
          events: {
            change: this.handleTypeChange,
          },
          width: 120,
          attrs: {
            placeholder: "所属分类",
            clearable: true,
            filterable: true,
            options: [],
          },
        },
        {
          key: "course_id",
          type: "select",
          optionValue: "course_id",
          optionLabel: "course_name",
          width: 120,
          options: [],
          attrs: {
            clearable: true,
            filterable: true,
            placeholder: "所属课程",
          },
        },
        {
          key: "classroom_id",
          type: "select",
          width: 120,
          options: [],
          optionValue: "classroom_id",
          optionLabel: "classroom_name",
          attrs: {
            placeholder: "所属班级",
            clearable: true,
            filterable: true,
          },
        },

        {
          key: "organization_id",
          type: "cascader",
          width: 120,
          attrs: {
            placeholder: "推荐机构",
            clearable: true,
            filterable: true,
            options: [],
          },
        },
        {
          key: "from",
          type: "select",
          width: 120,
          options: [
            {
              value: 1,
              label: "小程序注册",
            },
            {
              value: 2,
              label: "PC序注册",
            },
            {
              value: 3,
              label: "网课意向录入",
            },
            {
              value: 4,
              label: "教务系统录入",
            },
          ],
          attrs: {
            clearable: true,
            filterable: true,
            placeholder: "渠道来源",
          },
        },
        // {
        //   key: 'pay_status',
        //   type: 'select',
        //   width: 120,
        //   options: [
        //     {
        //       value: '0',
        //       label: '待验证/等待付款 ',
        //     },
        //     {
        //       value: '1',
        //       label: '新订单/待入账/已付款',
        //     },
        //     {
        //       value: '2',
        //       label: '部分入账',
        //     },
        //     {
        //       value: '3',
        //       label: '已入账',
        //     },
        //     {
        //       value: '4',
        //       label: '已作废',
        //     },
        //     {
        //       value: '5',
        //       label: '已退款',
        //     },
        //   ],
        //   attrs: {
        //     clearable: true,
        //     placeholder: '成交状态',
        //   },
        // },0 课程  1学员
        {
          key: "aid",
          type: "select",
          width: 180,
          options: [
            {
              value: 0,
              label: "网课未加入教务系统",
            },
            {
              value: 1,
              label: "网课已加入教务系统",
            },
          ],
          attrs: {
            clearable: true,
            filterable: true,
            placeholder: "排序方式",
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "客户姓名/手机号码",
          },
        },
      ],
      institutionOption: [],
      searchData: {
        aid: 0,
        type: 0,
        date: "",
        course_category_id: [],
        project_id: "",
        classroom_id: "",
        organization_id: [],
        keyword: "",
        student_type: 1,
      },
      listData: [],
      field_content: [],
      checked: "",
    };
  },
  created() {
    this.getInstitutionSelectData();
    this.onlineUserList();
    this.getCateList();
  },
  methods: {
    // 复制
    handleCopy(val) {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", val);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        document.body.removeChild(input);
        this.$message.success("复制成功");
      }
    },
    getInnerStatus(val) {
      console.log(val);
      this.learnVisible = val;
    },
    handleAdd(row) {
      this.learnVisible = true;
      this.userInfo = {
        uid: row.uid,

        realname: row.realname,
        mobile: row.mobile,
        identity_card: row.identity_card,
      };
    },
    handleSearch(data) {
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        organization_id: data.organization_id ? data.organization_id.pop() : "",
        course_category_id: data.course_category_id.pop(),
        start_time: times[0],
        end_time: times[1],
      };
      this.onlineUserList();
    },

    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[4].attrs.options = this.institutionOption =
          cloneOptions(
            res.data,
            "institution_name",
            "institution_id",
            "children"
          );
      }
    },
    // 当分类选择时
    handleTypeChange(ids) {
      const id = ids ? [...ids].pop() : "";
      this.getcourseallclass(id);
      this.getCourseSelect(id);
      // this.getproject(id)
    },
    // 获取班级下拉
    async getcourseallclass(category_id) {
      const data = { category_id };
      const res = await getcourseallclass(data);
      if (res.code === 0) {
        this.classOptions = res.data;
        this.searchOptions[3].options = res.data;
      }
    },
    // 获取课程下拉
    async getCourseSelect(category_id) {
      const data = { category_id };
      const res = await getCourseSelect(data);
      if (res.code === 0) {
        // this.classOptions = res.data.list
        this.searchOptions[2].options = res.data.list;
      }
    },
    // 获取分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.onlineUserList();
    },
    async onlineUserList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await onlineUserList(data);
      this.listLoading = false;
      // res.data.data = res.data.data.forEach((i) => {
      //   i.create_time = this.$moment
      //     .unix(i.create_time)
      //     .format('YYYY-MM-DD HH:mm:ss')
      // })
      this.listData = res.data.data;
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
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.userTable {
  margin-top: 20px;
}
/deep/.timeCard {
  color: #666666;
}
/deep/.studentTag ul li {
  color: #666666;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.copy-number {
  color: #199fff;
  cursor: pointer;
  margin-left: 8px;
}
</style>
