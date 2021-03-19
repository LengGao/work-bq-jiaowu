  <!-- 库存详情 -->
<template>
  <div class="inventory-details">
    <section class="mainwrap">
      <div class="client_head">
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
            prop="book_name"
            label="仓库名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="关联机构"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="chief_editor"
            label="教材数量"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="book_price"
            label="最后更新时间"
            min-width="110"
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
    </section>
  </div>
</template>

<script>
import SearchList from "@/components/SearchList/index";
import { getBookList } from "@/api/sou";

export default {
  components: {
    SearchList,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: [],
        keyboard: "",
      },
      searchOptions: [
        {
          key: "category_id",
          type: "select",
          options: [{ value: 1, label: "test" }],
          attrs: {
            clearable: true,
          },
        },
        {
          key: "keyboard",
          attrs: {
            placeholder: "仓库名称",
          },
        },
      ],
    };
  },

  created() {
    this.getBookList();
  },

  methods: {
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = data;
      this.getBookList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getBookList();
    },
    async getBookList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        category_id: this.searchData.category_id.pop(),
      };
      this.listLoading = true;
      const res = await getBookList(data);
      this.listLoading = false;
      this.listData = res.data.data;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.inventory-details {
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
