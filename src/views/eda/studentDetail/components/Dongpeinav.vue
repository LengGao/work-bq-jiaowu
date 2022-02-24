<template>
  <div class="face-record">
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
          label="课程ID"
          show-overflow-tooltip
          min-width="80"
          prop="course_id"
        >
        </el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
          min-width="220"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="更新时间"
          min-width="150"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <!-- <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import { courseCollection} from "@/api/eda";
export default {
  name: "Dongpeinav",
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
    //   pageNum: 1,
    //   listTotal: 0,

    };
  },

  created() {
    this.courseCollection();
  },

  methods: {
    // 课程分页
    handlePageChange(val) {
      this.pageNum = val;
      this.courseCollection();
    },
    // 课程列表
    async courseCollection() {
      const data = {
        uid: this.uid,
        // page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await courseCollection(data);
      this.listLoading = false;
      this.listData = res.data.list;
    //   this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.face-record {
  /deep/.el-table__header th,
  .el-table__header tr {
    background-color: #f8f8f8;
    color: #909399;
  }
  .client_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .userTable {
    margin-top: 20px;
    .best-frame {
      width: 100%;
      height: 70px;
      text-align: center;
      img {
        width: 60px;
        cursor: pointer;
      }
    }
  }
}
</style>
