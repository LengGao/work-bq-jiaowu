<template>
  <section>
    <div class="head_remind">
      *本模块主要是渠道用来进行日常学生数据的跟进管理。
    </div>
    <div class="mainPart">
      <!--搜索模块-->
      <div class="header">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </div>

      <!--列表-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          tooltip-effect="light"
          stripe
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="uid"
            label="ID"
            show-overflow-tooltip
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="realname"
            label="学生姓名"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toStudentDetail(row.uid)">
                {{ row.realname }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span v-if="row.sex === 1">男</span>
              <span v-else-if="row.sex === 2">女</span>
              <span v-else>未知</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="130"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <PartiallyHidden :value="row.mobile" />
            </template>
          </el-table-column>
          <el-table-column
            prop="institution_name"
            label="推荐机构"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="staff_name"
            label="所属老师"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="classroom_name"
            label="所属班级"
            min-width="230"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{
                row.classroom.map((item) => item.classroom_name).join("，")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="online_course"
            label="是否开通网课"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.online_course ? "是" : "否" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_graduate"
            label="是否毕业"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.is_graduate === 3 ? "是" : "否" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="toStudentDetail(row.uid)"
                  >学生详情</el-button
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
    </div>
  </section>
</template>

<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getShortcuts } from "@/utils/date";
import { cloneOptions } from "@/utils/index";
import { getStudentList, getproject } from "@/api/eda";
import { getCateList, getInstitutionSelectData } from "@/api/sou";
export default {
  name: "channelStudent",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      importVisible: false,
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        type: 0,
        date: "",
        course_category_id: [],
        project_id: "",
        classroom_id: "",
        organization_id: [],
        keyword: "",
        student_type: 1,
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
          key: "student_type",
          type: "select",
          options: [
            { label: "网课", value: 1 },
            { label: "非网课", value: 2 },
          ],
          attrs: {
            placeholder: "学生类型",
            clearable: true,
          },
        },
        {
          key: "course_category_id",
          type: "cascader",
          events: {
            change: this.handleTypeChange,
          },
          attrs: {
            placeholder: "所属分类",
            props: { checkStrictly: true },
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "所属项目",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "organization_id",
          type: "cascader",
          attrs: {
            placeholder: "推荐机构",
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      checked: "",
      submitLoading: false,
      dialogVisible: false,
      classOptions: [], // 班级选项
      formData: {
        classroom_id: "",
      },
      rules: {
        classroom_id: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      updateTeacherDialog: false,
    };
  },

  created() {
    this.getInstitutionSelectData();
    this.getproject();
    this.getCateList();
    this.getStudentList();
  },

  methods: {
    // 当分类选择时
    handleTypeChange(ids) {
      const id = ids ? [...ids].pop() : "";
      this.getproject(id);
    },
    // 获取项目下拉
    async getproject(category_id = "") {
      const data = {
        category_id,
      };
      const res = await getproject(data);
      if (res.code === 0) {
        this.searchOptions[3].options = res.data;
      }
    },
    //  // 获取班级下拉
    // async getcourseallclass(category_id) {
    //   const data = { category_id };
    //   const res = await getcourseallclass(data);
    //   if (res.code === 0) {
    //     this.classOptions = res.data;
    //     this.searchOptions[5].options = res.data;
    //   }
    // },
    handleSearch(data) {
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        organization_id: data.organization_id.pop(),
        course_category_id: data.course_category_id.pop(),
        start_time: times[0],
        end_time: times[1],
      };
      this.getStudentList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getStudentList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getStudentList();
    },
    //学生列表
    async getStudentList() {
      this.intent_id = "";
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getStudentList(data);
      this.listLoading = false;
      this.listData = res.data.data;
      this.listTotal = res.data.total;
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[2].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[4].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
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
.mainPart {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
}
.actions {
  padding-top: 10px;
}
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>
