<template>
  <div class="ali-video">
    <div class="head_remind">*管理阿里服务器上的所有视频资源。</div>
    <!--表格-->
    <div class="userTable">
      <el-table
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
      >
        <el-table-column
          label="阿里源视频ID"
          show-overflow-tooltip
          min-width="200"
          prop="VideoId"
        >
        </el-table-column>
        <el-table-column
          prop="Title"
          label="视频名称"
          min-width="160"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="CreateTime"
          label="创建时间"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="ModifyTime"
          label="修改时间"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="status_name"
          label="状态"
          min-width="70"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="message"
          label="备注信息"
          min-width="200"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-button
              v-if="row.id"
              type="text"
              @click="openUsageTimesDialog(row.id)"
              >{{ row.message }}</el-button
            >
            <span v-else>{{ row.message }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button
                type="text"
                :loading="row.loading"
                @click="downloadSourceVideo(row)"
                >下载</el-button
              >
              <el-button type="text" @click="deleteConfirm(row.VideoId)"
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
    <UsageTimesDialog v-model="usageTimesDialog" :id="currentId" />
  </div>
</template>

<script>
import UsageTimesDialog from "@/views/sou/videoLibrary/components/UsageTimesDialog.vue";
import {
  getSourceVideoList,
  deleteSourceVideo,
  downloadSourceVideo,
} from "@/api/sou";
export default {
  name: "aliVideo",
  components: {
    UsageTimesDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      usageTimesDialog: false,
      currentId: "",
    };
  },

  created() {
    this.getSourceVideoList();
  },

  methods: {
    openUsageTimesDialog(id) {
      this.currentId = id;
      this.usageTimesDialog = true;
    },
    // 下载
    async downloadSourceVideo(row) {
      row.loading = true;
      const data = { video_id: row.VideoId };
      const res = await downloadSourceVideo(data).catch(() => {
        row.loading = false;
      });
      if (res.code === 0) {
        const a = document.createElement("a");
        a.href = res.data.Mezzanine.FileURL;
        a.download = res.data.Mezzanine.FileName;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => {
          row.loading = false;
        }, 1000);
      }
    },
    // 删除视频
    deleteConfirm(id) {
      this.$prompt("您正在删除视频，请输入密码确认删除", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入密码",
        inputPattern: /\S+/,
        inputErrorMessage: "请输入密码",
        inputType: "password",
      }).then(({ value }) => {
        this.deleteSourceVideo(id, value);
      });
    },
    async deleteSourceVideo(video_id, pwd) {
      const data = { video_id, pwd };
      const res = await deleteSourceVideo(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getSourceVideoList();
      }
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getSourceVideoList();
    },
    async getSourceVideoList() {
      const data = {
        page: this.pageNum,
      };
      this.listLoading = true;
      const res = await getSourceVideoList(data);
      this.listLoading = false;
      this.listData = res.data.list.map((item) => ({
        ...item,
        loading: false,
      }));
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
