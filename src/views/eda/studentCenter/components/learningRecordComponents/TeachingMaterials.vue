<template>
  <div class="teaching-materials">
    <Title text="教材资料" />
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
      >
        <el-table-column
          label="ID"
          show-overflow-tooltip
          min-width="90"
          prop="books_id"
        >
        </el-table-column>
        <el-table-column
          prop="books_name"
          label="教材名称"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="chief_editor"
          label="作者"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column
          prop="project_name"
          label="出版日期"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column> -->
        <!-- <el-table-column
          prop="type"
          label="领取状态"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column> -->
        <el-table-column
          prop="type"
          label="领取方式"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ types[row.type] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="领取时间"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注信息"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMaterial } from "@/api/eda";
export default {
  name: "TeachingMaterials",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      types: {
        1: "现场发放",
        2: "快递",
      },
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
    };
  },
  created() {
    this.getMaterial();
  },
  methods: {
    handlePageChange(val) {
      this.pageNum = val;
      this.getMaterial();
    },
    async getMaterial() {
      const data = {
        uid: this.uid,
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getMaterial(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang='scss' scoped>
.teaching-materials {
}
</style>