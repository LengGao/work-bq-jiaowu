  <!-- 教材详情 -->
<template>
  <div class="textbook-details">
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
            prop="book_id"
            label="ID"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="book_name"
            label="教材名称"
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
            prop="book_price"
            label="价格"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="number"
            label="库存数量"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="update_time"
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
import { getstoragebook, getCateList } from "@/api/sou";

export default {
  name: "TextbookDetails",
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
        keyword: "",
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
          key: "keyword",
          attrs: {
            placeholder: "教材名称",
          },
        },
      ],
      selectData: [],
    };
  },

  created() {
    this.getstoragebook();
    this.getCateList();
  },

  methods: {
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = data;
      this.getstoragebook();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getstoragebook();
    },
    // 获取搜索选项
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData);
        this.searchOptions[0].attrs.options = this.selectData;
      }
    },
    cloneData(data, newData) {
      data.forEach((item, index) => {
        newData[index] = {};
        newData[index].value = item.category_id;
        newData[index].label = item.category_name;
        if (item.son && item.son.length) {
          newData[index].children = [];
          this.cloneData(item.son, newData[index].children);
        }
      });
    },
    async getstoragebook() {
      const data = {
        storage_id: this.$route.query.id,
        page: this.pageNum,
        ...this.searchData,
        category_id: this.searchData.category_id.pop(),
      };
      this.listLoading = true;
      const res = await getstoragebook(data);
      this.listLoading = false;
      this.listData = res.data.data;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.textbook-details {
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
