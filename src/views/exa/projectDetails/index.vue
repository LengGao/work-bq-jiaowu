<template>
  <div>
    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <el-button type="primary" @click="openAdd">添加学生</el-button>
      </div>
      <!--表格-->
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
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          class="min_table"
        >
          <el-table-column type="selection" width="50"></el-table-column>

          <el-table-column
            prop="user_realname"
            label="学生姓名"
            min-width="90"
            column-key="course_id"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号码"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.telphone | filterPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="project"
            label="项目名称"
            min-width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="subject"
            label="考试科目"
            min-width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="exam_type"
            label="考试性质"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-tag size="small" v-if="row.exam_type === '新考'">{{
                row.exam_type
              }}</el-tag>
              <el-tag size="small" type="warning" v-else>{{
                row.exam_type
              }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="cost"
            label="补考费用"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="charge"
            label="是否收费"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span v-if="row.exam_type !== '新考'">{{ row.charge }}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="lack"
            label="资料缺失数量"
            min-width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="enroll_status"
            label="报考状态"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span :style="{ color: statusColors[row.enroll_status] }">{{
                enrollStatusMap[row.enroll_status]
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="270">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="openEdit(row.id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="openPhoto(row.uid)"
                  >补齐资料</el-button
                >
                <el-button type="text" @click="openReview(row.id)"
                  >资料审核</el-button
                >
                <el-button type="text" @click="deleteConfirm(row.id)"
                  >移除学生</el-button
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
    <!-- 添加，编辑学生 -->
    <StudentDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      @on-success="enrollRecordList"
    />
    <!-- 编辑资料 -->
    <AddPhoto
      title="补齐资料"
      :visible.sync="photoDialog"
      :uid="photoUid"
      @on-success="enrollRecordList"
    />
    <!-- 报考审核 -->
    <ExaminationReview
      v-model="reviewDialog"
      :id="currentId"
      @on-success="enrollRecordList"
    />
  </div>
</template>

<script>
import StudentDialog from "./components/StudentDialog";
import ExaminationReview from "./components/ExaminationReview";
import AddPhoto from "@/views/eda/certificates/components/AddPhoto";
import { enrollRecordList, removeStudent, getEnrollSelect } from "@/api/exa";
export default {
  name: "apply",
  components: {
    ExaminationReview,
    AddPhoto,
    StudentDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        exam_type: "",
        enroll_status: "",
        search_box: "",
      },
      searchOptions: [
        {
          key: "exam_type",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "name",
          attrs: {
            placeholder: "考试性质",
            clearable: true,
          },
        },
        {
          key: "enroll_status",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "name",
          attrs: {
            placeholder: "报考状态",
            clearable: true,
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      currentId: "",
      dialogTitle: "添加报考",
      dialogVisible: false,
      enrollStatusMap: {},
      statusColors: {
        1: "#2798ee",
        2: "#FD6552",
        3: "#FD6500",
        4: "#43D100",
      },
      photoDialog: false,
      photoUid: "",
      reviewDialog: false,
    };
  },
  created() {
    this.getEnrollSelect();
    this.enrollRecordList();
  },
  methods: {
    // 打开报考审核
    openReview(id) {
      this.currentId = id;
      this.reviewDialog = true;
    },
    //打开资料补齐
    openPhoto(uid) {
      this.photoUid = uid;
      this.photoDialog = true;
    },

    // 移除报名学生
    deleteConfirm(id) {
      this.$confirm("确定要移除此学生吗?", { type: "warning" })
        .then(() => {
          this.removeStudent(id);
        })
        .catch(() => {});
    },
    async removeStudent(id) {
      const data = {
        id,
      };
      const res = await removeStudent(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.enrollRecordList();
      }
    },
    openEdit(id) {
      this.dialogTitle = "编辑报考";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加报考";
      this.dialogVisible = true;
    },
    // 搜索
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.enrollRecordList();
    },
    // 分页
    handlePageChange(val) {
      this.pageNum = val;
      this.enrollRecordList();
    },
    // 选择项
    async getEnrollSelect() {
      const data = {};
      const res = await getEnrollSelect(data);
      if (res.code === 0) {
        const enrollStatus = res.data?.enroll_status || [];
        this.searchOptions[0].options = res.data?.exam_type || [];
        this.searchOptions[1].options = enrollStatus;
        enrollStatus.forEach((item) => {
          this.enrollStatusMap[item.id] = item.name;
        });
      }
    },
    // 计划详情列表
    async enrollRecordList() {
      const data = {
        pid: this.$route.query?.id || "",
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await enrollRecordList(data);
      this.listLoading = false;
      this.listData = res.data.list;
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

