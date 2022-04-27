<template>
  <div>
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
            prop="live_id"
          >
          </el-table-column>
          <el-table-column
            prop="live_name"
            label="直播场次"
            min-width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="start_push_time"
            label="最早推流时间"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="end_push_time"
            label="最晚断流时间"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="total_pople"
            label="实时在线人数"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="280">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="openLiveLink(row.live_id)"
                  >直播链接</el-button
                >
                <el-button type="text" @click="linkTo('liveDetails', row)"
                  >直播详情</el-button
                >
                <el-button type="text" @click="linkTo('playbackVideo', row)"
                  >回顾视频</el-button
                >
                <el-button type="text" @click="linkTo('learningMaterials', row)"
                  >学习资料</el-button
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
      <!--弹框-->
      <LiveLinkDialog
        v-model="dialogVisible"
        title="直播链接"
        :id="$route.query.live_class_id"
        :sessionId="currentId"
      />
    </section>
  </div>
</template>

<script>
import { liveSessionList } from "@/api/eda";
import LiveLinkDialog from "./components/LiveLinkDialog";
export default {
  name: "liveSessions",
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
        search_box: "",
      },
      searchOptions: [
        {
          key: "search_box",
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
    this.liveSessionList();
  },
  methods: {
    linkTo(name, { live_class_id, live_id, course_id }) {
      this.$router.push({
        name,
        query: {
          live_class_id,
          live_id,
          course_id,
          isclass: this.$route.query.isclass || "",
        },
      });
    },
    openLiveLink(id) {
      this.currentId = id;
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.liveSessionList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.liveSessionList();
    },

    async liveSessionList() {
      const data = {
        id: this.$route.query.live_class_id || "",
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await liveSessionList(data);
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
