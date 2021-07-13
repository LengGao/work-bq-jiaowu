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
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
        row-key="treeId"
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :load="loadTableChildren"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="100"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="name"
          label="章节名称"
          min-width="220"
          align="left"
          show-overflow-tooltip
        ></el-table-column>
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
              {{ row.duration }}
            </span>
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
                v-if="!row.parentId"
                @click="openAddvideo(row)"
                >添加视频</el-button
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
        <div v-if="isEdit">
          <el-button @click="handleEditCancel">取消</el-button>
          <el-button type="primary" @click="handleBatchSort">保存</el-button>
        </div>
        <div v-else>
          <el-button @click="showEdit">批量排序</el-button>
        </div>
      </div>
    </div>
    <ChapterDIalog
      v-model="dialogVisible"
      :title="dialogTitle"
      :detailData="chapterDetail"
      @on-success="getChapterList"
    />
    <VideoDialog
      v-model="videoDialogVisible"
      :title="videoDialogTitle"
      :chapterId="currentChapterId"
      :detailData="videoDetail"
      @on-success="updateTableChildren"
    />
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import {
  getChapterList,
  deleteChapter,
  getLessonList,
  deleteLesson,
  batchSortLesson,
  batchSortChapter,
} from "@/api/eda";
import ChapterDIalog from "./components/chapterDIalog";
import VideoDialog from "./components/videoDialog";
export default {
  name: "chapterVideo",
  components: {
    VideoDialog,
    ChapterDIalog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        chapter_name: "",
      },
      searchOptions: [
        {
          key: "chapter_name",
          attrs: {
            placeholder: "章节名称",
          },
        },
      ],
      //章节
      chapterDetail: {},
      dialogTitle: "添加章节",
      dialogVisible: false,
      // 视频
      currentChapterId: "",
      videoDetail: {},
      videoDialogTitle: "添加视频",
      videoDialogVisible: false,
      treeId: 0,
      treeLoadMap: new Map(),
      //排序
      isEdit: false,
    };
  },

  created() {
    this.getChapterList();
  },

  methods: {
    handleBatchSort() {
      const videoSortMaps = {};
      const classSortMaps = {};
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
      // 设置视频排序参数
      allChildren.forEach((item) => {
        classSortMaps[item.id] = item.sort;
      });
      allChildren.length && this.batchSortLesson(classSortMaps);
      this.batchSortChapter(videoSortMaps);
    },
    handleEditCancel() {
      this.getChapterList();
    },
    showEdit() {
      this.isEdit = true;
    },
    handleSort(row) {
      if (row.parentId) {
        this.batchSortLesson(row);
      } else {
        this.batchSortChapter(row);
      }
    },
    // 视频排序
    async batchSortLesson(sort_arr) {
      const data = {
        sort_arr,
      };
      await batchSortLesson(data);
    },
    // 章节排序
    async batchSortChapter(sort_arr) {
      const data = {
        sort_arr,
      };
      const res = await batchSortChapter(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getChapterList();
      }
    },
    handlePreview(src) {
      this.$refs.view.show(src);
    },
    handleEdit(row) {
      if (row.parentId) {
        this.openEditvideo(row);
      } else {
        this.openEdit(row);
      }
    },
    deleteConfirm(row) {
      this.$confirm(`确定要删除此${row.parentId ? "视频" : "章节"}吗?`, {
        type: "warning",
      })
        .then(() => {
          if (row.parentId) {
            this.deleteLesson(row);
          } else {
            this.deleteChapter(row.id);
          }
        })
        .catch(() => {});
    },
    // 删除视频
    async deleteLesson(row) {
      const data = {
        id: row.id,
      };
      const res = await deleteLesson(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.updateTableChildren(row.parentId);
      }
    },
    // 删除章节
    async deleteChapter(id) {
      const data = {
        id,
      };
      const res = await deleteChapter(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getChapterList();
      }
    },
    openEdit(row) {
      this.dialogTitle = "编辑章节";
      this.chapterDetail = row;
      this.dialogVisible = true;
    },
    openAdd() {
      this.chapterDetail = {};
      this.dialogTitle = "添加章节";
      this.dialogVisible = true;
    },
    openEditvideo(row) {
      this.currentChapterId = row.parentId;
      this.videoDialogTitle = "编辑视频";
      this.videoDetail = row;
      this.videoDialogVisible = true;
    },
    openAddvideo(row) {
      this.currentChapterId = row.id;
      this.videoDetail = {};
      this.videoDialogTitle = "添加视频";
      this.videoDialogVisible = true;
    },
    // 搜索
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getChapterList();
    },
    // 分页
    setId() {
      return (this.treeId += 1);
    },
    // 章节列表
    async getChapterList() {
      this.isEdit = false;
      const data = {
        classroom_id: this.$route.query?.id || "",
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getChapterList(data);
      this.listLoading = false;
      this.listData = res.data.list.map((item, index) => ({
        name: item.chapter_name,
        sort: item.sort,
        id: item.id,
        treeId: this.setId(),
        hasChildren: item.lesson_cont > 0,
        children: [],
      }));
      this.listTotal = res.data.total;
    },
    // 根据父节点更新字节点
    async updateTableChildren(parentId) {
      if (this.treeLoadMap.has(parentId)) {
        const children = await this.getLessonList(parentId);
        const { resolve } = this.treeLoadMap.get(parentId);
        this.$set(
          this.$refs.multipleTable.store.states.lazyTreeNodeMap,
          parentId,
          []
        );
        resolve(children);
      } else {
        this.getChapterList();
      }
    },
    // table懒加载子节点
    async loadTableChildren(tree, treeNode, resolve) {
      // 保留当前加载节点用的参数，更新时复用
      this.treeLoadMap.set(tree.id, { tree, treeNode, resolve });
      const children = await this.getLessonList(tree.id);
      resolve(children);
    },
    // 视频列表
    async getLessonList(chapter_id) {
      const data = {
        chapter_id,
        limit: 9999,
      };
      const res = await getLessonList(data);
      const children = res.data.list.map((item, index) => ({
        name: item.title,
        sort: item.sort,
        id: item.id,
        parentId: item.chapter_id,
        video_repository_id: item.video_repository_id,
        duration: item.duration,
        coverurl: item.cover_url,
        treeId: this.setId(),
      }));
      return children;
    },
  },
};
</script>

<style lang="scss" scoped>
.chapter-video {
  padding: 20px;
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
    height: 50px;
    text-align: center;
    img {
      width: 80px;
      cursor: pointer;
    }
  }
  .table_bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
