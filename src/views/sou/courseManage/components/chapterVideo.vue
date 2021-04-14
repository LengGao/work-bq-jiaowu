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
      <el-button type="primary" @click="openAdd">添加章节</el-button>
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
          label="ID"
          show-overflow-tooltip
          min-width="90"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          prop="rule_name"
          label="报考章节"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="exam_type"
          label="报考省市"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.province + " " + row.city }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="comment"
          label="备注信息"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="binding_count"
          label="关联计划数"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button
                v-if="row.binding_count"
                type="text"
                @click="linkTo(row.id)"
                >{{ row.binding_count }}</el-button
              >
              <span v-else>{{ row.binding_count }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="student_number"
          label="是否启用"
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
              <el-button type="text" @click="openEdit(row.id)">编辑</el-button>
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
    <ChapterDIalog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      @on-success="getvideochapterList"
    />
  </div>
</template>

<script>
import {
  getvideochapterList,
  deletevideochapter,
  editvideoclass,
} from "@/api/sou";
import ChapterDIalog from "./chapterDIalog";
export default {
  name: "Subject",
  components: {
    ChapterDIalog,
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
            placeholder: "章节名称",
          },
        },
      ],

      currentId: "",
      dialogTitle: "添加章节",
      dialogVisible: false,
      typeOptions: [],
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
      this.listData = res.data.data;
      this.listTotal = res.data.total;
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
