<template>
  <div>
    <div class="head_remind">
      *管理系统中的所有练习题库，包括自建题库和已添加的公共题库
    </div>
    <section class="mainwrap">
      <div class="client_head">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary" @click="openAdd">添加题库</el-button>
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
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="题库编号"
            show-overflow-tooltip
            min-width="70"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="题库名称"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="price"
            label="题库价格"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>￥{{ row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="book_price"
            label="是否上架"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                @change="updateQuestionBankStatus(row)"
                v-model="row.status"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="110">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <!-- <el-button
                  type="text"
                  @click="
                    linkTo('configureQuestionBank', row.id, row.topic_course_id)
                  "
                  >配置题库</el-button
                > -->
                <!-- <el-button type="text" @click="linkTo('configureScore', row.id)"
                  >配置分数</el-button
                > -->
                <el-button type="text" @click="openEdit(row.id)"
                  >编辑</el-button
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
    </section>
    <QuestionBankDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :typeOptions="typeOptions"
      :id="currentId"
      @on-success="getQuestionBankList"
    />
  </div>
</template>

<script>
import {
  getQuestionBankList,
  getCateList,
  updateQuestionBankStatus,
  deleteQuestionBank,
} from "@/api/sou";
import { cloneOptions } from "@/utils/index";
import QuestionBankDialog from "./components/QuestionBankDialog";
export default {
  name: "questionBank",
  components: {
    QuestionBankDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: [],
        title: "",
      },
      searchOptions: [
        {
          key: "category_id",
          type: "cascader",
          attrs: {
            placeholder: "所属分类",
            clearable: true,
            props: { checkStrictly: true },
            filterable: true,
            options: [],
          },
        },
        {
          key: "title",
          attrs: {
            placeholder: "题库名称",
          },
        },
      ],
      currentId: "",
      dialogTitle: "添加题库",
      dialogVisible: false,
      typeOptions: [],
    };
  },

  created() {
    this.getQuestionBankList();
    this.getCateList();
  },

  methods: {
    linkTo(name, id, topic_course_id) {
      this.$router.push({ name, query: { id, topic_course_id } });
    },
    // 删除题库
    deleteConfirm(id) {
      this.$confirm("确定要删除此题库吗?", { type: "warning" })
        .then(() => {
          this.deleteQuestionBank(id);
        })
        .catch(() => {});
    },
    async deleteQuestionBank(id) {
      const data = { id };
      const res = await deleteQuestionBank(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getQuestionBankList();
      }
    },
    // 修改题库状态
    async updateQuestionBankStatus(row) {
      const data = {
        id: row.id,
        status: row.status,
      };
      const res = await updateQuestionBankStatus(data).catch(() => {
        row.status = row.status ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 获取分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = this.typeOptions = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    link(id) {
      this.$router.push({ name: "inventoryDetails", query: { id } });
    },
    openEdit(id) {
      this.dialogTitle = "编辑题库";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加题库";
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        category_id: data.category_id.pop(),
      };
      this.getQuestionBankList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getQuestionBankList();
    },
    async getQuestionBankList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getQuestionBankList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}

.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.table_bottom {
  text-align: right;
}
</style>
