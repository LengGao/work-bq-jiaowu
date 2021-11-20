<template>
  <section>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常客户数据的跟进管理。
    </div>
    <div class="mainPart">
      <!--搜索模块-->
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary" @click="dialogVisible = true"
            >添加客户</el-button
          >
        </div>
      </header>
      <!--列表-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column type="selection" width="45"> </el-table-column>
          <el-table-column
            prop="uid"
            label="ID"
            show-overflow-tooltip
            width="70"
          >
          </el-table-column>
          <el-table-column
            prop="surname"
            label="学生姓名"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toStudentDetail(row.uid)">
                {{ row.surname }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            min-width="130"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <PartiallyHidden :value="row.mobile || ''" />
            </template>
          </el-table-column>
          <el-table-column
            prop="institution_name"
            label="所属机构"
            min-width="130"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="所属老师"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="customer_type"
            label="客户性质"
            min-width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="报名时间"
            min-width="160"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <!-- <el-table-column
            prop="course_name"
            label="课程名称"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column> -->
          <el-table-column
            prop="pay_type"
            label="开课状态"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span
                v-if="row.open_course"
                class="approve-status approve-status--success"
                >已开课</span
              >
              <span v-else class="approve-status">未开课</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="160">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                v-if="!row.open_course"
                @click="eduOpenCourseConfirm(row.id)"
                >开课</el-button
              >
              <el-button type="text" @click="toStudentDetail(row.uid)"
                >学生详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
            @pageSizeChange="handleSizeChange"
          />
        </div>
      </div>
    </div>
    <AddStudent v-model="dialogVisible" @on-success="projectUser" />
  </section>
</template>

<script>
import AddStudent from "./components/AddStudent";
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getShortcuts } from "@/utils/date";
import { cloneOptions } from "@/utils";
import { getCateList, getInstitutionSelectData } from "@/api/sou";
import { getAdminSelect, getproject } from "@/api/eda";
import { projectUser, eduOpenCourse } from "@/api/crm";
export default {
  name: "eduOpenClass",
  components: {
    PartiallyHidden,
    AddStudent,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        keyword: "",
        staff_id: "",
        type: "",
        open_course: "",
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
          key: "from_org",
          type: "cascader",
          attrs: {
            placeholder: "所属机构",
            clearable: true,
            filterable: true,
            options: [],
          },
        },
        {
          key: "staff_id",
          type: "select",
          width: 140,
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          attrs: {
            placeholder: "所属老师",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "type",
          type: "select",
          width: 140,
          options: [
            {
              value: 0,
              label: "招生客户",
            },
            {
              value: 1,
              label: "渠道客户",
            },
            {
              value: 2,
              label: "机构报名",
            },
          ],
          attrs: {
            filterable: true,
            clearable: true,
            placeholder: "客户性质",
          },
        },
        {
          key: "open_course",
          type: "select",
          width: 140,
          options: [
            {
              value: 0,
              label: "未开课",
            },
            {
              value: 1,
              label: "已开课",
            },
          ],
          attrs: {
            filterable: true,
            clearable: true,
            placeholder: "开课状态",
          },
        },
        {
          key: "category_id",
          type: "cascader",
          width: 240,
          attrs: {
            placeholder: "所属分类（多选）",
            clearable: true,
            props: {
              multiple: true,
              checkStrictly: true,
            },
            "collapse-tags": true,
            filterable: true,
            options: [],
          },
        },
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          width: 280,
          attrs: {
            placeholder: "所属项目（多选）",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "客户姓名/手机号码",
          },
        },
      ],
      dialogVisible: false,
      institutionOptions: [],
    };
  },
  created() {
    this.projectUser();
    this.getInstitutionSelectData();
    this.getAdminSelect();
    this.getCateList();
    this.getproject();
  },
  methods: {
    // 开课
    eduOpenCourseConfirm(id) {
      this.$confirm("是否确定一键开通课程和题库？", "开课提醒", {
        type: "warning",
      })
        .then(() => {
          this.eduOpenCourse(id);
        })
        .catch(() => {});
    },
    async eduOpenCourse(id) {
      const data = { id };
      const res = await eduOpenCourse(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.projectUser();
      }
    },
    // 获取项目下拉
    async getproject() {
      const res = await getproject();
      if (res.code === 0) {
        this.searchOptions[6].options = res.data;
      }
    },

    // 获取所属分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[5].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    // 获取所属老师
    async getAdminSelect() {
      const data = { list: true };
      const res = await getAdminSelect(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        from_org: data.from_org ? data.from_org.pop() : "",
      };
      this.projectUser(data);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.projectUser();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.projectUser();
    },
    async projectUser() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
          : "",
        project_id: Array.isArray(this.searchData.project_id)
          ? this.searchData.project_id.join(",")
          : "",
        category_id: Array.isArray(this.searchData.category_id)
          ? this.searchData.category_id.join(",")
          : "",
      };
      this.listLoading = true;
      const res = await projectUser(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
      this.panelData = res.data.count || {};
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = this.institutionOptions =
          cloneOptions(
            res.data,
            "institution_name",
            "institution_id",
            "children"
          );
      }
    },
    coursDetail(uid) {
      this.$router.push({
        name: "cusdetail",
        query: {
          uid,
        },
      });
    },
    orderDetail(ab) {
      this.$router.push({
        name: "orderdetail",
        query: {
          order_id: ab.order_id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mainPart {
  padding: 20px;
}
header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.approve-status {
  &::before {
    display: inline-block;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fd6500;
    vertical-align: middle;
    margin-right: 2px;
  }
  &--success::before {
    background-color: #43d100;
  }
}
</style>

