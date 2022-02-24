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
        height="540"
      >
        <el-table-column prop="id" label="序号" min-width="60">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="操作时间"
          min-width="110"
          show-overflow-tooltip
          sort
        ></el-table-column>
        <el-table-column
          prop="books_name"
          label="教材名称"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="is_additional"
          label="发放类型"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span v-if="row.is_additional">补发教材</span>
            <span v-else>正常发放</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="storehouse_name"
          label="仓库名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="num"
          label="发放数量"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="type"
          label="发放形式"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ types[row.type] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="操作人"
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
import { dispenseBooksLog } from "@/api/eda";
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
      pageSize: 20,
      listTotal: 0,
    };
  },
  created() {
    this.dispenseBooksLog();
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
      this.dispenseBooksLog();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.dispenseBooksLog();
    },
    async dispenseBooksLog() {
      const data = {
        uid: this.uid,
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await dispenseBooksLog(data);
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