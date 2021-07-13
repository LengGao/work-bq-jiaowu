<template>
  <div class="video-library">
    <div class="head_remind">*管理所有直播回顾视频，方便班级调取复用。</div>
    <div class="container">
      <VideoMenu
        @on-change="handleChapterChange"
        :chapterType="activeName"
        class="container-left"
        ref="VideoMenu"
      />
      <div class="container-right">
        <div class="container-right-header">
          <SearchList
            :options="searchOptions"
            :data="searchData"
            ref="search"
            @on-search="handleSearch"
          />
          <div>
            <el-button type="primary" @click="openUploadDialog"
              >上传视频</el-button
            >
          </div>
        </div>
        <!--表格-->
        <div class="userTable">
          <el-table
            ref="multipleTable"
            :data="listData"
            v-loading="listLoading"
            element-loading-text="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
            style="width: 100%"
            class="min_table"
            :header-cell-style="{
              'text-align': 'center',
              background: '#f8f8f8',
            }"
            :cell-style="{ 'text-align': 'center' }"
            height="660"
          >
            <el-table-column
              label="ID"
              show-overflow-tooltip
              min-width="70"
              prop="id"
            >
            </el-table-column>
            <el-table-column
              prop="topic_description"
              label="视频名称"
              min-width="300"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <div class="video-cover">
                  <img :src="row.cover_url" alt="" />
                  <span>{{ row.title }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="duration"
              label="视频时长"
              min-width="90"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="size"
              label="文件大小"
              min-width="90"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="create_time"
              label="上传时间"
              min-width="140"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="update_time"
              label="修改时间"
              min-width="140"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="staff_name"
              label="操作人"
              min-width="90"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="操作" fixed="right" min-width="200">
              <template slot-scope="{ row }">
                <div style="display: flex; justify-content: center">
                  <el-button
                    type="text"
                    :loading="row.loading"
                    @click="download(row)"
                    >下载</el-button
                  >
                  <el-button type="text" @click="openEdit(row)">编辑</el-button>
                  <el-button
                    type="text"
                    :loading="row.updateLoading"
                    @click="completeVideoInfo(row)"
                    >完善视频</el-button
                  >
                  <el-button type="text" @click="deleteConfirm(row.id)"
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
      </div>
    </div>

    <UploadVideoDialog
      v-model="uploadDialog"
      :chapter-type="activeName"
      :videoData="videoData"
      :title="dialogTitle"
      @on-success="getVideoList"
    />
  </div>
</template>

<script>
import { getShortcuts } from "@/utils/date";
import VideoMenu from "./components/VideoMenu";
import {
  getVideoList,
  deleteVideo,
  getAdminSelect,
  completeVideoInfo,
} from "@/api/sou";
import UploadVideoDialog from "./components/UploadVideoDialog.vue";
export default {
  name: "videoLibrary",
  components: {
    VideoMenu,
    UploadVideoDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        title: "",
        admin_id: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        {
          key: "admin_id",
          type: "select",
          width: 120,
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          attrs: {
            placeholder: "操作人员",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "title",
          attrs: {
            placeholder: "视频名称",
          },
        },
      ],
      videoData: {},
      dialogTitle: "",
      uploadDialog: false,
      videoGroupId: -1,
    };
  },

  created() {
    this.getVideoList();
    this.getAdminSelect();
  },

  methods: {
    // 完善视频信息
    async completeVideoInfo(row) {
      row.updateLoading = true;
      const data = { id: row.id };
      const res = await completeVideoInfo(data);
      row.updateLoading = false;
      if (res.code === 0) {
        this.getVideoList();
      }
    },
    // 下载
    download(row) {
      row.loading = true;
      const a = document.createElement("a");
      a.href = row.file_url;
      a.download = row.title;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => {
        row.loading = false;
      }, 1000);
    },
    // 操作员列表
    async getAdminSelect() {
      const res = await getAdminSelect();
      if (res.code === 0) {
        this.searchOptions[1].options = res.data || [];
      }
    },
    // 添加视频
    openUploadDialog() {
      this.dialogTitle = "上传视频";
      this.videoData = {};
      this.uploadDialog = true;
    },
    openEdit(row) {
      this.dialogTitle = "修改视频";
      this.videoData = row;
      this.uploadDialog = true;
    },
    // 视频分组变化
    handleChapterChange(id) {
      this.pageNum = 1;
      this.videoGroupId = id;
      this.getVideoList();
    },
    // 删除视频
    deleteConfirm(id) {
      this.$confirm("确定要删除此视频吗?", { type: "warning" })
        .then(() => {
          this.deleteVideo(id);
        })
        .catch(() => {});
    },
    async deleteVideo(id) {
      const data = { id };
      const res = await deleteVideo(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getVideoList();
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      const date = data.date || ["", ""];
      delete data.date;
      this.searchData = {
        ...data,
        start_time: date[0],
        end_time: date[1],
      };
      this.getVideoList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getVideoList();
    },
    async getVideoList() {
      const data = {
        page: this.pageNum,
        group_id: this.videoGroupId,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getVideoList(data);
      this.listLoading = false;
      this.listData = res.data.list.map((item) => ({
        ...item,
        loading: false,
        updateLoading: false,
      }));
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.video-library {
  .container {
    display: flex;
    width: 100%;
    padding: 20px;
    &-left {
      width: 300px;
      border: 1px solid #e4e7ed;
      flex-shrink: 0;
      height: 800px;
    }
    &-right {
      width: calc(100% - 320px);
      margin-left: 20px;
      &-header {
        display: flex;
        justify-content: space-between;
      }
      .userTable {
        margin-top: 20px;
        .video-cover {
          display: flex;
          align-items: center;
          height: 50px;
          img {
            width: 80px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
