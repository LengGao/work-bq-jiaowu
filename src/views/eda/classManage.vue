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
        <el-button type="primary" @click="openAdd">添加班级</el-button>
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
        >
          <el-table-column
            label="编号"
            show-overflow-tooltip
            min-width="70"
            prop="classroom_id"
          >
          </el-table-column>
          <el-table-column
            prop="classroom_name"
            label="班级名称"
            min-width="220"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div
                class="classroom_name"
                @click="toClassDetail(row.classroom_id)"
              >
                {{ row.classroom_name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_name"
            label="课程名称"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="staff_name"
            label="班主任"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="student_number"
            label="班级人数"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column label="操作" fixed="right" min-width="380">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="openEdit(row.classroom_id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="toClassDetail(row.classroom_id)"
                  >班级详情</el-button
                >
                <el-button
                  type="text"
                  @click="
                    toLearnerManage(
                      row.classroom_id,
                      row.course_id,
                      row.project_id
                    )
                  "
                  >学生管理</el-button
                >
                <el-button type="text" @click="toMassMessage(row)"
                  >群发消息</el-button
                >
                <el-button type="text" @click="toReturnVisit(row.classroom_id)"
                  >学习回访</el-button
                >
                <el-button type="text" @click="toClassVideo(row.classroom_id)"
                  >直播回顾</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageSizeChange="handleSizeChange"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
      <!--弹框-->
      <AddClass
        v-model="dialogVisible"
        :title="dialogTitle"
        :id="currentId"
        :typeOptions="typeOptions"
        @on-success="getClassList"
      />
    </section>
  </div>
</template>

<script>
import { getClassList, getproject } from "@/api/eda";
import { getCateList } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
import AddClass from "./components/AddClass";
export default {
  name: "classManage",
  components: {
    AddClass,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        category_id: [],
        project_id: "",
        keyword: "",
      },
      searchOptions: [
        {
          key: "category_id",
          type: "cascader",
          events: {
            change: this.handleTypeChange,
          },
          attrs: {
            placeholder: "所属分类",
            clearable: true,
            props: { checkStrictly: true },
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
          attrs: {
            placeholder: "所属项目",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "班级名称、班主任",
          },
        },
      ],

      currentId: "",
      dialogTitle: "添加班级",
      dialogVisible: false,
      typeOptions: [],
    };
  },

  created() {
    this.getClassList();
    this.getCateList();
    this.getproject();
  },

  methods: {
    toClassVideo(id) {
      this.$router.push({
        name: "classVideo",
        query: { id },
      });
    },
    openEdit(id) {
      this.dialogTitle = "编辑班级";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加班级";
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        category_id: data.category_id.pop(),
      };
      this.getClassList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getClassList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassList();
    },
    async getClassList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getClassList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
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
        this.searchOptions[1].options = res.data;
      }
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
    toMassMessage(row) {
      this.$router.push({
        name: "massMessage",
        query: {
          classroom_id: row.classroom_id,
        },
      });
    },
    toLearnerManage(classId, course_id, project_id) {
      this.$router.push({
        name: "learnerManage",
        query: {
          classId,
          course_id,
          project_id,
        },
      });
    },
    toReturnVisit(class_id) {
      this.$router.push({
        name: "returnVisit",
        query: {
          class_id,
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
.input-width {
  width: 240px;
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
.table_bottom {
  text-align: right;
}
.classroom_name {
  color: #199fff;
  cursor: pointer;
}
</style>
