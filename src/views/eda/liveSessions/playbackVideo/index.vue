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
        <el-button type="primary" @click="openAdd">添加视频</el-button>
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
            prop="live_video_id"
          >
          </el-table-column>
          <el-table-column
            prop="live_video_name"
            label="视频名称"
            min-width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="cover_url"
            label="视频缩略图"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <div class="video-cover" v-if="row.cover_url">
                <img
                  @click="handlePreview(row.cover_url)"
                  :src="row.cover_url"
                  alt=""
                />
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="end_push_time"
            label="时长"
            min-width="180"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span v-if="row.media_duration">
                {{ row.media_duration | filterDuration }}
              </span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="140">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="openEdit(row.live_video_id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="deleteConfirm(row.live_video_id)"
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
      <!-- 弹框 -->
      <PlaybackVideoDialog
        v-model="dialogVisible"
        :title="dialogTitle"
        :id="currentId"
        @on-success="livevideolist"
      />
      <PreviewImg ref="view" />
    </section>
  </div>
</template>

<script>
import { livevideolist, deletelivevideo } from "@/api/eda";
import PlaybackVideoDialog from "./components/PlaybackVideoDialog";
export default {
  components: {
    PlaybackVideoDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        keyword: "",
      },
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "视频名称",
          },
        },
      ],
      currentId: "",
      dialogVisible: false,
      dialogTitle: "",
      typeOptions: [],
    };
  },

  created() {
    this.livevideolist();
  },
  methods: {
    // 删除视频
    deleteConfirm(id) {
      this.$confirm("确定要删除此视频吗?", { type: "warning" })
        .then(() => {
          this.deletelivevideo(id);
        })
        .catch(() => {});
    },
    async deletelivevideo(live_video_id) {
      const data = { live_video_id };
      const res = await deletelivevideo(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.livevideolist();
      }
    },
    handlePreview(src) {
      this.$refs.view.show(src);
    },
    openEdit(id) {
      this.currentId = id;
      this.dialogTitle = "编辑视频";
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加视频";
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.livevideolist();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.livevideolist();
    },

    async livevideolist() {
      const data = {
        live_id: this.$route.query.live_id || "",
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await livevideolist(data);
      this.listLoading = false;
      this.listData = res.data.data;
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
