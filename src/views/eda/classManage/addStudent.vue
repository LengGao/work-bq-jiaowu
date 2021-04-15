<template>
  <div>
    <div class="head_remind">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作。
    </div>

    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </div>
      <div>
        <el-button @click="handleBatchAdd">批量添加</el-button>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          style="width: 100%"
          class="min_table"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSeletChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            label="学员编号"
            show-overflow-tooltip
            min-width="90"
            prop="uid"
          >
          </el-table-column>
          <el-table-column
            prop="course_username"
            label="学员姓名"
            min-width="110"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号码"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.telphone | filterPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="注册时间"
            min-width="130"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_name"
            label="课程"
            min-width="130"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="classroom_name"
            label="是否分班"
            min-width="130"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="institution_name"
            label="所属机构"
            min-width="130"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="220"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button
                  type="text"
                  @click="addConfirm(row.course_student_id, row.intent_id)"
                  >添加</el-button
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
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { cloneOptions } from "@/utils/index";
import { getInstitutionSelectData } from "@/api/sou";
import { getbycoursestudet, addstudents, getproject } from "@/api/eda";
export default {
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        date: "",
        organization_id: [],
        keyword: "",
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
          },
        },
        {
          key: "organization_id",
          type: "cascader",
          attrs: {
            placeholder: "推荐机构",
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
      selection: [],
    };
  },

  created() {
    this.getbycoursestudet();
    this.getInstitutionSelectData();
    this.getproject();
  },

  methods: {
    handleSeletChange(selection) {
      this.selection = selection || [];
    },
    // 批量添加

    handleBatchAdd() {
      if (!this.selection.length) {
        this.$message.warning("请先选择学生！");
        return;
      }
      const ids = this.selection.map((item) => item.course_student_id);
      const intent_id = this.selection[0].intent_id;
      this.$confirm("确定要添加选中学生吗?", { type: "warning" })
        .then(() => {
          this.addstudents(ids, intent_id);
        })
        .catch(() => {});
    },
    // 单个添加
    addConfirm(id, intent_id) {
      this.$confirm("确定要添加此学生吗?", { type: "warning" })
        .then(() => {
          this.addstudents(id, intent_id);
        })
        .catch(() => {});
    },
    async addstudents(course_students_id, intent_id) {
      const data = {
        course_students_id,
        intent_id,
        classroom_id: this.$route.query.classId,
      };
      const res = await addstudents(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getbycoursestudet();
      }
    },
    handleSearch(data) {
      const times = data.date || ["", ""];
      this.pageNum = 1;
      this.searchData = {
        ...data,
        organization_id: data.organization_id.pop(),
        start_time: times[0],
        end_time: times[1],
      };
      this.getbycoursestudet();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getbycoursestudet();
    },
    async getbycoursestudet() {
      const data = {
        course_id: this.$route.query?.course_id || 0,
        project_id: this.$route.query?.project_id || "",
        page: this.pageNum,
        ...this.searchData,
      };
      delete data.date;
      this.listLoading = true;
      const res = await getbycoursestudet(data);
      this.listLoading = false;
      this.listData = res.data.data;
      this.listTotal = res.data.total;
    },
    // 获取项目下拉
    async getproject() {
      const data = {};
      const res = await getproject(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    // 获取机构下拉
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
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
