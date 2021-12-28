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
            <PartiallyHidden :value="row.telphone" />
          </template>
        </el-table-column>
        <el-table-column
          prop="institution_name"
          label="推荐机构"
          min-width="100"
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
          prop="project_str"
          label="报读项目"
          min-width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="创建时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="140"
        >
          <template slot-scope="{ row }">
            <div>
              <el-button type="text" @click="toStudentDetail(row.uid)"
                >学生详情</el-button
              >
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
          <el-button @click="batchFromOrgId"> 更换所属机构 </el-button>
          <el-button @click="exportClassroomUserList" :loading="exportLoading">
            导出数据
          </el-button>
        </div>
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageSizeChange="handleSizeChange"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
    <UpdateInstitution
      v-model="updateInstitutionDialog"
      :ids="selectionIds"
      @on-success="classroomUserList"
    />
  </div>
</template>

<script>
import UpdateInstitution from "../../components/UpdateInstitution.vue";
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { cloneOptions } from "@/utils/index";
import { getInstitutionSelectData } from "@/api/sou";
import {
  classroomUserList,
  classstudentsBatchRemove,
  exportClassroomUserList,
} from "@/api/eda";
export default {
  name: "ClassStudent",
  props: {
    classData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    PartiallyHidden,
    UpdateInstitution,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        search_box: "",
        from_organization_id: [],
      },
      searchOptions: [
        {
          key: "from_organization_id",
          type: "cascader",
          attrs: {
            placeholder: "推荐机构",
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "姓名/手机号码",
          },
        },
      ],
      selectionIds: [],
      courseStudentIds: [],
      updateInstitutionDialog: false,
      institutionData: [],
      exportLoading: false,
    };
  },
  created() {
    this.getInstitutionSelectData();
    this.classroomUserList();
  },
  methods: {
    async exportClassroomUserList() {
      const data = {
        class_id: this.$route.query.id,
      };
      this.exportLoading = true;
      const res = await exportClassroomUserList(data).catch();
      this.exportLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    //批量更换所属机构
    batchFromOrgId() {
      if (!this.selectionIds.length) {
        this.$message.warning("请选择学生");
        return;
      }
      this.updateInstitutionDialog = true;
    },
    handleTabelSelectChange(selection) {
      if (selection) {
        this.selectionIds = selection.map((item) => item.uid);
        this.courseStudentIds = selection.map((item) => item.student_id);
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
        query: {
          json: JSON.stringify(query),
          course_id: this.classData.course_id,
        },
      });
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        const selectData = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
        this.institutionData = selectData;
        this.searchOptions[0].attrs.options = selectData;
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
        this.$message.success(res.message);
        this.classroomUserList();
      }
    },
    linkTo(row) {
      const query = {
        uid: [row.uid],
        course_students_id: [row.student_id],
        old_classroom_id: row.class_id,
      };
      this.$router.push({
        name: "shift",
        query: { json: JSON.stringify(query), course_id: row.course_id },
      });
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        from_organization_id: data.from_organization_id.pop(),
      };
      this.classroomUserList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.classroomUserList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.classroomUserList();
    },
    //班级学生列表
    async classroomUserList() {
      this.selectionIds = [];
      this.courseStudentIds = [];
      const data = {
        class_id: this.$route.query?.id,
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await classroomUserList(data);
      this.listLoading = false;
      this.listData = res.data.list;
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
