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
        row-key="index"
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :load="loadTableChildren"
      >
        <el-table-column width="50" type="selection"> </el-table-column>
        <el-table-column
          prop="video_chapter_name"
          label="章节名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="视频缩略图"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="exam_type"
          label="时长"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="video_chapter_sort"
          label="排序"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="免费试用"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-switch
              @change="editvideoclass(row)"
              v-model="row.status"
              :active-value="2"
              :inactive-value="1"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="160">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="openEdit(row.video_chapter_id)"
                >编辑</el-button
              >
              <el-button
                type="text"
                @click="deleteConfirm(row.video_chapter_id)"
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
  </div>
</template>

<script>
import {
  getvideochapterList,
  deletevideochapter,
  editvideoclass,
  getvideoclass,
} from "@/api/sou";
import ChapterDIalog from "./chapterDIalog";
import ClassHourDialog from "./classHourDialog";
export default {
  name: "Subject",
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
    };
  },

  created() {
    this.getvideochapterList();
  },

  methods: {
    linkTo(id) {
      this.$router.push({ name: "apply", query: { id } });
    },
    //修章节试看状态
    async editvideoclass(row) {
      const data = {
        video_class_name: row.id,
        video_class_id: row.id,
        video_class_free: row.status,
      };
      const res = await editvideoclass(data).catch(() => {
        row.status = row.status === 1 ? 2 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 删除章节
    deleteConfirm(id) {
      this.$confirm("确定要删除此章节吗?", { type: "warning" })
        .then(() => {
          this.deletevideochapter(id);
        })
        .catch(() => {});
    },
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
        ...item,
        index,
        hasChildren: true,
        children: [],
      }));
      this.listTotal = res.data.total;
    },
    // 课时列表
    async loadTableChildren(tree, treeNode, resolve) {
      const data = {
        video_collection_id: this.$route.query?.video_collection_id || "",
      };
      const res = await getvideoclass(data);
      const children = res.data.data.map((item, index) => ({
        ...item,
        index: (index + "1" + tree.index) * 1,
      }));
      console.log(children);
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
}
</style>
