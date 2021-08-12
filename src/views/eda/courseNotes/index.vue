<template>
  <!-- 课程笔记列表 -->
  <div class="face-scanning-record">
    <div class="head_remind">*本模块展示所有的课程笔记数据，方便管理查询。</div>
    <div class="container">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
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
        >
          <el-table-column label="ID" align="center" width="70" prop="id">
          </el-table-column>
          <el-table-column
            label="创建时间"
            show-overflow-tooltip
            min-width="140"
            prop="create_time"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="笔记内容"
            min-width="230"
            align="left"
          >
            <template slot-scope="{ row }">
              <el-popover placement="top-start" width="400" trigger="hover">
                <div v-html="row.content"></div>
                <div
                  class="note-content"
                  slot="reference"
                  v-html="row.content"
                ></div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="user_realname"
            label="学员姓名"
            min-width="80"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toStudentDetail(row.uid)">
                {{ row.user_realname }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号码"
            min-width="100"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="course_name"
            label="课程名称"
            min-width="200"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="课时名称"
            min-width="140"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="like"
            label="点赞数"
            min-width="80"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="student_number"
            label="是否发布"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                @change="updateCourseNoteStatus(row)"
                v-model="row.status"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="90" align="center">
            <template slot-scope="{ row }">
              <el-button type="text" @click="deleteConfirm(row.id)">
                删除
              </el-button>
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
</template>

<script>
import {
  getCourseNoteList,
  updateCourseNoteStatus,
  deleteCourseNote,
} from "@/api/eda";
export default {
  name: "faceScanningRecord",
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
            placeholder: "学员姓名/手机号码",
          },
        },
      ],
    };
  },

  created() {
    this.getCourseNoteList();
  },

  methods: {
    deleteConfirm(id) {
      this.$confirm(`确定要删除该笔记吗?`, {
        type: "warning",
      })
        .then(() => {
          this.deleteCourseNote(id);
        })
        .catch(() => {});
    },
    async deleteCourseNote(id) {
      const data = {
        id,
      };
      const res = await deleteCourseNote(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getCourseNoteList();
      }
    },
    async updateCourseNoteStatus(row) {
      const data = {
        id: row.id,
        status: row.status,
      };
      const res = await updateCourseNoteStatus(data).catch(() => {
        row.status = row.status === 1 ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 搜索
    handleSearch(data) {
      this.pageNum = 1;
      const date = data.date || ["", ""];
      delete data.date;
      this.searchData = {
        ...data,
        start_time: date[0],
        end_time: date[1],
      };
      this.getCourseNoteList();
    },
    // 分页
    handlePageChange(val) {
      this.pageNum = val;
      this.getCourseNoteList();
    },
    // 列表
    async getCourseNoteList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getCourseNoteList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.face-scanning-record {
  /deep/.el-table__header th,
  .el-table__header tr {
    background-color: #f8f8f8;
    color: #909399;
  }
  .container {
    padding: 20px;

    .userTable {
      margin-top: 20px;
      .note-content {
        overflow: hidden;
        height: 40px;
        cursor: pointer;
        /deep/p {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
/deep/a {
  color: initial;
  text-decoration: underline;
}
</style>
