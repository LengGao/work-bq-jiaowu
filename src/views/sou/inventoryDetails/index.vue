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
            prop="storage_name"
            label="仓库名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="institution_name"
            label="关联机构"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="number"
            label="教材数量"
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
import { getbookinstorage, getInstitutionSelectData } from "@/api/sou";

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
        organization_id: [],
        keyword: "",
      },
      searchOptions: [
        {
          key: "organization_id",
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
            placeholder: "仓库名称",
          },
        },
      ],
      selectData: [],
    };
  },

  created() {
    this.getbookinstorage();
    this.getInstitutionSelectData();
  },

  methods: {
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = data;
      this.getbookinstorage();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getbookinstorage();
    },
    // 获取搜索选项
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.cloneData(res.data, this.selectData);
        this.searchOptions[0].attrs.options = this.selectData;
      }
    },
    cloneData(data, newData) {
      data.forEach((item, index) => {
        newData[index] = {};
        newData[index].value = item.institution_id;
        newData[index].label = item.institution_name;
        if (item.children && item.children.length) {
          newData[index].children = [];
          this.cloneData(item.children, newData[index].children);
        }
      });
    },
    async getbookinstorage() {
      const data = {
        book_id: this.$route.query.id,
        page: this.pageNum,
        ...this.searchData,
        organization_id: this.searchData.organization_id.pop(),
      };
      this.listLoading = true;
      const res = await getbookinstorage(data);
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
