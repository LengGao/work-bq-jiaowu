<template>
  <div class="class-student">
    <div class="header">
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <div>
        <!-- <el-button type="primary">导出数据</el-button> -->
        <el-button type="primary" @click="addStudent">添加学生</el-button>
      </div>
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
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
        :cell-style="{ 'text-align': 'center' }"
        height="550"
        @selection-change="handleTabelSelectChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          label="学员姓名"
          show-overflow-tooltip
          min-width="90"
          prop="user_realname"
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="toStudentDetail(row.uid)">{{
              row.user_realname
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号码"
          show-overflow-tooltip
          min-width="90"
          prop="telphone"
        >
          <template slot-scope="{ row }">
            <span>{{ row.telphone | filterPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="institution_name"
          label="所属机构"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="加入时间"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="ExamLogAvg"
          label="模拟考试平均分"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="RealTopicLogAvg"
          label="历年真题平均分"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="ProblemSelfDeterminationMax"
          label="自主出题最高分"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="attendance_num"
          label="出勤次数"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="absence_num"
          label="缺勤次数"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="attendance_rate"
          label="出勤率"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="160"
        >
          <template slot-scope="{ row }">
            <div>
              <el-button type="text" @click="linkTo(row)">转班</el-button>
              <el-button type="text" @click="removeConfirm([row.uid])"
                >移除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div>
          <el-button @click="batchShift"> 批量转班 </el-button>
          <el-button @click="batchRemove"> 批量移除 </el-button>
        </div>
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageSizeChange="handleSizeChange"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { cloneOptions } from "@/utils/index";
import { getCateList } from "@/api/sou";
import { getClassstudentList, classstudentsBatchRemove } from "@/api/eda";
export default {
  name: "ClassStudent",
  props: {
    classData: {
      type: Object,
      default: () => ({}),
    },
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
      },
      searchOptions: [
        {
          key: "category_id",
          type: "cascader",
          attrs: {
            placeholder: "所属分类",
            clearable: true,
            props: { checkStrictly: true },
            filterable: true,
            options: [],
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "姓名/手机号码",
          },
        },
      ],
      selectionIds: [],
      courseStudentIds: [],
    };
  },
  created() {
    this.getCateList();
    this.getClassstudentList();
  },
  methods: {
    handleTabelSelectChange(selection) {
      if (selection) {
        this.selectionIds = selection.map((item) => item.uid);
        this.courseStudentIds = selection.map((item) => item.course_student_id);
      } else {
        this.selectionIds = [];
        this.courseStudentIds = [];
      }
    },
    //批量移除
    batchRemove() {
      if (!this.selectionIds.length) {
        this.$message.warning("请选择学生");
        return;
      }
      this.removeConfirm(this.selectionIds, true);
    },
    // 批量转班
    batchShift() {
      if (!this.selectionIds.length) {
        this.$message.warning("请选择学生");
        return;
      }
      const query = {
        uid: this.selectionIds,
        course_students_id: this.courseStudentIds,
        old_classroom_id: this.$route.query.id,
      };
      this.$router.push({
        name: "shift",
        query: { json: JSON.stringify(query) },
      });
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = this.typeOptions = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    addStudent() {
      this.$router.push({
        path: "/eda/addStudent",
        query: {
          classId: this.classData.classroom_id,
          course_id: this.classData.course_id,
          project_id: this.classData.project_id,
        },
      });
    },
    // 移除学生
    removeConfirm(uid, isbatch) {
      this.$confirm(`确定要移除${isbatch ? "选中的" : "此"}学生吗?`, {
        type: "warning",
      })
        .then(() => {
          this.classstudentsBatchRemove(uid);
        })
        .catch(() => {});
    },
    async classstudentsBatchRemove(uid) {
      const data = {
        uid,
        classroom_id: this.$route.query.id,
      };
      const res = await classstudentsBatchRemove(data);
      if (res.code === 0) {
        this.$message.success("学生移除成功");
        this.getClassstudentList();
      }
    },
    linkTo(row) {
      const query = {
        uid: [row.uid],
        course_students_id: [row.course_student_id],
        old_classroom_id: row.class_id,
      };
      this.$router.push({
        name: "shift",
        query: { json: JSON.stringify(query) },
      });
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        category_id: data.category_id.pop(),
      };
      this.getClassstudentList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getClassstudentList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassstudentList();
    },
    //班级学生列表
    async getClassstudentList() {
      this.selectionIds = [];
      this.courseStudentIds = [];
      const data = {
        class_id: this.$route.query?.id,
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getClassstudentList(data);
      this.listLoading = false;
      this.listData = res.data.data;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table_bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>