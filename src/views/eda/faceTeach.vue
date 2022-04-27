<template>
  <section class="mainwrap">
    <div class="head">
      <search2
        :courseTypeShow="true"
        :contentShow="true"
        api="getCourseList"
        typeTx="subscribeClassroom"
        inputText="课程名称"
        @getTable="getTableList"
        :selectList="selectData.list"
      ></search2>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <!-- <el-table-column type="selection" width="30"></el-table-column> -->
        <el-table-column prop="id" label="编号" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template></el-table-column
        >
        <el-table-column
          prop="course_name"
          label="课程名称"
          min-width="110"
          align="left"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="category_name"
          label="课程分类"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="hasNumber"
          label="面授课数量"
          min-width="50"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="toFaceMessage(scope.row)"
              >面授课管理</el-button
            >
            <el-button type="text" @click="toFaceBlacklist(scope.row)"
              >面授黑名单</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>
    </div>
    <!-- 添加课程开始 -->
    <el-dialog
      title="添加课程"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      width="30%"
    >
      <el-form :model="ruleForm" ref="ruleForm" label-width="110px">
        <el-form-item label="课程类型" prop="categoryId">
          <el-select
            filterable
            v-model="ruleForm.category_id"
            placeholder="请选择课程类型"
          >
            <el-option
              v-for="item in selectData.list"
              :key="item.category_id"
              :label="item.category_name"
              :value="item.category_id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="课程名称" prop="courseId">
          <el-select
            v-model="ruleForm.course_id"
            filterable
            placeholder="请选择课程名称"
          >
            <el-option
              v-for="item in Courname.list"
              :label="item.course_name"
              :value="item.course_id"
              :key="item.course_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="选择课时"
                      :label-width="formLabelWidth">

        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveLink('ruleForm')">添加</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: "faceTeach",
  data() {
    return {
      //弹框显示隐藏
      dialogFormVisible: false,
      ruleForm: {
        category_id: 0,
        course_id: 2,
      },
      type: "",
      datas: {},
      page: 1,
      schoolData: [],
      selectData: [],
      courseName: [],
      courseType: [],
      Courname: [],
    };
  },
  created() {
    this.type = "subscribeClassroom";
    this.$api.getCategoryList(this, "selectData");
    this.$api.getCourseManage(this, "Courname");
    this.$api.getCourseList(this, "schoolData");
  },
  methods: {
    getTableList(state, val, datas) {
      console.log(state, val);
      if (state == "page") {
        this.page = val;
        this.datas = datas;
      } else if (state == "data") {
        this.schoolData = val;
      }
    },
    doPageChange(page) {
      this.page = page;
      this.$api.getCourseList(this, "schoolData", this.datas);
    },
    addCourse() {
      this.dialogFormVisible = true;
    },

    saveLink() {
      console.log(this.ruleForm);
      this.$api.addSubscribeClassroom(this, this.ruleForm);
    },
    toFaceMessage(zx) {
      console.log(zx);
      this.$router.push({
        name: "faceMessage",
        query: {
          problem_course_id: zx.problem_course_id,
          course_id: zx.course_id,
        },
      });
    },
    toFaceBlacklist(ab) {
      console.log(ab);
      this.$router.push({
        name: "faceBlacklist",
        query: {
          course_id: ab.course_id,
          problem_course_id: ab.problem_course_id,
        },
      });
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
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>
