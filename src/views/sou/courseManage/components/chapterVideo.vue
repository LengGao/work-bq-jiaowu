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
        :cell-style="{ 'text-align': 'center' }"
        row-key="treeId"
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :load="loadTableChildren"
      >
        <el-table-column
          width="50"
          type="selection"
          :selectable="formatSelectable"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="章节名称"
          min-width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="coverurl"
          label="视频缩略图"
          min-width="110"
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
          label="排序"
          min-width="70"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.sort }}</span>
            <!-- <el-input v-model="row.sort" @blur="videoChapterSort(row)" /> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="student_number"
          label="免费试用"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-switch
              v-if="row.free"
              @change="editvideoclass(row)"
              v-model="row.free"
              :active-value="2"
              :inactive-value="1"
            >
            </el-switch>
            <span v-else>--</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="140">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="deleteConfirm(row)"
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
      @on-success="getvideochapterList"
    />
    <PreviewImg ref="view" />
  </div>
</template>

<script>
import {
  getvideochapterList,
  deletevideochapter,
  editvideoclass,
  getvideoclass,
  deletevideoclass,
  videoChapterSort,
} from "@/api/sou";
import ChapterDIalog from "./chapterDIalog";
import ClassHourDialog from "./classHourDialog";
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
    };
  },

  created() {
    this.getvideochapterList();
  },

  methods: {
    // 章节排序
    async videoChapterSort(row) {
      const data = {
        sortAry: {
          [row.id]: row.sort,
        },
      };
      const res = await videoChapterSort(data);
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 只能选择课时
    formatSelectable(row) {
      return !row.hasChildren;
    },
    handlePreview(src) {
      this.$refs.view.show(src);
    },
    //修章节试看状态
    async editvideoclass(row) {
      const data = {
        video_class_name: row.name,
        video_class_id: row.id,
        video_class_free: row.free,
      };
      const res = await editvideoclass(data).catch(() => {
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
            this.deletevideoclass(row.id);
          } else {
            this.deletevideochapter(row.id);
          }
        })
        .catch(() => {});
    },
    // 删除课时
    async deletevideoclass(id) {
      const data = {
        video_class_id: id,
      };
      const res = await deletevideoclass(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getvideochapterList();
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
    // 课时列表
    async loadTableChildren(tree, treeNode, resolve) {
      const data = {
        video_chapter_id: tree.id,
        limit: 9999,
      };
      const res = await getvideoclass(data);
      const children = res.data.data.map((item, index) => ({
        name: item.video_class_name,
        sort: item.video_class_sort,
        id: item.video_class_id,
        parentId: item.video_chapter_id,
        free: item.video_class_free,
        duration: item.video_class_duration,
        coverurl: item.video_class_coverurl,
        treeId: this.setId(),
      }));
      resolve(children);
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
}
</style>
