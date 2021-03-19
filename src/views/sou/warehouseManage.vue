<template>
  <div>
    <div class="head_remind">*管理不同机构的仓库和仓库出入库。</div>
    <section class="mainwrap">
      <div class="client_head">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary" @click="openAdd">添加仓库</el-button>
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
            label="教材总数量"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="book_price"
            label="是否启用"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch :value="false"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="300">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="openEdit(row.book_id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="openPutStorage(row.book_id)"
                  >入库</el-button
                >
                <el-button type="text" @click="openEdit(row.book_id)"
                  >调拨</el-button
                >

                <el-button type="text" @click="link(row.book_id)"
                  >教材详情</el-button
                >
                <el-button type="text" @click="openEdit(row.book_id)"
                  >仓库日志</el-button
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
    <AddWarehouse
      v-model="addDialog"
      :title="dialogTitle"
      :selectData="selectData"
      :id="currentId"
      @on-success="getBookList"
    />
    <PutInStorage
      v-model="putDialog"
      :id="currentId"
      @on-success="getBookList"
    />
  </div>
</template>

<script>
import SearchList from "@/components/SearchList/index";
import AddWarehouse from "./components/AddWarehouse";
import PutInStorage from "./components/PutInStorage";
import { getBookList, getCateList } from "@/api/sou";

export default {
  components: {
    SearchList,
    AddWarehouse,
    PutInStorage,
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
      addDialog: false,
      dialogTitle: "添加仓库",
      currentId: "",
      selectData: [],
      putDialog: false,
    };
  },

  created() {
    this.getBookList();
    this.getCateList();
  },

  methods: {
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
    link(id) {
      this.$router.push({ name: "inventoryDetails", query: { id } });
    },
    openPutStorage() {
      this.putDialog = true;
    },
    openEdit(id) {
      this.dialogTitle = "编辑仓库";
      this.currentId = id;
      this.addDialog = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加仓库";
      this.addDialog = true;
    },

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
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.input-width {
  width: 240px;
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
</style>
