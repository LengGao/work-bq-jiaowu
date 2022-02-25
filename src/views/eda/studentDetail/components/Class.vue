<template>
  <div class="class">
    <!--项目班级-->
    <h4 class="table-title">报读项目</h4>
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="light"
        border
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
      >
        <el-table-column
          align="center"
          label="项目编号"
          prop="project_id"
          min-width="70"
        ></el-table-column>
        <el-table-column
          align="left"
          prop="project_name"
          label="项目名称"
          min-width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="category_name"
          label="所属分类"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="price"
          label="项目价格"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="left"
          prop="project_name"
          label="课程"
          min-width="220"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{
              row.course.length
                ? row.course.map((item) => item.course_name).join(",")
                : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="classroom_id"
          label="题库"
          min-width="200"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{
              row.problem && row.problem.length
                ? row.problem.map((item) => item.title).join(",")
                : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          prop="total_books"
          label="教材"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{
              row.textbook && row.textbook.length
                ? row.textbook.map((item) => item.book_name).join(",")
                : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="create_time"
          label="报名时间"
          min-width="130"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="create_time"
          label="开课状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag
              size="small"
              :type="openCourseMap[row.open_course || 0].type"
              >{{ openCourseMap[row.open_course || 0].text }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="expire_time"
          label="到期日期"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="80"
        >
          <template slot-scope="{ row }">
            <el-button
              @click="closeCourseConfirm(row.project_id, 1)"
              v-if="row.open_course"
              type="text"
              style="padding: 0"
              >毕业关课</el-button
            >
            <!-- <el-button
              type="text"
              style="padding: 0"
              v-if="row.open_course"
              @click="closeCourseConfirm(row.project_id, 2)"
              >作废关课</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <h4 class="table-title">归属班级</h4>
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="classData"
        tooltip-effect="light"
        v-loading="classLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        border
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
      >
        <el-table-column
          label="编号"
          align="center"
          type="index"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="classroom_name"
          label="班级名称"
          min-width="220"
          align="left"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="120"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="project_name"
          label="项目名称"
          min-width="200"
          align="left"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="班主任"
          align="center"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="班级人数"
          min-width="100"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="add_time"
          label="加入时间"
          align="center"
          min-width="130"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="160"
        >
          <template slot-scope="{ row }">
            <el-button
              type="text"
              style="padding: 0"
              @click="toClassDetail(row.classroom_id)"
              >班级详情</el-button
            >
            <el-button type="text" style="padding: 0" @click="linkTo(row)"
              >转班</el-button
            >
            <el-button
              type="text"
              style="padding: 0"
              @click="removeConfirm(row.classroom_id)"
              >移除</el-button
            >
            <el-button
              type="text"
              style="padding: 0"
              @click="removeClass(row.course_id)"
              >关课</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <h4 class="table-title">学生课程</h4>
    <div class="userTable">
      <el-table
        ref="multipleTable"
        border
        :data="unClassData"
        tooltip-effect="light"
        v-loading="unClassLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
      >
        <el-table-column
          prop="course_students_id"
          label="学生课程ID"
          min-width="70"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="100"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="add_time"
          label="报名时间"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="join_class"
          label="是否加入班级"
          min-width="70"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>
              {{ row.join_class === 1 ? "是" : "否" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="classroom_name"
          label="班级名称"
          min-width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="duration"
          label="是否毕业"
          min-width="70"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>
              {{ row.is_graduate === 1 ? "是" : "否" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="status_name"
          label="状态"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag size="small" :type="statusMap[row.status]">{{
              row.status_name
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="100"
        >
          <template slot-scope="{ row }">
            <el-button
              v-if="row.status === 3"
              type="text"
              style="padding: 0"
              @click="restartCourse(row.course_id)"
              >恢复开课</el-button
            >
            <template v-else>
              <el-button
                type="text"
                style="padding: 0"
                @click="
                  linkTo({
                    course_student_id: row.course_students_id,
                    old_classroom_id: row.class_id,
                    course_id: row.course_id,
                    isSingle: true,
                  })
                "
                >加入班级</el-button
              >
              <el-button
                type="text"
                style="padding: 0"
                @click="removeClass(row.course_id)"
                >关课</el-button
              >
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getstudendclass,
  getuserproject,
  getUserCourseList,
  classstudentsBatchRemove,
  graduateCloseCourse,
  cancelCloseCourse,
  removeCourse,
  restartCourse,
} from "@/api/eda";
export default {
  name: "class",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      classData: [],
      classLoading: false,
      unClassData: [],
      unClassLoading: false,
      openCourseMap: {
        0: {
          text: "未开课",
          type: "danger",
        },
        1: {
          text: "已开课",
          type: "success",
        },
        2: {
          text: "已毕业",
          type: "",
        },
      },
      statusMap: {
        1: "success",
        2: "warning",
        3: "danger",
      },
    };
  },
  activated() {
    this.getstudendclass();
    this.getuserproject();
    this.getUserCourseList();
  },
  created() {
    this.getstudendclass();
    this.getuserproject();
    this.getUserCourseList();
  },
  methods: {
    // 毕业,作废关课
    closeCourseConfirm(project_id, type) {
      this.$confirm(`确定要执行${type === 1 ? "毕业关课" : "作废关课"}吗?`, {
        type: "warning",
      })
        .then(() => {
          this.closeCourse(project_id, type);
        })
        .catch(() => {});
    },
    async closeCourse(project_id, type) {
      const data = {
        uid: this.uid,
        project_id,
      };
      const api = type === 1 ? graduateCloseCourse : cancelCloseCourse;
      const res = await api(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getuserproject();
        this.getUserCourseList();
      }
    },
    // 去转班
    linkTo(row) {
      const query = {
        uid: [this.uid],
        course_students_id: [row.course_student_id],
        old_classroom_id: row.classroom_id || 0,
      };
      this.$router.push({
        name: "shift",
        query: {
          json: JSON.stringify(query),
          isSingle: row.isSingle ? 1 : 0,
          course_id: row.course_id,
        },
      });
    },
    // 移除学生
    removeConfirm(classroom_id) {
      this.$confirm(`确定要移除此学生吗?`, {
        type: "warning",
      })
        .then(() => {
          this.classstudentsBatchRemove(classroom_id);
        })
        .catch(() => {});
    },
    async classstudentsBatchRemove(classroom_id) {
      const data = {
        uid: [this.uid],
        classroom_id,
      };
      const res = await classstudentsBatchRemove(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getstudendclass();
      }
    },
    // 关课
    removeClass(course_id) {
      this.$confirm(
        `关闭课程后该学员将不能在东培学堂等小程序学习该课程，是否关闭课程?`,
        {
          type: "warning",
        }
      )
        .then(() => {
          this.removeCourse(course_id);
        })
        .catch(() => {});
    },
    async removeCourse(course_id) {
      const data = {
        uid: this.uid,
        course_id,
      };
      const res = await removeCourse(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getstudendclass();
        this.getUserCourseList();
      }
    },

    // 学生课程列表
    async getUserCourseList() {
      const data = {
        uid: this.uid,
      };
      this.unClassLoading = true;
      const res = await getUserCourseList(data);
      this.unClassLoading = false;
      if (res.code === 0) {
        this.unClassData = res.data;
      }
    },
    // 学生课程-恢复开课
    async restartCourse(course_id) {
      const data = {
        uid: this.uid,
        course_id,
      };
      const res = await restartCourse(data);
      if (res.code === 0) {
        this.getUserCourseList();
      }
    },
    //学生所在项目列表
    async getuserproject() {
      const data = {
        uid: this.uid,
      };
      this.listLoading = true;
      const res = await getuserproject(data);
      this.listLoading = false;
      this.listData = res.data;
    },
    //学生所在班级列表
    async getstudendclass() {
      const data = {
        uid: this.uid,
      };
      this.classLoading = true;
      const res = await getstudendclass(data);
      this.classLoading = false;
      this.classData = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.class {
  .table-title {
    padding: 20px 0;
    display: flex;
    align-items: center;
    color: #606266;
    &::before {
      display: block;
      content: "";
      width: 4px;
      height: 16px;
      background-color: #199fff;
      margin-right: 10px;
    }
  }
}
</style>