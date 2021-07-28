<template>
  <!-- 章节视频 -->
  <div class="chapter-video">
    <div class="client_head">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <div>
        <el-button type="primary" @click="openAdd">添加章节</el-button>
        <el-button type="primary" @click="openAddClassHour">添加课时</el-button>
      </div>
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
        row-key="treeId"
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :load="loadTableChildren"
        @selection-change="handleSelectionChange"
      >
        <el-table-column :selectable="selectable" type="selection" width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="章节名称"
          min-width="220"
          align="left"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="coverurl"
          label="视频缩略图"
          min-width="110"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div class="video-cover" v-if="row.coverurl">
              <img
                @click="handlePreview(row.coverurl)"
                :src="row.coverurl"
                alt=""
              />
            </div>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="duration"
          label="时长"
          align="center"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span v-if="row.duration">
              {{ row.duration | filterDuration }}
            </span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          align="center"
          label="排序"
          min-width="70"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-input type="number" v-if="isEdit" v-model="row.sort" />
            <span v-else>{{ row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="student_number"
          label="免费试看"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-switch
              v-if="row.free"
              @change="updateVideoClassFreeStatus(row)"
              v-model="row.free"
              :active-value="2"
              :inactive-value="1"
            >
            </el-switch>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="student_number"
          label="是否快进"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-switch
              v-if="row.parentId"
              @change="updateProgressStatus(row)"
              v-model="row.progress_status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="detect_time"
          label="扫脸次数"
          width="90"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-input
              v-if="row.parentId && isDetect"
              type="number"
              v-model="row.detect_time"
            ></el-input>
            <span v-else-if="row.parentId">{{ row.detect_time }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="140"
        >
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button
                type="text"
                v-if="row.parentId"
                @click="getVideoUrlByid(row)"
                :loading="row.loading"
                >下载</el-button
              >
              <el-button
                v-if="row.parentId"
                type="text"
                @click="toFaceRecord(row)"
                >核验记录</el-button
              >
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="deleteConfirm(row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="actions">
          <div v-if="isEdit">
            <el-button @click="handleEditCancel">取消</el-button>
            <el-button type="primary" @click="handleBatchSort">保存</el-button>
          </div>
          <div v-else>
            <el-button @click="showEdit">批量排序</el-button>
          </div>
          <div v-if="isDetect">
            <el-button @click="handleDetectCancel">取消</el-button>
            <el-button type="primary" @click="handleBatchDetect"
              >保存</el-button
            >
          </div>
          <div v-else>
            <el-button @click="showDetect">批量扫脸次数</el-button>
          </div>
          <el-button @click="handleBatchDrag(1)">批量快进（开）</el-button>
          <el-button @click="handleBatchDrag(0)">批量快进（关）</el-button>
        </div>

        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
    <ChapterDIalog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      @on-success="getvideochapterList"
    />
    <ClassHourDialog
      v-model="classHourDialogVisible"
      :title="classHourDialogTitle"
      :id="classHourId"
      @on-success="updateTableChildren"
    />
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import {
  getvideochapterList,
  deletevideochapter,
  updateVideoClassFreeStatus,
  getvideoclass,
  deletevideoclass,
  videoClassSort,
  videoChapterSort,
  getVideoUrlByid,
  updateVideoClassDetectTime,
  updateVideoClassProgressStatus,
} from "@/api/sou";
import ChapterDIalog from "./chapterDIalog";
import ClassHourDialog from "./classHourDialog";
import { download } from "@/utils/index";
export default {
  name: "chapterVideo",
  components: {
    ClassHourDialog,
    ChapterDIalog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        video_chapter_name: "",
      },
      searchOptions: [
        {
          key: "video_chapter_name",
          attrs: {
            placeholder: "章节名称",
          },
        },
      ],
      //章节
      currentId: "",
      dialogTitle: "添加章节",
      dialogVisible: false,
      // 课时
      classHourId: "",
      classHourDialogTitle: "添加课时",
      classHourDialogVisible: false,
      treeId: 0,
      treeLoadMap: new Map(),
      //排序
      isEdit: false,
      //扫脸次数
      isDetect: false,
      checkedIds: [],
    };
  },

  created() {
    this.getvideochapterList();
  },

  methods: {
    toFaceRecord(row) {
      console.log(row);
    },
    handleSelectionChange(selection) {
      this.checkedIds = selection.map((item) => item.id);
    },
    // 批量快进控制
    async handleBatchDrag(status) {
      if (!this.checkedIds.length) {
        this.$message.warning("请先选择！");
        return;
      }
      const data = {
        video_class_id_arr: this.checkedIds,
        status,
      };
      const res = await updateVideoClassProgressStatus(data);
      if (res.code === 0) {
        this.$message.success(res.message);
      }
      this.getvideochapterList();
    },
    selectable(row) {
      return !!row.parentId;
    },
    handleDetectCancel() {
      this.$message("已取消");
      this.getvideochapterList();
    },
    // 批量设置扫脸次数
    handleBatchDetect() {
      const data = {};
      const allChildren = [];
      const lazyTreeNodeMap =
        this.$refs.multipleTable.store.states.lazyTreeNodeMap;

      for (let k in lazyTreeNodeMap) {
        allChildren.push(...lazyTreeNodeMap[k]);
      }
      // 设置课时扫脸参数
      allChildren.forEach((item) => {
        data[item.id] = item.detect_time;
      });
      allChildren.length && this.updateVideoClassDetectTime(data);
    },
    showDetect() {
      this.isDetect = true;
    },
    async updateVideoClassDetectTime(video_class_id_arr) {
      const data = {
        video_class_id_arr,
      };
      const res = await updateVideoClassDetectTime(data);
      if (res.code === 0) {
        this.getvideochapterList();
        this.$message.success(res.message);
      }
    },
    // 快进控制
    async updateProgressStatus(row) {
      const data = {
        video_class_id_arr: [row.video_class_id],
        status: row.progress_status,
      };
      const res = await updateVideoClassProgressStatus(data).catch(() => {
        row.progress_status = row.progress_status ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 下载
    async getVideoUrlByid(row) {
      const data = {
        video_class_id: row.id,
      };
      row.loading = true;
      const res = await getVideoUrlByid(data).catch(() => {
        row.loading = false;
      });
      if (res.code === 0) {
        row.loading = false;
        const fileObj = res.data.Mezzanine || {};
        download(fileObj.FileURL, fileObj.FileName);
      }
    },
    handleBatchSort() {
      const videoSortMaps = {};
      const data = {};
      const allChildren = [];
      const lazyTreeNodeMap =
        this.$refs.multipleTable.store.states.lazyTreeNodeMap;
      // 设置章节排序参数
      this.listData.forEach((item) => {
        videoSortMaps[item.id] = item.sort;
      });
      for (let k in lazyTreeNodeMap) {
        allChildren.push(...lazyTreeNodeMap[k]);
      }
      // 设置课时排序参数
      allChildren.forEach((item) => {
        data[item.id] = item.sort;
      });
      allChildren.length && this.videoClassSort(data);
      this.videoChapterSort(videoSortMaps);
    },
    handleEditCancel() {
      this.$message("已取消");
      this.getvideochapterList();
    },
    showEdit() {
      this.isEdit = true;
    },
    handleSort(row) {
      if (row.parentId) {
        this.videoClassSort(row);
      } else {
        this.videoChapterSort(row);
      }
    },
    // 课时排序
    async videoClassSort(sortAry) {
      const data = {
        sortAry,
      };
      await videoClassSort(data);
    },
    // 章节排序
    async videoChapterSort(sortAry) {
      const data = {
        sortAry,
      };
      const res = await videoChapterSort(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getvideochapterList();
      }
    },

    handlePreview(src) {
      this.$refs.view.show(src);
    },
    //修章节试看状态
    async updateVideoClassFreeStatus(row) {
      const data = {
        video_class_name: row.name,
        video_class_id: row.id,
        video_class_free: row.free,
      };
      const res = await updateVideoClassFreeStatus(data).catch(() => {
        row.free = row.free === 1 ? 2 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    handleEdit(row) {
      if (row.parentId) {
        this.openEditClassHour(row.id);
      } else {
        this.openEdit(row.id);
      }
    },
    deleteConfirm(row) {
      this.$confirm(`确定要删除此${row.parentId ? "课时" : "章节"}吗?`, {
        type: "warning",
      })
        .then(() => {
          if (row.parentId) {
            this.deletevideoclass(row);
          } else {
            this.deletevideochapter(row.id);
          }
        })
        .catch(() => {});
    },
    // 删除课时
    async deletevideoclass(row) {
      const data = {
        video_class_id: row.id,
      };
      const res = await deletevideoclass(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.updateTableChildren(row.parentId);
      }
    },
    // 删除章节
    async deletevideochapter(id) {
      const data = {
        video_chapter_id: id,
      };
      const res = await deletevideochapter(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getvideochapterList();
      }
    },
    openEdit(id) {
      this.dialogTitle = "编辑章节";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加章节";
      this.dialogVisible = true;
    },
    openEditClassHour(id) {
      this.classHourDialogTitle = "编辑课时";
      this.classHourId = id;
      this.classHourDialogVisible = true;
    },
    openAddClassHour() {
      this.classHourId = "";
      this.classHourDialogTitle = "添加课时";
      this.classHourDialogVisible = true;
    },
    // 搜索
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getvideochapterList();
    },
    // 分页
    handlePageChange(val) {
      this.pageNum = val;
      this.getvideochapterList();
    },
    setId() {
      return (this.treeId += 1);
    },
    // 章节列表
    async getvideochapterList() {
      this.isEdit = false;
      this.isDetect = false;
      const data = {
        video_collection_id: this.$route.query?.video_collection_id || "",
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getvideochapterList(data);
      this.listLoading = false;
      this.listData = res.data.data.map((item, index) => ({
        name: item.video_chapter_name,
        sort: item.video_chapter_sort,
        id: item.video_chapter_id,
        treeId: this.setId(),
        hasChildren: true,
        children: [],
      }));
      this.listTotal = res.data.total;
    },
    // 根据父节点更新字节点
    async updateTableChildren(parentId) {
      if (this.treeLoadMap.has(parentId)) {
        const children = await this.getvideoclass(parentId);
        const { resolve } = this.treeLoadMap.get(parentId);
        this.$set(
          this.$refs.multipleTable.store.states.lazyTreeNodeMap,
          parentId,
          []
        );
        resolve(children);
      }
    },
    // table懒加载子节点
    async loadTableChildren(tree, treeNode, resolve) {
      // 保留当前加载节点用的参数，更新时复用
      this.treeLoadMap.set(tree.id, { tree, treeNode, resolve });
      const children = await this.getvideoclass(tree.id);
      resolve(children);
    },
    // 课时列表
    async getvideoclass(video_chapter_id) {
      const data = {
        video_collection_id: this.$route.query.video_collection_id,
        video_chapter_id,
        limit: 9999,
      };
      const res = await getvideoclass(data);
      const children = res.data.data.map((item, index) => ({
        ...item,
        name: item.video_class_name,
        sort: item.video_class_sort,
        id: item.video_class_id,
        parentId: item.video_chapter_id,
        free: item.video_class_free,
        duration: item.video_class_duration,
        coverurl: item.video_class_coverurl,
        treeId: this.setId(),
        loading: false,
      }));
      return children;
    },
  },
};
</script>

<style lang="scss" scoped>
.chapter-video {
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
  }
  .video-cover {
    width: 100%;
    height: 80px;
    text-align: center;
    img {
      cursor: pointer;
    }
  }
  .table_bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .actions {
      display: flex;
      align-items: center;
      > div {
        margin-right: 16px;
      }
    }
  }
}
</style>
