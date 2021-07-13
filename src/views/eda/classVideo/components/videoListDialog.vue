<template>
  <!--添加编辑章节弹窗-->
  <el-dialog
    title="选择视频"
    :visible.sync="visible"
    width="1100px"
    @open="handleOpen"
    :close-on-click-modal="false"
    append-to-body
    top="5vh"
    class="video-list-dialog"
    @closed="hanldeCancel"
  >
    <div class="search">
      <SearchList
        :options="searchOptions"
        :data="searchData"
        ref="search"
        @on-search="handleSearch"
      />
      <div>
        <el-button type="primary" @click="openUploadDialog">上传视频</el-button>
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
        height="550"
      >
        <el-table-column label="选择" width="55">
          <template slot-scope="{ row }">
            <el-radio v-model="checkedStr" :label="`${row.id},${row.title}`"
              ><span></span
            ></el-radio>
          </template>
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
          prop="group_name"
          label="视频分组"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
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
          prop="use_count"
          label="引用次数"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
    <UploadVideoDialog
      v-model="uploadDialog"
      :title="dialogTitle"
      @on-success="handleEmit"
    />
  </el-dialog>
</template>

<script>
import UploadVideoDialog from "@/views/sou/videoLibrary/components/UploadVideoDialog.vue";
import { getVideoList, getVideoGroupSelect } from "@/api/sou";
export default {
  name: "videoListDialog",
  components: {
    UploadVideoDialog,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: this.value,
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        title: "",
        group_id: "",
      },
      searchOptions: [
        {
          key: "group_id",
          type: "select",
          width: 120,
          options: [],
          optionValue: "id",
          optionLabel: "group_name",
          attrs: {
            placeholder: "视频分组",
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
      addLoading: false,
      checkedStr: "",
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    handleOpen() {
      this.getVideoList();
      this.getVideoGroupSelect();
    },
    async getVideoGroupSelect() {
      const res = await getVideoGroupSelect();
      if (res.code === 0) {
        this.searchOptions[0].options = res.data;
      }
    },

    handleOk() {
      if (!this.checkedStr) {
        this.$emit.warning("请选择视频！");
        return false;
      }
      const [id, title] = this.checkedStr.split(",");
      this.handleEmit({ id, title });
    },
    handleEmit(data) {
      this.visible = false;
      this.$emit("on-checked", data);
    },
    // 添加视频
    openUploadDialog() {
      this.dialogTitle = "上传视频";
      this.videoData = {};
      this.uploadDialog = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        group_id: data.group_id || -1,
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
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getVideoList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    hanldeCancel() {
      this.checkedStr = "";
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.video-list-dialog {
  .search {
    display: flex;
    justify-content: space-between;
  }
  .video-cover {
    display: flex;
    align-items: center;
    height: 50px;
    img {
      width: 80px;
    }
  }
}
</style>