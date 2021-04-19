<template>
  <div>
    <div class="head_remind">*本模块展示所有的班级直播。</div>
    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
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
            label="直播场次"
            min-width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="最早推流时间"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="project_name"
            label="最晚断流时间"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_name"
            label="实时在线人数"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="280">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="openEdit(row.classroom_id)"
                  >直播链接</el-button
                >
                <el-button type="text" @click="linkTo(row)">直播详情</el-button>
                <el-button type="text">回顾视频</el-button>
                <el-button type="text">学习资料</el-button>
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
      <!--弹框-->
      <LiveLinkDialog
        v-model="dialogVisible"
        title="直播链接"
        :id="currentId"
      />
    </section>
  </div>
</template>

<script>
import { getClassList } from "@/api/eda";
import LiveLinkDialog from "./components/LiveLinkDialog";
export default {
  components: {
    LiveLinkDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        project_id: "",
        keyword: "",
        category_id: [],
      },
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "直播名称",
          },
        },
      ],
      currentId: "",
      dialogVisible: false,
      typeOptions: [],
    };
  },

  created() {
    this.getClassList();
  },
  methods: {
    linkTo(row) {
      this.$router.push({ name: "liveDetails" });
    },
    openEdit(id) {
      this.currentId = id;
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getClassList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassList();
    },

    async getClassList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getClassList(data);
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
.table_bottom {
  text-align: right;
}
</style>
