<template>
  <div>
    <div class="head_remind">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作。
    </div>

    <section class="mainwrap">
      <div class="client_head">
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
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleTabelSelectChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            label="学员编号"
            show-overflow-tooltip
            min-width="80"
            prop="uid"
          >
          </el-table-column>
          <el-table-column
            prop="user_realname"
            label="学员姓名"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号码"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="institution_name"
            label="所属机构"
            min-width="130"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="schoole_name"
            label="所属校区"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="video_time_total"
            label="学习时长"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="video_progress"
            label="学习进度"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="total_problem"
            label="做题总数"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="problem_rate"
            label="做题进度"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="real_topic_score"
            label="历年真题平均分"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="exam_score"
            label="模拟考试平均分"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="self_determination_score"
            label="自主出题最高分"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="live_time"
            label="直播时长"
            min-width="90"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="150">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="learningDetails(row)"
                  >学习详情</el-button
                >
                <el-button type="text" @click="linkTo(row)">转班</el-button>
                <el-button type="text" @click="removeConfirm([row.uid])"
                  >移除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="footer">
          <div>
            <el-button @click="batchShift"> 批量转班 </el-button>
            <el-button @click="batchRemove"> 批量移除 </el-button>
          </div>
          <div class="table_bottom">
            <page
              :data="listTotal"
              :curpage="pageNum"
              @pageChange="handlePageChange"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getClassstudentList, classstudentsBatchRemove } from "@/api/eda";
import { getInstitutionSelectData } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        organization_id: [],
        keyword: "",
      },
      searchOptions: [
        {
          key: "organization_id",
          type: "cascader",
          attrs: {
            placeholder: "所属机构",
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
      selectionIds: [],
      courseStudentIds: [],
    };
  },

  created() {
    this.getClassstudentList();
    this.getInstitutionSelectData();
  },

  methods: {
    learningDetails(row) {
      this.$router.push({
        name: "learningDetails",
        query: {
          uid: row.uid,
          course_id: row.course_id,
          course_name: row.course_name,
          project_id: row.project_id,
        },
      });
    },
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
        old_classroom_id: this.$route.query.classId,
      };
      this.$router.push({
        name: "shift",
        query: {
          json: JSON.stringify(query),
          course_id: this.listData[0].course_id,
        },
      });
    },

    linkTo(row) {
      const query = {
        uid: [row.uid],
        course_students_id: [row.course_student_id],
        old_classroom_id: this.$route.query.classId,
      };
      this.$router.push({
        name: "shift",
        query: { json: JSON.stringify(query), course_id: row.course_id },
      });
    },
    addStudent() {
      this.$router.push({
        path: "/eda/addStudent",
        query: this.$route.query || {},
      });
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassstudentList();
    },

    handleSearch(data) {
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        organization_id: data.organization_id.pop(),
      };
      this.getClassstudentList();
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
        classroom_id: this.$route.query.classId,
      };
      const res = await classstudentsBatchRemove(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getClassstudentList();
      }
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    //班级学生列表
    async getClassstudentList() {
      this.selectionIds = [];
      this.courseStudentIds = [];
      const data = {
        class_id: this.$route.query.classId,
        course_id: this.$route.query.course_id,
        // project_id:this.$route.query.project_id,
        page: this.pageNum,
        ...this.searchData,
      };
      delete data.date;
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
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.input-width {
  width: 240px;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.footer {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
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
.imgBox_warn {
  line-height: 30px;
  padding-top: 10px;
  color: #aaa;
}
.headPortrait {
  width: 87px;
  height: 87px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.headPortrait:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}
.imageBox {
  width: 87px;
  height: 87px;
  position: relative;
}
.iconjia {
  font-size: 40px;
  color: #fff;
  display: none;
  position: absolute;
  width: 87px;
  height: 87px;
  line-height: 87px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}
.imageBox:hover i {
  display: block;
}
.headPortrait {
  width: 240px;
  height: 135px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.headPortrait:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}
</style>
