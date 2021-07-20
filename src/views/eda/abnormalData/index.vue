<template>
  <div>
    <div class="head_remind">*本模块可查询意向，班级异常数据。</div>
    <section class="mainwrap">
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
        >
          <el-table-column
            label="编号"
            show-overflow-tooltip
            min-width="70"
            align="center"
            prop="live_class_id"
          >
          </el-table-column>
          <el-table-column
            prop="live_class_name"
            label="直播名称"
            min-width="220"
            align="left"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="class_name"
            label="班级名称"
            min-width="180"
            align="left"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="130"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="teacher_name"
            label="任课老师"
            align="center"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="staff_name"
            label="状态"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-link
                type="success"
                class="live-status live-status-active"
                v-if="row.live_status"
                @click="openLinkDetail(row.live_class_id)"
                >直播中</el-link
              >
              <span class="live-status" v-else>无直播</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            min-width="240"
          >
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button
                  type="text"
                  v-if="!row.live_status"
                  @click="deleteConfirm(row.live_class_id)"
                  >删除</el-button
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
  </div>
</template>

<script>
import {
  classLiveList,
  deleteClassLive,
  livestart,
  closelive,
} from "@/api/eda";
export default {
  name: "classLive",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
    };
  },

  created() {
    this.classLiveList();
  },
  methods: {
    handlePageChange(val) {
      this.pageNum = val;
      this.classLiveList();
    },
    async classLiveList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await classLiveList(data);
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
  .live-status {
    color: #999999;
    &::before {
      display: inline-block;
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #999999;
      vertical-align: middle;
      margin-right: 4px;
    }
    &-active {
      color: #00c297;
      &::before {
        background-color: #00c297;
      }
    }
  }
}
.table_bottom {
  text-align: right;
}
</style>
