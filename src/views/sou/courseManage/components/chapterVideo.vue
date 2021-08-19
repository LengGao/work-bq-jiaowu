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
              {{ row.duration }}
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
            <el-input type="number" v-if="isSort" v-model="row.sort" />
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
              v-if="row.parentId"
              @change="batchFreeLesson(row)"
              v-model="row.is_free"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
            <i class="iconfont iconmianfei1" v-else></i>
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
              v-model="row.is_fast"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
            <i class="iconfont iconkuaijin" v-else></i>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="detect_time"
          label="认证次数"
          width="90"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-input
              v-focus
              type="number"
              v-if="(row.parentId && isDetect) || row.edit"
              v-model="row.detect_time"
              @blur="handleEditFaceCount(row)"
            ></el-input>
            <el-button
              type="text"
              @click="row.edit = true"
              v-else-if="row.parentId"
              >{{
                row.detect_time == 0 ? "无需认证" : row.detect_time
              }}</el-button
            >
            <i class="iconfont iconrenlianshibie1" v-else></i>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="200"
        >
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button
                type="text"
                v-if="row.parentId"
                @click="downloadVideo(row)"
                :loading="row.loading"
                >下载</el-button
              >
              <el-button
                v-if="!row.parentId"
                type="text"
                @click="openAddClassHour(row.id)"
                >添加课时</el-button
              >

              <el-button
                v-if="row.parentId"
                type="text"
                @click="toFaceRecord(row)"
                >核验记录</el-button
              >
              <el-button
                v-if="row.parentId"
                type="text"
                @click="toStatistics(row)"
                >统计</el-button
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
          <div v-if="isSort">
            <el-button @click="handleSortCancel">取消</el-button>
            <el-button type="primary" @click="handleBatchSort">保存</el-button>
          </div>
          <div v-else>
            <el-button @click="showSort">批量排序</el-button>
          </div>
          <div v-if="isDetect">
            <el-button @click="handleDetectCancel">取消</el-button>
            <el-button type="primary" @click="handleBatchDetect"
              >保存</el-button
            >
          </div>
          <div v-else>
            <el-button @click="showDetect">修改认证次数</el-button>
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
      :data="currentChapter"
      @on-success="getChapterList"
    />
    <ClassHourDialog
      v-model="classHourDialogVisible"
      :title="classHourDialogTitle"
      :data="classHourData"
      :chapterId="currentId"
      @on-success="updateTableChildren"
    />
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import {
  getChapterList,
  deleteChapter,
  batchFreeLesson,
  getLessonList,
  deleteLesson,
  batchSortLesson,
  batchSortChapter,
  batchDetectLesson,
  batchFastLesson,
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
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.querySelector("input").focus();
      },
    },
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        chapter_name: this.$route.query.chapter_name || "",
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
      currentId: "",
      currentChapter: {},
      dialogTitle: "添加章节",
      dialogVisible: false,
      // 课时
      classHourData: {},
      classHourDialogTitle: "添加课时",
      classHourDialogVisible: false,
      treeId: 0,
      treeLoadMap: new Map(),
      //排序
      isSort: false,
      //认证次数
      isDetect: false,
      checkedIds: [],
    };
  },

  created() {
    this.getChapterList();
  },

  methods: {
    toStatistics(row) {
      this.$router.push({
        name: "videoPlayStatistics",
        query: {
          course_name: this.$route.query.course_name,
          title: row.title,
          duration: row.duration,
          id: row.id,
        },
      });
    },
    // 单个修改认证测试
    async handleEditFaceCount(row) {
      if (this.isDetect) return;
      row.edit = false;
      const data = {
        course_video_lesson_id_arr: {
          [row.id]: row.detect_time,
        },
      };
      const res = await batchDetectLesson(data);
      if (res.code === 0) {
        if (row.detect_time > 0) {
          row.is_fast = 0;
        }
        this.$message.success(res.message);
      }
    },
    toFaceRecord(row) {
      this.$router.push({
        name: "videoFaceRecord",
        query: {
          course_name: this.$route.query.course_name,
          title: row.title,
          duration: row.duration,
          id: row.id,
        },
      });
    },
    handleSelectionChange(selection) {
      this.checkedIds = selection.map((item) => item.id);
    },
    // 批量快进控制
    async handleBatchDrag(is_fast) {
      if (!this.checkedIds.length) {
        this.$message.warning("请先选择！");
        return;
      }
      const data = {
        course_video_lesson_id_arr: this.checkedIds,
        is_fast,
      };
      const res = await batchFastLesson(data);
      if (res.code === 0) {
        this.$message.success(res.message);
      }
      this.getChapterList();
    },
    selectable(row) {
      return !!row.parentId;
    },
    handleDetectCancel() {
      this.isDetect = false;
      this.reloadAllChildren();
    },
    reloadAllChildren() {
      const parentIds = Array.from(this.treeLoadMap.keys());
      parentIds.forEach((id) => this.updateTableChildren(id));
    },
    // 批量设置认证次数
    handleBatchDetect() {
      const data = {};
      const allChildren = [];
      const lazyTreeNodeMap =
        this.$refs.multipleTable.store.states.lazyTreeNodeMap;

      for (let k in lazyTreeNodeMap) {
        allChildren.push(...lazyTreeNodeMap[k]);
      }
      // 设置课时认证参数
      allChildren.forEach((item) => {
        data[item.id] = item.detect_time;
      });
      allChildren.length && this.batchDetectLesson(data);
    },
    showDetect() {
      this.isDetect = true;
    },
    async batchDetectLesson(course_video_lesson_id_arr) {
      const data = {
        course_video_lesson_id_arr,
      };
      const res = await batchDetectLesson(data);
      if (res.code === 0) {
        this.handleDetectCancel();
        this.$message.success(res.message);
      }
    },
    // 快进控制
    async updateProgressStatus(row) {
      const data = {
        course_video_lesson_id_arr: [row.id],
        is_fast: row.is_fast,
      };
      const res = await batchFastLesson(data).catch(() => {
        row.is_fast = row.is_fast ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 下载
    async downloadVideo(row) {
      if (!row.file_url) {
        this.$message.error("未找到资源，无法下载！");
        return;
      }
      row.loading = true;
      download(row.file_url, row.title);
      setTimeout(() => {
        row.loading = false;
      }, 1000);
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
      allChildren.length && this.batchSortLesson(data);
      this.batchSortChapter(videoSortMaps);
    },
    handleSortCancel() {
      this.listData.forEach((item) => (item.sort = item.backupSort));
      this.isSort = false;
      this.reloadAllChildren();
    },
    showSort() {
      this.isSort = true;
    },
    // 课时排序
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
        this.listData.forEach((item) => (item.backupSort = item.sort));
        this.isSort = false;
        this.reloadAllChildren();
      }
    },

    handlePreview(src) {
      this.$refs.view.show(src);
    },
    //修章节试看状态
    async batchFreeLesson(row) {
      const data = {
        course_video_lesson_id_arr: [row.id],
        is_free: row.is_free,
      };
      const res = await batchFreeLesson(data).catch(() => {
        row.is_free = row.is_free === 1 ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    handleEdit(row) {
      if (row.parentId) {
        this.openEditClassHour(row);
      } else {
        this.openEdit(row);
      }
    },
    deleteConfirm(row) {
      this.$confirm(`确定要删除此${row.parentId ? "课时" : "章节"}吗?`, {
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
    // 删除课时
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
      this.currentId = row.id;
      this.currentChapter = row;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.currentChapter = {};
      this.dialogTitle = "添加章节";
      this.dialogVisible = true;
    },
    openEditClassHour(row) {
      this.currentId = row.parentId;
      this.classHourDialogTitle = "编辑课时";
      this.classHourData = row;
      this.classHourDialogVisible = true;
    },
    openAddClassHour(id) {
      this.currentId = id;
      this.classHourData = {};
      this.classHourDialogTitle = "添加课时";
      this.classHourDialogVisible = true;
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
    handlePageChange(val) {
      this.pageNum = val;
      this.getChapterList();
    },
    setId() {
      return (this.treeId += 1);
    },
    // 章节列表
    async getChapterList() {
      this.isSort = false;
      this.isDetect = false;
      const data = {
        course_id: this.$route.query?.course_id || "",
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getChapterList(data);
      this.listLoading = false;
      this.treeLoadMap.clear();
      this.listData = res.data.list.map((item, index) => ({
        name: item.chapter_name,
        sort: item.sort,
        backupSort: item.sort,
        id: item.id,
        chapter_intro: item.chapter_intro,
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
        if (children.length) {
          resolve(children);
        } else {
          this.getChapterList();
        }
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
    // 课时列表
    async getLessonList(chapter_id) {
      const data = {
        chapter_id,
        limit: 9999,
      };
      const res = await getLessonList(data);
      const children = res.data.list.map((item, index) => ({
        ...item,
        name: item.title,
        sort: item.sort,
        id: item.id,
        parentId: item.chapter_id,
        duration: item.duration,
        coverurl: item.cover_url,
        treeId: this.setId(),
        loading: false,
        edit: false,
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
    height: 40px;
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
