<template>
  <div class="class">
    <!--报读班级-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="light"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="id"
          label="编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="班级名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="课程名称"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="project_name"
          label="班主任"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="classroom_id"
          label="班级人数"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total_books"
          label="加入时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="200"
          max-width="200"
        >
          <template slot-scope="{ row }">
            <div class="operation_btn">
              <el-button type="text" @click="linkTo(row.id)"
                >班级详情</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { dispenseList } from "@/api/eda";
export default {
  name: "class",
  data() {
    return {
      listData: [],
      listLoading: false,
    };
  },
  created() {
    this.dispenseList();
  },
  methods: {
    linkTo(id) {
      console.log(id);
    },
    //教材发放列表
    async dispenseList() {
      this.checkedIds = [];
      this.listLoading = true;
      const res = await dispenseList();
      this.listLoading = false;
      this.listData = res.data.list;
    },
  },
};
</script>

<style>
</style>